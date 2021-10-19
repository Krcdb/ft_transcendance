import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, 'passport-42') {
  constructor(private usersService: UsersService,
      private configService: ConfigService,
      private httpService: HttpService) {
    super({
        clientID: configService.get<string>('FORTYTWO_APP_ID'),
        clientSecret:  configService.get<string>('FORTYTWO_APP_SECRET'),
        callbackURL:  configService.get<string>('FORTYTWO_CB_URL')
      });
  }

  async validate(accessToken: string): Promise<any> {
    console.log("call to validate 42");
    console.log("access token = ", accessToken);
    const { data } = await lastValueFrom(this.httpService.get(' https://api.intra.42.fr/v2/me', {
        headers: { Authorization: `Bearer ${ accessToken }` },
      }));
      return this.usersService.findOrCreate(data.id, data.login);
    }
}