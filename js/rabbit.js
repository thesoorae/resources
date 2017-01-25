class Rabbit{
  constructor(x, y, currentGrid, newGrid){
    this.food = 0;
    this.age = 0;
    this.dead = false;
    this.currentX = x;
    this.currentY = y;
    this.currentGrid = currentGrid;
    this.newGrid = newGrid;

    this.eat = this.eat.bind(this);
  }

  eat(){
    let currentPatch = this.currentGrid[this.currentX][this.currentY];
    if(this.food < 45){
    this.food += currentPatch.grassLevel;
    currentPatch.grassLevel -= 1;
    this.food -= 3;
  }
    else{
    this.food -= 3;
  }}

    }

module.exports = Rabbit;
