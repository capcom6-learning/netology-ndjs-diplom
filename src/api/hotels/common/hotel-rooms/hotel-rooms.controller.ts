import { Controller, Get, Param, Query } from '@nestjs/common';
import { ParseObjectIdPipe } from 'src/api/pipes/parse-objectid.pipe';
import { ID } from 'src/common/types';
import { HotelRoomsService } from 'src/modules/hotels/services';

@Controller('common/hotel-rooms')
export class HotelRoomsController {
    constructor(
        private readonly hotelRoomsService: HotelRoomsService
    ) { }

    @Get()
    async get(@Query() params: { limit: number, offset: number, hotel: ID }) {
        const rooms = await this.hotelRoomsService.search({
            limit: params.limit,
            offset: params.offset,
            hotel: params.hotel
        });

        return rooms;
    }

    @Get(':id')
    async getById(@Param('id', ParseObjectIdPipe) id: ID) {
        const room = await this.hotelRoomsService.findById(id);

        return room;
    }
}
