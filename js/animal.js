class Animal{
  constructor(cell){
    this.cell = cell;
    this.alive = true;
    this.updateCell = this.updateCell.bind(this);
    this.kill = this.kill.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

updateCell(cell){
  this.cell = cell;
}
kill(){
  this.alive = false;
}

shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}


}

module.exports = Animal;
