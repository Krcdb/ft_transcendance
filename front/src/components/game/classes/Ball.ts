/* eslint-disable */
import { Game } from "./Game"
import { Paddle } from "./Paddle"

export class Ball {
	x: number;
	y: number;
	size: number;

	constructor(x:number, y:number, size: number) {
		this.x = x;
		this.y = y;
		this.size = size;
	}

	setXY(x: number, y: number){
		this.x = x;
		this.y = y;
	}

	draw(context: any){
        context.fillStyle = "#fff";
        context.fillRect(this.x,this.y,this.size,this.size);
	}
}