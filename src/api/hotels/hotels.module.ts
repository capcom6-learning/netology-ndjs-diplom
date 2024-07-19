import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import * as crypto from 'crypto';
import * as multer from 'multer';
import * as path from 'path';
import { HotelsModule } from 'src/modules/hotels/hotels.module';
import { ReservationsModule } from 'src/modules/reservations/reservations.module';
import { ReservationsController as ClientReservationsController } from './client/reservations/reservations.controller';
import { HotelRoomsController as CommonHotelRoomsController } from './common/hotel-rooms/hotel-rooms.controller';
import { ReservationsController as ManagerReservationsController } from './manager/reservations/reservations.controller';
import { AdminModule } from './admin/admin.module';

@Module({
    imports: [
        HotelsModule,
        ReservationsModule,
        AdminModule,
    ],
    controllers: [
        CommonHotelRoomsController,
        ClientReservationsController,
        ManagerReservationsController
    ]
})
export class HotelsApiModule { }
