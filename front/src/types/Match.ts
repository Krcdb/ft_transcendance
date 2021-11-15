import { GameState } from './Game';
export class Match {
	matchId: string | undefined;
	state: GameState | undefined;
	playerOne: number | undefined;
	playerTwo: number | undefined;
	scorePlayerOne: number | undefined;
	scorePlayerTwo: number | undefined;
}
