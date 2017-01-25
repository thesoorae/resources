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
	  canvas.width = 10 * 40;
	  canvas.height = 10 * 40;
	  canvas.style.width = canvas.width;
	  canvas.style.height = canvas.height;
	  let board = new Board(ctx);
	  board.start();
	  canvas.onclick = function fun() {
	        board.step();
	      };
	    });


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Cell = __webpack_require__(2);
	const Rabbit = __webpack_require__(3);
	const Wolf = __webpack_require__(4);
	
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
	    this.nextGrid[x][y].addAnimal(animal);
	  }
	  //updates grid with newGrid
	  step(){
	    for( let x = 0; x < this.canvasWidth; x++){
	      for( let y = 0; y < this.canvasWidth; y++){
	        this.nextGrid[x][y] = this.grid[x][y].updateGrass();
	        this.nextGrid[x][y] = this.grid[x][y].moveAnimal();
	
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
	    this.draw();
	  }
	
	}
	
	module.exports = Board;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Rabbit = __webpack_require__(3);
	const Wolf = __webpack_require__(4);
	
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
	    // if(animal !== null){
	    //   this.type = animal.name;
	    // }
	
	
	    this.updateGrass = this.updateGrass.bind(this);
	    this.addAnimal = this.addAnimal.bind(this);
	    this.neighbors = this.neighbors.bind(this);
	    this.addNewRabbit = this.addNewRabbit.bind(this);
	    this.addNewWolf = this.addNewWolf.bind(this);
	    this.moveAnimal = this.moveAnimal.bind(this);
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
	    if(coord[0] > 0 && coord[1] > 0 ){
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
	}
	
	addNewRabbit(){
	  this.animal = new Rabbit(this.cell, this.board);
	  this.type = "rabbit";
	}
	
	addNewWolf(){
	  this.animal = new Wolf(this.cell);
	  this.type = "wolf";
	}
	
	
	updateGrass(){
	    console.log("updating grass");
	//decreases grass level if there is a rabbit
	    if(this.type === "rabbit"){
	        this.grassLevel -= 3
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
	
	    return this.cell;
	  }
	
	
	moveAnimal(){
	  if(this.animal !== null){
	  this.animal.move();
	  }
	}
	
	}
	
	module.exports = Cell;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class Rabbit{
	  constructor(cell, board){
	    this.food = 0;
	    this.age = 0;
	    this.dead = false;
	    this.name = "rabbit";
	    // this.currentX = x;
	    // this.currentY = y;
	    this.board = board;
	    this.cell = cell;
	
	
	    this.eat = this.eat.bind(this);
	    this.update = this.update.bind(this);
	    this.increaseAge = this.increaseAge.bind(this);
	    this.openSpaces = this.openSpaces.bind(this);
	    this.move = this.move.bind(this);
	  }
	
	  eat(){
	    let currentPatch = this.cell;
	
	    if(this.food < 45){
	    this.food += currentPatch.grassLevel;
	    currentPatch.grassLevel -= 1;
	    this.food -= 3;
	  }
	    else{
	    this.food -= 3;
	  }}
	
	  increaseAge(){
	    this.age ++;
	  //change parameters for reproduction
	    // if(this.age > 3 && (Math.random()*10) > 9 ){
	    //   this.move(new Rabbit()));
	    // }
	
	  }
	
	  openSpaces(){
	    let spaces = [];
	    let neighbors = this.cell.neighbors();
	    for(let g = 5; g > 0; g ++){
	      if(spaces.length > 0){
	        return spaces;
	      } else {
	        neighbors.forEach((patch) => {
	          if(patch.type === "grass" && patch.grassLength === g){
	            spaces.push([patch.currentX, patch.currentY]);
	          }
	        });
	      }
	    }
	    return spaces;
	  }
	
	  move(){
	    
	   let openSpaces = this.openSpaces();
	   let idx = Math.random() * openSpaces.length;
	   this.board.moveAnimal(openSpaces[idx][0], openSpaces[idx][1], this);
	  }
	
	
	
	  update(){
	    this.eat();
	    this.increaseAge();
	    this.move();
	  }
	
	    }
	
	module.exports = Rabbit;


/***/ },
/* 4 */
/***/ function(module, exports) {

	class Wolf{
	constructor(){
	  this.food = 0;
	  this.age = 0;
	  this.name = "wolf";
	}
	update(){
	}
	}
	
	module.exports = Wolf;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map