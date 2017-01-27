const Animal = require('./animal.js');

const default_prey_params = {
  'init-food': 1,
    'm-rate': 2,
    'm-age': 17,
    'r-age': 5,
    'r-food': 25,
    'max-food':45
  };

class Rabbit extends Animal{
  constructor(cell, params=default_prey_params, id){
    super(cell, params, id);
    this.age = 0;
    this.alive = true;
    this.name = "rabbit";
    this.params = params;


    // this.maxFood = params['max-food'];
    // this.metabolicRate = params['m-rate'];
    // this.maxAge = 17;
    // this.reproductiveAge = 5;
    // this.reproductiveFoodRequirement = 25;

    // this.currentX = x;
    // this.currentY = y;
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
