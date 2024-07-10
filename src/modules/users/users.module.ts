import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from './users.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
  ],
  providers: [UsersService]
})
export class UsersModule { }
