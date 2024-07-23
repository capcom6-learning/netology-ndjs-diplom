import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { ManagerModule } from './manager/manager.module';
import { CommonModule } from './common/common.module';
import { SupportRequestsGateway } from './support-requests.gateway';
import { ChatsModule } from 'src/modules/chats/chats.module';

@Module({
  imports: [ClientModule, ManagerModule, CommonModule, ChatsModule],
  providers: [SupportRequestsGateway]
})
export class SupportRequestsModule { }
