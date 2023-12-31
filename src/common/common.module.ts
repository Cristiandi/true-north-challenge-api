import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BasicAclModule } from 'nestjs-basic-acl-sdk';
import { APP_GUARD } from '@nestjs/core';

import appConfig from '../config/app.config';

import { AuthorizationGuard } from './guards/authorization.guard';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    BasicAclModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          companyUid: configService.get<string>('config.acl.companyUid'),
          accessKey: configService.get<string>('config.acl.accessKey'),
        };
      },
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthorizationGuard }],
})
export class CommonModule {}
