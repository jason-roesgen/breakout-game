export class GameLoop {
    constructor(parent) {
        this.framesPerSecond = 0;
        this._game = parent;
    }
    start() {
        this._intervalHandle = setInterval(() => {
            this._game.ball.move();
            this._game.racket.move();
            this._game.racket.hitBall();
        }, 1000 / this.framesPerSecond);
    }
    stop() {
        window.clearInterval(this._intervalHandle);
    }
}
//# sourceMappingURL=game-loop.js.map