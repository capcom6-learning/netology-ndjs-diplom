import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsModule } from '../hotels/hotels.module';
import { Reservation, ReservationModel } from './reservations.model';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationModel },
    ]),
    HotelsModule,
  ],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule { }
