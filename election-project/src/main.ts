import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 15 * 1024 * 1024,
      ignoreTrailingSlash: true,
    }),
  );

  app.enableCors({
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    methods: 'GET,HEAD,POST,PUT,DELETE,PATCH,OPTIONS',
    origin: true,
    preflightContinue: false,
  });

  await app.listen(3001, '0.0.0.0');
}
bootstrap();
