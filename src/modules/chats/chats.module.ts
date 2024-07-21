import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from '../users/users.model';
import { UsersModule } from '../users/users.module';
import { Message, MessageModel, SupportRequest, SupportRequestModel } from './chats.model';
import { SupportRequestsClientService, SupportRequestsEmployeeService, SupportRequestsService } from './services';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SupportRequest.name, schema: SupportRequestModel },
            { name: Message.name, schema: MessageModel },
            { name: User.name, schema: UserModel },
        ]),
        UsersModule,
    ],
    providers: [
        SupportRequestsService,
        SupportRequestsClientService,
        SupportRequestsEmployeeService,
    ],
    exports: [
        SupportRequestsService,
        SupportRequestsClientService,
        SupportRequestsEmployeeService,
    ],
})
export class ChatsModule { }
