import {
    // ClassSerializerInterceptor,
    Controller,
    Header,
    Post,
    // UseInterceptors,
    Res,
    UseGuards,
    Req,
    Body,
    UnauthorizedException, HttpCode,
  } from '@nestjs/common';
  import { twoFAuthService } from './twoFAuth.service';
  import { Response } from 'express';
import { Public } from './utils/public.decorator';
import { UsersService } from 'src/users/users.service';
import { TwoFactorAuthDto } from 'src/users/dto/TwoFAuth-code.dto';
import { AuthService } from './auth.service';
//   import RequestWithUser from '../requestWithUser.interface';

  @Controller('2fa')
//   @UseInterceptors(ClassSerializerInterceptor)
  export class TwoFAuthController {
    constructor(
      private readonly twoFAuthService: twoFAuthService,
      private readonly usersService: UsersService,
      private readonly authService: AuthService,
    ) {}
   
    @Public()
    @Post('turn-on')
    @HttpCode(200)
    async turnOnTwoFAuth(
      @Body() twoFAuthData : TwoFactorAuthDto,
    ) {
      const isCodeValid = this.twoFAuthService.istwoFAuthCodeValid(
        twoFAuthData.twoFAuthCode, twoFAuthData.id
      );
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
      await this.usersService.turnOnTwoFAuth(twoFAuthData.id);
    }

    @Public()
    @Post('generate')
    async register(@Res() response: Response, @Body() id: number) {
      const { otpauthUrl } = await this.twoFAuthService.generatetwoFAuthSecret(id);
   
      return this.twoFAuthService.pipeQrCodeStream(response, otpauthUrl);
    }

    @Public()
    @Post('turn-off')
    async turnOffTwoFAuth(@Body() id: number) {
      return await this.usersService.turnOffTwoFAuth(id);
    }

    @Public()
    @Post('authenticate')
    @HttpCode(200)
    async authenticate(
      @Body() twoFAuthInfo : TwoFactorAuthDto
    ) {
      console.log(twoFAuthInfo);
      const isCodeValid = await this.twoFAuthService.istwoFAuthCodeValid(
        twoFAuthInfo.twoFAuthCode, twoFAuthInfo.id
      );
      console.log("valid = ", isCodeValid);
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
      const user = await this.usersService.findOne(twoFAuthInfo.id);
      return await this.authService.loginAuthenticate(user);
    }
  }