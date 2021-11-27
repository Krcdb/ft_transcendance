"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketModule = void 0;
const common_1 = require("@nestjs/common");
const websocket_gateway_1 = require("./websocket.gateway");
const websocket_service_1 = require("./websocket.service");
const users_module_1 = require("../users/users.module");
const game_module_1 = require("../game/game.module");
const auth_module_1 = require("../auth/auth.module");
const channel_module_1 = require("../chat/channel/channel.module");
let WebsocketModule = class WebsocketModule {
};
WebsocketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => channel_module_1.ChannelModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => game_module_1.GameModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        providers: [websocket_gateway_1.WebsocketGateway, websocket_service_1.WebsocketService],
        exports: [websocket_service_1.WebsocketService],
    })
], WebsocketModule);
exports.WebsocketModule = WebsocketModule;
//# sourceMappingURL=websocket.module.js.map