import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import * as crypto from 'crypto';
import * as multer from 'multer';
import * as path from 'path';
import { HotelsModule } from 'src/modules/hotels/hotels.module';
import { HotelRoomsController } from './hotel-rooms/hotel-rooms.controller';
import { HotelsController } from './hotels/hotels.controller';

@Module({
    imports: [
        HotelsModule,
        MulterModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService<EnvConfig>) => ({
                storage: multer.diskStorage({
                    destination: config.get('UPLOAD_PATH') || './uploads',
                    filename: (req, file, cb) => cb(null, crypto.randomBytes(16).toString('hex') + path.extname(file.originalname))
                })
            })
        }),
    ],
    controllers: [
        HotelRoomsController,
        HotelsController,
    ],
})
export class AdminModule { }
