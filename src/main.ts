import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  ConfigModule.forRoot({
    isGlobal: true,
  }); // this will load the .env file and make it available to the entire application
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger:
        process.env.ENVIRONMENT !== 'production' &&
        process.env.LOGGER === 'true',
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this will remove any properties that are not in the DTO
      transform: true, // this will transform the incoming data to the DTO type
      transformOptions: {
        enableImplicitConversion: true, // this will allow us to use the @Param decorator with type conversion
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
