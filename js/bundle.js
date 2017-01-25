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
	  let board = new Board(ctx)
	  board.start();
	  canvas.onclick = function fun() {
	        board.step();
	
	}});


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
	    this.addRabbit = this.addRabbit.bind(this);
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
	          this.grid[x][y] = new Cell(x,y, "wolf", new Wolf(x, y, this.board));
	        } else if(rand > 90 ){
	          this.grid[x][y] = new Cell(x,y, "rabbit", new Rabbit(x, y, this.board));
	        } else {
	          this.grid[x][y] = new Cell(x,y, "grass");
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
	
	  addRabbit(x,y,z){
	    this.rabbitList.push([x,y,z]);
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
	      console.log("patch", this.nextGrid[a][b]);
	      if((a > 0) && (a < this.canvasWidth) && ( b > 0) && (b < this.canvasWidth)){
	        console.log(a, b);
	      this.nextGrid[a][b].addAnimal(new Rabbit(a, b, this.board));
	      }
	
	    })
	
	    this.grid = this.nextGrid;
	    this.draw();
	    console.log("next grid", this.nextGrid);
	  }
	
	}
	
	module.exports = Board;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Rabbit = __webpack_require__(3);
	const Wolf = __webpack_require__(4);
	
	class Cell {
	  constructor(x, y, type="grass", animal=null){
	    this.type = "grass";
	    this.currentX = x;
	    this.currentY = y;
	    this.grassLevel = 3;
	    this.animal = animal;
	
	    if(animal !== null){
	      this.type = animal.name;
	    }
	    
	
	    this.update = this.update.bind(this);
	    this.addAnimal = this.addAnimal.bind(this);
	
	  }
	
	addAnimal(animal){
	  this.animal = animal;
	  this.type = animal.name;
	}
	  update(){
	    console.log("in update");
	    if(this.animal !== null){
	        this.animal.update();
	        if(this.animal.dead){
	          this.animal = null;
	          this.type = "grass";
	        }
	        this.grassLevel --;
	    } else
	    if(this.grassLevel < 5){
	      this.grassLevel ++;
	    }
	
	    if(this.grassLevel < 0) {
	      this.grassLevel = 0;
	    }
	
	    if(this.grassLevel > 5) {
	      this.grassLevel = 5;
	    }
	
	    return this;
	  }
	}
	
	
	
	
	module.exports = Cell;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class Rabbit{
	  constructor(x, y, board){
	    this.food = 0;
	    this.age = 0;
	    this.dead = false;
	    this.name = "rabbit";
	    this.currentX = x;
	    this.currentY = y;
	    this.board = board;
	
	
	    this.eat = this.eat.bind(this);
	    this.update = this.update.bind(this);
	    this.increaseAge = this.increaseAge.bind(this);
	  }
	
	  eat(){
	    let currentPatch = this.board.grid[this.currentX][this.currentY];
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
	    if(this.age > 3 && (Math.random()*10) > 9 ){
	      this.board.addRabbit(this.currentX + 1, this.currentY + 1, this.currentX)
	    }
	
	  }
	
	  update(){
	    this.eat();
	    this.increaseAge();
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