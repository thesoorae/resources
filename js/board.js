const Cell = require('./cell');
const Rabbit = require('./rabbit');
const Wolf = require('./wolf');

class Board{
  constructor(ctx){
    this.ctx = ctx;
    this.width = 10;
    this.canvasWidth = 50;

    this.board = this;

    this.grid = [];
    this.nextGrid = [];


    this.rabbitCount = 0;
    this.deadRabbits = 0;
    this.steps = 0;
    this.birthedRabbits = 0;

    this.play = false;
    this.lastTime = 0;

    this.draw = this.draw.bind(this);
    this.setupGrid = this.setupGrid.bind(this);
    this.start = this.start.bind(this);
    this.patch = this.patch.bind(this);
    this.moveAnimal = this.moveAnimal.bind(this);
    this.step = this.step.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.updateCell = this.updateCell.bind(this);
    this.toggleGame = this.toggleGame.bind(this);

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
    console.log("dead rabbits", this.deadRabbits);
    console.log("birthed rabbits", this.birthedRabbits);
    console.log("steps", this.steps);
  }

  moveAnimal(x,y, animal){
    let cell = this.nextGrid[x][y];
    cell.addAnimal(animal);
  }
  //updates grid with newGrid

  updateCell(x,y){
     let updatedCell = this.grid[x][y].updateGrass();
     let nextGridCell = this.nextGrid[x][y];
     nextGridCell.grassLevel = updatedCell.grassLevel;
  }

  step(){
    for( let x = 0; x < this.canvasWidth; x++){
      for( let y = 0; y < this.canvasWidth; y++){
        this.updateCell(x,y);
        let animal = this.grid[x][y].previousAnimal;
        if(animal instanceof Rabbit && animal.alive){

        let newCoords = animal.newSpace();
        let newX = newCoords[0];
        let newY = newCoords[1];
//check nothing in newCoords
        // if(this.nextGrid[newX][newY].type == "grass"){
          let newCell = this.nextGrid[newCoords[0]][newCoords[1]];
          // debugger
          newCell.addAnimal(animal);

          if(animal.shouldReproduce()){


            let currentCell = this.nextGrid[x][y];
            currentCell.addNewRabbit();
            this.birthedRabbits ++;
          }
        } else if(animal instanceof Rabbit && !animal.alive){
          this.deadRabbits ++;
        }
        // }

        }
      }
    if(this.rabbitCount < 8){
      console.log("next grid", this.nextGrid);
      debugger
    }


    this.grid = this.nextGrid;
    this.rabbitCount = 0;
    this.steps ++;

    this.draw();
  }

  gameLoop(){
    if(this.play){
      let now = Date.now();
      let dt = (now - this.lastTime) / 1000.0;

      this.step(dt);

      this.lastTime = now;
  	window.setTimeout(this.gameLoop, 100);
  }}

  toggleGame(){
    this.play = !this.play;
    if(this.play){
      this.gameLoop();
    }
  }
}

module.exports = Board;
