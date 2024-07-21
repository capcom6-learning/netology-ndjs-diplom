import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter } from 'events';
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { MessageDto, SendMessageDto, SupportRequestDto } from '../chats.dto';
import { GetChatListParams, ISupportRequestService } from '../chats.interface';
import { Message, SupportRequest } from '../chats.model';

@Injectable()
export class SupportRequestsService implements ISupportRequestService {
    private readonly eventsEmitter = new EventEmitter<{ "message": [{ supportRequest: SupportRequestDto, message: MessageDto }] }>();

    constructor(
        @InjectModel(SupportRequest.name) private readonly supportRequestModel: Model<SupportRequest>,
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ) {
    }

    async findSupportRequests(params: GetChatListParams): Promise<SupportRequestDto[]> {
        const query: {
            user?: ID;
            isActive?: boolean;
        } = {};

        params.user && (query.user = params.user);
        params.isActive !== undefined && (query.isActive = params.isActive);

        const supportRequests = await this.supportRequestModel
            .find(query, { messages: false })
            .limit(params.limit)
            .skip(params.offset)
            .exec();

        return supportRequests.map(supportRequest => SupportRequestDto.from(supportRequest));
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

        // return supportRequest.messages.map(message => new MessageDto({...message, user: message.author.id}));
        throw new Error('Method not implemented.');
    }

    subscribe(handler: (supportRequest: SupportRequestDto, message: MessageDto) => void): () => void {
        const listener = ({ supportRequest, message }) => handler(SupportRequestDto.from(supportRequest), new MessageDto(message));

        this.eventsEmitter.on(
            'message',
            listener
        );

        return () => this.eventsEmitter.removeListener('message', listener);
    }
}
