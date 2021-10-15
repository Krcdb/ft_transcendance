import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoStrategy } from './42.strategy';

@Module({
  imports: [ConfigModule, UsersModule, PassportModule],
  providers: [FortyTwoStrategy],
//   controllers: [AuthController],
})
export class AuthModule {}
