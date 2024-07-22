import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/api/auth/roles.decorator';
import { RolesGuard } from 'src/api/auth/roles.guard';
import { User } from 'src/api/decorators/user.decorator';
import { ParseObjectIdPipe } from 'src/api/pipes/parse-objectid.pipe';
import { SupportRequestsClientService, SupportRequestsEmployeeService, SupportRequestsService } from 'src/modules/chats/services';
import { UserDto } from 'src/modules/users/users.dto';
import { RequestAccessGuard } from '../guards/request-access.guard';
import { MessageResponse, ReadMessagesRequest, SendMessageRequest } from './common.dto';

@Controller('common/support-requests')
export class CommonController {
    constructor(
        private readonly supportRequestsService: SupportRequestsService,
        private readonly supportRequestsClientService: SupportRequestsClientService,
        private readonly supportRequestsEmployeeService: SupportRequestsEmployeeService
    ) { }

    @Get(':id/messages')
    @Roles('client', 'manager')
    @UseGuards(RolesGuard, RequestAccessGuard)
    async getSupportRequestMessages(@Param('id', ParseObjectIdPipe) id: string) {
        const messages = await this.supportRequestsService.getMessages(id);

        return messages.map(message => MessageResponse.from(message));
    }

    @Post(':id/messages')
    @Roles('client', 'manager')
    @UseGuards(RolesGuard, RequestAccessGuard)
    async addSupportRequestMessage(
        @User() user: UserDto,
        @Param('id', ParseObjectIdPipe) id: string,
        @Body() data: SendMessageRequest
    ) {
        const message = await this.supportRequestsService.sendMessage({
            author: user.id,
            supportRequest: id,
            text: data.text
        });

        return [MessageResponse.from(message)];
    }

    @Post(':id/messages/read')
    @Roles('client', 'manager')
    @UseGuards(RolesGuard, RequestAccessGuard)
    async readSupportRequestMessages(
        @User() user: UserDto,
        @Param('id', ParseObjectIdPipe) id: string,
        @Body() data: ReadMessagesRequest
    ) {
        user.role === 'client' && (await this.supportRequestsClientService.markMessagesAsRead({ user: user.id, supportRequest: id, ...data }));
        user.role === 'manager' && (await this.supportRequestsEmployeeService.markMessagesAsRead({ user: user.id, supportRequest: id, ...data }));

        return {
            success: true
        };
    }
}
