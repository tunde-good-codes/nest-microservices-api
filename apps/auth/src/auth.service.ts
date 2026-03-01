/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "./prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    // Check if user already exists
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException("Email already in use");

    // Hash password and create user
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashed },
    });

    return this.generateToken(user.id, user.email);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException("Invalid credentials");

    return this.generateToken(user.id, user.email);
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }

  private generateToken(userId: string, email: string) {
    return {
      access_token: this.jwtService.sign({ sub: userId, email }),
    };
  }
}
