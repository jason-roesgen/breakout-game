import { GameLoop } from "./game-loop.js";
import { Info } from "./info.js";
import { Racket } from "./racket.js";
import { Ball } from "./ball.js";
const options = {
    initialLives: 3
};
export class Game {
    constructor() {
        this.blocks = Array.from(document.querySelectorAll(".game__block"));
        this.element = document.querySelector(".game");
        this.gameOverElement = document.querySelector(".game-over");
        this.gameFinishedElement = document.querySelector(".game-finished");
        this.racket = new Racket(this);
        this.ball = new Ball(this);
        this.gameLoop = new GameLoop(this);
        this.info = new Info(this);
        this._arrowLeft = false;
        this._arrowRight = false;
        this._space = false;
        this.blocks.push(this.racket.element);
        this.info.lives = options.initialLives;
        this.gameLoop.framesPerSecond = 60;
        this.gameLoop.start();
    }
    start() {
        // counter is set to 3 instead of 0
        // set event listener, wo checks if "escape" is pressed, then ->
        const handler = event => {
            if (event.code === "Space") {
                this.gameLoop.start();
                // -> set lives 3 instead of 0
                this.info.lives = options.initialLives;
                // -> clear "visability: 'hidden'" from game blocks
                for (const block of this.blocks) {
                    if (block.style.visibility === "hidden") {
                        //block.style.visibility = "visible";
                        block.style.removeProperty("visibility");
                    }
                }
                // set '.game-over' to display: none
                this.gameOverElement.style.removeProperty("display");
                // set '.game-finished' to display: none
                this.gameFinishedElement.style.removeProperty("display");
            }
        };
        this.ball.movementSpeed = 0;
        document.addEventListener("keyup", handler, { once: true });
    }
    hasBlocksLeft() {
        for (const block of this.blocks) {
            // if(block === this.racket.element)
            if (block.classList.contains("game__racket")) {
                continue;
            }
            if (block.style.visibility !== "hidden") {
                return true;
            }
        }
        return false;
    }
    finished() {
        this.gameFinishedElement.setAttribute("style", "display: flex");
        // racket not more controllable
        this.gameLoop.stop();
        this.start();
    }
    over() {
        // write "game over" in the middle of the ".game" if lives are 0 and set opacity of "body"
        this.gameOverElement.setAttribute("style", "display: flex");
        // racket not more controllable
        this.gameLoop.stop();
        this.start();
    }
}
//# sourceMappingURL=game.js.map