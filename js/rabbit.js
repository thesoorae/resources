class Rabbit{
  constructor(cell, board){
    this.food = 0;
    this.age = 0;
    this.dead = false;
    this.name = "rabbit";
    // this.currentX = x;
    // this.currentY = y;
    this.board = board;
    this.cell = cell;


    this.eat = this.eat.bind(this);
    this.update = this.update.bind(this);
    this.increaseAge = this.increaseAge.bind(this);
    this.openSpaces = this.openSpaces.bind(this);
    this.move = this.move.bind(this);
  }
  newCell(cell){
    this.cell = cell;
  }

  eat(){
    let neededFood = 45 - this.food;
    if(this.cell.grassLevel < neededFood){
    this.food += this.cell.grassLevel;
    this.cell.eatGrass(this.cell.grassLevel);
    this.food -= 3;
  } else{
    this.food += neededFood;
    this.cell.eatGrass(neededFood);
    this.food -= 3;
  }

  }

  increaseAge(){
    this.age ++;
  //change parameters for reproduction
    // if(this.age > 3 && (Math.random()*10) > 9 ){
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
    console.log("open spaces", spaces);
    return spaces;
  }

  move(){

   let openSpaces = this.openSpaces();
   let idx = Math.floor(Math.random() * openSpaces.length);
   let result = [this.cell.currentX, this.cell.currentY];
   if(openSpaces[idx] !== undefined){
     result = [openSpaces[idx][0], openSpaces[idx][1]];
  }
    return result;
  }



  update(){
    this.eat();
    this.increaseAge();
    this.move();
  }

    }

module.exports = Rabbit;
