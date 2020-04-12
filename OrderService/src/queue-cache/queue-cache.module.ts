import { Module } from '@nestjs/common';
import { RabbitMQ } from './rabbitmq.queue';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [
  ],
  providers: [
    RabbitMQ
  ],
  exports: [
    RabbitMQ
  ]
})
export class QueueCacheModules {}
