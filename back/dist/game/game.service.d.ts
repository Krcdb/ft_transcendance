/// <reference types="node" />
import { Logger } from "@nestjs/common";
import { Game } from "src/game/classes/Game.class";
import { WebsocketService } from "src/websocket/websocket.service";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { Socket } from "socket.io";
import { MatchService } from "src/match/match.service";
import { Match } from "src/match/match.entity";
import { Repository } from "typeorm";
export declare class GameService {
    private readonly socketService;
    private readonly matchService;
    private readonly matchRepository;
    private readonly usersService;
    games: Map<string, Game>;
    matchmakingQueue: User[];
    matchmakingInterval: NodeJS.Timer;
    checkMatchmakingRef: any;
    logger: Logger;
    constructor(socketService: WebsocketService, matchService: MatchService, matchRepository: Repository<Match>, usersService: UsersService);
    checkMatchmaking(): void;
    playerLeaveMatchmaking(socket: Socket): Promise<void>;
    playerLeaveMatch(socket: Socket, uuid: string): Promise<void>;
    playerReady(socket: Socket, uuid: string): Promise<void>;
    createGame(game: Game, match: Match): Promise<void>;
    cancelGame(game: Game): void;
    matchDone(game: Game): void;
    matchUser(socket: Socket, player2Id: string): Promise<void>;
    matchPlayers(player1: User, player2: User): Promise<void>;
    searchGame(socket: Socket): Promise<void>;
    removeFromQueue(user: User): void;
    playerInput(payload: any): Promise<void>;
    gameReady(user: User, uuid: string): Promise<void>;
}
