import { Post, Get, Controller, Request, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './FortyTwo-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('42')
  @UseGuards(FortyTwoAuthGuard)
  async getUserFrom42Login(@Request() req): Promise<any> {
    return req.user;
  }
}
