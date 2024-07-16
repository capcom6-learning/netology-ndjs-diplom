import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationsService } from 'src/modules/reservations/reservations.service';
import { CreateUserDto } from 'src/modules/users/users.dto';

@Controller('client/reservations')
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService
    ) { }

    @Get()
    async get() {
        return [];
    }

    @Post()
    async create(@Body() data: CreateUserDto) {
        return {};
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return {};
    }
}
