const Animal = require('./animal.js');

class Rabbit extends Animal{
  constructor(cell){
    super(cell);
    this.food = 1;
    this.age = 0;
    this.alive = true;
    this.name = "rabbit";

    this.maxFood = 45;
    this.metabolicRate = 3;
    this.maxAge = 10;
    this.reproductiveAge = 5;
    this.reproductiveFoodRequirement = 5;

    // this.currentX = x;
    // this.currentY = y;
    this.cell = cell;


    this.eat = this.eat.bind(this);
    this.openSpaces = this.openSpaces.bind(this);
    this.newSpace = this.newSpace.bind(this);
    this.mortality = this.mortality.bind(this);
    this.shouldReproduce = this.shouldReproduce.bind(this);
  }
  newCell(cell){
    this.cell = cell;
  }

  eat(){
    console.log("in eat");
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
  this.mortality();

  }

  mortality(){
    this.age ++;
    if(this.maxAge > 20 || this.food < 1){
      this.alive = false;
    }

  //change parameters for reproduction
    // if(this.age > this.metabolicRate && (Math.random()*10) > 9 ){
    //   this.move(new Rabbit()));
    // }

  }

  openSpaces(){

    let spaces = [];
    // debugger
    let neighbors = this.cell.neighbors();

    for(let g = 5; g > 0; g --){
      if(spaces.length > 0){
        return spaces;
      } else {
        neighbors.forEach((neighbor) => {
          if(neighbor.type === "grass" && neighbor.grassLevel === g){
            spaces.push([neighbor.currentX, neighbor.currentY]);
          }
        });
      }
    }
    return spaces;
  }

  newSpace(){

   let openSpaces = this.openSpaces();
   let idx = Math.floor(Math.random() * openSpaces.length);
   let result = [this.cell.currentX, this.cell.currentY];
   if(openSpaces[idx] !== undefined){
     result = [openSpaces[idx][0], openSpaces[idx][1]];
  }
    return result;
  }

  shouldReproduce(){
  return this.age > this.reproductiveAge && this.food > this.reproductiveFoodRequirement

  }
    }

module.exports = Rabbit;
