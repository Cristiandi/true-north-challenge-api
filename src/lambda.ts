import { configure } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);

    // enabling cors
    nestApp.enableCors();

    // set the global prefix
    nestApp.setGlobalPrefix('api');

    // enabling versioning
    nestApp.enableVersioning({
      type: VersioningType.URI,
    });

    await nestApp.init();

    cachedServer = configure({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
