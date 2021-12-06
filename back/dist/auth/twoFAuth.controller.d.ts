import { twoFAuthService } from './twoFAuth.service';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { TwoFactorAuthDto } from 'src/users/dto/TwoFAuth-code.dto';
import { AuthService } from './auth.service';
export declare class TwoFAuthController {
    private readonly twoFAuthService;
    private readonly usersService;
    private readonly authService;
    constructor(twoFAuthService: twoFAuthService, usersService: UsersService, authService: AuthService);
    turnOnTwoFAuth(twoFAuthData: TwoFactorAuthDto): Promise<void>;
    register(response: Response, id: number): Promise<any>;
    turnOffTwoFAuth(id: number): Promise<import("typeorm").UpdateResult>;
    authenticate(twoFAuthInfo: TwoFactorAuthDto): Promise<{
        access_token: string;
        userName: string;
        id: number;
        isCreated: boolean;
    }>;
}
