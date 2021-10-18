import { Post, Get, Controller, Request, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './FortyTwo-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @UseGuards(FortyTwoAuthGuard)
  async getUserFrom42Login(@Request() req) {
    return req.user;
  }
}
