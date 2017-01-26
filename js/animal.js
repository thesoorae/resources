class Animal{
  constructor(cell){
    this.cell = cell;
    this.alive = true;
    this.updateCell = this.updateCell.bind(this);
    this.kill = this.kill.bind(this);
  }

updateCell(cell){
  this.cell = cell;
}
kill(){
  this.alive = false;
}
}

module.exports = Animal;
