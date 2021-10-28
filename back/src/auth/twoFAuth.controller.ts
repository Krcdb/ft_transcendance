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
  import { TwoFactorAuthenticationService } from './twoFAuth.service';
  import { Response } from 'express';
import { Public } from './public.decorator';
import { UsersService } from 'src/users/users.service';
import { TwoFactorAuthDto } from 'src/users/dto/TwoFAuth-code.dto';
import { AuthService } from './auth.service';
//   import RequestWithUser from '../requestWithUser.interface';

  @Controller('2fa')
//   @UseInterceptors(ClassSerializerInterceptor)
  export class TwoFactorAuthenticationController {
    constructor(
      private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
      private readonly usersService: UsersService,
      private readonly authService: AuthService,
    ) {}
   
    @Public()
    @Post('turn-on')
    @HttpCode(200)
    async turnOnTwoFactorAuthentication(
      @Req() request,
      @Body() { twoFactorAuthenticationCode } : TwoFactorAuthDto
    ) {
      const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode, request.body.user
      );
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
      await this.usersService.turnOnTwoFactorAuthentication(request.body.user.id);
    }

    @Public()
    @Post('generate')
    async register(@Res() response: Response, @Req() request) {
      console.log("request => ", request);
      const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.body.user);
   
      return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
    }

    @Public()
    @Post('authenticate')
    @HttpCode(200)
    async authenticate(
      @Req() request,
      @Body() { twoFactorAuthenticationCode } : TwoFactorAuthDto
    ) {
      const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode, request.body.user
      );
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
  
      // const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id, true);
  
      // request.res.setHeader('Set-Cookie', [accessTokenCookie]);
  
      return request.body.user;
    }
  }