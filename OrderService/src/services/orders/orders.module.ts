import { Module } from '@nestjs/common';
import  OrdersControllers from './orders.controller';
import { OrdersService } from "./orders.service";
import  { AppCacheModule } from '../../app/cache.module';
import { QueueCacheModules } from '../../queue-cache/queue-cache.module';

@Module({
  imports: [
    AppCacheModule,
    QueueCacheModules,
  ],
  controllers: [
    OrdersControllers
  ],
  providers: [
    OrdersService
  ],
  exports: [
  ],
})
export class OrdersModule {
}
