import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: "auth_register" })
  register(@Payload() data: { email: string; password: string }) {
    return this.authService.register(data.email, data.password);
  }

  @MessagePattern({ cmd: "auth_login" })
  login(@Payload() data: { email: string; password: string }) {
    return this.authService.login(data.email, data.password);
  }

  @MessagePattern({ cmd: "auth_verify" })
  verify(@Payload() data: { token: string }) {
    return this.authService.verifyToken(data.token);
  }
}
