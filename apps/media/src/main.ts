import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MediaModule } from './media.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'media';
  const logger = new Logger('media-service');
  const port = Number(process.env.MEDIA_TCP_PORT ?? 4013);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MediaModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port,
      },
    },
  );

  app.enableShutdownHooks();
  await app.listen();
  logger.log('media service running');
}
bootstrap();
