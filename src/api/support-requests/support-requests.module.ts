import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { ManagerModule } from './manager/manager.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ClientModule, ManagerModule, CommonModule]
})
export class SupportRequestsModule {}
