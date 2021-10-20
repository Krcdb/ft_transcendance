/* eslint-disable */
/* enum Keys {
    UP_KEY = 38,
	DOWN_KEY = 40,
	W_KEY = 87,
	S_KEY = 83
} */

import { Game } from "./Game"

export class Paddle {
	public x: number;
	public y: number;
	public width: number;
	public height: number;
	private up: number;
	private down: number;
	private speed: number = 10;
	private yVel: number = 0;

	constructor(x:number, y:number, w:number, h:number, up:number, down:number) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.up = up;
		this.down = down;
	}

	draw(context: any){
        context.fillStyle = "#fff";
        context.fillRect(this.x,this.y,this.width,this.height);
	}
	
	update(canvas: any){
		if( Game.keysPressed[this.up] ){
		   this.yVel = -1;
		   if(this.y <= 20){
			   this.yVel = 0
		   }
		}
		else if(Game.keysPressed[this.down]){
			this.yVel = 1;
			if(this.y + this.height >= canvas.height - 20){
				this.yVel = 0;
			}
		}
		else{
			this.yVel = 0;
		}
		
		this.y += this.yVel * this.speed;
		
	   }
}