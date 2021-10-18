import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findUserFrom42Id(intraId: number): Promise<any> {
    const user = await this.usersService.findOneIntra(intraId);
  
    if ( !user ) {
        throw new UnauthorizedException();
    }
  
    return user;
  }
  
}