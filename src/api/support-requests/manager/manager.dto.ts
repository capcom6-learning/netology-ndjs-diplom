import { SupportRequestDto } from "src/modules/chats/chats.dto";
import { UserDto } from "src/modules/users/users.dto";

export interface GetSupportRequestsParams {
    limit?: number;
    offset?: number;
    isActive?: boolean;
}

export type SupportRequestResponse = SupportRequestDto
    & { hasNewMessages: boolean, client: UserDto }