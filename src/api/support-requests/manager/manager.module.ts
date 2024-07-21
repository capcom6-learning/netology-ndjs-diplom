import { Module } from '@nestjs/common';
import { ChatsModule } from 'src/modules/chats/chats.module';
import { ManagerController } from './manager.controller';

@Module({
  imports: [ChatsModule],
  controllers: [ManagerController]
})
export class ManagerModule { }
