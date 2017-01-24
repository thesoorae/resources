const Cell = require('./cell');


class Board{
  constructor(ctx){
    this.ctx = ctx;
    this.width = 10;
    this.canvasWidth = 40;

    this.grid = [];
    this.nextGrid = [];

    this.draw = this.draw.bind(this);
    this.setupGrid = this.setupGrid.bind(this);
    this.start = this.start.bind(this);
  }
  start(){
    this.setupGrid();
    this.draw();
    console.log(this.grid);
  }
  setupGrid(){
    for(let x=0; x < this.canvasWidth; x++){
      this.grid[x] = [];
      this.nextGrid[x] =  [];
      for( let y = 0; y< this.canvasWidth; y++ ){
        this.grid[x][y] = [];
        this.nextGrid[x][y] = [];

  //EDIT

        let rand = Math.random()*100;
        if(rand > 98){
          this.grid[x][y] = new Cell("wolf", x,y);
        } else if(rand > 90 ){
          this.grid[x][y] = new Cell("rabbit", x,y);
        } else {
          this.grid[x][y] = new Cell("grass", x,y);
        }
      }
    }
  }

  draw(){
    let ctx = this.ctx;
    let gridSquareWidth = this.width;

    for (let x = 0; x < this.canvasWidth; x++) {
  		for (let y = 0; y < this.canvasWidth; y++) {

  			if (this.grid[x][y].type == "rabbit") {
  				ctx.fillStyle = "#ee66aa";
  				ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
  			} else if (this.grid[x][y].type == "wolf"){
  				ctx.fillStyle = "#383838";
  				ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
  			} else {
          ctx.fillStyle = "#009900";
          ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
        }
  		}
  	}
  }

}

module.exports = Board;
