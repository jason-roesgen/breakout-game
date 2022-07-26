import { Game }   from "./game.js";
import { Racket } from "./racket.js";
import { Vector } from "./vector.js";

export class Ball
{
  public game: Game;
  public element: HTMLElement = document.querySelector( ".game__ball" );

  private _movementSpeed: number = 0;

  public vector: Vector = new Vector( this._movementSpeed, -this._movementSpeed );

  get movementSpeed(): number
  {
    return this._movementSpeed;
  }

  set movementSpeed( value: number )
  {
    this._movementSpeed = value;

    if( Math.sign( this.vector.x ) === -1 || Math.sign( this.vector.x ) === -0 )
    {
      this.vector.x = -this._movementSpeed;
    }
    else
    {
      this.vector.x = this._movementSpeed;
    }

    if( Math.sign( this.vector.y ) === -1 || Math.sign( this.vector.y ) === -0 )
    {
      this.vector.y = -this._movementSpeed;
    }
    else
    {
      this.vector.y = this._movementSpeed;
    }
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

  get height(): number
  {
    return this.element.offsetHeight;
  }

  get width(): number
  {
    return this.element.offsetWidth;
  }

  constructor( parent: Game )
  {
    this.game = parent;

    const { racket } = this.game;

    this.x = racket.x + racket.width / 2 - this.width / 2;
    this.y = racket.y - this.height;
  }

  private _handleWallCollision()
  {
    const rightBoundaryLimit  = this.game.element.offsetWidth;
    const bottomBoundaryLimit = this.game.element.offsetHeight + this.height;

    // top
    if( this.y < 0 )
    {
      this.y        = 0;
      this.vector.y = this._movementSpeed;
    }
    // right
    else if( this.x + this.width > rightBoundaryLimit )
    {
      this.x        = rightBoundaryLimit - this.width;
      this.vector.x = -this._movementSpeed;
    }
    //bottom
    else if( this.y + this.height > bottomBoundaryLimit )
    {
      this.y = bottomBoundaryLimit - this.height;

      this.game.info.lives -= 1;
      this.movementSpeed = 0;

      if( this.game.info.lives <= 0 )
      {
        this.game.over();
      }
    }
    // left
    else if( this.x < 0 )
    {
      this.x        = 0;
      this.vector.x = this._movementSpeed;
    }
  }

  private _handleObjectCollision()
  {
    for( const block of this.game.blocks )
    {
      /* TODO: Elemente generieren anstatt mit visibility zu schummeln ;) */
      if( block.style.visibility === "hidden" )
      {
        continue;
      }

      const { x : ballX, y : ballY, width : ballWidth, height : ballHeight }                                  = this;
      const { offsetWidth : blockWidth, offsetTop : blockY, offsetLeft : blockX, offsetHeight : blockHeight } = block;

      const top    = ballY + ballHeight > blockY && ballY + ballHeight < blockY + blockHeight;
      const bottom = ballY < blockY + blockHeight && ballY > blockY;
      const left   = ballX + ballWidth > blockX && ballX + ballWidth < blockX + blockWidth;
      const right  = ballX < blockX + blockWidth && ballX > blockX;

      if( ( top || bottom ) && ( left || right ) )
      {
        let collisionHeight;
        let collisionWidth;

        if( top )
        {
          collisionHeight = ballY + ballHeight - blockY;
        }
        else if( bottom )
        {
          collisionHeight = blockY + blockHeight - ballY;
        }

        if( left )
        {
          collisionWidth = ballX + ballWidth - blockX;
        }
        else if( right )
        {
          collisionWidth = blockX + blockWidth - ballX;
        }

        // From the side
        if( collisionHeight > collisionWidth )
        {
          if( left )
          {
            this.x        = block.offsetLeft - this.width;
            this.vector.x = -this._movementSpeed;
          }
          else if( right )
          {
            this.x        = block.offsetLeft + block.offsetWidth;
            this.vector.x = this._movementSpeed;
          }
        }

        // From bottom/top
        else if( collisionHeight < collisionWidth )
        {
          if( top )
          {
            this.y        = block.offsetTop - this.height;
            this.vector.y = -this._movementSpeed;
          }
          else if( bottom )
          {
            this.y        = block.offsetTop + block.offsetHeight;
            this.vector.y = this._movementSpeed;
          }
        }

        // Same size
        else
        {
          if( top && right )
          {
            this.vector.x = this._movementSpeed;
            this.vector.y = -this._movementSpeed;
          }
          else if( right && bottom )
          {
            this.vector.x = this._movementSpeed;
            this.vector.y = this._movementSpeed;
          }
          else if( bottom && left )
          {
            this.vector.x = -this._movementSpeed;
            this.vector.y = this._movementSpeed;
          }
          else if( left && top )
          {
            this.vector.x = -this._movementSpeed;
            this.vector.y = -this._movementSpeed;
          }
        }

        // if block is racket
        if( block.classList.contains( "game__block" ) )
        {
          block.style.visibility = "hidden";

          if( !this.game.hasBlocksLeft() )
          {
            this.game.finished();
          }
        }
      } // end if
    } // end for
  }

  public move()
  {
    if( this._movementSpeed <= 0 )
    {
      return;
    }

    this._handleWallCollision();
    this._handleObjectCollision();

    this.element.style.top  = `${this.element.offsetTop + this.vector.y}px`;
    this.element.style.left = `${this.element.offsetLeft + this.vector.x}px`;
  }
}
