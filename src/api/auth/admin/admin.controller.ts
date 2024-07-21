import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SearchUserParams } from 'src/modules/users/users.interface';
import { UsersService } from 'src/modules/users/users.service';
import { UserResponse } from '../auth.dto';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../roles.guard';
import { CreateUserRequest } from './admin.dto';

@Controller('admin/users')
@Roles('admin')
@UseGuards(RolesGuard)
export class AdminController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    async getUsers(@Query() params: SearchUserParams) {
        const users = await this.usersService.findAll(params);

        return users.map((user) => UserResponse.from(user));
    }

    @Post()
    async createUser(@Body() data: CreateUserRequest) {
        const user = await this.usersService.create(data);

        return UserResponse.from(user);
    }
}
