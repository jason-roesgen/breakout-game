export class Racket {
    constructor(parent) {
        this.element = document.querySelector(".game__racket");
        this._arrowLeft = false;
        this._arrowRight = false;
        this._space = false;
        this.game = parent;
        document.addEventListener("keydown", event => {
            if (event.code === "ArrowLeft") {
                this._arrowLeft = true;
                this._arrowRight = false;
                this._space = false;
            }
            else if (event.code === "ArrowRight") {
                this._arrowRight = true;
                this._arrowLeft = false;
                this._space = false;
            }
            else if (event.code === "Space") {
                this._space = true;
                this._arrowRight = false;
                this._arrowLeft = false;
            }
        });
        document.addEventListener("keyup", event => {
            if (event.code === "ArrowLeft") {
                this._arrowLeft = false;
            }
            else if (event.code === "ArrowRight") {
                this._arrowRight = false;
            }
            else if (event.code === "Space") {
                this._space = false;
            }
        });
    }
    get height() {
        return this.element.offsetHeight;
    }
    get width() {
        return this.element.offsetWidth;
    }
    get x() {
        return this.element.offsetLeft;
    }
    set x(value) {
        this.element.style.left = `${value}px`;
    }
    get y() {
        return this.element.offsetTop;
    }
    set y(value) {
        this.element.style.top = `${value}px`;
    }
    move() {
        if (this._arrowLeft) {
            if (this.element.offsetLeft > 0) {
                /* TODO: Die 10 hier noch mehr Hard-Coded (Zeile 49 & 58) */
                this.element.style.left = this.element.offsetLeft - 10 + "px";
            }
        }
        else if (this._arrowRight) {
            const rightBoundaryLimit = this.game.element.offsetWidth - this.element.offsetWidth;
            if (this.element.offsetLeft < rightBoundaryLimit) {
                this.element.style.left = this.element.offsetLeft + 10 + "px";
            }
        }
        if (this.game.ball.movementSpeed === 0) {
            this.game.ball.x = this.x + this.width / 2 - this.game.ball.width / 2;
            this.game.ball.y = this.y - this.game.ball.height;
        }
    }
    hitBall() {
        if (this._space) {
            this.game.ball.movementSpeed = 5;
        }
    }
}
//# sourceMappingURL=racket.js.map