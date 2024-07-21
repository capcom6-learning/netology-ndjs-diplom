import { Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/api/auth/roles.decorator';
import { RolesGuard } from 'src/api/auth/roles.guard';
import { User } from 'src/api/decorators/user.decorator';
import { ParseObjectIdPipe } from 'src/api/pipes/parse-objectid.pipe';
import { SupportRequestsService } from 'src/modules/chats/services';
import { UserDto } from 'src/modules/users/users.dto';
import { MessageResponse } from './common.dto';

@Controller('common/support-requests')
export class CommonController {
    constructor(
        private readonly supportRequestsService: SupportRequestsService
    ) { }

    @Get(':id/messages')
    @Roles('client', 'manager')
    @UseGuards(RolesGuard)
    async getSupportRequestMessages(@User() user: UserDto, @Param('id', ParseObjectIdPipe) id: string) {
        if (user.role === 'client') {
            const requests = await this.supportRequestsService.findSupportRequests({ user: user.id });
            if (!requests.some(request => request.id === id)) {
                throw new NotFoundException('Support request not found');
            }
        }

        const messages = await this.supportRequestsService.getMessages(id);

        return messages.map(message => MessageResponse.from(message));
    }

    @Post(':id/messages')
    @Roles('client', 'manager')
    @UseGuards(RolesGuard)
    async addSupportRequestMessage(@Param('id', ParseObjectIdPipe) id: string) {
        // await this.supportRequestsService.addMessage(id, data);
    }

    @Post(':id/messages/read')
    @Roles('client', 'manager')
    @UseGuards(RolesGuard)
    async readSupportRequestMessages(@Param('id', ParseObjectIdPipe) id: string) {
        // await this.supportRequestsService.markMessagesAsRead(id);
    }
}
