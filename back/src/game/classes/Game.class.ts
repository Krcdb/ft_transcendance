import { Paddle } from "src/game/classes/Paddle.class"
import { Ball } from "src/game/classes/Ball.class"
import { Server, Socket } from "socket.io"
import { User } from "src/users/user.entity";
import { GameState } from "src/match/match.entity";

export interface GameOptionsInterface {
	FPS: number;
	CANVAS_WIDTH: number;
	CANVAS_HEIGHT: number;
	PADDLE_WIDTH: number;
	PADDLE_HEIGHT: number;
	PADDLE_MARGIN: number;
	BALL_SIZE: number;
	PLAYER_MOVE: number;
}

enum Keys {
    P_KEY = 80,
	L_KEY = 76,
	W_KEY = 87,
	S_KEY = 83
}

export class Game {
	player1: User;
	player2: User;
	options: GameOptionsInterface;
	uuid: string;
	intervalRef: any;
	paused: boolean = false;


	width: number;
	height: number;

	p1: Paddle;
	p2: Paddle;
	ball: Ball;

	player1Score: number;
	player2Score: number;

	started: Boolean = false;
  	state: GameState = GameState.WAITING_ALL;
  	player1Ready: Boolean = false;
	player2Ready: Boolean = false;

	keysPressed: boolean[] = [];

	constructor(player1: User, player2: User,options: GameOptionsInterface, uuid: string) {
		this.player1 = player1;
		this.player2 = player2;
		this.options = options;
		this.uuid = uuid;

		this.width = this.options.CANVAS_WIDTH;
		this.height = this.options.CANVAS_HEIGHT;

		this.p1 = new Paddle(this.options.PADDLE_WIDTH, this.options.PADDLE_HEIGHT);
		this.p2 = new Paddle(this.options.PADDLE_WIDTH, this.options.PADDLE_HEIGHT);
		this.ball = new Ball(this.options.BALL_SIZE);
	
		this.reset();
	}

	playerNewKeyEvent(payload: any){
		this.keysPressed = payload.key;
	}

	gameLoop(server: Server) {
		if (!this.started)
			return ;
		if (this.state === GameState.IN_PROGRESS)
			this.update();
	
		server.to(this.uuid).emit('updateGame', {
			state: this.state,
			ball: {
				x: this.ball.x,
				y: this.ball.y,
			},
		  	player1: {
				x: this.p1.x,
				y: this.p1.y,
				score: this.player1Score,
		  	},
		 	player2: {
				x: this.p2.x,
				y: this.p2.y,
				score: this.player2Score,
		  	}
		});
	}

	setBallDirection() {
		var randomDirection = Math.floor(Math.random() * 2) + 1; 
        if(randomDirection % 2){
            this.ball.xVel = 1;
        }else{
            this.ball.xVel = -1;
		}
		randomDirection = Math.floor(Math.random() * 2) + 1;
		if(randomDirection % 2){
            this.ball.yVel = 1;
        }else{
            this.ball.yVel = -1;
		}
	}

	checkPlayerMove() {
		//check P1 Moves
		if (this.keysPressed[Keys.W_KEY]) {
			this.p1.yVel = -1;
			if (this.p1.y <= this.options.PADDLE_MARGIN)
				this.p1.yVel = 0;
		}
		else if (this.keysPressed[Keys.S_KEY]) {
			this.p1.yVel = 1;
			if (this.p1.y + this.p1.height >= this.options.CANVAS_HEIGHT - this.options.PADDLE_MARGIN)
				this.p1.yVel = 0;
		}
		else {
			this.p1.yVel = 0;
		}
		this.p1.y += this.p1.yVel * this.p1.speed;
		//check P2 Moves
		if (this.keysPressed[Keys.P_KEY]) {
			this.p2.yVel = -1;
			if (this.p2.y <= this.options.PADDLE_MARGIN)
				this.p2.yVel = 0;
		}
		else if (this.keysPressed[Keys.L_KEY]) {
			this.p2.yVel = 1;
			if (this.p2.y + this.p2.height >= this.options.CANVAS_HEIGHT - this.options.PADDLE_MARGIN)
				this.p2.yVel = 0;
		}
		else {
			this.p2.yVel = 0;
		}
		this.p2.y += this.p2.yVel * this.p2.speed;
	}
	
	reset() {
		this.paused = true;

    	setTimeout(() => {
      	this.paused = false;
		}, 2000);
		
		this.p1.setXY(
			this.options.PADDLE_MARGIN,
			this.height / 2 - this.options.PADDLE_HEIGHT / 2,
		);
		this.p2.setXY(
			this.width - this.options.PADDLE_WIDTH - this.options.PADDLE_MARGIN,
			this.height / 2 - this.options.PADDLE_HEIGHT / 2,
		);
		this.ball.setXY(
			this.width / 2 - this.ball.size / 2,
			this.height / 2 - this.ball.size / 2,
		);
		this.setBallDirection();
	}

	checkBallCollision() {
		//Wall collision
		if (this.ball.y <= this.options.PADDLE_MARGIN || this.ball.y + this.ball.size >= this.options.CANVAS_HEIGHT - this.options.PADDLE_MARGIN)
			this.ball.yVel = -this.ball.yVel;
		if (this.ball.x <= 0) {
			this.player2Score++;
			this.reset();
		}
		if (this.ball.x + this.ball.size >= this.options.CANVAS_WIDTH) {
			this.player1Score++;
			this.reset();
		}
		//Paddle collision
		if (this.ball.x <= this.p1.x + this.p1.width) {
			if (this.ball.y >= this.p1.height && this.ball.y + this.ball.size <= this.p1.y + this.p1.height)
			this.ball.xVel = -this.ball.xVel;
		}
		if (this.ball.x + this.ball.size <= this.p1.x) {
			if (this.ball.y >= this.p2.height && this.ball.y + this.ball.size <= this.p2.y + this.p2.height)
			this.ball.xVel = -this.ball.xVel;
		}
	}

	update() {
		this.checkPlayerMove();
		this.checkBallCollision();

		if (this.paused)
			return ;

		this.ball.x = this.ball.xVel * this.ball.speed;
		this.ball.y = this.ball.yVel * this.ball.speed;
	}

	matchDone(server: Server) {
		this.state = GameState.FINISHED;
		clearInterval(this.intervalRef);
		server.to(this.uuid).emit('updateGame', {
			state: this.state,
			ball: {
				x: this.ball.x,
				y: this.ball.y,
			},
		  	player1: {
				x: this.p1.x,
				y: this.p1.y,
				score: this.player1Score,
		  	},
		 	player2: {
				x: this.p2.x,
				y: this.p2.y,
				score: this.player2Score,
		  	}
		});
	}
}