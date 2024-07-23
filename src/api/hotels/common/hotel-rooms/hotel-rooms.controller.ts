import { Controller, Get, Param, Query } from '@nestjs/common';
import { User } from 'src/api/decorators/user.decorator';
import { ParseObjectIdPipe } from 'src/api/pipes/parse-objectid.pipe';
import { ID } from 'src/common/types';
import { SearchRoomsParams } from 'src/modules/hotels/hotels.interface';
import { HotelRoomsService } from 'src/modules/hotels/services';
import { UserDto } from 'src/modules/users/users.dto';
import { HotelRoomResponse } from './hotel-rooms.dto';

@Controller('common/hotel-rooms')
export class HotelRoomsController {
    constructor(
        private readonly hotelRoomsService: HotelRoomsService
    ) { }

    @Get()
    async get(@User() user: UserDto | null, @Query() params: { limit: number, offset: number, hotel: ID }) {
        const filter: SearchRoomsParams = {
            limit: params.limit,
            offset: params.offset,
            hotel: params.hotel
        };

        if (user == null || user?.role === 'client') {
            filter.isEnabled = true;
        }

        const rooms = await this.hotelRoomsService.search(filter);

        return rooms.map((room) => HotelRoomResponse.from(room));
    }

    @Get(':id')
    async getById(@Param('id', ParseObjectIdPipe) id: ID) {
        const room = await this.hotelRoomsService.findById(id);

        return HotelRoomResponse.from(room);
    }
}
