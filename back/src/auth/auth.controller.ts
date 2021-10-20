import { Post, Get, Controller, Request, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './FortyTwo-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(FortyTwoAuthGuard)
  @Get('42')
  async login(@Request() req): Promise<any>  {
    return this.authService.login(req.user);
  }
  // async getUserFrom42Login(@Request() req): Promise<any> {
  //   return req.user;
  // }
}
