import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SamplesModule } from './sample/sample.module';
import { RecipesModule } from './recipe/receipes.module';
import { AuthModule } from '../auth/auth.module';
// import { RedisPubSub } from 'graphql-redis-subscriptions';
// import * as Redis from 'ioredis';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('appConfig.graphqlConfig'),
        subscriptions: {
          path: '/graphql',
          onConnect: (connectionParams, websocket: any) => {
            console.log('[ws] Start subscriptions Key: %s', websocket.upgradeReq.headers['sec-websocket-key']);
          },
          onDisconnect: (websocket: any) => {
            console.info('[ws] %s disconnected!', websocket.upgradeReq.headers['sec-websocket-key']);
          }
        },
      })
    }),
    RecipesModule,
    AuthModule,
    SamplesModule
  ],
  controllers: [
  ],
  providers: [
    ConfigService
    // {
    //   provide: 'PUB_SUB',
    //   useFactory: (config: ConfigService) => {
    //     const options = {
    //       host: '27.72.88.106', // config.get('appConfig').REDIS_HOST,
    //       port: 3079 //config.get('appConfig').REDIS_PORT
    //     };
    
    //     return new RedisPubSub({
    //       publisher: new Redis(options),
    //       subscriber: new Redis(options),
    //     });
    //   }
    // }
  ],
  exports: [
  ]
})
export class GraphApiModules {
}
