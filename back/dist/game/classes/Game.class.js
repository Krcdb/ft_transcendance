"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Paddle_class_1 = require("./Paddle.class");
const Ball_class_1 = require("./Ball.class");
const user_entity_1 = require("../../users/user.entity");
const match_entity_1 = require("../../match/match.entity");
var Keys;
(function (Keys) {
    Keys[Keys["W_KEY"] = 87] = "W_KEY";
    Keys[Keys["S_KEY"] = 83] = "S_KEY";
})(Keys || (Keys = {}));
class Game {
    constructor(player1, player2, options, uuid) {
        this.paused = false;
        this.started = false;
        this.state = match_entity_1.GameState.WAITING_ALL;
        this.player1Ready = false;
        this.player2Ready = false;
        this.p1UpKeyPressed = false;
        this.p1DownKeyPressed = false;
        this.p2UpKeyPressed = false;
        this.p2DownKeyPressed = false;
        this.player1 = player1;
        this.player2 = player2;
        this.options = options;
        this.uuid = uuid;
        this.player1Score = 0;
        this.player2Score = 0;
        this.width = this.options.CANVAS_WIDTH;
        this.height = this.options.CANVAS_HEIGHT;
        this.p1 = new Paddle_class_1.Paddle(this.options.PADDLE_WIDTH, this.options.PADDLE_HEIGHT);
        this.p2 = new Paddle_class_1.Paddle(this.options.PADDLE_WIDTH, this.options.PADDLE_HEIGHT);
        this.ball = new Ball_class_1.Ball(this.options.BALL_SIZE);
        this.p1.setXY(this.options.PADDLE_MARGIN, this.height / 2 - this.options.PADDLE_HEIGHT / 2);
        this.p2.setXY(this.width - this.options.PADDLE_WIDTH - this.options.PADDLE_MARGIN, this.height / 2 - this.options.PADDLE_HEIGHT / 2);
        this.setBallDirection();
    }
    playerInput(payload) {
        if (payload.playerId === String(this.player1.id)) {
            this.p1UpKeyPressed = payload.upPressed;
            this.p1DownKeyPressed = payload.downPressed;
        }
        else if (payload.playerId === String(this.player2.id)) {
            this.p2UpKeyPressed = payload.upPressed;
            this.p2DownKeyPressed = payload.downPressed;
        }
        else
            console.log("player not input not found");
    }
    startGame(server) {
        this.reset();
        this.started = true;
        this.state = match_entity_1.GameState.IN_PROGRESS;
    }
    gameLoop(server) {
        if (!this.started)
            return;
        if (this.state === match_entity_1.GameState.IN_PROGRESS)
            this.update();
        server.to(this.uuid).emit('updateGame', {
            state: this.state,
            ball: {
                x: this.ball.x,
                y: this.ball.y,
            },
            player1: {
                x: this.p1.x,
                y: this.p1.y,
                score: this.player1Score,
            },
            player2: {
                x: this.p2.x,
                y: this.p2.y,
                score: this.player2Score,
            }
        });
    }
    setBallDirection() {
        var randomDirection = Math.floor(Math.random() * 2) + 1;
        if (randomDirection % 2) {
            this.ball.xVel = 1;
        }
        else {
            this.ball.xVel = -1;
        }
        randomDirection = Math.floor(Math.random() * 2) + 1;
        if (randomDirection % 2) {
            this.ball.yVel = 1;
        }
        else {
            this.ball.yVel = -1;
        }
        this.ball.setXY(this.width / 2 - this.ball.size / 2, Math.floor(Math.random() * (this.height - this.options.BALL_SIZE - 2 * this.options.PADDLE_MARGIN) + this.options.PADDLE_MARGIN));
    }
    checkPlayerMove() {
        if (this.p1UpKeyPressed) {
            this.p1.yVel = -1;
            if (this.p1.y <= this.options.PADDLE_MARGIN)
                this.p1.yVel = 0;
        }
        else if (this.p1DownKeyPressed) {
            this.p1.yVel = 1;
            if (this.p1.y + this.p1.height >= this.options.CANVAS_HEIGHT - this.options.PADDLE_MARGIN)
                this.p1.yVel = 0;
        }
        else {
            this.p1.yVel = 0;
        }
        this.p1.y += this.p1.yVel * this.p1.speed;
        if (this.p2UpKeyPressed) {
            this.p2.yVel = -1;
            if (this.p2.y <= this.options.PADDLE_MARGIN)
                this.p2.yVel = 0;
        }
        else if (this.p2DownKeyPressed) {
            this.p2.yVel = 1;
            if (this.p2.y + this.p2.height >= this.options.CANVAS_HEIGHT - this.options.PADDLE_MARGIN)
                this.p2.yVel = 0;
        }
        else {
            this.p2.yVel = 0;
        }
        this.p2.y += this.p2.yVel * this.p2.speed;
    }
    reset() {
        console.log("reset");
        this.paused = true;
        setTimeout(() => {
            this.paused = false;
        }, 2000);
        this.p1.setXY(this.options.PADDLE_MARGIN, this.height / 2 - this.options.PADDLE_HEIGHT / 2);
        this.p2.setXY(this.width - this.options.PADDLE_WIDTH - this.options.PADDLE_MARGIN, this.height / 2 - this.options.PADDLE_HEIGHT / 2);
        this.setBallDirection();
    }
    checkBallCollision() {
        if (this.ball.y <= this.options.PADDLE_MARGIN || this.ball.y + this.ball.size >= this.options.CANVAS_HEIGHT - this.options.PADDLE_MARGIN)
            this.ball.yVel = -this.ball.yVel;
        if (this.ball.x <= this.options.PADDLE_MARGIN) {
            this.player2Score++;
            this.reset();
        }
        if (this.ball.x + this.ball.size >= this.options.CANVAS_WIDTH - this.options.PADDLE_MARGIN) {
            this.player1Score++;
            this.reset();
        }
        if (this.ball.x <= this.p1.x + this.p1.width) {
            if (this.ball.y >= this.p1.y && this.ball.y + this.ball.size <= this.p1.y + this.p1.height)
                this.ball.xVel = -this.ball.xVel;
        }
        if (this.ball.x + this.ball.size >= this.p2.x) {
            if (this.ball.y >= this.p2.y && this.ball.y + this.ball.size <= this.p2.y + this.p2.height)
                this.ball.xVel = -this.ball.xVel;
        }
    }
    update() {
        this.checkPlayerMove();
        this.checkBallCollision();
        if (this.paused)
            return;
        this.ball.x += this.ball.xVel * this.ball.speed;
        this.ball.y += this.ball.yVel * this.ball.speed;
    }
    matchDone(server) {
        this.state = match_entity_1.GameState.FINISHED;
        clearInterval(this.intervalRef);
        server.to(this.uuid).emit('updateGame', {
            state: this.state,
            ball: {
                x: this.ball.x,
                y: this.ball.y,
            },
            player1: {
                x: this.p1.x,
                y: this.p1.y,
                score: this.player1Score,
            },
            player2: {
                x: this.p2.x,
                y: this.p2.y,
                score: this.player2Score,
            }
        });
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.class.js.map