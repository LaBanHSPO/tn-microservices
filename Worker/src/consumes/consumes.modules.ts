import { Module } from '@nestjs/common';
import { OrderConsume } from './order.consume';
import { AppCacheModule } from '../cache.module';

@Module({
  imports: [AppCacheModule, OrderConsume],
  controllers: [],
  providers: [],
})
export class ConsumesModules {}
