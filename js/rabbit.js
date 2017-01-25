class Rabbit{
  constructor(x, y, board){
    this.food = 0;
    this.age = 0;
    this.dead = false;
    this.name = "rabbit";
    this.currentX = x;
    this.currentY = y;
    this.board = board;


    this.eat = this.eat.bind(this);
    this.update = this.update.bind(this);
    this.increaseAge = this.increaseAge.bind(this);
  }

  eat(){
    let currentPatch = this.board.grid[this.currentX][this.currentY];
    if(this.food < 45){
    this.food += currentPatch.grassLevel;
    currentPatch.grassLevel -= 1;
    this.food -= 3;
  }
    else{
    this.food -= 3;
  }}

  increaseAge(){
    this.age ++;
  //change parameters for reproduction
    if(this.age > 3 && (Math.random()*10) > 9 ){
      this.board.addRabbit(this.currentX + 1, this.currentY + 1, this.currentX)
    }

  }

  update(){
    this.eat();
    this.increaseAge();
  }

    }

module.exports = Rabbit;
