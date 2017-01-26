const Rabbit = require('./rabbit');
const Wolf = require('./wolf');
const Animal = require('./animal.js');


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
debugger
  return this.animal.move();
  }
}

}

module.exports = Cell;
