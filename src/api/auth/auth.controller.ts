import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/modules/users/users.service';
import { RegisterDto } from './auth.dto';
import { RolesGuard } from './roles.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @HttpCode(200)
    async login(@Request() req) {
        return req.user;
    }

    @Post('client/register')
    async register(@Body() data: RegisterDto) {
        const user = await this.usersService.create({ ...data, role: 'client' });

        return user;
    }

    @UseGuards(RolesGuard)
    @Post('auth/logout')
    async logout(@Request() req) {
        req.logOut({ keepSessionInfo: false }, (err) => {
            if (err) {
                throw err;
            }
        });
    }
}
