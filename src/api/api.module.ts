import { Module } from '@nestjs/common';
import { AuthApiModule } from './auth/auth.module';
import { HotelsApiModule } from './hotels/hotels.module';
import { SupportRequestsModule } from './support-requests/support-requests.module';

@Module({
  imports: [AuthApiModule, HotelsApiModule, SupportRequestsModule],
})
export class ApiModule { }
