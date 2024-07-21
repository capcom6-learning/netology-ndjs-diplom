import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';

@Module({
    imports: [
        PassportModule.register({ session: true }),
        UsersModule,
        AdminModule,
        ManagerModule
    ],
    controllers: [AuthController],
    providers: [LocalStrategy, SessionSerializer],
})
export class AuthApiModule { }
