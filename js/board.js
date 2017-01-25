const Cell = require('./cell');
const Rabbit = require('./rabbit');
const Wolf = require('./wolf');

class Board{
  constructor(ctx){
    this.ctx = ctx;
    this.width = 10;
    this.canvasWidth = 40;

    this.board = this;

    this.grid = [];
    this.nextGrid = [];
    this.rabbitCount = 0;

    this.lastTime = 0;

    this.draw = this.draw.bind(this);
    this.setupGrid = this.setupGrid.bind(this);
    this.start = this.start.bind(this);
    this.patch = this.patch.bind(this);
    this.moveAnimal = this.moveAnimal.bind(this);
    this.step = this.step.bind(this);
    this.gameLoop = this.gameLoop.bind(this);

  }
  patch(x,y){
    return this.grid[x][y];
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
        this.nextGrid[x][y] = new Cell(this.board, x,y, "grass");

  //EDIT

        let rand = Math.random()*100;
        if(rand > 98){
          this.grid[x][y] = new Cell(this.board, x,y);
          this.grid[x][y].addNewWolf();
        } else if(rand > 90 ){
          this.grid[x][y] = new Cell(this.board, x,y);
          this.grid[x][y].addNewRabbit();
        } else {
          this.grid[x][y] = new Cell(this.board, x,y, "grass");
        }
      }
    }
  }

  draw(){
    let ctx = this.ctx;
    let gridSquareWidth = this.width;
    let grassColor = "#009900";

    for (let x = 0; x < this.canvasWidth; x++) {
  		for (let y = 0; y < this.canvasWidth; y++) {
        let patch = this.patch(x,y);
  			if (patch.type == "rabbit") {
          this.rabbitCount ++;
  				ctx.fillStyle = "#ee66aa";
  				ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
  			} else if (patch.type == "wolf"){
  				ctx.fillStyle = "#383838";
  				ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
  			} else {
          switch(patch.grassLevel){
            case 0:
            grassColor = "#654321";
            break;
            case 1:
            grassColor = "#C5E3BF";
            break;
            case 2:
            grassColor = "#86C67C";
            break;
            case 3:
            grassColor = "#7BBF6A";
            break;
            case 4:
            grassColor = "#308014";
            break;
            case 5:
            grassColor = "#3B5E2B";
            break;
            default:
            grassColor = "#009900";
          }
          ctx.fillStyle = grassColor;
          ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);

        }
  		}
  	}
    console.log("rabbit count", this.rabbitCount);
  }

  moveAnimal(x,y, animal){
    let cell = this.nextGrid[x][y];
    cell.addAnimal(animal);
  }
  //updates grid with newGrid
  step(){
    for( let x = 0; x < this.canvasWidth; x++){
      for( let y = 0; y < this.canvasWidth; y++){
        this.nextGrid[x][y] = this.grid[x][y].updateGrass();
        let animal = this.grid[x][y].previousAnimal;
        if(animal instanceof Rabbit){

        let newCoords = animal.move();
        let newX = newCoords[0];
        let newY = newCoords[1];
//check nothing in newCoords
        // if(this.nextGrid[newX][newY].type == "grass"){
          let newCell = this.nextGrid[newCoords[0]][newCoords[1]];
          // debugger
          newCell.addAnimal(animal);
          }
        // }

        }
      }



    // this.rabbitList.forEach((coords) => {
    //   let a = coords[0];
    //   let b = coords[1];
    //   let animal = coords[3];
    //   if((a > 0) && (a < this.canvasWidth) && ( b > 0) && (b < this.canvasWidth)){
    //     console.log(a, b);
    //   this.nextGrid[a][b].addAnimal(animal);
    //   }
    //
    // });
    console.log("next grid", this.nextGrid);

    this.grid = this.nextGrid;
    this.rabbitCount = 0;
    this.draw();
  }

  gameLoop(){
      let now = Date.now();
      let dt = (now - this.lastTime) / 1000.0;

      this.step(dt);

      this.lastTime = now;
  	window.setTimeout(this.gameLoop, 20);
  }
}

module.exports = Board;
