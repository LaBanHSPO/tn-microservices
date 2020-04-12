import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module'
import { AnimalModule } from './animal/animal.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    UserModule,
    AnimalModule,
    OrdersModule
  ],
  controllers: [
  ],
  providers: [
    
  ],
})
export class ServiceApiModules {
}