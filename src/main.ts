import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import * as session from "express-session"
import * as passport from "passport"
import { randomBytes } from 'crypto';

async function bootstrap() {
  mongoose.set('debug', process.env.NODE_ENV !== 'production');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
