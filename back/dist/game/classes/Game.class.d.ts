import { Paddle } from "src/game/classes/Paddle.class";
import { Ball } from "src/game/classes/Ball.class";
import { Server } from "socket.io";
import { User } from "src/users/user.entity";
import { GameState } from "src/match/match.entity";
export interface GameOptionsInterface {
    FPS: number;
    CANVAS_WIDTH: number;
    CANVAS_HEIGHT: number;
    PADDLE_WIDTH: number;
    PADDLE_HEIGHT: number;
    PADDLE_MARGIN: number;
    BALL_SIZE: number;
    PLAYER_MOVE: number;
}
export declare class Game {
    player1: User;
    player2: User;
    options: GameOptionsInterface;
    uuid: string;
    intervalRef: any;
    paused: boolean;
    width: number;
    height: number;
    p1: Paddle;
    p2: Paddle;
    ball: Ball;
    player1Score: number;
    player2Score: number;
    started: Boolean;
    state: GameState;
    player1Ready: Boolean;
    player2Ready: Boolean;
    p1UpKeyPressed: Boolean;
    p1DownKeyPressed: Boolean;
    p2UpKeyPressed: Boolean;
    p2DownKeyPressed: Boolean;
    constructor(player1: User, player2: User, options: GameOptionsInterface, uuid: string);
    playerInput(payload: any): void;
    startGame(server: Server): void;
    gameLoop(server: Server): void;
    setBallDirection(): void;
    checkPlayerMove(): void;
    reset(): void;
    checkBallCollision(): void;
    update(): void;
    matchDone(server: Server): void;
}
