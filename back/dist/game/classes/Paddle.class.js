"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paddle = void 0;
class Paddle {
    constructor(w, h) {
        this.speed = 10;
        this.yVel = 0;
        this.width = w;
        this.height = h;
    }
    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
    setY(y) {
        this.y = y;
    }
}
exports.Paddle = Paddle;
//# sourceMappingURL=Paddle.class.js.map