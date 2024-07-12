import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { CreateSupportRequestDto, MarkMessagesAsReadDto, SupportRequestDto } from '../chats.dto';
import { ISupportRequestClientService } from '../chats.interface';
import { SupportRequest } from '../chats.model';

@Injectable()
export class SupportRequestsClientService implements ISupportRequestClientService {
    constructor(
        @InjectModel(SupportRequest.name) private readonly supportRequestModel: Model<SupportRequest>,
    ) { }

    async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequestDto> {
        const supportRequest = new this.supportRequestModel(data);
        await supportRequest.save();
        return new SupportRequestDto(supportRequest.toObject());
    }

    async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
        // this.supportRequestModel.updateOne(
        //     { _id: params.supportRequest, messages: { $elemMatch: { user: params.user } } },
        //     { $set: { 'messages.readAt': params.createdBefore } }
        // )
        throw new Error('Method not implemented.');
    }

    async getUnreadCount(supportRequest: ID): Promise<number> {
        throw new Error('Method not implemented.');
    }

}
