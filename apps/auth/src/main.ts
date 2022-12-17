import { NestFactory } from '@nestjs/core';
import { RabbitMQService } from '@app/common';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rabbitmqService = app.get<RabbitMQService>(RabbitMQService);
  app.connectMicroservice<RmqOptions>(rabbitmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();