import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets"
import { GameService } from "src/game/game.service";
import { Server, Socket } from "socket.io";
import { WebsocketService } from "./websocket.service";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";


@WebSocketGateway( { cors: true } )
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
	@WebSocketServer()
	server : Server;

	constructor(
    	private readonly websocketService: WebsocketService,
		private readonly gameService: GameService,
		private readonly usersSerive: UsersService,
	) {}

	afterInit(server: Server) {
		this.websocketService.server = server;
	}

	async handleConnection(socket: Socket) {
		const user = await this.usersSerive.findOne(socket.handshake.auth.userId);
		if (!user) {
			this.handleDisconnect(socket);
		}
		else
			socket.data.user = user;
			socket.data.page = socket.handshake.auth.page;
	};
	
	handleDisconnect(socket: Socket) {
		this.gameService.removeFromQueue(socket.data.user);
		socket.disconnect();
		console.log(`${socket.data.user} disconnected`);
	}

	@SubscribeMessage('searchGame')
	async searchGame(socket: Socket) {
		return this.gameService.searchGame(socket);
	}
	
	@SubscribeMessage('playerJoin')
	async playerJoin(socket: Socket) {
		return this.gameService.playerJoin(socket);
	}

	@SubscribeMessage('playerNewKeyEvent')
	async playerNewKeyEvent(socket: Socket, payload: any) {
		return this.gameService.playerNewKeyEvent(payload);
	}
	
	@SubscribeMessage('playerReady')
	async playerReady(socket: Socket, payload: any) {
		return this.gameService.playerReady(socket, payload);
	}
}