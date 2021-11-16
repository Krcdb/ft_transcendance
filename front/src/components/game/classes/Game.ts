/* eslint-disable */
import { Paddle } from './Paddle';
import { Ball } from './Ball';
import { GameOptionsInterface, GameDataUpdate } from '@/types/Game';
import io, { Socket } from "socket.io-client";

enum Keys {
    P_KEY = 80,
	L_KEY = 76,
	W_KEY = 87,
	S_KEY = 83
}

export class Game {
	gameOptions: GameOptionsInterface;
	uuid: string;
	playerSide: string;
	playerId: string;
	canvas: any;
	context: any;
	socket: Socket;
	public keyPressed: number[] = [];
	
	player1: Paddle;
	player2: Paddle;
	ball: Ball;
	
	player1Score: number;
	player2Score: number;


	constructor(socket: Socket, gameOptions: GameOptionsInterface, uuid: string, playerSide: string, playerId: string){
		this.socket = socket;
		this.gameOptions = gameOptions;
		this.uuid = uuid;
		this.playerSide = playerSide;
		this.playerId = playerId;
		this.canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
		this.context = this.canvas.getContext("2d");
        this.context.font = "30px Arial";
		
		this.canvas.style.width = String(this.gameOptions.CANVAS_WIDTH) + 'px';
		this.canvas.style.height = String(this.gameOptions.CANVAS_HEIGHT) + 'px';

		window.addEventListener("keydown",function(e){
			Game.keysPressed[e.which] = true;
		});
		 
		window.addEventListener("keyup",function(e){
			Game.keysPressed[e.which] = false;
		});
		
		this.player1Score = 0;
		this.player2Score = 0;
		
		this.player1 = new Paddle(10, this.gameOptions.CANVAS_HEIGHT! / 2 - this.gameOptions.PADDLE_HEIGHT! / 2, this.gameOptions.PADDLE_WIDTH!, this.gameOptions.PADDLE_HEIGHT!);
		this.player2 = new Paddle(this.gameOptions.CANVAS_WIDTH! - (10 + this.gameOptions.PADDLE_WIDTH!), this.gameOptions.CANVAS_HEIGHT! / 2 - this.gameOptions.PADDLE_HEIGHT! / 2, this.gameOptions.PADDLE_WIDTH!, this.gameOptions.PADDLE_HEIGHT!);
        this.ball = new Ball(this.gameOptions.CANVAS_WIDTH! / 2 - this.gameOptions.BALL_SIZE! / 2, this.gameOptions.CANVAS_HEIGHT! / 2 - this.gameOptions.BALL_SIZE! / 2, this.gameOptions.BALL_SIZE!);    
	}

	updateGame(data: GameDataUpdate) {
		this.player1Score = Number(data.player1?.score);
		this.player2Score = Number(data.player2?.score);
		this.player1.setXY(data.player1?.x, data.player1?.y);
		this.player2.setXY(data.player2?.x, data.player2?.y);
		this.ball.setXY(data.ball?.x, data.ball?.y);
	}

	draw() {
		this.context.fillStyle = "#000";
		this.context.fillRect(0, 0, this.gameOptions.CANVAS_WIDTH, this.gameOptions.CANVAS_HEIGHT);
		this.player1.draw(this.context);
		this.player2.draw(this.context);
		this.ball.draw(this.context);
		this.context.fillText(this.player1Score, 280, 50);
        this.context.fillText(this.player2Score, 390, 50);
	}
}