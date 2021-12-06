import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
declare const FortyTwoStrategy_base: new (...args: any[]) => any;
export declare class FortyTwoStrategy extends FortyTwoStrategy_base {
    private usersService;
    private configService;
    private httpService;
    constructor(usersService: UsersService, configService: ConfigService, httpService: HttpService);
    validate(accessToken: string): Promise<any>;
}
export {};
