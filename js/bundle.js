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
	const Control = __webpack_require__(2);
	
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvas = document.getElementById('gameCanvas');
	  const ctx = canvas.getContext('2d');
	  const frame = document.getElementById('frame');
	  const canvasContainer = document.getElementById('canvas-container');
	  canvas.width = 12 * 70;
	  // 10 * 50;
	  canvas.height = 12* 50;
	  frame.style.width = 1400;
	  frame.style.height = 700;
	  canvas.style.width = canvas.width;
	  canvas.style.height = canvas.height;
	
	  let control = new Control(frame, ctx);
	
	  control.createControls();
	
	  canvasContainer.onclick = function fun() {
	        control.toggleGame();
	      };
	    });
	// const createControls = (board) => {
	//   let prey_params = {
	//     'init-food': 1,
	//       'm-rate': 2,
	//       'm-age': 17,
	//       'r-age': 5,
	//       'r-food': 25,
	//       'max-food':25
	//     };
	//   let predator_params = {
	//       'pred-init-food': 50,
	//       'pred-m-rate': 4,
	//       'pred-m-age': 50,
	//       'pred-r-age': 10,
	//       'pred-r-food': 20,
	//       'pred-max-food':200
	//     };
	//   let grass_params = {
	//       'grass-rate': 1,
	//       'grass-start': 3,
	//       'grass-max':5,
	//     };
	// //prey hard code controls
	//
	//   const initial_food = document.getElementById('initial-food-slider');
	//   const metabolism = document.getElementById('metabolism-slider');
	//   const max_age = document.getElementById('max-age-slider');
	//   const repro_age = document.getElementById('repro-age-slider');
	//   const repro_food = document.getElementById('repro-food-slider');
	//   const max_food = document.getElementById('max-food-slider');
	//
	//   initial_food.oninput = () => {
	//     outputUpdate('init-food', initial_food.value);}
	//
	//   metabolism.oninput = () => {
	//     outputUpdate('m-rate', metabolism.value);}
	//
	//   max_age.oninput = () => {
	//     outputUpdate('m-age', max_age.value);}
	//
	//   repro_age.oninput = () => {
	//     outputUpdate('r-age', repro_age.value);}
	//
	//   repro_food.oninput = () => {
	//     outputUpdate('r-food', repro_food.value);}
	//
	//   max_food.oninput = () => {
	//     outputUpdate('max-food', max_food.value);}
	//
	//     const outputUpdate = (output_id, val) => {
	//       prey_params[output_id] = val;
	//       document.querySelector(`#${output_id}`).value = val;
	//     }
	//
	//     const pred_initial_food = document.getElementById('pred-initial-food-slider');
	//     const pred_metabolism = document.getElementById('pred-metabolism-slider');
	//     const pred_max_age = document.getElementById('pred-max-age-slider');
	//     const pred_repro_age = document.getElementById('pred-repro-age-slider');
	//     const pred_repro_food = document.getElementById('pred-repro-food-slider');
	//     const pred_max_food = document.getElementById('pred-max-food-slider');
	//
	//
	//     pred_initial_food.oninput = () => {
	//       predOutputUpdate('pred-init-food', pred_initial_food.value);}
	//
	//     pred_metabolism.oninput = () => {
	//       predOutputUpdate('pred-m-rate', pred_metabolism.value);}
	//
	//     pred_max_age.oninput = () => {
	//       predOutputUpdate('pred-m-age', pred_max_age.value);}
	//
	//     pred_repro_age.oninput = () => {
	//       predOutputUpdate('pred-r-age', pred_repro_age.value);}
	//
	//     pred_repro_food.oninput = () => {
	//       predOutputUpdate('pred-r-food', pred_repro_food.value);}
	//
	//     pred_max_food.oninput = () => {
	//       predOutputUpdate('pred-max-food', pred_max_food.value);}
	//
	//   const predOutputUpdate = (output_id, val) => {
	//     predator_params[output_id] = val;
	//     document.querySelector(`#${output_id}`).value = val;}
	//
	//   const grass_rate = document.getElementById('grass-slider');
	//     grass_rate.oninput = () => {
	//       grassUpdate('grass-rate', grass_rate.value);}
	//
	//   const grass_start = document.getElementById('grass-start-slider');
	//     grass_start.oninput = () => {
	//       grassUpdate('grass-start', grass_start.value);}
	//
	//   const grass_max = document.getElementById('grass-max-slider');
	//     grass_max.oninput = () => {
	//       grassUpdate('grass-max', grass_max.value);}
	//
	//   const grassUpdate = (output_id, val) => {
	//     grass_params['output_id'] = val;
	//     document.querySelector(`#${output_id}`).value = val;
	// }
	//
	// const startButton = document.getElementById('start-game');
	// startButton.onclick = () => {
	//   console.log(prey_params, predator_params, grass_params);
	//   board.getParamsStart(prey_params, predator_params, grass_params);
	// }
	// }


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Cell = __webpack_require__(3);
	const Rabbit = __webpack_require__(4);
	const Wolf = __webpack_require__(6);
	const Animal = __webpack_require__(5);
	
	class Board{
	  constructor(frame, ctx, speed, ratio, prey, predator, grass){
	    this.frame = frame;
	    this.ctx = ctx;
	    this.width = 12;
	    this.canvasWidth = 70;
	    this.canvasHeight = 50;
	
	    this.board = this;
	    this.gameOverText = document.querySelector('#game-over');
	
	    this.grid = [];
	    this.nextGrid = [];
	//TESTING
	    this.oneRabbit = null;
	    this.oneWolf = null;
	    this.rabbitId = 0;
	    this.wolfId = 0;
	//TESTING
	
	
	    this.rabbitCount = 0;
	    this.deadRabbits = 0;
	    this.steps = 0;
	    this.birthedRabbits = 0;
	
	    this.wolfCount = 0;
	    this.deadWolves = 0;
	    this.birthedWolves = 0;
	
	    this.totalGrass = 0;
	
	    this.play = false;
	    this.lastTime = 0;
	
	    this.preyParams = prey;
	    this.predatorParams = predator;
	    this.grassParams = grass;
	    this.speed = (1 / parseInt(speed)) * 1000;
	    this.ratio = (1 / (parseInt(ratio)+1))*100;
	
	
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
	    this.updateStats = this.updateStats.bind(this);
	    this.gameOver = this.gameOver.bind(this);
	
	  }
	
	updateStats(){
	
	document.querySelector('.rabbit-count').innerHTML = this.rabbitCount.toString();
	document.querySelector('.dead-rabbits').innerHTML = this.deadRabbits.toString();
	document.querySelector('.birthed-rabbits').innerHTML = this.birthedRabbits.toString();
	
	document.querySelector('.wolf-count').innerHTML = this.wolfCount.toString();
	document.querySelector('.dead-wolves').innerHTML = this.deadWolves.toString();
	document.querySelector('.birthed-wolves').innerHTML = this.birthedWolves.toString();
	
	document.querySelector('.avg-grass').innerHTML = this.avgGrass();
	document.querySelector('.step-count').innerHTML = this.steps.toString();
	
	if(this.gameOver()){
	  this.gameOverText.innerHTML = "All the Animals Are Dead!";
	    this.toggleGame();
	}
	
	};
	
	gameOver(){
	  return this.rabbitCount == 0 && this.wolfCount == 0;
	};
	avgGrass(){
	  return (parseInt(this.totalGrass / (this.canvasWidth * this.canvasHeight))).toString();
	}
	  transitionBG(){
	    let bg_images = this.frame.childNodes;
	
	    if(this.avgGrass() < 3){
	      bg_images[1].className = "visible";
	      bg_images[3].className = "transparent";
	      bg_images[5].className = "transparent";
	    } else if(this.avgGrass() < 5){
	      bg_images[1].className = "transparent";
	      bg_images[3].className = "visible";
	      bg_images[5].className = "transparent";
	    } else {
	      bg_images[1].className = "transparent";
	      bg_images[3].className = "transparent";
	      bg_images[5].className = "visible";
	    }
	  }
	
	  patch(x,y){
	    return this.grid[x][y];
	  }
	
	  start(){
	    this.gameOverText.innerHTML = "Click to Start or Pause";
	
	    this.setupGrid();
	    this.draw();
	  }
	  setupGrid(){
	    for(let x=0; x < this.canvasWidth; x++){
	      this.grid[x] = [];
	      this.nextGrid[x] =  [];
	      for( let y = 0; y< this.canvasHeight; y++ ){
	        this.grid[x][y] = [];
	        this.nextGrid[x][y] = new Cell(this.grassParams, this.board, x,y, "grass");
	
	  //EDIT
	
	        let rand = Math.random()*1000;
	
	        if(rand > (1000 - this.ratio)){
	          this.grid[x][y] = new Cell(this.grassParams, this.board, x,y);
	          this.grid[x][y].addNewWolf(this.predatorParams, this.wolfId);
	          this.wolfId ++;
	        } else if(rand > 900 ){
	          this.grid[x][y] = new Cell(this.grassParams, this.board, x,y);
	          this.grid[x][y].addNewRabbit(this.preyParams, this.rabbitId);
	          this.rabbitId ++;
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
	        this.totalGrass += patch.grassLevel;
	
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
	//TESTING
	          // if(patch.animal.id == 1){
	          //   ctx.fillStyle ="#FFFF00";
	          // }
	          ctx.beginPath();
	          ctx.arc(rad+gaps*x,rad+ gaps*y, rad, 0, Math.PI*2, true);
	          ctx.closePath();
	          ctx.fill();
	
	          // ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
	        } else if (patch.type == "wolf"){
	          this.wolfCount ++;
	          ctx.fillStyle = "#383838";
	//TESTING
	      // if(patch.animal.id == 1){
	      //     ctx.fillStyle ="#FF0000";
	      //       }
	          ctx.beginPath();
	          ctx.arc(wolfrad+gaps*x,wolfrad+ gaps*y, wolfrad, 0, Math.PI*2, true);
	          ctx.closePath();
	          ctx.fill();
	          // ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
	        }
	  		}
	  	}
	
	    this.transitionBG();
	    //TESTING
	    console.log("one rabbit", this.oneRabbit);
	    // console.log("one wolf", this.oneWolf);
	    this.updateStats();
	
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
	            if(animal.id == 1){
	              this.oneRabbit = animal;
	            }
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
	            if(animal.id == 1){
	              this.oneWolf = animal;
	            }
	            let newCoords = animal.randomNeighbor();
	            let newX = newCoords[0];
	            let newY = newCoords[1];
	            let newCell = this.nextGrid[newCoords[0]][newCoords[1]];
	          // debugger
	          newCell.addAnimal(animal);
	          }
	
	          if(animal.shouldReproduce()){
	
	            const chance = Math.random()*2 > 1;
	
	            let currentCell = this.nextGrid[x][y];
	            if(animal instanceof Rabbit && chance){
	              currentCell.addNewRabbit(this.preyParams);
	              this.birthedRabbits ++;
	            } else if(animal instanceof Wolf && chance){
	
	              currentCell.addNewWolf(this.predatorParams);
	              this.birthedWolves ++;
	            }
	
	          }
	        } else if(animal instanceof Animal && !animal.alive){
	          if(animal instanceof Rabbit){
	            this.deadRabbits ++;
	          } else if(animal instanceof Wolf){
	            this.deadWolves ++;
	          }
	
	        }
	        // }
	
	        }
	      }
	
	
	
	    this.grid = this.nextGrid;
	    this.rabbitCount = 0;
	    this.wolfCount = 0;
	    this.totalGrass = 0;
	    this.steps ++;
	
	    this.draw();
	  }
	
	  gameLoop(){
	    if(this.play){
	      let now = Date.now();
	      let dt = (now - this.lastTime) / 1000.0;
	
	      this.step(dt);
	
	      this.lastTime = now;
	  	window.setTimeout(this.gameLoop, this.speed);
	  }}
	
	  toggleGame(){
	    this.play = !this.play;
	    if(this.play){
	      this.gameOverText.className="invisible";
	      this.gameLoop();
	    } else{
	      this.gameOverText.className="";
	    }
	  }
	}
	
	module.exports = Board;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(1);
	
	class Control{
	  constructor(frame, ctx){
	    this.frame = frame;
	    this.ctx = ctx;
	    this.board = null;
	    this.prey = {
	      'init-food': 1,
	        'm-rate': 1,
	        'm-age': 17,
	        'r-age': 3,
	        'r-food': 5,
	        'max-food':25
	      };
	    this.predator = {
	          'init-food': 50,
	          'm-rate': 5,
	          'm-age': 50,
	          'r-age': 10,
	          'r-food': 40,
	          'max-food':100
	        };
	    this.grass = {
	      'grass-rate': 1,
	      'grass-start': 3,
	      'grass-max':5
	    };
	
	
	    this.speed = 20;
	    this.ratio = 5;
	
	
	    this.createControls = this.createControls.bind(this);
	    this.sendParams = this.sendParams.bind(this);
	    this.toggleGame = this.toggleGame.bind(this);
	    this.step = this.step.bind(this);
	  }
	
	  sendParams(){
	
	    let board = new Board(this.frame, this.ctx, this.speed, this.ratio, this.prey, this.predator, this.grass);
	
	    this.board = board;
	    this.board.start();
	  }
	
	  toggleGame(){
	    if(this.board !== null){
	        this.board.toggleGame();
	      }
	  }
	  step(){
	    if(this.board !== null){
	      this.board.step();
	    }
	  }
	
	  createControls(){
	    this.sendParams();
	  //prey hard code controls
	  // debugger
	      const initial_food = document.getElementById('initial-food-slider');
	      const metabolism = document.getElementById('metabolism-slider');
	      const max_age = document.getElementById('max-age-slider');
	      const repro_age = document.getElementById('repro-age-slider');
	      const repro_food = document.getElementById('repro-food-slider');
	      const max_food = document.getElementById('max-food-slider');
	
	      initial_food.oninput = () => {
	        outputUpdate('init-food', initial_food.value);};
	
	      metabolism.oninput = () => {
	        outputUpdate('m-rate', metabolism.value);};
	
	      max_age.oninput = () => {
	        outputUpdate('m-age', max_age.value);};
	
	      repro_age.oninput = () => {
	        outputUpdate('r-age', repro_age.value);};
	
	      repro_food.oninput = () => {
	        outputUpdate('r-food', repro_food.value);};
	
	      max_food.oninput = () => {
	        outputUpdate('max-food', max_food.value);};
	
	        const outputUpdate = (output_id, val) => {
	          this.prey[output_id] = val;
	          document.querySelector(`#${output_id}`).value = val;
	        };
	
	        const pred_initial_food = document.getElementById('pred-initial-food-slider');
	        const pred_metabolism = document.getElementById('pred-metabolism-slider');
	        const pred_max_age = document.getElementById('pred-max-age-slider');
	        const pred_repro_age = document.getElementById('pred-repro-age-slider');
	        const pred_repro_food = document.getElementById('pred-repro-food-slider');
	        const pred_max_food = document.getElementById('pred-max-food-slider');
	
	
	        pred_initial_food.oninput = () => {
	          predOutputUpdate('init-food', pred_initial_food.value);};
	
	        pred_metabolism.oninput = () => {
	          predOutputUpdate('m-rate', pred_metabolism.value);};
	
	        pred_max_age.oninput = () => {
	          predOutputUpdate('m-age', pred_max_age.value);};
	
	        pred_repro_age.oninput = () => {
	          predOutputUpdate('r-age', pred_repro_age.value);};
	
	        pred_repro_food.oninput = () => {
	          predOutputUpdate('r-food', pred_repro_food.value);};
	
	        pred_max_food.oninput = () => {
	          predOutputUpdate('max-food', pred_max_food.value);};
	
	      const predOutputUpdate = (output_id, val) => {
	        this.predator[output_id] = val;
	        document.querySelector(`#pred-${output_id}`).value = val;};
	
	      const grass_rate = document.getElementById('grass-slider');
	        grass_rate.oninput = () => {
	          grassUpdate('grass-rate', grass_rate.value);};
	
	      const grass_start = document.getElementById('grass-start-slider');
	        grass_start.oninput = () => {
	          grassUpdate('grass-start', grass_start.value);};
	
	      const grass_max = document.getElementById('grass-max-slider');
	        grass_max.oninput = () => {
	          grassUpdate('grass-max', grass_max.value);};
	
	      const grassUpdate = (output_id, val) => {
	        this.grass[output_id] = val;
	        document.querySelector(`#${output_id}`).value = val;
	    };
	
	    const setParams = document.getElementById('set-game');
	    setParams.onclick = () => {
	      this.sendParams(this.prey, this.predator, this.grass);
	    };
	    const stepGame = document.getElementById('step-game');
	    stepGame.onclick = () => {
	      this.step();
	    };
	
	    const speedCounter = document.getElementById('speed-slider');
	      speedCounter.oninput = () => {
	        this.speed = speedCounter.value;
	        document.querySelector(`#speed-output`).value = speedCounter.value;
	
	    };
	    const populationRatio = document.getElementById('population-ratio-slider');
	      populationRatio.oninput = () => {
	        this.ratio = populationRatio.value;
	        document.querySelector(`#ratio`).value = populationRatio.value;
	
	    };
	
	
	  }
	
	
	}
	
	module.exports = Control;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Rabbit = __webpack_require__(4);
	const Wolf = __webpack_require__(6);
	const Animal = __webpack_require__(5);
	
	const default_params = {
	  'grass-rate': 1,
	  'grass-start': 3,
	  'grass-max':5
	};
	class Cell {
	  constructor(params=default_params, board, x, y){
	
	    this.type = "grass";
	    this.currentX = x;
	    this.currentY = y;
	    this.grassLevel = parseInt(params['grass-start']);
	    this.grassGrowRate = parseInt(params['grass-rate']);
	    this.grassMax = parseInt(params['grass-max'])
	
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
	    // let a = coord[0] % this.board.canvasWidth;
	    // let b = coord[1] % this.board.canvasHeight;
	
	    let a = coord[0];
	    let b = coord[1];
	
	    if(a >= this.board.canvasWidth){
	      a = a - this.board.canvasWidth;
	    }
	
	    if( b >= this.board.canvasHeight){
	      b = b - this.board.canvasHeight;
	    }
	    if(a < 0){
	      a = this.board.canvasWidth + a;
	    }
	    if(
	        b < 0){
	          b = this.board.canvasHeight + b;
	        }
	    neighbors.push(this.board.grid[a][b]);
	
	  });
	  return neighbors;
	  }
	
	  //
	  // if(coord[0] >= 0 && coord[1] >= 0 ){
	  // let a = coord[0] % this.board.canvasWidth;
	  // let b = coord[1] % this.board.canvasHeight;
	  // neighbors.push(this.board.grid[a][b]);
	  // }
	
	
	
	addAnimal(animal){
	  this.animal = animal;
	  this.type = animal.name;
	  this.animal.updateCell(this.cell);
	}
	//TESTING
	addNewRabbit(params, id){
	  this.animal = new Rabbit(this.cell, params, id);
	  this.type = "rabbit";
	  this.rabbitId ++;
	}
	//TESTING
	addNewWolf(params, id){
	  this.animal = new Wolf(this.cell, params, id);
	  this.type = "wolf";
	  this.wolfId ++;
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
	        else if(this.grassLevel < this.grassMax){
	      this.grassLevel += this.grassGrowRate;
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
	
	
	
	
	}
	
	module.exports = Cell;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Animal = __webpack_require__(5);
	
	
	
	class Rabbit extends Animal{
	  constructor(cell, params=default_prey_params, id){
	    super(cell, params, id);
	    this.age = 0;
	    this.alive = true;
	    this.name = "rabbit";
	
	
	
	    this.cell = cell;
	
	
	    this.eat = this.eat.bind(this);
	    this.availableSpaces = this.availableSpaces.bind(this);
	    // this.randomNeighbor = this.randomNeighbor.bind(this);
	    this.mortality = this.mortality.bind(this);
	    this.shouldReproduce = this.shouldReproduce.bind(this);
	  }
	  newCell(cell){
	    this.cell = cell;
	  }
	
	
	  eat(){
	
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
	
	  availableSpaces(){
	
	    let spaces = [];
	
	    let neighbors = this.cell.neighbors();
	    for(let g = 5; g > 0; g --){
	      if(spaces.length > 0){
	        break;
	      } else {
	        neighbors.forEach((neighbor) => {
	// TEST
	          if(neighbor.type === "grass" && neighbor.grassLevel === g){
	            spaces.push([neighbor.currentX, neighbor.currentY]);
	          }
	        });
	      }
	    }
	
	      spaces = this.shuffle(spaces);
	
	      spaces.push([this.cell.currentX, this.cell.currentY]);
	
	    return spaces;
	  }
	
	  // randomNeighbor(){
	  //
	  //  let openSpaces = this.openSpaces();
	  //  let idx = Math.floor(Math.random() * openSpaces.length);
	  //  let result = [this.cell.currentX, this.cell.currentY];
	  //  if(openSpaces[idx] !== undefined){
	  //    result = [openSpaces[idx][0], openSpaces[idx][1]];
	  // }
	  //   return result;
	  // }
	
	  shouldReproduce(){
	  return this.age > this.reproductiveAge && this.food > this.reproductiveFoodRequirement
	
	  }
	    }
	
	module.exports = Rabbit;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class Animal{
	  constructor(cell, params, id=200){
	    this.cell = cell;
	
	//TESTING
	    this.id = id;
	    this.maxFood = params['max-food'];
	    this.metabolicRate = params['m-rate'];
	    this.maxAge = params['m-age'];
	    this.reproductiveAge = params['r-age'];
	    this.reproductiveFoodRequirement = params['r-food'];
	    this.food = params['init-food'];
	
	
	    this.alive = true;
	    this.updateCell = this.updateCell.bind(this);
	    this.kill = this.kill.bind(this);
	    this.shuffle = this.shuffle.bind(this);
	  }
	
	updateCell(cell){
	  this.cell = cell;
	}
	kill(){
	  this.alive = false;
	}
	
	shuffle(a) {
	    for (let i = a.length; i; i--) {
	        let j = Math.floor(Math.random() * i);
	        [a[i - 1], a[j]] = [a[j], a[i - 1]];
	    }
	    return a;
	}
	
	
	}
	
	module.exports = Animal;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Animal = __webpack_require__(5);
	
	
	
	class Wolf extends Animal{
	constructor(cell, params=default_predator_params, id){
	  super(cell, params, id);
	  this.age = 0;
	  this.name = "wolf";
	  this.alive = true;
	
	
	
	
	  this.randomNeighbor = this.randomNeighbor.bind(this);
	  this.availableSpaces = this.availableSpaces.bind(this);
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
	availableSpaces(){
	  let neighbors = this.cell.neighbors();
	
	  let rabbitSpaces = [];
	  let emptySpaces = [];
	
	  //TESTING
	
	
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
	
	 let openSpaces = this.availableSpaces();
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
	  return this.age > this.reproductiveAge && this.food > this.reproductiveFoodRequirement
	}
	
	}
	
	module.exports = Wolf;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map