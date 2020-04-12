import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module'
import { AnimalModule } from './animal/animal.module';

@Module({
  imports: [
    UserModule,
    AnimalModule
  ],
  controllers: [
  ],
  providers: [
    
  ],
})
export class ServiceApiModules {
}