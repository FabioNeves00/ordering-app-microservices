import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { RabbitMQModule } from '@app/common';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required()
      }),
      envFilePath: './apps/billing/.env'
    }),
    RabbitMQModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule { }
