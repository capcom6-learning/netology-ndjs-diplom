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
        throw new Error('Method not implemented.');
    }

    async getUnreadCount(supportRequest: ID): Promise<number> {
        const managers = await this.userModel.find({ role: 'client' });

        const messagesCount = await this.messageModel
            .countDocuments({ supportRequest, author: { $nin: managers }, readAt: null });

        return messagesCount;
    }

    async closeRequest(supportRequest: ID): Promise<void> {
        throw new Error('Method not implemented.');
    }

}
