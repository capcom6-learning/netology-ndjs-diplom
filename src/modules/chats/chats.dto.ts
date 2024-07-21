import { ID } from "src/common/types";
import { SupportRequestDocument } from "./chats.model";

export class SupportRequestDto {
    id: ID;
    user: ID;
    isActive: boolean;

    createdAt: Date;

    protected constructor(data: Partial<SupportRequestDto>) {
        this.id = data.id;
        this.user = data.user;
        this.isActive = data.isActive;
        this.createdAt = data.createdAt;
    }

    static from(data: SupportRequestDocument): SupportRequestDto {
        return new SupportRequestDto(data.toObject({ getters: true }));
    }
}

export class MessageDto {
    id: ID;
    author: ID;
    text: string;

    sentAt: Date;
    readAt?: Date;

    constructor(data: Partial<MessageDto>) {
        Object.assign(this, data);
    }
}

export interface CreateSupportRequestDto {
    user: ID;
    text: string;
}

export interface SendMessageDto {
    author: ID;
    supportRequest: ID;
    text: string;
}

export interface MarkMessagesAsReadDto {
    user: ID;
    supportRequest: ID;
    createdBefore: Date;
}