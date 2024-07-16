import { Module } from '@nestjs/common';
import { AuthApiModule } from './auth/auth.module';
import { HotelsApiModule } from './hotels/hotels.module';

@Module({
  imports: [AuthApiModule, HotelsApiModule],
})
export class ApiModule { }
