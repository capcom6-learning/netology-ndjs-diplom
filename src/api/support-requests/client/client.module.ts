import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ChatsModule } from 'src/modules/chats/chats.module';

@Module({
  imports: [ChatsModule],
  controllers: [ClientController]
})
export class ClientModule { }
