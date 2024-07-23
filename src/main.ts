import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import * as session from "express-session"
import * as passport from "passport"
import { randomBytes } from 'crypto';
import { AbstractWsAdapter } from '@nestjs/websockets';
import { SessionAdapter } from './core/session.adapter';
import * as cookieParser from 'cookie-parser';

const MongoStore = require("connect-mongo");

async function bootstrap() {
  mongoose.set('debug', process.env.NODE_ENV !== 'production');

  const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/hotels',
    })
  });

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());

  app.useWebSocketAdapter(new SessionAdapter(sessionMiddleware, app));

  await app.listen(3000);
}
bootstrap();
