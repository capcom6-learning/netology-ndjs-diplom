import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { HotelsService } from 'src/modules/hotels/services';
import { CreateHotelRequest, UpdateHotelRequest } from './hotels.dto';
import { ParseObjectIdPipe } from 'src/api/pipes/parse-objectid.pipe';

@Controller('admin/hotels')
export class HotelsController {
    constructor(
        private readonly hotelsService: HotelsService,
    ) { }

    @Get()
    async select(@Query() params: { limit: number, offset: number, title: string }) {
        const hotels = await this.hotelsService.search(params);
        return hotels;
    }

    @Post()
    async create(@Body() data: CreateHotelRequest) {
        const hotel = await this.hotelsService.create(data);
        return hotel;
    }

    @Put(':id')
    async update(@Param('id', ParseObjectIdPipe) id: string, @Body() data: UpdateHotelRequest) {
        const hotel = await this.hotelsService.update(id, data);
        return hotel;
    }
}
