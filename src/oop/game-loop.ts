import { Game } from "./game.js";

export class GameLoop
{
  private _game: Game;
  public framesPerSecond: number = 0;

  constructor( parent: Game )
  {
    this._game = parent;
  }

  private _intervalHandle: number;

  public start()
  {
    this._intervalHandle = setInterval( () =>
    {
      this._game.ball.move();
      this._game.racket.move();
      this._game.racket.hitBall();
    }, 1000 / this.framesPerSecond );
  }

  public stop()
  {
    window.clearInterval( this._intervalHandle );
  }
}
