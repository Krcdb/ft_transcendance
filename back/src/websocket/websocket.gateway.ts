import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayInit } from "@nestjs/websockets"
import { GameService } from "src/game/game.service";
import { Server } from "socket.io";
import { WebsocketService } from "./websocket.service";
import { User } from "src/users/user.entity";


@WebSocketGateway()
export class WebsocketGateway {
	@WebSocketServer()
	server : Server;

	constructor(
    	private readonly websocketService: WebsocketService,
		private readonly gameService: GameService
	) {}

	afterInit(server: Server) {
		this.websocketService.server = server;
	}

	@SubscribeMessage('searchGame')
	async searchGame(user: User) {
		return this.gameService.searchGame(user);
	}

	@SubscribeMessage('createGame')
	async createGame() {
		return this.gameService.createGame();
	}

	@SubscribeMessage('playerNewKeyEvent')
	async playerNewKeyEvent(payload: any) {
		return this.gameService.playerNewKeyEvent(payload);
	}
}