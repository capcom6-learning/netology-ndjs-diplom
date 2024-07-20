import { Controller, Delete, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { Roles } from 'src/api/auth/roles.decorator';
import { RolesGuard } from 'src/api/auth/roles.guard';
import { ParseObjectIdPipe } from 'src/api/pipes/parse-objectid.pipe';
import { ReservationsService } from 'src/modules/reservations/reservations.service';
import { ReservationResponse } from './reservations.dto';

@Controller('manager/reservations')
@Roles('manager')
@UseGuards(RolesGuard)
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService
    ) { }

    @Get(':userId')
    async get(@Param('userId', ParseObjectIdPipe) userId: string) {
        const reservations = await this.reservationsService.getReservations({ userId });

        return reservations;
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id', ParseObjectIdPipe) id: string) {
        await this.reservationsService.removeReservation({ id });
    }
}
