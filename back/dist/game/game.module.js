"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModule = void 0;
const common_1 = require("@nestjs/common");
const game_service_1 = require("./game.service");
const game_controller_1 = require("./game.controller");
const websocket_module_1 = require("../websocket/websocket.module");
const users_module_1 = require("../users/users.module");
const match_module_1 = require("../match/match.module");
const typeorm_1 = require("@nestjs/typeorm");
const match_entity_1 = require("../match/match.entity");
let GameModule = class GameModule {
};
GameModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([match_entity_1.Match]),
            (0, common_1.forwardRef)(() => websocket_module_1.WebsocketModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => match_module_1.MatchModule),
        ],
        controllers: [game_controller_1.GameController],
        providers: [game_service_1.GameService],
        exports: [game_service_1.GameService],
    })
], GameModule);
exports.GameModule = GameModule;
//# sourceMappingURL=game.module.js.map