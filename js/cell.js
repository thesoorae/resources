const Rabbit = require('./rabbit');
const Wolf = require('./wolf');

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


    this.update = this.update.bind(this);
    this.addAnimal = this.addAnimal.bind(this);
    this.neighbors = this.neighbors.bind(this);
    this.addNewRabbit = this.addNewRabbit.bind(this);
    this.addNewWolf = this.addNewWolf.bind(this);
  }

neighbors(type){
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
    if(this.board.grid[a][b].type === type){
      neighbors.push(this.board.grid[a,b]);
    }
  }});
  return neighbors;
  }

addAnimal(animal){
  this.animal = animal;
  this.type = animal.name;
}
addNewRabbit(){
  this.animal = new Rabbit(this.cell);
  this.type = "rabbit";
}

addNewWolf(){
  this.animal = new Wolf(this.cell);
  this.type = "wolf";
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
