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
exports.FortyTwoStrategy = void 0;
const passport_42_1 = require("passport-42");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/users.service");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const user_entity_1 = require("../../users/user.entity");
let FortyTwoStrategy = class FortyTwoStrategy extends (0, passport_1.PassportStrategy)(passport_42_1.Strategy, 'passport-42') {
    constructor(usersService, configService, httpService) {
        super({
            clientID: configService.get('FORTYTWO_APP_ID'),
            clientSecret: configService.get('FORTYTWO_APP_SECRET'),
            callbackURL: "http://localhost:8080/auth/42"
        });
        this.usersService = usersService;
        this.configService = configService;
        this.httpService = httpService;
    }
    async validate(accessToken) {
        const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService.get(' https://api.intra.42.fr/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        }));
        return await this.usersService.findOrCreate(data.id, data.login);
    }
};
FortyTwoStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService,
        axios_1.HttpService])
], FortyTwoStrategy);
exports.FortyTwoStrategy = FortyTwoStrategy;
//# sourceMappingURL=FortyTwo.strategy.js.map