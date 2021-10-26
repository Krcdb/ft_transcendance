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
    const payload = { name: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      userName: user.userName,
      id: user.id
    };
  }

  async loginInvite(id: number) {
    const user = await this.usersService.findOne(id);
    const payload = { name: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      userName: user.userName,
      id: user.id
    };
  }
  
}