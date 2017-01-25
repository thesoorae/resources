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
    this.rabbitList = [];

    this.draw = this.draw.bind(this);
    this.setupGrid = this.setupGrid.bind(this);
    this.start = this.start.bind(this);
    this.patch = this.patch.bind(this);
    this.moveAnimal = this.moveAnimal.bind(this);
    this.step = this.step.bind(this);

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
        this.nextGrid[x][y] = [];

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
  				ctx.fillStyle = "#ee66aa";
  				ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
  			} else if (patch.type == "wolf"){
  				ctx.fillStyle = "#383838";
  				ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
  			} else {
          switch(patch.grassLevel){
            case 0:
            grassColor = "#F4A460";
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
  }

  moveAnimal(x,y, animal){
    this.rabbitList.push([x,y,animal]);
  }
  //updates grid with newGrid
  step(){
    for( let x = 0; x < this.canvasWidth; x++){
      for( let y = 0; y < this.canvasWidth; y++){
        this.nextGrid[x][y] = this.grid[x][y].update();
      }
    }
    console.log("rabbits", this.rabbitList);


    this.rabbitList.forEach((coords) => {
      let a = coords[0];
      let b = coords[1];
      let animal = coords[3];
      if((a > 0) && (a < this.canvasWidth) && ( b > 0) && (b < this.canvasWidth)){
        console.log(a, b);
      this.nextGrid[a][b].addAnimal(animal);
      }

    });

    this.grid = this.nextGrid;
    this.draw();
    console.log("next grid", this.nextGrid);
  }

}

module.exports = Board;
