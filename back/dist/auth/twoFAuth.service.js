"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoFAuthService = void 0;
const common_1 = require("@nestjs/common");
const otplib_1 = require("otplib");
const user_entity_1 = require("../users/user.entity");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
const qrcode_1 = require("qrcode");
let twoFAuthService = class twoFAuthService {
    constructor(usersService, configService) {
        this.usersService = usersService;
        this.configService = configService;
    }
    async istwoFAuthCodeValid(twoFAuthCode, id) {
        const user = await this.usersService.findOne(id);
        return otplib_1.authenticator.verify({
            token: twoFAuthCode,
            secret: user.twoFAuthSecret,
        });
    }
    async generatetwoFAuthSecret(id) {
        const secret = otplib_1.authenticator.generateSecret();
        const user = await this.usersService.findOne(id);
        const otpauthUrl = otplib_1.authenticator.keyuri(user.userName, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
        await this.usersService.settwoFAuthSecret(secret, user.id);
        return {
            secret,
            otpauthUrl
        };
    }
    async pipeQrCodeStream(stream, otpauthUrl) {
        stream.setHeader('content-type', 'image/png');
        return await (0, qrcode_1.toFileStream)(stream, otpauthUrl);
    }
};
twoFAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService])
], twoFAuthService);
exports.twoFAuthService = twoFAuthService;
//# sourceMappingURL=twoFAuth.service.js.map