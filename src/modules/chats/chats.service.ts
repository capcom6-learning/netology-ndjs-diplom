import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, SupportRequest, SupportRequestModel } from './chats.model';
import { Model } from 'mongoose';
import { GetChatListParams, ISupportRequestService } from './chats.interface';
import { ID } from 'src/common/types';
import { SupportRequestDto, SendMessageDto, MessageDto } from './chats.dto';
import EventEmitter from 'events';

@Injectable()
export class ChatsService implements ISupportRequestService {
    private readonly eventsEmitter = new EventEmitter<{ "message": [{ supportRequest: SupportRequestDto, message: MessageDto }] }>();

    constructor(
        @InjectModel(SupportRequest.name) private readonly supportRequestModel: Model<SupportRequest>,
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ) { }

    async findSupportRequests(params: GetChatListParams): Promise<SupportRequestDto[]> {
        const query: {
            user?: ID;
            isActive: boolean;
        } = {
            isActive: params.isActive,
        };

        if (params.user) {
            query.user = params.user;
        }

        const supportRequests = await this.supportRequestModel
            .find(query, { messages: false })
            .exec();

        return supportRequests.map(supportRequest => new SupportRequestDto(supportRequest.toObject()));
    }

    async sendMessage(data: SendMessageDto): Promise<MessageDto> {
        const supportRequest = await this.supportRequestModel.findOne({ _id: data.supportRequest });
        if (!supportRequest) {
            throw new Error('Support request not found');
        }

        const message = new this.messageModel(data);
        supportRequest.messages.push(message);
        await supportRequest.save();

        const messageDto = new MessageDto(message.toObject());
        this.eventsEmitter.emit('message', { supportRequest: supportRequest.toObject(), message: messageDto });

        return messageDto;
    }

    async getMessages(supportRequestId: ID): Promise<MessageDto[]> {
        const supportRequest = await this.supportRequestModel
            .findOne({ _id: supportRequestId });
        if (!supportRequest) {
            throw new Error('Support request not found');
        }

        return supportRequest.messages.map(message => new MessageDto(message));
    }

    subscribe(handler: (supportRequest: SupportRequestDto, message: MessageDto) => void): () => void {
        const listener = ({ supportRequest, message }) => handler(new SupportRequestDto(supportRequest), new MessageDto(message));

        this.eventsEmitter.on(
            'message',
            listener
        );

        return () => this.eventsEmitter.removeListener('message', listener);
    }
}
