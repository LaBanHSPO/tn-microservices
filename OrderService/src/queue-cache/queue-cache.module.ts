import { Module } from '@nestjs/common';
import { Celery } from './celery.client';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [
  ],
  providers: [
    Celery
  ],
  exports: [
    Celery
  ]
})
export class QueueCacheModules {}
