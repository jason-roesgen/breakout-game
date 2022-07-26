import { GameLoop } from "./game-loop.js";
import { Info }     from "./info.js";
import { Racket }   from "./racket.js";
import { Ball }     from "./ball.js";
import { Vector }   from "./vector.js";

const options = {
  initialLives : 3
};

export class Game
{
  public blocks: HTMLElement[]            = Array.from( document.querySelectorAll( ".game__block" ) );
  public element: HTMLElement             = document.querySelector( ".game" );
  public gameOverElement: HTMLElement     = document.querySelector( ".game-over" );
  public gameFinishedElement: HTMLElement = document.querySelector( ".game-finished" );
  public racket: Racket                   = new Racket( this );
  public ball: Ball                       = new Ball( this );
  public gameLoop: GameLoop               = new GameLoop( this );
  public info: Info                       = new Info( this );

  private _arrowLeft: boolean  = false;
  private _arrowRight: boolean = false;
  private _space: boolean      = false;

  constructor()
  {
    this.blocks.push( this.racket.element );
    this.info.lives               = options.initialLives;
    this.gameLoop.framesPerSecond = 60;
    this.gameLoop.start();
  }

  private start()
  {
    // counter is set to 3 instead of 0
    // set event listener, wo checks if "escape" is pressed, then ->
    const handler = event =>
    {
      if( event.code === "Space" )
      {
        this.gameLoop.start();
        // -> set lives 3 instead of 0
        this.info.lives = options.initialLives;

        // -> clear "visability: 'hidden'" from game blocks
        for( const block of this.blocks )
        {
          if( block.style.visibility === "hidden" )
          {
            //block.style.visibility = "visible";
            block.style.removeProperty( "visibility" );
          }
        }

        // set '.game-over' to display: none
        this.gameOverElement.style.removeProperty( "display" );

        // set '.game-finished' to display: none
        this.gameFinishedElement.style.removeProperty( "display" );
      }
    };

    this.ball.movementSpeed = 0;

    document.addEventListener( "keyup", handler, { once : true } );
  }

  public hasBlocksLeft(): boolean
  {
    for( const block of this.blocks )
    {
      // if(block === this.racket.element)
      if(block.classList.contains("game__racket") )
      {
        continue;
      }

      if( block.style.visibility !== "hidden" )
      {
        return true;
      }
    }
    return false;
  }

  public finished()
  {
    this.gameFinishedElement.setAttribute( "style", "display: flex" );

    // racket not more controllable
    this.gameLoop.stop();

    this.start();
  }

  public over()
  {
    // write "game over" in the middle of the ".game" if lives are 0 and set opacity of "body"
    this.gameOverElement.setAttribute( "style", "display: flex" );

    // racket not more controllable
    this.gameLoop.stop();

    this.start();
  }
}
