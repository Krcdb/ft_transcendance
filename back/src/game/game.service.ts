import { forwardRef, Injectable, Inject, Logger, ConsoleLogger } from "@nestjs/common";
import { GameOptionsInterface, Game } from "src/game/classes/Game.class"
import { WebsocketService } from "src/websocket/websocket.service"
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { Socket } from "socket.io";
import { MatchService } from "src/match/match.service";
import { GameState, Match } from "src/match/match.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

const GameOptions: GameOptionsInterface = {
	FPS: 60,
	CANVAS_WIDTH: 700,
	CANVAS_HEIGHT: 400,
	PADDLE_WIDTH: 20,
	PADDLE_HEIGHT: 60,
	PADDLE_MARGIN: 10,
	BALL_SIZE: 10,
	PLAYER_MOVE: 3,
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
		@Inject(forwardRef(() => MatchService))
		private readonly matchService: MatchService,
		@InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService){
		if (!this.matchmakingInterval)
			this.matchmakingInterval = setInterval(this.checkMatchmakingRef, 5000);
	}

	checkMatchmaking() {
		for (const user of this.matchmakingQueue) {
			for (let i = this.matchmakingQueue.indexOf(user) + 1; i < this.matchmakingQueue.length; i++) {
				const opponent = this.matchmakingQueue[i];
				const eloDiff = Math.abs(opponent.ladderLevel - user.ladderLevel);
				if (eloDiff < 100)
					this.matchPlayers(user, opponent);
			}
		}
	}

	async playerJoin(socket: Socket) {
		this.socketService.printAllSocketsFromPage(socket.handshake.auth.userId, "play");
	}

	async playerReady(socket: Socket, uuid: string) {
		const game = this.games.get(uuid);
		if (!game) {
			console.log(`game not found in playerReady`);
			return ;
		}
		socket.emit(`startGame${uuid}`, GameOptions);
		socket.join(uuid);
		if (game.player1.id === socket.data.user?.id) {
			game.player1Ready = true;
		}
		if (game.player2.id === socket.data.user?.id) {
			game.player2Ready = true;
		}
		if (game.started)
			return ;
		if (game.player1Ready && game.player2Ready)
			game.startGame(this.socketService.server);
	}

	async createGame(player1: User, player2: User) {
		const match = await this.matchService.create(player1.id, player2.id);
		console.log("new match | id : ", match.matchId, " | p1 : ", player1.id, " | p2 : ", player2.id);
		
		const game = new Game(player1, player2, GameOptions, match.matchId);
		this.games.set(game.uuid, game);

		this.gameReady(player1, game.uuid);
		this.gameReady(player2, game.uuid);

		setTimeout(() => {
			if (!game.player1Ready || !game.player2Ready) {
				this.cancelGame(game);
			}
		}, 30000);

		game.intervalRef = setInterval(async () => {
			game.gameLoop(this.socketService.server);
			if (game.started && match.state !== GameState.IN_PROGRESS) {
				match.state = GameState.IN_PROGRESS;
				console.log("state -> in progress");
			  	await this.matchRepository.update(match.matchId, { state: match.state });
			}
			if (game.player1Score !== match.scorePlayerOne || game.player2Score !== match.scorePlayerTwo) {
				await this.matchRepository.update(match.matchId, { scorePlayerOne : game.player1Score, scorePlayerTwo : game.player2Score })
			}
			if (game.player1Score >= 5 || game.player2Score >= 5) {
			  	game.matchDone(this.socketService.server);
			  	this.matchDone(game);
			  	return;
			}
		  }, 1000 / game.options.FPS);
	}

	cancelGame(game: Game) {

	}

	matchDone(game: Game) {

	}

	matchPlayers(player1: User, player2: User) {
		this.removeFromQueue(player1);
		this.removeFromQueue(player2);
		this.logger.log('match found');
		this.createGame(player1, player2);
	}

	async searchGame(socket: Socket) {
		const user = await this.usersService.findOne(socket.handshake.auth.userId);
		if (this.matchmakingQueue.find(x => x.id == user.id) === undefined) {
			this.matchmakingQueue.push(user);
			this.logger.log(user.userName, "added to queue"); 
		}
	}

	removeFromQueue(user: User) {
		this.matchmakingQueue.splice(this.matchmakingQueue.indexOf(user), 1);
	}

	async playerInput(payload: any) {
		const game = this.games.get(payload.uuid);
		if (game)
			game.playerInput(payload);
		else
			console.log(`input game not found : ${payload.uuid}`);
	}

	async gameReady(user: User, uuid: string) {
		const socket = await this.socketService.getSocketFromUserId(user.id, "play");
		if (socket)
			socket.emit('matchFound', uuid);
		else
			this.logger.log("can't find user");
	}
}