import {
  Module,
  // CacheInterceptor
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceApiModules } from '../services/service.modules';
import { GraphApiModules } from '../graphql/graph.modules';
import { DatabaseModule } from './database.module';
import { CoreDbModule } from './../core-db/core-db.module';
import { AppConfigModule } from '../config/config.module';
import { AuthModule } from '../auth/auth.module';
import { AppCacheModule } from './cache.module';
import * as CommonUtils from '../utils/common-utils';
// import { HttpExceptionFilter } from './http-exception.filter';

const commonUtils = {
  provide: 'COMMON_UTILS',
  useValue: CommonUtils,
};

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    // CoreDbModule,
    AppCacheModule,
    AuthModule,
    CqrsModule,
    ServiceApiModules,
    GraphApiModules,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    commonUtils,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {
  
}