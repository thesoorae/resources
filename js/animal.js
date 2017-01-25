class Animal{
  constructor(cell){
    this.cell = cell;
    
    this.updateCell = this.updateCell.bind(this);
  }

updateCell(cell){
  this.cell = cell;
}

}

module.exports = Animal;
