import { ID } from "src/common/types";
import { CreateSupportRequestDto, MarkMessagesAsReadDto, MessageDto, SendMessageDto, SupportRequestDto } from "./chats.dto";

export interface GetChatListParams {
    user?: ID;
    limit?: number;
    offset?: number;
    isActive?: boolean;
}

export interface ISupportRequestService {
    findSupportRequests(params: GetChatListParams): Promise<SupportRequestDto[]>;
    sendMessage(data: SendMessageDto): Promise<MessageDto>;
    getMessages(supportRequest: ID): Promise<MessageDto[]>;
    subscribe(
        handler: (supportRequest: SupportRequestDto, message: MessageDto) => void
    ): () => void;
}

export interface ISupportRequestClientService {
    createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequestDto>;
    markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
    getUnreadCount(userId: ID, supportRequest: ID): Promise<number>;
}

export interface ISupportRequestEmployeeService {
    markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
    getUnreadCount(supportRequest: ID): Promise<number>;
    closeRequest(supportRequest: ID): Promise<void>;
}