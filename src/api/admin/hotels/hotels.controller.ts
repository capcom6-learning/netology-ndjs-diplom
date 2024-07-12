import { Body, Controller, Post } from '@nestjs/common';
import { HotelsService } from 'src/modules/hotels/services';
import { CreateHotelRequest } from './hotels.dto';

@Controller('admin/hotels')
export class HotelsController {
    constructor(
        private readonly hotelsService: HotelsService,
    ) { }

    @Post()
    async create(@Body() data: CreateHotelRequest) {
        const hotel = await this.hotelsService.create(data);
        return hotel;
    }
}
