import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '../../config/app.config';

import { Operation } from './operation.entity';

import { OperationService } from './operation.service';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forFeature([Operation]),
  ],
  providers: [OperationService],
  exports: [OperationService],
})
export class OperationModule {}
