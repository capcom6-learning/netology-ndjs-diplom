import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { UserDto } from 'src/modules/users/users.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({ usernameField: 'email' });
    }

    async validate(username: string, password: string): Promise<UserDto> {
        const user = await this.usersService.validatePassword(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}