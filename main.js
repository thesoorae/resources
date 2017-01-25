const Board = require('./js/board');


document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 10 * 50;
  canvas.height = 10 * 50;
  canvas.style.width = canvas.width;
  canvas.style.height = canvas.height;
  let board = new Board(ctx);
  board.start();
  canvas.onclick = function fun() {
        board.toggleGame();
      };
    });
