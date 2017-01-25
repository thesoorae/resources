class Rabbit{
  constructor(cell){
    this.food = 0;
    this.age = 0;
    this.dead = false;
    this.name = "rabbit";
    // this.currentX = x;
    // this.currentY = y;
    // this.board = board;
    this.cell = cell;


    this.eat = this.eat.bind(this);
    this.update = this.update.bind(this);
    this.increaseAge = this.increaseAge.bind(this);
    this.openSpaces = this.openSpaces.bind(this);
    this.move = this.move.bind(this);
  }

  eat(){
    let currentPatch = this.cell;

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
    // if(this.age > 3 && (Math.random()*10) > 9 ){
    //   this.move(new Rabbit()));
    // }

  }

  openSpaces(){
    let spaces = [];
    console.log("this.cell", this.cell);
    for(let g = 5; g > 0; g ++){
      if(spaces.length > 0){
        return spaces;
      } else {
    this.cell.neighbors("grass").forEach((patch) => {
          if(patch.grassLength === g && patch.animal == null){
            spaces.push(patch);
          }
        });
      }
    }
    console.log(spaces);
    return spaces;
  }

  move(){
   let openSpaces = this.openSpaces();
   let idx = Math.random() * openSpaces.length;
   this.cell.board.moveAnimal(openSpaces[idx][0], openSpaces[idx][1], this);
  }



  update(){
    this.eat();
    this.increaseAge();
    this.move();
  }

    }

module.exports = Rabbit;
