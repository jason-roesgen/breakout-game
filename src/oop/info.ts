import { Game } from "./game.js";

export class Info
{
  public game: Game;
  private _lives: number               = 3;
  private _livesElement: HTMLElement = document.querySelector( ".info__lives__count" );

  get lives(): number{
    return this._lives;
  }

  set lives(value: number) {
    this._lives = value;
    this._livesElement.textContent = value.toString();
  }

  constructor( parent: Game )
  {
    this.game = parent;

    this._livesElement.textContent = this._lives.toString();
  }
}
