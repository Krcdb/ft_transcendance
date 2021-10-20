import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    // private jwtService: JwtService
  ) {}

  async findUserFrom42Id(intraId: number): Promise<any> {
    const user = await this.usersService.findOneIntra(intraId);
  
    if ( !user ) {
        throw new UnauthorizedException();
    }
    return user;
  }
  
}