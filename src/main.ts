import { NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // getting the config service
  const configService = app.get(ConfigService);

  // getting the port env var
  const PORT = configService.get<number>('config.app.port');

  // enabling cors
  app.enableCors();

  // set the global prefix
  app.setGlobalPrefix('api');

  // enabling versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(PORT, () => {
    Logger.log(`app listening at ${PORT}`, 'main.ts');
  });
}

bootstrap();
