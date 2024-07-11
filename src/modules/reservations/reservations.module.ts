import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { HotelRoomsService, HotelsService } from '../hotels/services';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationModel } from './reservations.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationModel },
    ]),
  ],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule { }
