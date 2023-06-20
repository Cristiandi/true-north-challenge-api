import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../app.module';
import { OperationSeedFactory } from './operation.seed';

(async () => {
  // getting the nest js app
  const application = await NestFactory.createApplicationContext(AppModule);

  await OperationSeedFactory.seed(application);
})()
  .catch((err) => console.error(err))
  .finally(() => process.exit(0));
