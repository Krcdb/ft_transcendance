import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async login(user: User) {
    const payload = { name: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      userName: user.userName,
      id: user.id
    };
  }
  
}