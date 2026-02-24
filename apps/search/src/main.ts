import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'search';
  const logger = new Logger('search-service');
  const rmqUrl =
    process.env.RABBITMQ_URL ??
    'amqps://drwoxkrq:HXrHBS7RVrnAfBPPViPpcmXvYHW2QBcJ@leopard.lmq.cloudamqp.com/drwoxkrq';
  const queue = process.env.SEARCH_QUEUE ?? 'search_queue';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.enableShutdownHooks();
  await app.listen();
  logger.log(`search service running on queue: ${queue} and url: ${rmqUrl} `);
}
bootstrap();
