import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
export declare class AuthService {
    private jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    login(user: User): Promise<{
        id: number;
        access_token?: undefined;
        userName?: undefined;
    } | {
        access_token: string;
        userName: string;
        id: number;
    }>;
    loginAuthenticate(user: User): Promise<{
        access_token: string;
        userName: string;
        id: number;
    }>;
    loginInvite(id: number): Promise<{
        access_token: string;
        userName: string;
        id: number;
    }>;
}
