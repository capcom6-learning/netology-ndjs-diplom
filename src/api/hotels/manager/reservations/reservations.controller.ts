import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ReservationsService } from 'src/modules/reservations/reservations.service';

@Controller('manager/reservations')
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService
    ) { }

    @Get(':userId')
    async get(@Param('userId') userId: string) {
        return [];
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return {};
    }
}
