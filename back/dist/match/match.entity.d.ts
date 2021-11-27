export declare enum GameState {
    WAITING_ALL = 0,
    IN_PROGRESS = 1,
    FINISHED = 2
}
export declare class Match {
    matchId: string;
    state: GameState;
    playerOne: number;
    playerTwo: number;
    scorePlayerOne: number;
    scorePlayerTwo: number;
}
