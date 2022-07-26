import { Game } from "./game.js";

export class Racket
{
  public element: HTMLElement = document.querySelector( ".game__racket" );
  public game: Game;

  private _arrowLeft: boolean  = false;
  private _arrowRight: boolean = false;
  private _space: boolean      = false;

  get height(): number
  {
    return this.element.offsetHeight;
  }

  get width(): number
  {
    return this.element.offsetWidth;
  }

  get x(): number
  {
    return this.element.offsetLeft;
  }

  set x( value: number )
  {
    this.element.style.left = `${value}px`
  }

  get y(): number
  {
    return this.element.offsetTop;
  }

  set y( value: number )
  {
    this.element.style.top = `${value}px`
  }

  constructor( parent: Game )
  {
    this.game = parent;

    document.addEventListener( "keydown", event =>
    {
      if( event.code === "ArrowLeft" )
      {
        this._arrowLeft  = true;
        this._arrowRight = false;
        this._space      = false;
      }
      else if( event.code === "ArrowRight" )
      {
        this._arrowRight = true;
        this._arrowLeft  = false;
        this._space      = false;
      }
      else if( event.code === "Space" )
      {
        this._space      = true;
        this._arrowRight = false;
        this._arrowLeft  = false;
      }
    } );

    document.addEventListener( "keyup", event =>
    {
      if( event.code === "ArrowLeft" )
      {
        this._arrowLeft = false;
      }
      else if( event.code === "ArrowRight" )
      {
        this._arrowRight = false;
      }
      else if( event.code === "Space" )
      {
        this._space = false;
      }
    } );
  }

  public move()
  {
    if( this._arrowLeft )
    {
      if( this.element.offsetLeft > 0 )
      {
        /* TODO: Die 10 hier noch mehr Hard-Coded (Zeile 49 & 58) */
        this.element.style.left = this.element.offsetLeft - 10 + "px";
      }
    }
    else if( this._arrowRight )
    {
      const rightBoundaryLimit = this.game.element.offsetWidth - this.element.offsetWidth;

      if( this.element.offsetLeft < rightBoundaryLimit )
      {
        this.element.style.left = this.element.offsetLeft + 10 + "px";
      }
    }

    if( this.game.ball.movementSpeed === 0 )
    {
      this.game.ball.x = this.x + this.width / 2 - this.game.ball.width / 2;
      this.game.ball.y = this.y - this.game.ball.height;
    }
  }

  public hitBall()
  {
    if( this._space )
    {
      this.game.ball.movementSpeed = 5;
    }
  }
}
