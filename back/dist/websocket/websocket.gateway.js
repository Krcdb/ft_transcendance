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
exports.WebsocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const game_service_1 = require("../game/game.service");
const socket_io_1 = require("socket.io");
const websocket_service_1 = require("./websocket.service");
const user_entity_1 = require("../users/user.entity");
const users_service_1 = require("../users/users.service");
const channel_service_1 = require("../chat/channel/channel.service");
let WebsocketGateway = class WebsocketGateway {
    constructor(websocketService, gameService, usersService, channelService) {
        this.websocketService = websocketService;
        this.gameService = gameService;
        this.usersService = usersService;
        this.channelService = channelService;
    }
    afterInit(server) {
        this.websocketService.server = server;
    }
    async handleConnection(socket) {
        const user = await this.usersService.findOne(socket.handshake.auth.userId);
        if (!user) {
            console.log("probleme handle connect");
            this.handleDisconnect(socket);
        }
        else {
            socket.data.user = user;
            socket.data.page = socket.handshake.auth.page;
        }
    }
    ;
    handleDisconnect(socket) {
        this.gameService.removeFromQueue(socket.data.user);
        socket.disconnect();
        console.log(`${socket.data.user.userName} disconnected`);
    }
    async searchGame(socket, payload) {
        return this.gameService.searchGame(socket, payload);
    }
    async playerInput(socket, payload) {
        return this.gameService.playerInput(payload);
    }
    async playerReady(socket, payload) {
        return this.gameService.playerReady(socket, payload);
    }
    async playerLeaveMatch(socket, payload) {
        return this.gameService.playerLeaveMatch(socket, payload);
    }
    async playerLeaveMatchmaking(socket) {
        return this.gameService.playerLeaveMatchmaking(socket);
    }
    async matchUser(socket, payload) {
        return this.gameService.matchUser(socket, payload);
    }
    async findSpectateMatch(socket, payload) {
        return this.gameService.findSpectateMatch(socket, payload);
    }
    async userJoinChannel(socket, channelName) {
        console.log("SOCKET : CHANNEL : User Join Channel");
        this.channelService.addSocketUser(socket, channelName);
        return this.channelService.refreshChannelMessages(this.server, socket, channelName);
    }
    async userSendMessage(socket, channelName) {
        console.log("SOCKET : CHANNEL : refreshChannelMessages");
        return this.channelService.refreshChannelMessages(this.server, socket, channelName);
    }
    async refreshChannelMessages(socket, channelName) {
        return this.channelService.refreshChannelMessages(this.server, socket, channelName);
    }
    async updateChannel(socket, channelName) {
        console.log("SOCKET : CHANNEL : refreshChannelInfos");
        return this.channelService.refreshChannelInfos(this.server, socket, channelName);
    }
    async refreshChannelInfos(socket, channelName) {
        return this.channelService.refreshChannelInfos(this.server, socket, channelName);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('searchGame'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "searchGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('playerInput'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "playerInput", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('playerReady'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "playerReady", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('playerLeaveMatch'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "playerLeaveMatch", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('playerLeaveMatchmaking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "playerLeaveMatchmaking", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('matchUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "matchUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findSpectateMatch'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "findSpectateMatch", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('JoinChannel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "userJoinChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "userSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('refreshChannelMessages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "refreshChannelMessages", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateChannel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "updateChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('refreshChannelInfos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "refreshChannelInfos", null);
WebsocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [websocket_service_1.WebsocketService,
        game_service_1.GameService,
        users_service_1.UsersService,
        channel_service_1.ChannelService])
], WebsocketGateway);
exports.WebsocketGateway = WebsocketGateway;
//# sourceMappingURL=websocket.gateway.js.map