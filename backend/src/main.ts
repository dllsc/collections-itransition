import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require("dotenv").config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: '*',
      origin: '*',
      methods: '*',
    },
  });
  await app.listen(3000);
}

console.log('lalla');

bootstrap();
