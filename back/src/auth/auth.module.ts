import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { FortyTwoStrategy } from './FortyTwo.strategy';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtAuthGuard } from './jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { TwoFactorAuthenticationController } from './twoFAuth.controller';
import { TwoFactorAuthenticationService } from './twoFAuth.service';
import { JwtTwoFactorGuard } from './jwt-two-factor.guard';
import { JwtTwoFactorStrategy } from './jwt-two-factor.strategy';

@Module({
  imports: [ 
    HttpModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      // useClass: JwtTwoFactorGuard,
      useClass: JwtAuthGuard,
    },
    AuthService,
    JwtStrategy,
    FortyTwoStrategy,
    JwtTwoFactorStrategy,
    TwoFactorAuthenticationService,
  ],
  controllers: [AuthController, TwoFactorAuthenticationController],
  exports: [AuthService],
})
export class AuthModule {}
