const Board = require('./js/board');
const Control = require('./js/control');


document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const frame = document.getElementById('frame');
  const canvasContainer = document.getElementById('canvas-container');
  const stats_panel = document.getElementById('stats-panel');


  const x = window.innerWidth || document.documentElement.clientWidth;
  const y = window.innerHeight || document.documentElement.clientHeight;
  const width = parseInt(x * .055);
  const height = parseInt(y * .065);


  canvas.width = 12 * width;
  canvas.height = 12 * height;
  frame.style.width = x;
  frame.style.height = y;
  canvas.style.width = canvas.width;
  canvas.style.height = canvas.height;
  stats_panel.style.width = canvas.width;
  stats_panel.style.height = canvas.height;
  canvasContainer.style.width = canvas.width;
  canvasContainer.style.height = canvas.height;

  let control = new Control(frame, ctx, width, height);

  control.createControls();

  canvasContainer.onclick = function fun() {
        control.toggleGame();
      };
    });
