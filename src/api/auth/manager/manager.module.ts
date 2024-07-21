import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ManagerController]
})
export class ManagerModule { }
