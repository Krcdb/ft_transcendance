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
var GameService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const Game_class_1 = require("./classes/Game.class");
const websocket_service_1 = require("../websocket/websocket.service");
const user_entity_1 = require("../users/user.entity");
const users_service_1 = require("../users/users.service");
const match_service_1 = require("../match/match.service");
const match_entity_1 = require("../match/match.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const GameOptions = {
    FPS: 60,
    CANVAS_WIDTH: 700,
    CANVAS_HEIGHT: 400,
    PADDLE_WIDTH: 12,
    PADDLE_HEIGHT: 60,
    PADDLE_MARGIN: 10,
    BALL_SIZE: 10,
    BONUS_SIZE: 20,
};
let GameService = GameService_1 = class GameService {
    constructor(socketService, matchService, matchRepository, usersService) {
        this.socketService = socketService;
        this.matchService = matchService;
        this.matchRepository = matchRepository;
        this.usersService = usersService;
        this.games = new Map();
        this.matchmakingQueue = [];
        this.matchmakingBonusQueue = [];
        this.matchmakingInterval = null;
        this.checkMatchmakingRef = this.checkMatchmaking.bind(this);
        this.logger = new common_1.Logger(GameService_1.name);
        if (!this.matchmakingInterval)
            this.matchmakingInterval = setInterval(this.checkMatchmakingRef, 5000);
    }
    checkMatchmaking() {
        for (const user of this.matchmakingQueue) {
            for (let i = this.matchmakingQueue.indexOf(user) + 1; i < this.matchmakingQueue.length; i++) {
                const opponent = this.matchmakingQueue[i];
                const eloDiff = Math.abs(opponent.ladderLevel - user.ladderLevel);
                if (eloDiff < 100)
                    this.matchPlayers(user, opponent, false);
            }
        }
        for (const user of this.matchmakingBonusQueue) {
            for (let i = this.matchmakingBonusQueue.indexOf(user) + 1; i < this.matchmakingBonusQueue.length; i++) {
                const opponent = this.matchmakingBonusQueue[i];
                const eloDiff = Math.abs(opponent.ladderLevel - user.ladderLevel);
                if (eloDiff < 100)
                    this.matchPlayers(user, opponent, true);
            }
        }
    }
    async findSpectateMatch(socket, userId) {
        for (const game of this.games) {
            console.log("check game");
            if (game[1].player1.id === userId || game[1].player2.id === userId) {
                socket.emit("navigateSpectateMatch", game[1].uuid);
            }
        }
    }
    async playerLeaveMatchmaking(socket) {
        await this.removeFromQueue(socket.data.user);
    }
    async playerLeaveMatch(socket, uuid) {
        var _a, _b;
        const game = this.games.get(uuid);
        console.log("uuid = ", uuid);
        if (!game) {
            console.log("game not found in playerLeaveMatch");
            return;
        }
        if (game.player1.id === ((_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id)) {
            game.player2Score = 5;
        }
        if (game.player2.id === ((_b = socket.data.user) === null || _b === void 0 ? void 0 : _b.id)) {
            game.player1Score = 5;
        }
    }
    async playerReady(socket, uuid) {
        var _a, _b, _c, _d;
        const game = await this.games.get(uuid);
        if (!game) {
            console.log(`game not found in playerReady`);
            return;
        }
        socket.emit(`startGame${uuid}`, GameOptions);
        socket.join(uuid);
        if (game.player1.id === ((_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id)) {
            game.player1Ready = true;
            await this.usersService.updateGameState((_b = socket.data.user) === null || _b === void 0 ? void 0 : _b.id, true);
        }
        if (game.player2.id === ((_c = socket.data.user) === null || _c === void 0 ? void 0 : _c.id)) {
            game.player2Ready = true;
            await this.usersService.updateGameState((_d = socket.data.user) === null || _d === void 0 ? void 0 : _d.id, true);
        }
        if (game.started)
            return;
        if (game.player1Ready && game.player2Ready)
            game.startGame(this.socketService.server);
    }
    async createGame(game, match) {
        setTimeout(() => {
            if (!game.player1Ready || !game.player2Ready) {
                this.cancelGame(game);
            }
        }, 10000);
        game.intervalRef = setInterval(async () => {
            game.gameLoop(this.socketService.server);
            if (game.started && match.state !== match_entity_1.GameState.IN_PROGRESS) {
                match.state = match_entity_1.GameState.IN_PROGRESS;
                console.log("state -> in progress");
                await this.matchRepository.update(match.matchId, { state: match.state });
            }
            if (game.player1Score !== match.scorePlayerOne || game.player2Score !== match.scorePlayerTwo) {
                await this.matchRepository.update(match.matchId, { scorePlayerOne: game.player1Score, scorePlayerTwo: game.player2Score });
            }
            if (game.player1Score >= 5 || game.player2Score >= 5) {
                game.matchDone(this.socketService.server);
                this.matchDone(game);
                return;
            }
        }, 1000 / game.options.FPS);
    }
    async cancelGame(game) {
        await this.usersService.updateGameState(game.player1.id, false);
        await this.usersService.updateGameState(game.player2.id, false);
        this.games.delete(game.uuid);
    }
    async matchDone(game) {
        console.log("match done");
        await this.usersService.updateGameState(game.player1.id, false);
        await this.usersService.updateGameState(game.player2.id, false);
        await this.matchService.updateUsersAfterGame(game.uuid);
        this.games.delete(game.uuid);
    }
    async matchUser(socket, player2Id) {
        const player1 = socket.data.user;
        const player2 = await this.usersService.findOne(Number(player2Id));
        const match = await this.matchService.create(player1.id, player2.id);
        console.log("new match | id : ", match.matchId, " | p1 : ", player1.id, " | p2 : ", player2.id);
        const game = new Game_class_1.Game(player1, player2, GameOptions, match.matchId, false);
        this.games.set(game.uuid, game);
        socket.emit("friendMatchRequest", game.uuid);
        socket = await this.socketService.getSocketFromUserIdNoPage(player2.id);
        socket.emit("friendMatchRequest", game.uuid);
        this.createGame(game, match);
    }
    async matchPlayers(player1, player2, bonus) {
        this.removeFromQueue(player1);
        this.removeFromQueue(player2);
        this.logger.log('match found');
        const match = await this.matchService.create(player1.id, player2.id);
        console.log("new match | id : ", match.matchId, " | p1 : ", player1.id, " | p2 : ", player2.id);
        const game = new Game_class_1.Game(player1, player2, GameOptions, match.matchId, bonus);
        this.games.set(game.uuid, game);
        this.gameReady(player1, game.uuid);
        this.gameReady(player2, game.uuid);
        this.createGame(game, match);
    }
    async searchGame(socket, bonus) {
        const user = await this.usersService.findOne(socket.handshake.auth.userId);
        if (!bonus) {
            if ((this.matchmakingBonusQueue.find(x => x.id == user.id) === undefined) &&
                (this.matchmakingQueue.find(x => x.id == user.id) === undefined)) {
                this.matchmakingQueue.push(user);
                this.logger.log(user.userName, "added to queue");
            }
        }
        else {
            if ((this.matchmakingBonusQueue.find(x => x.id == user.id) === undefined) &&
                (this.matchmakingQueue.find(x => x.id == user.id) === undefined)) {
                this.matchmakingBonusQueue.push(user);
                this.logger.log(user.userName, "added to bonus queue");
            }
        }
    }
    async removeFromQueue(user) {
        if (user)
            console.log(user.userName, "removed from queue");
        this.matchmakingQueue.splice(this.matchmakingQueue.indexOf(user), 1);
        this.matchmakingBonusQueue.splice(this.matchmakingBonusQueue.indexOf(user), 1);
    }
    async playerInput(payload) {
        const game = this.games.get(payload.uuid);
        if (game)
            game.playerInput(payload);
    }
    async gameReady(user, uuid) {
        const socket = await this.socketService.getSocketFromUserId(user.id, "play");
        if (socket)
            socket.emit('matchFound', uuid);
        else
            this.logger.log("can't find user");
    }
};
GameService = GameService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => websocket_service_1.WebsocketService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => match_service_1.MatchService))),
    __param(2, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [websocket_service_1.WebsocketService,
        match_service_1.MatchService,
        typeorm_2.Repository,
        users_service_1.UsersService])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map