import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import appConfig from '../../config/app.config';

import { RandomOrgService } from './random-org.service';

@Module({
  imports: [ConfigModule.forFeature(appConfig), HttpModule],
  providers: [RandomOrgService],
  exports: [RandomOrgService],
})
export class RandomOrgModule {}
