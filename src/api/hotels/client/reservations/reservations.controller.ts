import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/api/auth/roles.decorator';
import { RolesGuard } from 'src/api/auth/roles.guard';
import { User } from 'src/api/decorators/user.decorator';
import { ReservationsService } from 'src/modules/reservations/reservations.service';
import { CreateUserDto, UserDto } from 'src/modules/users/users.dto';
import { CreateReservationRequest } from './reservations.dto';
import { CreateReservationDto } from 'src/modules/reservations/reservations.dto';

@Controller('client/reservations')
@UseGuards(RolesGuard)
@Roles('client')
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService
    ) { }

    @Get()
    async get(@User() user: UserDto) {
        return user;
    }

    @Post()
    async create(@User() user: UserDto, @Body() data: CreateReservationRequest) {
        const request: CreateReservationDto = {
            userId: user.id,
            roomId: data.hotelRoom,
            dateStart: data.startDate,
            dateEnd: data.endDate,
        };

        const reservation = await this.reservationsService.addReservation(request);

        return reservation;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return {};
    }
}
