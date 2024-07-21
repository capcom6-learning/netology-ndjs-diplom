import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/api/auth/roles.decorator';
import { RolesGuard } from 'src/api/auth/roles.guard';
import { User } from 'src/api/decorators/user.decorator';
import { SupportRequestsClientService, SupportRequestsService } from 'src/modules/chats/services';
import { UserDto } from 'src/modules/users/users.dto';
import { CreateSupportRequestRequest, GetSupportRequestsParams, SupportRequestResponse } from './client.dto';

@Controller('client/support-requests')
@Roles('client')
@UseGuards(RolesGuard)
export class ClientController {

    constructor(
        private readonly supportRequestsService: SupportRequestsService,
        private readonly supportRequestsClientService: SupportRequestsClientService
    ) { }

    @Post()
    async createSupportRequest(@User() user: UserDto, @Body() data: CreateSupportRequestRequest): Promise<SupportRequestResponse> {
        const request = await this.supportRequestsClientService.createSupportRequest({ ...data, user: user.id });

        return {
            ...request,
            hasNewMessages: false,
        };
    }

    @Get()
    async getSupportRequests(@User() user: UserDto, @Query() params: GetSupportRequestsParams): Promise<SupportRequestResponse[]> {
        const requests = await this.supportRequestsService.findSupportRequests({ ...params, user: user.id });

        return Promise.all(requests.map(async (request) => {
            return {
                ...request,
                hasNewMessages: (await this.supportRequestsClientService.getUnreadCount(request.id)) > 0,
            };
        }));
    }
}
