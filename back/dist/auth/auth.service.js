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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const user_entity_1 = require("../users/user.entity");
let AuthService = class AuthService {
    constructor(jwtService, usersService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async login(user) {
        if (user.isTwoFAuthEnabled) {
            return {
                id: user.id,
            };
        }
        const payload = { name: user.userName, sub: user.id };
        await this.usersService.updateLogState(user.id, true);
        return {
            access_token: this.jwtService.sign(payload),
            userName: user.userName,
            id: user.id
        };
    }
    async loginAuthenticate(user) {
        await this.usersService.updateLogState(user.id, true);
        const payload = { name: user.userName, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            userName: user.userName,
            id: user.id
        };
    }
    async loginInvite(id) {
        const user = await this.usersService.findOne(id);
        this.usersService.updateLogState(id, true);
        const payload = { name: user.userName, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            userName: user.userName,
            id: user.id
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map