const Board = require('./board');


document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  new Board(ctx).gameLoop();
});
