import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import * as crypto from 'crypto';
import * as multer from 'multer';
import * as path from 'path';
import { HotelsModule } from 'src/modules/hotels/hotels.module';
import { ReservationsModule } from 'src/modules/reservations/reservations.module';
import { HotelRoomsController as AdminHotelRoomsController } from './admin/hotel-rooms/hotel-rooms.controller';
import { HotelsController } from './admin/hotels/hotels.controller';
import { ReservationsController as ClientReservationsController } from './client/reservations/reservations.controller';
import { HotelRoomsController as CommonHotelRoomsController } from './common/hotel-rooms/hotel-rooms.controller';
import { ReservationsController as ManagerReservationsController } from './manager/reservations/reservations.controller';

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
        ReservationsModule,
    ],
    controllers: [
        CommonHotelRoomsController,
        AdminHotelRoomsController,
        HotelsController,
        ClientReservationsController,
        ManagerReservationsController
    ]
})
export class HotelsApiModule { }
