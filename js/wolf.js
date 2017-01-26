const Animal = require('./animal.js');

class Wolf extends Animal{
constructor(cell){
  super(cell);
  this.food = 50;
  this.age = 0;
  this.name = "wolf";
  this.alive = true;


  this.maxAge = 20;
  this.maxFood = 200;
  this.metabolicRate = 15;

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
