import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import  UserController from './user.controller';
import {UserEntity} from './user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule {
}