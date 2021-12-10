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
exports.WebsocketService = void 0;
const common_1 = require("@nestjs/common");
const channel_entity_1 = require("../chat/channel/channel.entity");
const users_service_1 = require("../users/users.service");
const game_service_1 = require("../game/game.service");
let WebsocketService = class WebsocketService {
    constructor(gameService, usersService) {
        this.gameService = gameService;
        this.usersService = usersService;
    }
    async deleteOldSocket(userId, page) {
        var _a;
        console.log(`socket disconnect all non ${page}`);
        const allSockets = this.server.of('/').sockets;
        for (const s of allSockets) {
            const socket = s[1];
            if (((_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id) == userId) {
                console.log(`socket found for ${userId} : ${socket.data.page}`);
                if (socket.data.page != page) {
                    console.log(`socket disconnect for ${socket.data.page} : ${userId}`);
                    socket.disconnect();
                }
            }
        }
        return null;
    }
    async handleConnectionStatus(socket) {
        var _a;
        await this.usersService.updateLogState((_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id, true);
        await this.usersService.updateGameState(socket.data.user, false);
        console.log("connect status");
    }
    async handleDisconnectionStatus(socket) {
        var _a;
        await this.usersService.updateLogState((_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id, false);
        await this.usersService.updateGameState(socket.data.user, false);
        console.log("discconnect status");
    }
    async getSocketFromUserId(userId, page) {
        var _a;
        const allSockets = this.server.of('/').sockets;
        for (const s of allSockets) {
            const socket = s[1];
            if (((_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id) == userId) {
                if (socket.data.page == page)
                    return socket;
            }
        }
        return null;
    }
    async getSocketFromUserIdNoPage(userId) {
        var _a;
        const allSockets = this.server.of('/').sockets;
        for (const s of allSockets) {
            const socket = s[1];
            if (((_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id) == userId) {
                return socket;
            }
        }
        return null;
    }
    async printAllSocketsFromPage(userId, page) {
        var _a;
        const allSockets = this.server.of('/').sockets;
        for (const s of allSockets) {
            const socket = s[1];
            if (((_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id) == userId) {
                if (socket.data.page == page)
                    console.log(`socket found for ${page} : ${userId}`);
            }
        }
        return null;
    }
    async getSocketsFromChannel(channel) {
        var _a;
        const allSockets = await this.server.of('/').sockets;
        let filteredSockets = Array();
        for (const s of allSockets) {
            const socket = s[1];
            if (channel.users.find((_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id))
                filteredSockets.push(socket);
        }
        return (filteredSockets);
    }
};
WebsocketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => game_service_1.GameService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [game_service_1.GameService,
        users_service_1.UsersService])
], WebsocketService);
exports.WebsocketService = WebsocketService;
//# sourceMappingURL=websocket.service.js.map