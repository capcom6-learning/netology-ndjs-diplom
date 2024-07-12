import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageModel, SupportRequest, SupportRequestModel } from './chats.model';
import { SupportRequestsClientService, SupportRequestsEmployeeService, SupportRequestsService } from './services';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SupportRequest.name, schema: SupportRequestModel },
            { name: Message.name, schema: MessageModel },
        ]),
    ],
    providers: [
        SupportRequestsService,
        SupportRequestsClientService,
        SupportRequestsEmployeeService,
    ],
})
export class ChatsModule { }
