import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // async findUserFrom42Id(intraId: number): Promise<any> {
  //   const user = await this.usersService.findOneIntra(intraId);
  
  //   if ( !user ) {
  //       throw new UnauthorizedException();
  //   }
  //   return user;
  // }

  async login(user: User) {
    console.log("LOGIN -> ", user);

    const payload = { name: user.userName, sub: user.intraId };
    console.log("return access token");
    return {
      access_token: this.jwtService.sign(payload),
      userName: user.userName
    };
  }
  
}