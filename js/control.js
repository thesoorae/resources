const Board = require('./board');

class Control{
  constructor(frame, ctx){
    this.frame = frame;
    this.ctx = ctx;
    this.board = null;
    this.prey = {
      'init-food': 1,
        'm-rate': 2,
        'm-age': 17,
        'r-age': 5,
        'r-food': 25,
        'max-food':25
      };
    this.predator = {
          'init-food': 50,
          'm-rate': 4,
          'm-age': 50,
          'r-age': 10,
          'r-food': 20,
          'max-food':200
        };
    this.grass = {
      'grass-rate': 1,
      'grass-start': 3,
      'grass-max':5
    };


    this.createControls = this.createControls.bind(this);
    this.sendParams = this.sendParams.bind(this);
    this.toggleGame = this.toggleGame.bind(this);
  }

  sendParams(){
    let board = new Board(this.frame, this.ctx, this.prey, this.predator, this.grass);
    this.board = board;
    this.board.start();
  }

  toggleGame(){
    if(this.board !== null){
      this.board.toggleGame();

    }
  }

  createControls(){
    let board = new Board(this.frame, this.ctx, this.prey, this.predator, this.grass);
    this.board = board;
    this.board.start();
  //prey hard code controls
  // debugger
      const initial_food = document.getElementById('initial-food-slider');
      const metabolism = document.getElementById('metabolism-slider');
      const max_age = document.getElementById('max-age-slider');
      const repro_age = document.getElementById('repro-age-slider');
      const repro_food = document.getElementById('repro-food-slider');
      const max_food = document.getElementById('max-food-slider');

      initial_food.oninput = () => {
        outputUpdate('init-food', initial_food.value);};

      metabolism.oninput = () => {
        outputUpdate('m-rate', metabolism.value);};

      max_age.oninput = () => {
        outputUpdate('m-age', max_age.value);};

      repro_age.oninput = () => {
        outputUpdate('r-age', repro_age.value);};

      repro_food.oninput = () => {
        outputUpdate('r-food', repro_food.value);};

      max_food.oninput = () => {
        outputUpdate('max-food', max_food.value);};

        const outputUpdate = (output_id, val) => {
          this.prey[output_id] = val;
          document.querySelector(`#${output_id}`).value = val;
        };

        const pred_initial_food = document.getElementById('pred-initial-food-slider');
        const pred_metabolism = document.getElementById('pred-metabolism-slider');
        const pred_max_age = document.getElementById('pred-max-age-slider');
        const pred_repro_age = document.getElementById('pred-repro-age-slider');
        const pred_repro_food = document.getElementById('pred-repro-food-slider');
        const pred_max_food = document.getElementById('pred-max-food-slider');


        pred_initial_food.oninput = () => {
          predOutputUpdate('init-food', pred_initial_food.value);};

        pred_metabolism.oninput = () => {
          predOutputUpdate('m-rate', pred_metabolism.value);};

        pred_max_age.oninput = () => {
          predOutputUpdate('m-age', pred_max_age.value);};

        pred_repro_age.oninput = () => {
          predOutputUpdate('r-age', pred_repro_age.value);};

        pred_repro_food.oninput = () => {
          predOutputUpdate('r-food', pred_repro_food.value);};

        pred_max_food.oninput = () => {
          predOutputUpdate('max-food', pred_max_food.value);};

      const predOutputUpdate = (output_id, val) => {
        this.predator[output_id] = val;
        document.querySelector(`#${output_id}`).value = val;};

      const grass_rate = document.getElementById('grass-slider');
        grass_rate.oninput = () => {
          grassUpdate('grass-rate', grass_rate.value);};

      const grass_start = document.getElementById('grass-start-slider');
        grass_start.oninput = () => {
          grassUpdate('grass-start', grass_start.value);};

      const grass_max = document.getElementById('grass-max-slider');
        grass_max.oninput = () => {
          grassUpdate('grass-max', grass_max.value);};

      const grassUpdate = (output_id, val) => {
        this.grass[output_id] = val;
        document.querySelector(`#${output_id}`).value = val;
    };

    const startButton = document.getElementById('start-game');
    startButton.onclick = () => {
      this.sendParams(this.prey, this.predator, this.grass);
    };
  }


}

module.exports = Control;
