import { Injectable } from '@nestjs/common';
import { IUserService, SearchUserParams } from './users.interface';
import { ID } from 'src/common/types';
import { CreateUserDto, UserDto } from './users.dto';

@Injectable()
export class UsersService implements IUserService {
    create(data: CreateUserDto): Promise<UserDto> {
        throw new Error('Method not implemented.');
    }
    findById(id: ID): Promise<UserDto> {
        throw new Error('Method not implemented.');
    }
    findByEmail(email: string): Promise<UserDto> {
        throw new Error('Method not implemented.');
    }
    findAll(params: SearchUserParams): Promise<UserDto[]> {
        throw new Error('Method not implemented.');
    }


}
