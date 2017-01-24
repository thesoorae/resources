const Board = require('./board.js');

class View {
  constructor($el){
    this.$el = $el;

    this.board = new Board(30);
    this.setupGrid();
    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
    );
  }

render(){
  this.updateClasses(this.board.rabbits)
}
}

View.STEP_MILLIS = 100;

module.exports = View;
