/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(1);
	
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvas = document.getElementById('gameCanvas');
	  const ctx = canvas.getContext('2d');
	  const frame = document.getElementById('frame');
	  canvas.width = 10 * 50;
	  // 10 * 50;
	  canvas.height = 10* 50;
	  frame.style.width = 1400;
	  frame.style.height = 700;
	  canvas.style.width = canvas.width;
	  canvas.style.height = canvas.height;
	  let board = new Board(frame, ctx);
	  board.start();
	  canvas.onclick = function fun() {
	        board.toggleGame();
	      };
	    });


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Cell = __webpack_require__(2);
	const Rabbit = __webpack_require__(3);
	const Wolf = __webpack_require__(5);
	const Animal = __webpack_require__(4);
	
	class Board{
	  constructor(frame, ctx){
	    this.frame = frame;
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
	    this.transitionBG = this.transitionBG.bind(this);
	
	  }
	
	  transitionBackground(){
	    if(this.steps > 60){
	      this.frame.style.backgroundImage = "url('http://res.cloudinary.com/indiemomo/image/upload/c_fill,h_400,w_800/v1485406390/other/overgrazed2.jpg')";
	    } else if(this.steps > 30){
	      this.frame.style.backgroundImage = "url('http://res.cloudinary.com/indiemomo/image/upload/c_fill,h_400,w_800/v1485406391/other/dying_forest.jpg')";
	    }
	    else {
	      this.frame.style.backgroundImage = "url('http://res.cloudinary.com/indiemomo/image/upload/c_fill,h_400,w_800/v1485406391/other/forest-07.jpg')";
	    }
	    this.frame.style.backgroundSize="cover";
	  }
	
	  transitionBG(){
	    let bg_images = this.frame.childNodes;
	
	    if(this.rabbitCount > 300){
	      bg_images[1].className = "visible";
	      bg_images[3].className = "transparent";
	      bg_images[5].className = "transparent";
	      bg_images[7].className = "transparent";
	    } else if(this.rabbitCount > 200){
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
	    let start_x = 30;
	    for (let x =0; x < this.canvasWidth; x++) {
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
	      for( let y = 0; y < this.canvasWidth; y++){
	        this.updateCell(x,y);
	        let animal = this.grid[x][y].previousAnimal;
	        if(animal instanceof Animal && animal.alive){
	          if(animal instanceof Wolf){
	            // debugger
	          }
	        let newCoords = animal.randomNeighbor();
	        let newX = newCoords[0];
	        let newY = newCoords[1];
	
	
	
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
	  	window.setTimeout(this.gameLoop, 200);
	  }}
	
	  toggleGame(){
	    this.play = !this.play;
	    if(this.play){
	      this.gameLoop();
	    }
	  }
	}
	
	module.exports = Board;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Rabbit = __webpack_require__(3);
	const Wolf = __webpack_require__(5);
	const Animal = __webpack_require__(4);
	
	
	class Cell {
	  constructor(board, x, y){
	    this.type = "grass";
	    this.currentX = x;
	    this.currentY = y;
	    this.grassLevel = 3;
	    // this.animal = animal;
	    this.board = board;
	    this.animal = null;
	    this.cell = this;
	    this.previousAnimal = null;
	    // if(animal !== null){
	    //   this.type = animal.name;
	    // }
	
	
	    this.updateGrass = this.updateGrass.bind(this);
	    this.addAnimal = this.addAnimal.bind(this);
	    this.neighbors = this.neighbors.bind(this);
	    this.addNewRabbit = this.addNewRabbit.bind(this);
	    this.addNewWolf = this.addNewWolf.bind(this);
	    this.moveAnimal = this.moveAnimal.bind(this);
	    this.eatGrass = this.eatGrass.bind(this);
	    this.empty = this.empty.bind(this);
	  }
	empty(){
	  this.animal = null;
	  this.type = "grass";
	}
	neighbors(){
	  let neighbors = [];
	  let x = this.currentX;
	  let y = this.currentY;
	  const spots = [
	    [x-1 , y-1],
	    [x-1 , y],
	    [x-1 , y + 1 ],
	    [x, y - 1],
	    [x, y + 1],
	    [x + 1 , y - 1],
	    [x + 1 , y ],
	    [x + 1 , y + 1]
	  ];
	  spots.forEach((coord) => {
	    if(coord[0] >= 0 && coord[1] >= 0 ){
	    let a = coord[0] % this.board.canvasWidth;
	    let b = coord[1] % this.board.canvasWidth;
	    neighbors.push(this.board.grid[a][b]);
	    }
	  });
	  return neighbors;
	  }
	
	addAnimal(animal){
	  this.animal = animal;
	  this.type = animal.name;
	  this.animal.updateCell(this.cell);
	}
	
	addNewRabbit(){
	  this.animal = new Rabbit(this.cell);
	  this.type = "rabbit";
	}
	
	addNewWolf(){
	  this.animal = new Wolf(this.cell);
	  this.type = "wolf";
	}
	
	eatGrass(amt){
	  this.grassLevel -= amt;
	}
	
	updateGrass(){
	//decreases grass level if there is a rabbit
	    if(this.animal instanceof Animal){
	      this.animal.mortality();}
	
	      if(this.type === "rabbit"){
	        this.animal.eat();
	      }
	        else if(this.grassLevel < 5){
	      this.grassLevel ++;
	    }
	
	    if(this.grassLevel < 0) {
	      this.grassLevel = 0;
	    }
	
	    if(this.grassLevel > 5) {
	      this.grassLevel = 5;
	    }
	    this.previousAnimal = this.animal;
	    this.animal = null;
	    this.type = "grass";
	    return this.cell;
	  }
	
	
	moveAnimal(){
	  console.log("in move animal");
	  if(this.type === "rabbit"){
	
	  return this.animal.move();
	  }
	}
	
	}
	
	module.exports = Cell;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Animal = __webpack_require__(4);
	
	class Rabbit extends Animal{
	  constructor(cell){
	    super(cell);
	    this.food = 1;
	    this.age = 0;
	    this.alive = true;
	    this.name = "rabbit";
	
	    this.maxFood = 45;
	    this.metabolicRate = 2;
	    this.maxAge = 14;
	    this.reproductiveAge = 5;
	    this.reproductiveFoodRequirement = 15;
	
	    // this.currentX = x;
	    // this.currentY = y;
	    this.cell = cell;
	
	
	    this.eat = this.eat.bind(this);
	    this.openSpaces = this.openSpaces.bind(this);
	    this.randomNeighbor = this.randomNeighbor.bind(this);
	    this.mortality = this.mortality.bind(this);
	    this.shouldReproduce = this.shouldReproduce.bind(this);
	  }
	  newCell(cell){
	    this.cell = cell;
	  }
	
	
	  eat(){
	    console.log("in eat");
	    let neededFood = this.maxFood - this.food;
	    if(this.cell.grassLevel < neededFood){
	    this.food += this.cell.grassLevel;
	    this.cell.eatGrass(this.cell.grassLevel);
	    this.food -= this.metabolicRate;
	  } else{
	    this.food += neededFood;
	    this.cell.eatGrass(neededFood);
	    this.food -= this.metabolicRate;
	  }
	
	  }
	
	
	
	  mortality(){
	    this.age ++;
	    if(this.age > this.maxAge || this.food < 1){
	      this.kill();
	    }
	
	  //change parameters for reproduction
	    // if(this.age > this.metabolicRate && (Math.random()*10) > 9 ){
	    //   this.move(new Rabbit()));
	    // }
	
	  }
	
	  openSpaces(){
	
	    let spaces = [];
	    // debugger
	    let neighbors = this.cell.neighbors();
	
	    for(let g = 5; g > 0; g --){
	      if(spaces.length > 0){
	        return spaces;
	      } else {
	        neighbors.forEach((neighbor) => {
	          if(neighbor.type === "grass" && neighbor.grassLevel === g){
	            spaces.push([neighbor.currentX, neighbor.currentY]);
	          }
	        });
	      }
	    }
	    return spaces;
	  }
	
	  randomNeighbor(){
	
	   let openSpaces = this.openSpaces();
	   let idx = Math.floor(Math.random() * openSpaces.length);
	   let result = [this.cell.currentX, this.cell.currentY];
	   if(openSpaces[idx] !== undefined){
	     result = [openSpaces[idx][0], openSpaces[idx][1]];
	  }
	    return result;
	  }
	
	  shouldReproduce(){
	  return this.age > this.reproductiveAge && this.food > this.reproductiveFoodRequirement
	
	  }
	    }
	
	module.exports = Rabbit;


/***/ },
/* 4 */
/***/ function(module, exports) {

	class Animal{
	  constructor(cell){
	    this.cell = cell;
	    this.alive = true;
	    this.updateCell = this.updateCell.bind(this);
	    this.kill = this.kill.bind(this);
	  }
	
	updateCell(cell){
	  this.cell = cell;
	}
	kill(){
	  this.alive = false;
	}
	}
	
	module.exports = Animal;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Animal = __webpack_require__(4);
	
	class Wolf extends Animal{
	constructor(cell){
	  super(cell);
	  this.food = 50;
	  this.age = 0;
	  this.name = "wolf";
	  this.alive = true;
	
	
	  this.maxAge = 3000;
	  this.maxFood = 200;
	  this.metabolicRate = 7;
	
	  this.randomNeighbor = this.randomNeighbor.bind(this);
	  this.openSpaces = this.openSpaces.bind(this);
	  this.eat = this.eat.bind(this);
	  this.shouldReproduce = this.shouldReproduce.bind(this);
	  this.mortality = this.mortality.bind(this);
	}
	
	
	
	mortality(){
	  this.age ++;
	  this.food -= this.metabolicRate;
	  if(this.age > this.maxAge || this.food < 1){
	    this.kill();
	  }
	
	}
	openSpaces(){
	  let neighbors = this.cell.neighbors();
	
	  let rabbitSpaces = [];
	  let emptySpaces = [];
	    neighbors.forEach((neighbor) => {
	
	    if(neighbor.type == "rabbit"){
	      rabbitSpaces.push(neighbor);
	    } else if(neighbor.type == "grass"){
	      emptySpaces.push(neighbor);
	    }
	  });
	  if(rabbitSpaces.length > 0){
	  emptySpaces = rabbitSpaces;
	  }
	  return emptySpaces;
	}
	
	randomNeighbor(){
	
	 let openSpaces = this.openSpaces();
	 let idx = Math.floor(Math.random() * openSpaces.length);
	 let result = [this.cell.currentX, this.cell.currentY];
	 if(openSpaces[idx] !== undefined){
	  //  debugger
	   let neighbor = openSpaces[idx];
	   this.eat(neighbor.animal);
	   result = [neighbor.currentX, neighbor.currentY];
	}
	  return result;
	}
	
	eat(rabbit){
	  if(rabbit !== null){
	    if(this.food < this.maxFood){
	      this.food += rabbit.food;
	      rabbit.kill();
	    }
	  }
	
	}
	
	shouldReproduce(){
	  return false;
	}
	
	}
	
	module.exports = Wolf;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map