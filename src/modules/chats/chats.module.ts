import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageModel, SupportRequest, SupportRequestModel } from './chats.model';
import { ChatsService } from './chats.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SupportRequest.name, schema: SupportRequestModel },
            { name: Message.name, schema: MessageModel },
        ]),
    ],
    providers: [ChatsService],
})
export class ChatsModule { }
