import { forwardRef, Injectable, Inject } from "@nestjs/common";
import { GameOptionsInterface, Game } from "src/game/classes/Game.class"
import { WebsocketService } from "src/websocket/websocket.service"
import { User } from "src/users/user.entity";

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
	constructor(
		@Inject(forwardRef(() => WebsocketService))
		private readonly socketService: WebsocketService) {
		if (!this.matchmakingInterval)
			this.matchmakingInterval = setInterval(this.checkMatchmakingRef, 5000);
	}

	checkMatchmaking() {
		for (const user of this.matchmakingQueue) {
			for (let i = this.matchmakingQueue.indexOf(user) + 1; i < this.matchmakingQueue.length; i++) {
				const opponent = this.matchmakingQueue[i];
				const eloDiff = Math.abs(opponent.elo - user.elo);
				if (eloDiff < 100)
					this.matchPlayers(user, opponent);
			}
		}
	}

	matchPlayers(player1: User, player2: User) {
		this.matchmakingQueue.splice(this.matchmakingQueue.indexOf(player1), 1);
		this.matchmakingQueue.splice(this.matchmakingQueue.indexOf(player2), 1);
		this.socketService.server.emit('matchFound');
	}

	searchGame(user: User) {
		this.matchmakingQueue.push(user);
	}

	createGame() {
		const game = new Game(GameOptions, "1");

		this.games.set(game.uuid, game);
	}

	playerNewKeyEvent(payload: any) {
		const game = this.games.get(payload.uuid);

		if (game) {
			game.playerNewKeyEvent(payload.key)
		}
	}
}