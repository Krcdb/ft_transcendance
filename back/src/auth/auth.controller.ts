import { Get, Controller, Request, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './Guard/FortyTwo-auth.guard';
import { Public } from './utils/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(FortyTwoAuthGuard)
  @Get('42')
  async login(@Request() req): Promise<any>  {
    return this.authService.login(req.user);
  }

  @Public()
  @Get(':id')
  async loginInvite(@Param('id') id: number): Promise<any>  {
    return this.authService.loginInvite(id);
  }
}
