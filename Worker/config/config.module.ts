import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import moduleConfig from './module.config';
import oracleDbConfig from './oracle-database.config';
import queueConfig from './queue.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      load: [
        appConfig,
        moduleConfig,
        oracleDbConfig,
        queueConfig
      ],
    }),
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppConfigModule {
  
}