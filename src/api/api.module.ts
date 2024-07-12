import { Module } from '@nestjs/common';
import { HotelsModule } from 'src/modules/hotels/hotels.module';
import { HotelRoomsController } from './common/hotel-rooms/hotel-rooms.controller';
import { HotelsController } from './admin/hotels/hotels.controller';

@Module({
  imports: [
    HotelsModule,
  ],
  controllers: [
    HotelRoomsController,
    HotelsController,
  ]
})
export class ApiModule { }
