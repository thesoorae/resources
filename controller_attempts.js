const inputControls = () => {
  let prey_params = {
      initial-food: 1,
      metabolism: 2,
      max-age: 17,
      repro-age: 5,
      repro-food: 25,
      max-food:25
    };
  let predator_params = {
      initial-food: 50,
      metabolism: 4,
      max-age: 50,
      repro-age: 10,
      repro-food: 20,
      max-food:200
    };
  let grass_params = {
      rate: 1
    };
  // let result = {};
  // result['prey'] = {};
  // result['prey']['initial-food'] = 1;
  // result['prey']['metabolism'] = 2;
  // result['prey']['max-age'] = 17;
  //   result['prey']['repro-age'] = 5;
  //     result['prey']['repro-food'] 25;
  //     result['prey']['max-food'] = 25;
//setting and getting prey controls

const prey = document.getElementById('prey-controls');
createParamInputs(prey, prey_params);
const predator = document.getElementById('predator-controls');
createParamInputs(predator);

const createParamInputs = (container, params) => {

  const controls = [{
    name: "Initial Food Level",
    abbrev: "initial-food"
  },
  {
    name: "Metabolic Rate",
    abbrev: "metabolism"
  },
  {
    name: "Maximum Age",
    abbrev: "max-age"
  },
  {
    name: "Reproductive Age",
    abbrev: "repro-age"
  },
  {
    name: "Food for Reproduction",
    abbrev: "repro-food"
  },
  {
    name: "Maximum Food Capacity",
    abbrev: "max-food"
  }];


  controls.forEach(control => {
    let label = document.createElement("label");
    let textnode = document.createTextNode(control.name);
    let input = document.createElement("input");
    input.setAttribute("type", "range");
    input.setAttribute("min", "0");
    input.setAttribute("max", "100");
    input.setAttribute("step", "1");
    input.setAttribute("value", "5");
    let output = document.createTextNode(params[control.abbrev]);
    label.appendChild(textnode);
    label.appendChild(input);
    label.appendChild(output);
    container.appendChild(label);
  })
}}
