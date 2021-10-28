import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async login(user: User) {
    this.usersService.updateLogState(user.id, true);
    const payload = { name: user.userName, sub: user.id };
    if (user.isTwoFactorAuthenticationEnabled) {
      return;
    }
    return {
      access_token: this.jwtService.sign(payload),
      userName: user.userName,
      id: user.id
    };
  }

  async TwoFactorlogin(user: User, isSecondFactorAuthenticated = false) {
    this.usersService.updateLogState(user.id, true);
    const payload = { name: user.userName, sub: user.id, twofa: isSecondFactorAuthenticated };
    return {
      access_token: this.jwtService.sign(payload),
      userName: user.userName,
      id: user.id
    };
  }

  async loginInvite(id: number) {
    const user = await this.usersService.findOne(id);
    this.usersService.updateLogState(id, true);
    const payload = { name: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      userName: user.userName,
      id: user.id
    };
  }
}