import { Paddle } from './Paddle';

enum Keys {
    UP_KEY = 38,
	DOWN_KEY = 40,
	W_KEY = 87,
	S_KEY = 83
}

export class Game {
	private canvas: any;
	private context: any;
	private player1: Paddle;
	private player2: Paddle;
	public static keysPressed: boolean[] = [];
	public static player1Score: number = 0;
	public static player2Score: number = 0;


	constructor(){
		this.canvas = document.getElementById("game-canvas");
		this.context = this.canvas.getContext("2d");
		
		window.addEventListener("keydown",function(e){
			Game.keysPressed[e.which] = true;
		});
		 
		window.addEventListener("keyup",function(e){
			Game.keysPressed[e.which] = false;
		});

		var paddleWidth:number = 20, paddleHeight:number = 60, ballSize:number = 10, wallOffset:number = 20;
		
		this.player1 = new Paddle(10, this.canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, Keys.W_KEY, Keys.S_KEY)
		this.player2 = new Paddle(this.canvas.width / 2 - (10 + paddleWidth), this.canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, Keys.UP_KEY, Keys.DOWN_KEY)
	}

	update() {
		
	}

	draw() {
		
	}

	gameLoop(){
        this.update();
        this.draw();
        requestAnimationFrame(this.gameLoop);
    }
}