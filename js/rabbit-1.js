const Animal = require('./animal.js');

//inherit rabbit from animal

class Rabbit extends Animal{
  constructor(x,y){
    food: 0,
    age: 0,

    //HOW TO DO THIS
    currentPatch: Grid[x][y],

    nearestGrass: this.findNearestGrass(x,y);
  }

  eat(){
  switch(rabbit.food){
    case (< 45):
    rabbit.food += rabbit.currentPatch.grass;
    rabbit.food -= 3;
    break;
    default:
    rabbit.food -= 3;
  }
  reproduce(){
    switch(rabbit.age){
      case (> 25):
      delete rabbit;
      break;

      case 10:
      if(Math.random()*2 === 1 && rabbit.food >= 40 && nearestGrass.length > 0){
        generateRabbit(nearestGrass);
      }
      break;
      // if no change based on age, rabbit either stays
      //on current patch if more than 3, or move rabbit to nearest suitable grass
      default:
      if(currentPatch < 3){
        move(nearestGrass);}
    }
  }


  }




function generateRabbit(nearestGrass){
  // makes new rabbit
  let idx = Math.random()*nearestGrass.length;

  // EDIT check that this will work to access indices
  grid2[nearestGrass[idx]] = Rabbit.new();
}

function moveRabbit(rabbit, patch){
  grid2[patch[0]][patch[1]] = rabbit;
  rabbit.currentPatch = patch;
}

function findNearestGrass(patch){
  let x = patch[0];
  let y = patch[1];
  let patches = [];

  //check all nearby squares
for (let g = 5; g > 0; g--){
  if(patches.length > 0){
    return patches
  } else {
    counter(x-1,y-1, g);
  	counter(x-1,y, g);
  	counter(x-1,y+1, g);
  	counter(x,y-1, g);
  	counter(x,y+1, g);
  	counter(x+1,y-1 , g);
  	counter(x+1,y , g);
  	counter(x+1,y+1 ,g);
  };

  function counter(x,y,g){
    if(x > 0 && x < gridWidth && y > 0 && y < gridHeight){
      if (grid[x][y] == g) patches.push([x,y]);
    }
  }
  }

  }
}

}

}

module.exports = Rabbit;
