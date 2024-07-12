import { ID } from "src/common/types";

export class SupportRequestDto {
    id: ID;
    user: ID;
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;

    constructor(data: Partial<SupportRequestDto>) {
        Object.assign(this, data);
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