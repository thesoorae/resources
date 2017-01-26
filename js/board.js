const Cell = require('./cell');
const Rabbit = require('./rabbit');
const Wolf = require('./wolf');
const Animal = require('./animal');

class Board{
  constructor(frame, ctx){
    this.frame = frame;
    this.ctx = ctx;
    this.width = 12;
    this.canvasWidth = 70;
    this.canvasHeight = 50;

    this.board = this;

    this.grid = [];
    this.nextGrid = [];


    this.rabbitCount = 0;
    this.deadRabbits = 0;
    this.steps = 0;
    this.birthedRabbits = 0;

    this.play = false;
    this.lastTime = 0;

    this.preyParams = {};
    this.predatorParams = {};
    this.grassParams = {};

    this.draw = this.draw.bind(this);
    this.setupGrid = this.setupGrid.bind(this);
    this.start = this.start.bind(this);
    this.patch = this.patch.bind(this);
    this.moveAnimal = this.moveAnimal.bind(this);
    this.step = this.step.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.updateCell = this.updateCell.bind(this);
    this.toggleGame = this.toggleGame.bind(this);
    this.transitionBG = this.transitionBG.bind(this);
    this.getParamsStart = this.getParamsStart.bind(this);

  }

getParamsStart(prey, predator, grass){
  this.preyParams = prey;
  this.predatorParams = predator;
  this.grassParams = grass;
  this.toggleGame();
}

  transitionBG(){
    let bg_images = this.frame.childNodes;

    if(this.rabbitCount > 350){
      bg_images[1].className = "visible";
      bg_images[3].className = "transparent";
      bg_images[5].className = "transparent";
      bg_images[7].className = "transparent";
    } else if(this.rabbitCount > 300){
      bg_images[1].className = "transparent";
      bg_images[3].className = "visible";
      bg_images[5].className = "transparent";
      bg_images[7].className = "transparent";
    } else if(this.rabbitCount > 10){
      bg_images[1].className = "transparent";
      bg_images[3].className = "transparent";
      bg_images[5].className = "visible";
      bg_images[7].className = "transparent";
    } else {
      bg_images[1].className = "transparent";
      bg_images[3].className = "transparent";
      bg_images[5].className = "transparent";
      bg_images[7].className = "visible";
    }
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
      for( let y = 0; y< this.canvasHeight; y++ ){
        this.grid[x][y] = [];
        this.nextGrid[x][y] = new Cell(this.grassParams, this.board, x,y, "grass");

  //EDIT

        let rand = Math.random()*100;
        if(rand > 98){
          this.grid[x][y] = new Cell(this.grassParams, this.board, x,y);
          this.grid[x][y].addNewWolf();
        } else if(rand > 90 ){
          this.grid[x][y] = new Cell(this.grassParams, this.board, x,y);
          this.grid[x][y].addNewRabbit();
        } else {
          this.grid[x][y] = new Cell(this.grassParams, this.board, x,y, "grass");
        }
      }
    }
  }

  draw(){

    let ctx = this.ctx;
    let gridSquareWidth = this.width;
    let grassColor = "#009900";
    let start_x = 30;
    let rad = 5;
    let wolfrad = 6;
    let gaps = this.width;
    for (let x =0; x < this.canvasWidth; x++) {
  		for (let y = 0; y < this.canvasHeight; y++) {
        let patch = this.patch(x,y);

          switch(patch.grassLevel){
            case 0:
            grassColor = "#D5CBB8";
            break;
            case 1:
            grassColor = "#C9DAAB";
            break;
            case 2:
            grassColor = "#C2D6A1";
            break;
            case 3:
            grassColor = "#91B454";
            break;
            case 4:
            grassColor = "#6E8B3D";
            break;
            case 5:
            grassColor = "#556B2F";
            break;
            default:
            grassColor = "#556B2F";
          }
          ctx.fillStyle = grassColor;
          ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);


        if (patch.type == "rabbit") {
          this.rabbitCount ++;
          ctx.fillStyle = "#ee66aa";
          ctx.beginPath();
          ctx.arc(rad+gaps*x,rad+ gaps*y, rad, 0, Math.PI*2, true);
          ctx.closePath();
          ctx.fill();

          // ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
        } else if (patch.type == "wolf"){
          ctx.fillStyle = "#383838";
          ctx.beginPath();
          ctx.arc(wolfrad+gaps*x,wolfrad+ gaps*y, wolfrad, 0, Math.PI*2, true);
          ctx.closePath();
          ctx.fill();
          // ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
        }
  		}
  	}

    this.transitionBG();

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
      for( let y = 0; y < this.canvasHeight; y++){
        this.updateCell(x,y);
        let animal = this.grid[x][y].previousAnimal;




        if(animal instanceof Animal && animal.alive){
          if(animal instanceof Rabbit){
            let availableSpaces = animal.availableSpaces();

            for(let i = 0; i < availableSpaces.length ; i++){
              let newCoords = availableSpaces[i]
              let newX = newCoords[0];
              let newY = newCoords[1];
              let newCell = this.nextGrid[newX][newY];
              if(newCell.animal == null){
                newCell.addAnimal(animal);
                break;
              }
            }
          } else if(animal instanceof Wolf){
            let newCoords = animal.randomNeighbor();
            let newX = newCoords[0];
            let newY = newCoords[1];
            let newCell = this.nextGrid[newCoords[0]][newCoords[1]];
          // debugger
          newCell.addAnimal(animal);
          }

          if(animal.shouldReproduce()){


            let currentCell = this.nextGrid[x][y];
            if(animal instanceof Rabbit){
              currentCell.addNewRabbit();
              this.birthedRabbits ++;
            } else{
              currentCell.addNewWolf();
            }

          }
        } else if(animal instanceof Rabbit && !animal.alive){
          this.deadRabbits ++;
        }
        // }

        }
      }
    if(this.rabbitCount < 8){
      console.log("next grid", this.nextGrid);

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
  	window.setTimeout(this.gameLoop, 50);
  }}

  toggleGame(){
    this.play = !this.play;
    if(this.play){
      this.gameLoop();
    }
  }
}

module.exports = Board;
