import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
export declare class AuthService {
    private jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    login(data: any): Promise<{
        id: any;
        access_token?: undefined;
        userName?: undefined;
        isCreated?: undefined;
    } | {
        access_token: string;
        userName: any;
        id: any;
        isCreated: any;
    }>;
    loginAuthenticate(user: User): Promise<{
        access_token: string;
        userName: string;
        id: number;
        isCreated: boolean;
    }>;
    loginInvite(id: number): Promise<{
        access_token: string;
        userName: string;
        id: number;
        isCreated: boolean;
    }>;
}
