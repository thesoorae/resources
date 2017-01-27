#LAGOLUPUS BALANCE

## Background

LAGOLUPUS BALANCE is based on the real-time, multi-agent simulation "Rabbits and Wolves" and utilizes the **cellular automata** concept to illustrate the dynamics between predators (black), prey (pink), and plants (green/white) in an ecosystem. Each player on the board makes decisions based on a variety of variables and considerations, including the behavior of other players on the board, and updates its situation at every step of the "game". How it updates is determined by parameters that are set as defaults, but can also be altered by the client-side. Users have full control over almost every aspect of each player's behavior, determining their food consumption and usage, reproduction parameters, and mortality rates, as well as the growth rates for the plant-matter that feeds the prey.

Data trackers at the bottom of the screen provide real-time data on the state of the ecosystem. Color of grass cells reflects their current grass level, with the darkest green representing the highest level (5) and the lightest color representing low grass levels. When all animals have died out on the screen, the game ends.  

**Instructions**
1. Click the Game Board to start the first game with default settings.
2. Change the levels of different parameters using the sliders on the left. When all parameters are set as desired, click "Set & Ready" to set up the new board.
3. Click the Game Board to start the game with the new parameters.
4. Try to get as high a number of steps as possible before all animals die out.
5. If you'd like to watch how the players behave on the board at each step, you can advance the board by clicking on the "Step" button.


**Game Rules**
1. Two prey cannot occupy the same section of grass.
2. Two predators cannot occupy the same section of grass.
3. Each prey can only eat grass when he has not reached his maximum food capacity. (The maximum food capacity can be modified).
4. A predator will not eat a prey if the prey will make him surpass his maximum food capacity. (The maximum food capacity can be modified).
5. Prey and predators can only reproduce when they reach a certain age and have a sufficient amount of food. (The age of reproduction and amount of food required to reproduce can be modified).
6. When predators eat prey, they absorb the food content of that animal.
7. Prey and predators can only move up, down, left, or right one space at a time.
8. Prey and predators die if they get too old or if there is insufficient food. (Maximum age can be modified).
9. The grass growth rate is 1. (This growth rate can be modified).
10. Maximum grass length is 5.


##Improvements on Original Game
The original Rabbits and Wolves plays out on a 30 x 30 rectangular grid.  There is only one or two versions out there that incorporate model three agents, and most simulations only demonstrate the interactio between two agents (rabbit, and fox). For the game that did contain the third agent of "grass", the "rabbit" merely moved to the next space, without assessing the grass level.

In LAGOLUPUS, the prey player analyses the grass level of its surroundings in order to select the ones that will yield the highest metabolic density. Prey iterate over their surrounding cells and consider first the cells that have the highest level of grass (5). If that is unavailable, the prey will then assess for the second highest level of grass, and so on. If no grass is available, the prey will move to any open space, or stay in its original spot.

The ```availableSpaces()``` implementation can be seen in the code below.

```
availableSpaces(){
    let spaces = [];
    let neighbors = this.cell.neighbors();
      for(let g = 5; g > 0; g --){
        if(spaces.length > 0){
          break;
        } else {
          neighbors.forEach((neighbor) => {
            if(neighbor.type === "grass" && neighbor.grassLevel === g){
              spaces.push([neighbor.currentX, neighbor.currentY]);
            }
          });
        }
      }
    spaces = this.shuffle(spaces);
    spaces.push([this.cell.currentX, this.cell.currentY]);
    return spaces;
  }
  ```


The original game also featured only the characters of "Rabbit" and "Wolf" or in some cases, "Fox". I abstracted this game out to represent Predators and Prey on a more general level (though, if you look through my code, I still use module names of ```Rabbit``` and ```Wolf```, as it made it easier to type and reference).

Current examples of Rabbit and Wolf online, of which there are only a few, are dated and technical in implementation. LAGOLUPUS presents a sleek, modern user interface and display with dynamic background transitions based on game data, and larger boards that go beyond the original 30x30 grid.


## Technical Features

This simulation was built entirely with JavaScript(ES6) and HTML5/Canvas. All DOM queries were done in vanilla Javascript to keep the game light, to offset the heavy computing done on the ```step()``` method.

The game utilizes JavaScript ES6 classes and Webpack to break the game components into 6 modules. They are as follows:

###Control

Handles the board creation, setup, and game toggling, as well as responsive client input controls.

###Board
Holds all the Cell modules, holds all current Cells in ```this.grid```, handles ```Step()``` logic to update each ```Cell``` and ```Animal```, storing each next move on ```this.nextGrid```, and calls ```draw()``` on the updated Grid object to render it to the Canvas. Also handles real-time updating of the game stats at the bottom of the board.

###Cell

Stores its grass level, neighboring cells, and ```Animal``` information. Handles update on its grass levels as well as calling ```eat()``` for the ```Rabbit``` class. Also has ability to add a new ```Animal``` to its cell.

###Animal

Prototype class that is extended to ```Rabbit``` and ```Wolf```, handles taking parameters to store onto each ```Animal```, updating its cell location through ```updateCell()```, and also provides ```kill()``` functions.

###Rabbit

Soon to be renamed to ```Prey```, ```Rabbit``` holds the ability to ```eat()```, which also decreases the ```Cell``` grass level, ```availableSpaces()``` which assesses which of its surrounding cells would be most optimal for it to move to, and ```shouldReproduce()``` logic.

###Wolf

Soon to be renamed to ```Predator```, ```Wolf``` holds the ability to ```eat()```, which also kills the ```Rabbit```, ```availableSpaces()``` which assesses which of its surrounding cells has a ```Rabbit``` and if none is found, stores an array of random spaces, and ```shouldReproduce()``` logic.


## Testing

Some testing code is available within the game to track the progress and behavior of individual players on the game board.

<<<<<<< HEAD
Within the ```Board``` class, there are lines to identify one ```Rabbit``` and one ```Wolf``` based on an ```id``` that is given to each at time of constructor call, and follow it through each step. There is also a line that will color this player to better visualize it on the board as the game progresses.
=======
Within the ```Board``` class, there are lines to identify one ```Rabbit``` and one ```Wolf``` based on an ```id``` that is given to each at time of constructor call, and follow it through each step by logging the player's information. There is also a line that will color this player to better visualize it on the board as the game progresses. These lines can be found on ```Board.js:20, 186, 199, 212```.
>>>>>>> master
