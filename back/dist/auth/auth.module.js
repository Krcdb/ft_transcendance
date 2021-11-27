"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./Strategy/jwt.strategy");
const users_module_1 = require("../users/users.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./utils/constants");
const FortyTwo_strategy_1 = require("./Strategy/FortyTwo.strategy");
const auth_controller_1 = require("./auth.controller");
const axios_1 = require("@nestjs/axios");
const jwt_auth_guard_1 = require("./Guard/jwt-auth.guard");
const core_1 = require("@nestjs/core");
const twoFAuth_controller_1 = require("./twoFAuth.controller");
const twoFAuth_service_1 = require("./twoFAuth.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '5h' },
            })
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            FortyTwo_strategy_1.FortyTwoStrategy,
            twoFAuth_service_1.twoFAuthService,
        ],
        controllers: [auth_controller_1.AuthController, twoFAuth_controller_1.TwoFAuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map