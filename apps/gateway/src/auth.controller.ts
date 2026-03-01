import { Body, Controller, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { IsEmail, IsString, MinLength } from "class-validator";

// DTOs
export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

@Controller("auth")
export class AuthController {
  constructor(@Inject("AUTH_SERVICE") private authClient: ClientProxy) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    // Sends to auth microservice → { cmd: 'auth_register' } handler
    return this.authClient.send({ cmd: "auth_register" }, dto);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authClient.send({ cmd: "auth_login" }, dto);
  }
}
