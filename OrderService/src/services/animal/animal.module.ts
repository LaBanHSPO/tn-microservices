import { Module } from '@nestjs/common';
import  AnimalController from './animal.controller';
import { AnimalService } from "./animal.service";
import  { AppCacheModule } from '../../app/cache.module';
import { QueueCacheModules } from '../../queue-cache/queue-cache.module';

@Module({
  imports: [
    AppCacheModule,
    QueueCacheModules,
  ],
  controllers: [
    AnimalController
  ],
  providers: [
    AnimalService
  ],
  exports: [
  ],
})
export class AnimalModule {
}
