import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/api/auth/roles.decorator';
import { RolesGuard } from 'src/api/auth/roles.guard';
import { SupportRequestsEmployeeService, SupportRequestsService } from 'src/modules/chats/services';
import { GetSupportRequestsParams, SupportRequestResponse } from './manager.dto';

@Controller('manager/support-requests')
@Roles('manager')
@UseGuards(RolesGuard)
export class ManagerController {
    constructor(
        private readonly supportRequestsService: SupportRequestsService,
        private readonly supportRequestsEmployeeService: SupportRequestsEmployeeService
    ) { }

    @Get()
    async getSupportRequests(@Query() params: GetSupportRequestsParams): Promise<SupportRequestResponse[]> {
        const requests = await this.supportRequestsService.findSupportRequests(params);

        return Promise.all(requests.map(async request => {
            return {
                ...request,
                hasNewMessages: (await this.supportRequestsEmployeeService.getUnreadCount(request.id)) > 0,
                client: request.author,
            };
        }));
    }
}
