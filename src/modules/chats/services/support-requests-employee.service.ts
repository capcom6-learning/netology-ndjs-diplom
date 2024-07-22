import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { MarkMessagesAsReadDto } from '../chats.dto';
import { ISupportRequestEmployeeService } from '../chats.interface';
import { Message, SupportRequest } from '../chats.model';
import { User } from 'src/modules/users/users.model';

@Injectable()
export class SupportRequestsEmployeeService implements ISupportRequestEmployeeService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
        @InjectModel(SupportRequest.name) private readonly supportRequestModel: Model<SupportRequest>,
    ) { }

    async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
        const managers = await this.userModel.find({ role: 'manager' });

        const request = await this.supportRequestModel
            .findOne({ _id: params.supportRequest })
            .populate({
                path: 'messages',
                match: {
                    author: { $nin: managers },
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
                    author: { $nin: managers },
                    readAt: null
                }
            });

        return request.messages.length;
    }

    async closeRequest(supportRequest: ID): Promise<void> {
        throw new Error('Method not implemented.');
    }

}
