import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('health')
  getHealth() {
    return {
      ok: true,
      service: 'health',
      now: new Date().toLocaleDateString(),
    };
  }
}
