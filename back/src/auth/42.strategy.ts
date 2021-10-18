import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, 'passport-42')
{
    constructor(private configService: ConfigService, private readonly usersService: UsersService)
    {
        super({
            clientID: configService.get<string>('FORTYTWO_APP_ID'),
            clientSecret: configService.get<string>('FORTYTWO_APP_SECRET'),
            callbackURL: configService.get<string>('FORTYTWO_CB_URL'),
        })
    }


    async validate(accessToken: string, refreshToken: string, profile: any)
    {
        try
        {
            this.usersService.create({"userName": profile.login})
        }
        catch(err)
        {
            console.log(err)
            return(err);
        }
    }

}