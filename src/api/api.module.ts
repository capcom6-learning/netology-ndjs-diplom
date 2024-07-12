import { Module } from '@nestjs/common';
import { HotelsModule } from 'src/modules/hotels/hotels.module';
import { HotelRoomsController as CommonHotelRoomsController } from './common/hotel-rooms/hotel-rooms.controller';
import { HotelsController } from './admin/hotels/hotels.controller';
import { HotelRoomsController as AdminHotelRoomsController } from './admin/hotel-rooms/hotel-rooms.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvConfig>) => ({
        storage: multer.diskStorage({
          destination: config.get('UPLOAD_PATH') || './uploads',
          filename: (req, file, cb) => cb(null, crypto.randomBytes(16).toString('hex') + path.extname(file.originalname))
        })
      })
    }),
    HotelsModule,
  ],
  controllers: [
    CommonHotelRoomsController,
    AdminHotelRoomsController,
    HotelsController,
  ]
})
export class ApiModule { }
