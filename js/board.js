const Cell = require('./cell');

const gridWidth = 140;
const gridHeight = 70;
const gridSquareWidth = 10;

class Board {
  constructor(ctx){
    this.ctx = ctx;
  }


  setupGrid(){
    console.log("in setup");

    this.ctx.width = gridWidth * gridSquareWidth;
    this.ctx.height = gridHeight * gridSquareWidth;
    this.ctx.style.width = this.ctx.width;
    this.ctx.style.height = this.ctx.height;

    let grid = [];
    let grid2 = [];

    for(let x=0; x < gridWidth; x++){
      grid[x] = [];
      grid2[x] =  [];
      for( let y = 0; y< gridHeight; y++ ){
        grid[x][y] = [];
        grid2[x][y] = [];

  //EDIT

        let rand = Math.random()*100;
        if(rand > 90){
          grid[x][y] = new Cell("rabbit", x,y);
        } else if(rand > 98 ){
          grid[x][y] = new Cell("wolf", x,y);
        } else {
          grid[x][y] = new Cell("grass", x,y);
        }
      }
    }

    }

  update(dt) {
    console.log("in update");
  	// iterate simulation rules
  	// this.run();

  	// draw result
  	this.draw();
  }


  draw() {
    const ctx = this.ctx;
    console.log("in draw");
  // clear canvas
  	ctx.fillStyle = '#fee';
  	ctx.fillRect(0, 0, ctx.width, ctx.height);

  	for (var x = 0; x < gridWidth; x++) {
  		for (var y = 0; y < gridHeight; y++) {

  			if (grid[x][y].type == "rabbit") {
  				ctx.fillStyle = "#ee66aa";
  				ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
  			} else if (grid[x][y].type == "wolf") {
  				ctx.fillStyle = "#383838";
  				ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
  			} else {
          ctx.fillStyle = "#009900";
          ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
        }
  		}
  	}
  }

  gameLoop() {
      let lastTime = 0;
      let now = Date.now();
      let dt = (now - lastTime) / 1000.0;

      this.update(dt);

      lastTime = now;
  	window.setTimeout(this.gameLoop, 50);
  }

  //calling gameLoop will start the game

}
module.exports = Board;
