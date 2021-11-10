export class GameDataUpdate {
	ball: {
		x: number
		y: number
	} | undefined
	player1: {
		x: number
		y: number
		score: number
	} | undefined
	player2: {
		x: number
		y: number
		score: number
	} | undefined
}