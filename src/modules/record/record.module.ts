import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '../../config/app.config';

import { Record } from './record.entity';

import { RecordService } from './record.service';

import { RecordController } from './record.controller';

import { OperationModule } from '../operation/operation.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forFeature([Record]),
    OperationModule,
    UserModule,
  ],
  providers: [RecordService],
  controllers: [RecordController],
})
export class RecordModule {}
