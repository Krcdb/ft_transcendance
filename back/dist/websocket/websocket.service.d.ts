import { Server, Socket } from "socket.io";
import { Channel } from 'src/chat/channel/channel.entity';
import { UsersService } from "src/users/users.service";
import { GameService } from "src/game/game.service";
export declare class WebsocketService {
    private readonly gameService;
    private readonly usersService;
    server: Server;
    constructor(gameService: GameService, usersService: UsersService);
    deleteOldSocket(userId: number, page: string): Promise<any>;
    handleConnectionStatus(socket: Socket): Promise<void>;
    handleDisconnectionStatus(socket: Socket): Promise<void>;
    getSocketFromUserId(userId: number, page: string): Promise<Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap>>;
    getSocketFromUserIdNoPage(userId: number): Promise<Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap>>;
    printAllSocketsFromPage(userId: number, page: string): Promise<any>;
    getSocketsFromChannel(channel: Channel): Promise<Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap>[]>;
}
