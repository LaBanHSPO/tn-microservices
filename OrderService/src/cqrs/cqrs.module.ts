import { Module } from '@nestjs/common';
import { OrderHandler } from './order/order.handler';
import { CqrsController } from './cqrs.controller';
import { OrderSaga } from './order/order.saga';
import { ItemRepository } from './item/item.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'WORKER_SERVICE', transport: Transport.TCP,
        options: {
          host: process.env.WORKER_HOST,
          port: parseInt(process.env.WORKER_PORT)
        }
      },
    ]),
    // ClientsModule.register({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => config.get('microservices'),
    // }),
  ],
  controllers: [
    CqrsController
  ],
  providers: [
    OrderHandler,
    OrderSaga,
    ItemRepository,
  ],
})

export class DatabaseModule {
  // static forRoot(entities = [], options?): DynamicModule {
  //   const providers = createDatabaseProviders(options, entities);
  //   return {
  //     module: DatabaseModule,
  //     providers: providers,
  //     exports: providers,
  //   };
  // }
}