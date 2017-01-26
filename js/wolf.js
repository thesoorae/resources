const Animal = require('./animal.js');

class Wolf extends Animal{
constructor(cell){
  super(cell);
  this.food = 50;
  this.age = 0;
  this.name = "wolf";
  this.alive = true;


  this.maxAge = 50;
  this.maxFood = 200;
  this.metabolicRate = 4;
  this.reproductiveAge = 10;
  this.reproductiveFoodRequirement = 20;

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
