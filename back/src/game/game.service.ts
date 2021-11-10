import { forwardRef, Injectable, Inject, Logger, ConsoleLogger } from "@nestjs/common";
import { GameOptionsInterface, Game } from "src/game/classes/Game.class"
import { WebsocketService } from "src/websocket/websocket.service"
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { Socket } from "socket.io";

const GameOptions: GameOptionsInterface = {
	FPS: 60,
	CANVAS_WIDTH: 700,
	CANVAS_HEIGHT: 400,
	PADDLE_WIDTH: 20,
	PADDLE_HEIGHT: 60,
	PADDLE_MARGIN: 10,
	BALL_SIZE: 10,
	PLAYER_MOVE: 12,
};

@Injectable()
export class GameService {
	
	games = new Map<string, Game>();
	matchmakingQueue: User[] = [];

	matchmakingInterval: NodeJS.Timer = null;
	checkMatchmakingRef = this.checkMatchmaking.bind(this);
	logger = new Logger(GameService.name);
	constructor(
		@Inject(forwardRef(() => WebsocketService))
		private readonly socketService: WebsocketService,
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService) {
		if (!this.matchmakingInterval)
			this.matchmakingInterval = setInterval(this.checkMatchmakingRef, 5000);
	}

	checkMatchmaking() {
		for (const user of this.matchmakingQueue) {
			this.logger.log('user in queue', user.userName);
			for (let i = this.matchmakingQueue.indexOf(user) + 1; i < this.matchmakingQueue.length; i++) {
				const opponent = this.matchmakingQueue[i];
				const eloDiff = Math.abs(opponent.ladderLevel - user.ladderLevel);
				if (eloDiff < 100)
					this.matchPlayers(user, opponent);
			}
		}
	}

	createGame() {
		// createGame(player1: User, player2: User) {
		const game = new Game(GameOptions, "1");

		this.games.set(game.uuid, game);
	}

	matchPlayers(player1: User, player2: User) {
		this.matchmakingQueue.splice(this.matchmakingQueue.indexOf(player1), 1);
		this.matchmakingQueue.splice(this.matchmakingQueue.indexOf(player2), 1);
		this.logger.log('match found');
		this.createGame();
		// this.createGame(player1, player2);
		const uuid = "123456";
		this.gameReady(player1, uuid);
		this.gameReady(player2, uuid);
		//this.socketService.server.emit('matchFound');
	}

	async searchGame(socket: Socket) {
		const user = await this.usersService.findOne(socket.handshake.auth.userId);
		if (this.matchmakingQueue.find(x => x.id == user.id) === undefined) {
			this.matchmakingQueue.push(user);
			this.logger.log(user.userName, "added to queue");
		}
	}

	playerNewKeyEvent(payload: any) {
		const game = this.games.get(payload.uuid);

		if (game) {
			game.playerNewKeyEvent(payload.key)
		}
	}

	async gameReady(user: User, uuid: string) {
		const socket = await this.socketService.getSocketFromUserId(user.id);
		if (socket)
			socket.emit('matchFound', uuid);
		else
			this.logger.log("can't find user");
	}
}