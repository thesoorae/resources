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
	  new Board(ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Cell = __webpack_require__(2);
	
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Cell {
	  constructor(type, x, y){
	    this.type = type;
	    this.currentX = x;
	    this.currentY = y;
	  }
	}
	
	module.exports = Cell;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map