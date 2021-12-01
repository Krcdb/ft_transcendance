/* eslint-disable */
export class Bonus {
	x: number;
	y: number;
	size: number;

	constructor(x:number, y:number, size: number) {
		this.x = x;
		this.y = y;
		this.size = size;
	}

	setXY(x: any, y: any){
		this.x = x;
		this.y = y;
	}

	draw(context: any){
        console.log(`draw bonus  | bonus x : ${this.x}`);
        context.fillStyle = "#fff";
        context.fillRect(this.x,this.y,this.size,this.size);
	}
}