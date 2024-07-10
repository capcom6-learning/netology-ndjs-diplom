import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

        return new UserDto(created.toObject());
    }
    async findById(id: ID): Promise<UserDto> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return new UserDto(user.toObject());
    }
    async findByEmail(email: string): Promise<UserDto> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return new UserDto(user.toObject());
    }
    async findAll(params: SearchUserParams): Promise<UserDto[]> {
        function escapeRegex(source: string) {
            return source.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
        }

        const users = await this.userModel
            .find({
                email: { $regex: new RegExp(escapeRegex(params.email), 'i') },
                name: { $regex: new RegExp(escapeRegex(params.name), 'i') },
                contactPhone: { $regex: new RegExp(escapeRegex(params.contactPhone), 'i') },
            })
            .skip(params.offset)
            .limit(params.limit)
            .exec();

        return users.map(user => new UserDto(user.toObject()));
    }
}

