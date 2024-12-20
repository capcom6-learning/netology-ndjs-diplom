import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as cookieParser from 'cookie-parser';
import { randomBytes } from 'crypto';
import * as session from 'express-session';
import * as passport from "passport";
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestsLoggerMiddleware } from './core/middlewares';
import { ChatsModule } from './modules/chats/chats.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { UsersModule } from './modules/users/users.module';
import { EnvConfig } from './types';

const MongoStore = require("connect-mongo");

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvConfig>) => ({
        uri: config.get('MONGO_URL') || 'mongodb://localhost:27017/hotels',
      }),
    }),
    UsersModule,
    HotelsModule,
    ReservationsModule,
    ChatsModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestsLoggerMiddleware).forRoutes('*');
  }
}
