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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFAuthController = void 0;
const common_1 = require("@nestjs/common");
const twoFAuth_service_1 = require("./twoFAuth.service");
const public_decorator_1 = require("./utils/public.decorator");
const users_service_1 = require("../users/users.service");
const TwoFAuth_code_dto_1 = require("../users/dto/TwoFAuth-code.dto");
const auth_service_1 = require("./auth.service");
let TwoFAuthController = class TwoFAuthController {
    constructor(twoFAuthService, usersService, authService) {
        this.twoFAuthService = twoFAuthService;
        this.usersService = usersService;
        this.authService = authService;
    }
    async turnOnTwoFAuth(twoFAuthData) {
        const isCodeValid = await this.twoFAuthService.istwoFAuthCodeValid(twoFAuthData.twoFAuthCode, twoFAuthData.id);
        if (!isCodeValid) {
            throw new common_1.BadRequestException("Wrong authentication code");
        }
        await this.usersService.turnOnTwoFAuth(twoFAuthData.id);
    }
    async register(response, id) {
        const { otpauthUrl } = await this.twoFAuthService.generatetwoFAuthSecret(id);
        return await this.twoFAuthService.pipeQrCodeStream(response, otpauthUrl);
    }
    async turnOffTwoFAuth(id) {
        return await this.usersService.turnOffTwoFAuth(id);
    }
    async authenticate(twoFAuthInfo) {
        const isCodeValid = await this.twoFAuthService.istwoFAuthCodeValid(twoFAuthInfo.twoFAuthCode, twoFAuthInfo.id);
        if (!isCodeValid) {
            throw new common_1.BadRequestException('Wrong authentication code');
        }
        const user = await this.usersService.findOne(twoFAuthInfo.id);
        return await this.authService.loginAuthenticate(user);
    }
};
__decorate([
    (0, common_1.Post)('turn-on'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TwoFAuth_code_dto_1.TwoFactorAuthDto]),
    __metadata("design:returntype", Promise)
], TwoFAuthController.prototype, "turnOnTwoFAuth", null);
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TwoFAuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('turn-off'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TwoFAuthController.prototype, "turnOffTwoFAuth", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('authenticate'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TwoFAuth_code_dto_1.TwoFactorAuthDto]),
    __metadata("design:returntype", Promise)
], TwoFAuthController.prototype, "authenticate", null);
TwoFAuthController = __decorate([
    (0, common_1.Controller)('2fa'),
    __metadata("design:paramtypes", [twoFAuth_service_1.twoFAuthService,
        users_service_1.UsersService,
        auth_service_1.AuthService])
], TwoFAuthController);
exports.TwoFAuthController = TwoFAuthController;
//# sourceMappingURL=twoFAuth.controller.js.map