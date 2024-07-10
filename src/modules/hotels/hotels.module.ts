import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelModel, HotelRoom, HotelRoomModel } from './hotels.model';
import { HotelRoomsService, HotelsService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelModel },
      { name: HotelRoom.name, schema: HotelRoomModel },
    ])
  ],
  providers: [HotelsService, HotelRoomsService],
})
export class HotelsModule { }
