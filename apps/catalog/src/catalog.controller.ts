import { Controller, Get } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  @MessagePattern('service.ping')
  getHello() {
    return this.catalogService.ping();
  }
}
