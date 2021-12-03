import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { GameService } from "src/game/game.service";
import { Server, Socket } from "socket.io";
import { WebsocketService } from "./websocket.service";
import { UsersService } from "src/users/users.service";
import { ChannelService } from "src/chat/channel/channel.service";
export declare class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly websocketService;
    private readonly gameService;
    private readonly usersService;
    private readonly channelService;
    server: Server;
    constructor(websocketService: WebsocketService, gameService: GameService, usersService: UsersService, channelService: ChannelService);
    afterInit(server: Server): void;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): void;
    searchGame(socket: Socket, payload: any): Promise<void>;
    playerInput(socket: Socket, payload: any): Promise<void>;
    playerReady(socket: Socket, payload: any): Promise<void>;
    playerLeaveMatch(socket: Socket, payload: any): Promise<void>;
    playerLeaveMatchmaking(socket: Socket): Promise<void>;
    matchUser(socket: Socket, payload: any): Promise<void>;
    userJoinChannel(socket: Socket, channelName: string): Promise<any>;
    userSendMessage(socket: Socket, channelName: string): Promise<any>;
    refreshChannelMessages(socket: Socket, channelName: string): Promise<any>;
    updateChannel(socket: Socket, channelName: string): Promise<any>;
    refreshChannelInfos(socket: Socket, channelName: string): Promise<any>;
}
