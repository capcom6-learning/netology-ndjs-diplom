import { ID } from "src/common/types";
import { MessageDto } from "src/modules/chats/chats.dto";

export class SendMessageRequest {
    text: string;
}

export class ReadMessagesRequest {
    createdBefore: Date;
}

export class MessageResponse {
    id: ID;
    createdAt: Date;
    text: string;
    readAt?: Date;

    author: {
        id: ID;
        name: string;
    };

    constructor(data: Partial<MessageResponse>) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.text = data.text;
        this.readAt = data.readAt;
        this.author = data.author;
    }

    static from(data: MessageDto) {
        return new MessageResponse({ ...data, createdAt: data.sentAt });
    }
}