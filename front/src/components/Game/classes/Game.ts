/* eslint-disable */
import { Paddle } from './Paddle';
import { Ball } from './Ball';

enum Keys {
    P_KEY = 80,
	L_KEY = 76,
	W_KEY = 87,
	S_KEY = 83
}

export class Game {
	private canvas: any;
	private context: any;
	private player1: Paddle;
	private player2: Paddle;
	private ball: Ball;
	public static keysPressed: boolean[] = [];
	public player1Score: number;
	public player2Score: number;


	constructor(){
		this.canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
		this.context = this.canvas.getContext("2d");
        this.context.font = "30px Arial";
		
		window.addEventListener("keydown",function(e){
			Game.keysPressed[e.which] = true;
		});
		 
		window.addEventListener("keyup",function(e){
			Game.keysPressed[e.which] = false;
		});
		
		this.player1Score = 0;
		this.player2Score = 0;

		var paddleWidth:number = 20,
			paddleHeight:number = 60,
			ballSize:number = 10,
			wallOffset:number = 20;
		
		this.player1 = new Paddle(10, this.canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, Keys.W_KEY, Keys.S_KEY)
		this.player2 = new Paddle(this.canvas.width - (10 + paddleWidth), this.canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, Keys.P_KEY, Keys.L_KEY)
        this.ball = new Ball(this.canvas.width / 2 - ballSize / 2, this.canvas.height / 2 - ballSize / 2, ballSize);    
	}

	update() {
		this.player1.update(this.canvas);
		this.player2.update(this.canvas);
		//this.ball.update(this.player1, this.player2,this.canvas, this)
	}

	draw() {
		this.context.fillStyle = "#000";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.player1.draw(this.context);
		this.player2.draw(this.context);
		this.ball.draw(this.context);
		this.context.fillText(this.player1Score, 280, 50);
        this.context.fillText(this.player2Score, 390, 50);
	}

	gameLoop(){
        this.update();
		this.draw();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}