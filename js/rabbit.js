const Animal = require('./animal.js');



class Rabbit extends Animal{
  constructor(cell, params=default_prey_params, id){
    super(cell, params, id);
    this.age = 0;
    this.alive = true;
    this.name = "rabbit";
    this.cell = cell;
    this.eat = this.eat.bind(this);
    this.availableSpaces = this.availableSpaces.bind(this);
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

  shouldReproduce(){
    return this.age > this.reproductiveAge && this.food > this.reproductiveFoodRequirement
  }
}

module.exports = Rabbit;
