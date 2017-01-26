const Board = require('./js/board');


document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const frame = document.getElementById('frame');
  canvas.width = 10 * 50;
  // 10 * 50;
  canvas.height = 10* 50;
  frame.style.width = 1400;
  frame.style.height = 700;
  canvas.style.width = canvas.width;
  canvas.style.height = canvas.height;
  let board = new Board(frame, ctx);
  board.start();
  canvas.onclick = function fun() {
        board.toggleGame();
      };
    });
