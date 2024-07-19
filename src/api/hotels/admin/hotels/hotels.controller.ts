import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { HotelsService } from 'src/modules/hotels/services';
import { CreateHotelRequest, UpdateHotelRequest } from './hotels.dto';
import { ParseObjectIdPipe } from 'src/api/pipes/parse-objectid.pipe';
import { Roles } from 'src/api/auth/roles.decorator';
import { RolesGuard } from 'src/api/auth/roles.guard';

@Controller('admin/hotels')
@Roles('admin')
@UseGuards(RolesGuard)
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
