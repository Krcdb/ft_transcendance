"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ball = void 0;
class Ball {
    constructor(size) {
        this.speed = 3;
        this.xVel = 0;
        this.yVel = 0;
        this.size = size;
    }
    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Ball = Ball;
//# sourceMappingURL=Ball.class.js.map