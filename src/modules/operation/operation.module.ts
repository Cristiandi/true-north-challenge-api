import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '../../config/app.config';

import { Operation } from './operation.entity';

import { OperationService } from './operation.service';
import { RandomOrgModule } from '../../plugins/random-org/random-org.module';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forFeature([Operation]),
    RandomOrgModule,
  ],
  providers: [OperationService],
  exports: [OperationService],
})
export class OperationModule {}
