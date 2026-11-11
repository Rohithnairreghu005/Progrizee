import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DEFAULT_PORT = 4000;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  const port = Number(process.env.API_PORT ?? DEFAULT_PORT);
  await app.listen(port);
  console.info(`api listening on port ${port}`);
}

void bootstrap();
