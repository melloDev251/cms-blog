// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

/**
 * Bénéficier de l'AppModule qu'on a pour le module "commander"
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await CommandFactory.run(AppModule, new Logger());

  app.close();
}
void bootstrap();
