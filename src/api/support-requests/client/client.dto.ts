import { SupportRequestDto } from "src/modules/chats/chats.dto";

export interface GetSupportRequestsParams {
    limit?: number;
    offset?: number;
    isActive?: boolean;
}

export class CreateSupportRequestRequest {
    text: string;
}

export type SupportRequestResponse = SupportRequestDto & { hasNewMessages: boolean }