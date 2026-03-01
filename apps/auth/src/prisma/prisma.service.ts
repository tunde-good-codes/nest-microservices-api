// apps/auth/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient(); // prisma.config.ts handles the URL
  }

  get user() {
    return this.client.user;
  }

  async onModuleInit() {
    await this.client.$connect();
    console.log("✅ Database connected");
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
