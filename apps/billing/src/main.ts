import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { RabbitMQService } from '../../../libs/common/src/rabbitmq/rabbitmq.service';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rabbitmqService = app.get<RabbitMQService>(RabbitMQService)
  app.connectMicroservice(rabbitmqService.getOptions('BILLING'))
  await app.startAllMicroservices();
}
bootstrap();
