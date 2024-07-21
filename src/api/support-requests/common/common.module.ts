import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { ChatsModule } from 'src/modules/chats/chats.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [ChatsModule],
  controllers: [CommonController]
})
export class CommonModule { }
