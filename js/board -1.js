const Cell = require('./cell');

const gridWidth = 140;
const gridHeight = 70;
const gridSquareWidth = 10;

class Board {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.grid = [];
    this.nextGrid = [];
    this.setupGrid = this.setupGrid.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
  }

start(){
  this.setupGrid();
  this.gameLoop();
}
  setupGrid(){

    this.canvas.width = gridWidth * gridSquareWidth;
    this.canvas.height = gridHeight * gridSquareWidth;



    for(let x=0; x < gridWidth; x++){
      this.grid[x] = [];
      this.nextGrid[x] =  [];
      for( let y = 0; y< gridHeight; y++ ){
        this.grid[x][y] = [];
        this.nextGrid[x][y] = [];

  //EDIT

        let rand = Math.random()*100;
        if(rand > 90){
          this.grid[x][y] = new Cell("rabbit", x,y);
        } else if(rand > 98 ){
          this.grid[x][y] = new Cell("wolf", x,y);
        } else {
          this.grid[x][y] = new Cell("grass", x,y);
        }
      }
    }

    }

  update(dt) {

  	this.draw();
  }


  draw() {
    const ctx = this.ctx;
  // clear canvas
  	ctx.fillStyle = '#fee';
  	ctx.fillRect(0, 0, ctx.width, ctx.height);

  	for (var x = 0; x < gridWidth; x++) {
  		for (var y = 0; y < gridHeight; y++) {

  			if (this.grid[x][y].type == "rabbit") {
  				ctx.fillStyle = "#ee66aa";
  				ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
  			} else if (this.grid[x][y].type == "wolf") {
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
