import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestsLoggerMiddleware } from './core/middlewares';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsModule } from './modules/hotels/hotels.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestsLoggerMiddleware).forRoutes('*');
  }
}
