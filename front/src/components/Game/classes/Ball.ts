/* eslint-disable */
import { Game } from "./Game"
import { Paddle } from "./Paddle"

export class Ball {
	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private speed: number = 5;
	private yVel: number = 0;
	private xVel: number = 0;

	constructor(x:number, y:number, w:number, h:number) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		var randomDirection = Math.floor(Math.random() * 2) + 1; 
        if(randomDirection % 2){
            this.xVel = 1;
        }else{
            this.xVel = -1;
        }
        this.yVel = 1;
	}

	draw(context: any){
        context.fillStyle = "#fff";
        context.fillRect(this.x,this.y,this.width,this.height);
	}

	update(player1:Paddle, player2:Paddle,canvas: any, game: Game){
       
        //check top canvas bounds
        if(this.y <= 10){
            this.yVel = 1;
        }
        
        //check bottom canvas bounds
        if(this.y + this.height >= canvas.height - 10){
            this.yVel = -1;
        }
        
        //check left canvas bounds
        if(this.x <= 0){  
			this.x = canvas.width / 2 - this.width / 2;
			game.player2Score++;
        }
        
        //check right canvas bounds
        if(this.x + this.width >= canvas.width){
            this.x = canvas.width / 2 - this.width / 2;
			game.player1Score++;
        }
        
        
        //check player1 collision
        if(this.x <= player1.x + player1.width){
            if(this.y >= player1.y && this.y + this.height <= player1.y + player1.height){
                this.xVel = 1;
            }
        }
        
        //check  player2 collision
        if(this.x + this.width >=  player2.x){
            if(this.y >=  player2.y && this.y + this.height <=  player2.y +  player2.height){
                this.xVel = -1;
            }
        }
       
        this.x += this.xVel * this.speed;
        this.y += this.yVel * this.speed;
    }
}