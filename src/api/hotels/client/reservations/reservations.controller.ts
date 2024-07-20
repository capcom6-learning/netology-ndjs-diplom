import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/api/auth/roles.decorator';
import { RolesGuard } from 'src/api/auth/roles.guard';
import { User } from 'src/api/decorators/user.decorator';
import { ReservationsService } from 'src/modules/reservations/reservations.service';
import { CreateUserDto, UserDto } from 'src/modules/users/users.dto';

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
    async create(@Body() data: CreateUserDto) {
        return {};
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return {};
    }
}
