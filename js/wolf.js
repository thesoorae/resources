const Animal = require('./animal.js');

class Wolf extends Animal{
constructor(cell){
  super(cell);
  this.food = 0;
  this.age = 0;
  this.name = "wolf";

  this.randomNeighbor = this.randomNeighbor.bind(this);
  this.openSpaces = this.openSpaces.bind(this);
  this.eat = this.eat.bind(this);
  this.shouldReproduce = this.shouldReproduce.bind(this);
}

openSpaces(){
  let neighbors = this.cell.neighbors();
  let spaces = [];
  neighbors.forEach((neighbor) => {
    if(neighbor.type == "rabbit"){
      spaces.push(neighbor);
    }
  });
  return spaces;
}

randomNeighbor(){

 let openSpaces = this.openSpaces();
 let idx = Math.floor(Math.random() * openSpaces.length);
 let result = [this.cell.currentX, this.cell.currentY];
 if(openSpaces[idx] !== undefined){
   let neighbor = openSpaces[idx];
   this.eat(neighbor.animmal);
   result = [neighbor.currentX, neighbor.currentY];
}
  return result;
}

eat(rabbit){
  if(this.food < 200){
    this.food += rabbit.food;
    rabbit.kill();
  }

}

shouldReproduce(){
  return false;
}

}

module.exports = Wolf;
