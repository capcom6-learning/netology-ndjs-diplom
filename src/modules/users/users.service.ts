import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from "argon2";
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { CreateUserDto, UserDto } from './users.dto';
import { IUserService, SearchUserParams } from './users.interface';
import { User } from './users.model';

@Injectable()
export class UsersService implements IUserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) { }

    async create(data: CreateUserDto): Promise<UserDto> {
        const existing = await this.userModel.findOne({ email: data.email });
        if (existing) {
            throw new ConflictException('Email already registered');
        }

        const created = new this.userModel({ ...data, passwordHash: await argon2.hash(data.password) });
        await created.save();

        return UserDto.from(created);
    }

    async validatePassword(email: string, password: string): Promise<UserDto> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException();
        }

        if (!await argon2.verify(user.passwordHash, password)) {
            throw new UnauthorizedException();
        }

        return UserDto.from(user);
    }

    async findById(id: ID): Promise<UserDto> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return UserDto.from(user);
    }

    async findByEmail(email: string): Promise<UserDto> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return UserDto.from(user);
    }

    async findAll(params: SearchUserParams): Promise<UserDto[]> {
        function escapeRegex(source: string) {
            return source.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
        }

        const users = await this.userModel
            .find(
                {
                    email: { $regex: new RegExp(escapeRegex(params.email), 'i') },
                    name: { $regex: new RegExp(escapeRegex(params.name), 'i') },
                    contactPhone: { $regex: new RegExp(escapeRegex(params.contactPhone), 'i') },
                },
                { passwordHash: 0 }
            )
            .skip(params.offset)
            .limit(params.limit)
            .exec();

        return users.map(user => UserDto.from(user));
    }
}

