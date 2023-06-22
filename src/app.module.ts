import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import appConfig from './config/app.config';
import ormConfig from './config/orm.config';

import { AppService } from './app.service';

import { AppController } from './app.controller';

import { CommonModule } from './common/common.module';

import { UserModule } from './modules/user/user.module';
import { OperationModule } from './modules/operation/operation.module';
import { RecordModule } from './modules/record/record.module';
import { RandomOrgModule } from './plugins/random-org/random-org.module';

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),

    // TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...ormConfig,
          logging: configService.get<string>('config.database.log') === 'yes',
          timezone: 'Z',
        };
      },
    }),

    CommonModule,

    UserModule,

    OperationModule,

    RecordModule,

    RandomOrgModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
