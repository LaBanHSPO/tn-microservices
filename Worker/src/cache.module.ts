import { Module, CacheModule, Global } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          store: redisStore,
          host: config.get('appConfig.redisHost'),
          port: config.get('appConfig.redisPort'),
          auth_pass: config.get('appConfig.redisPass'),
          ttl: config.get('appConfig.cacheTtl'),
        }
      },
    }),
  ],

  controllers: [
  ],
  providers: [
  ],
  exports: [
    CacheModule
  ]
})
export class AppCacheModule {}
