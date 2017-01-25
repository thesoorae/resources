const Rabbit = require('./rabbit');
const Wolf = require('./wolf');

class Cell {
  constructor(x, y, type="grass", animal=null){
    this.type = "grass";
    this.currentX = x;
    this.currentY = y;
    this.grassLevel = 3;
    this.animal = animal;

    if(animal instanceof Rabbit){
      this.type = "rabbit";
    } else if(animal instanceof Wolf){
      this.type = "wolf";
    }

    this.update = this.update.bind(this);
  }


  update(){
    console.log("in update");
    if(this.animal !== null){
        this.animal.update();
        if(this.animal.dead){
          this.animal = null;
          this.type = "grass";
        }
        this.grassLevel --;
    } else
    if(this.grassLevel < 5){
      this.grassLevel ++;
    }

    if(this.grassLevel < 0) {
      this.grassLevel = 0;
    }

    if(this.grassLevel > 5) {
      this.grassLevel = 5;
    }

    return this;
  }
}




module.exports = Cell;
