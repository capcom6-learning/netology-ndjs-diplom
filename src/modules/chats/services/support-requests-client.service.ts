import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { User } from 'src/modules/users/users.model';
import { CreateSupportRequestDto, MarkMessagesAsReadDto, SupportRequestDto } from '../chats.dto';
import { ISupportRequestClientService } from '../chats.interface';
import { Message, SupportRequest } from '../chats.model';

@Injectable()
export class SupportRequestsClientService implements ISupportRequestClientService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(SupportRequest.name) private readonly supportRequestModel: Model<SupportRequest>,
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ) { }

    async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequestDto> {
        const supportRequest = new this.supportRequestModel(data);
        await (await supportRequest.save()).populate('user');

        return SupportRequestDto.from(supportRequest);
    }

    async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
        const managers = await this.userModel.find({ role: 'manager' });

        const request = await this.supportRequestModel
            .findOne({ _id: params.supportRequest })
            .populate({
                path: 'messages',
                match: {
                    author: { $in: managers },
                    readAt: null,
                    sentAt: { $lt: params.createdBefore }
                }
            });

        if (!request) {
            return;
        }

        await this.messageModel
            .updateMany(
                {
                    _id: { $in: request.messages },
                },
                { readAt: new Date() }
            );
    }

    async getUnreadCount(supportRequest: ID): Promise<number> {
        const managers = await this.userModel.find({ role: 'manager' });

        const request = await this.supportRequestModel
            .findOne({ _id: supportRequest })
            .populate({
                path: 'messages',
                match: {
                    author: { $in: managers },
                    readAt: null
                }
            });

        return request.messages.length;
    }

}
