class Controls {

  constructor(frame, ctx){

    
  }
}

const createControls = (board) => {
  let prey_params = {
    'init-food': 1,
      'm-rate': 2,
      'm-age': 17,
      'r-age': 5,
      'r-food': 25,
      'max-food':25
    };
  let predator_params = {
      'pred-init-food': 50,
      'pred-m-rate': 4,
      'pred-m-age': 50,
      'pred-r-age': 10,
      'pred-r-food': 20,
      'pred-max-food':200
    };
  let grass_params = {
      'grass-rate': 1,
      'grass-start': 3,
      'grass-max':5,
    };
//prey hard code controls

  const initial_food = document.getElementById('initial-food-slider');
  const metabolism = document.getElementById('metabolism-slider');
  const max_age = document.getElementById('max-age-slider');
  const repro_age = document.getElementById('repro-age-slider');
  const repro_food = document.getElementById('repro-food-slider');
  const max_food = document.getElementById('max-food-slider');

  initial_food.oninput = () => {
    outputUpdate('init-food', initial_food.value);}

  metabolism.oninput = () => {
    outputUpdate('m-rate', metabolism.value);}

  max_age.oninput = () => {
    outputUpdate('m-age', max_age.value);}

  repro_age.oninput = () => {
    outputUpdate('r-age', repro_age.value);}

  repro_food.oninput = () => {
    outputUpdate('r-food', repro_food.value);}

  max_food.oninput = () => {
    outputUpdate('max-food', max_food.value);}

    const outputUpdate = (output_id, val) => {
      prey_params[output_id] = val;
      document.querySelector(`#${output_id}`).value = val;
    }

    const pred_initial_food = document.getElementById('pred-initial-food-slider');
    const pred_metabolism = document.getElementById('pred-metabolism-slider');
    const pred_max_age = document.getElementById('pred-max-age-slider');
    const pred_repro_age = document.getElementById('pred-repro-age-slider');
    const pred_repro_food = document.getElementById('pred-repro-food-slider');
    const pred_max_food = document.getElementById('pred-max-food-slider');


    pred_initial_food.oninput = () => {
      predOutputUpdate('pred-init-food', pred_initial_food.value);}

    pred_metabolism.oninput = () => {
      predOutputUpdate('pred-m-rate', pred_metabolism.value);}

    pred_max_age.oninput = () => {
      predOutputUpdate('pred-m-age', pred_max_age.value);}

    pred_repro_age.oninput = () => {
      predOutputUpdate('pred-r-age', pred_repro_age.value);}

    pred_repro_food.oninput = () => {
      predOutputUpdate('pred-r-food', pred_repro_food.value);}

    pred_max_food.oninput = () => {
      predOutputUpdate('pred-max-food', pred_max_food.value);}

  const predOutputUpdate = (output_id, val) => {
    predator_params[output_id] = val;
    document.querySelector(`#${output_id}`).value = val;}

  const grass_rate = document.getElementById('grass-slider');
    grass_rate.oninput = () => {
      grassUpdate('grass-rate', grass_rate.value);}

  const grass_start = document.getElementById('grass-start-slider');
    grass_start.oninput = () => {
      grassUpdate('grass-start', grass_start.value);}

  const grass_max = document.getElementById('grass-max-slider');
    grass_max.oninput = () => {
      grassUpdate('grass-max', grass_max.value);}

  const grassUpdate = (output_id, val) => {
    grass_params['output_id'] = val;
    document.querySelector(`#${output_id}`).value = val;
}

const startButton = document.getElementById('start-game');
startButton.onclick = () => {
  console.log(prey_params, predator_params, grass_params);
  board.getParamsStart(prey_params, predator_params, grass_params);
}
}
