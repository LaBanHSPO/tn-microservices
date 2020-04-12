import { Module } from '@nestjs/common';
import { OracleRepository } from './oracle.repository';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [
  ],
  providers: [
    OracleRepository
  ],
  exports: [
    OracleRepository
  ]
})
export class CoreDbModule {}
