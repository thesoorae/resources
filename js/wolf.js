const Animal = require('./animal.js');

class Wolf extends Animal{
constructor(cell){
  super(cell);
  this.food = 0;
  this.age = 0;
  this.name = "wolf";

}


update(){
}
move(){

}
}

module.exports = Wolf;
