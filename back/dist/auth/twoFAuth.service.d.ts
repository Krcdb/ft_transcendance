import { UsersService } from 'src/users/users.service';
import { ConfigService } from "@nestjs/config";
import { Response } from 'express';
export declare class twoFAuthService {
    private readonly usersService;
    private readonly configService;
    constructor(usersService: UsersService, configService: ConfigService);
    istwoFAuthCodeValid(twoFAuthCode: string, id: number): Promise<boolean>;
    generatetwoFAuthSecret(id: number): Promise<{
        secret: string;
        otpauthUrl: string;
    }>;
    pipeQrCodeStream(stream: Response, otpauthUrl: string): Promise<any>;
}
