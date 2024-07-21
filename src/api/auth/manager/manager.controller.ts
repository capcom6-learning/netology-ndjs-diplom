import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../roles.guard';
import { UsersService } from 'src/modules/users/users.service';
import { SearchUserParams } from 'src/modules/users/users.interface';
import { UserResponse } from '../auth.dto';

@Controller('manager/users')
@Roles('manager')
@UseGuards(RolesGuard)
export class ManagerController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    async getUsers(@Query() params: SearchUserParams) {
        const users = await this.usersService.findAll(params);

        return users.map((user) => UserResponse.from(user));
    }
}
