import { ID } from "src/common/types";
import { MessageDocument, SupportRequestDocument } from "./chats.model";
import { UserDto } from "../users/users.dto";

export class SupportRequestDto {
    id: ID;
    isActive: boolean;

    author?: UserDto;

    createdAt: Date;

    protected constructor(data: Partial<SupportRequestDto>) {
        this.id = data.id;
        this.isActive = data.isActive;
        this.author = data.author;
        this.createdAt = data.createdAt;
    }

    static from(data: SupportRequestDocument): SupportRequestDto {
        const request = data.toObject({ getters: true });

        return new SupportRequestDto({
            ...request,
            author: request.user ? new UserDto(request.user) : undefined
        });
    }
}

export class MessageDto {
    id: ID;
    author: UserDto;
    text: string;

    sentAt: Date;
    readAt?: Date;

    constructor(data: Partial<MessageDto>) {
        this.id = data.id;
        this.author = data.author;
        this.text = data.text;
        this.sentAt = data.sentAt;
        this.readAt = data.readAt;
    }

    static from(data: MessageDocument): MessageDto {
        const message = data.toObject({ getters: true });
        return new MessageDto({
            ...message,
            author: new UserDto(message.author)
        });
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