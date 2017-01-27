const Rabbit = require('./rabbit');
const Wolf = require('./wolf');
const Animal = require('./animal.js');

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


moveAnimal(){
  if(this.type === "rabbit"){

  return this.animal.move();
  }
}

}

module.exports = Cell;
