import { Module } from '@nestjs/common';
import { AppCacheModule } from './cache.module';
import { AppConfigModule } from '../config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumesModules } from './consumes/consumes.modules';

@Module({
  imports: [AppConfigModule, AppCacheModule, ConsumesModules],
  controllers: [AppController],
  providers: [AppService, AppCacheModule],
})
export class AppModule {}
