import { NestFactory } from "@nestjs/core";
import { CatalogModule } from "./catalog.module";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  process.title = "catalog";
  const logger = new Logger("catalog-service");
  const rmqUrl =
    process.env.RABBITMQ_URL ??
    "amqps://drwoxkrq:HXrHBS7RVrnAfBPPViPpcmXvYHW2QBcJ@leopard.lmq.cloudamqp.com/drwoxkrq";
  const queue = process.env.CATALOG_QUEUE ?? "catalog_queue";
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
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
  logger.log(`catalog service running on queue: ${queue} and url: ${rmqUrl} `);
}
bootstrap();
