import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { MarkMessagesAsReadDto } from '../chats.dto';
import { ISupportRequestEmployeeService } from '../chats.interface';
import { SupportRequest } from '../chats.model';

@Injectable()
export class SupportRequestsEmployeeService implements ISupportRequestEmployeeService {
    constructor(
        @InjectModel(SupportRequest.name) private readonly supportRequestModel: Model<SupportRequest>,
    ) { }

    async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async getUnreadCount(supportRequest: ID): Promise<number> {
        throw new Error('Method not implemented.');
    }

    async closeRequest(supportRequest: ID): Promise<void> {
        throw new Error('Method not implemented.');
    }

}
