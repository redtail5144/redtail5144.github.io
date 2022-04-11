var p0Scores = [];
var p0Tot = [0,0,0];
var p1Scores = [];
var p1Tot = [0,0,0];
var round = 0;

// Initalizes everything
// for the game
function init() {
  p0Scores = [];
  p0Tot = [0,0,0];
  p1Scores = [];
  p1Tot = [0,0,0];
  round = 0;
  getNames();
  document.getElementById("roundDisplay").innerHTML = "Round " + round;
}

// Alert box that gets names of throwers
// Loops until two non null non empty
// Names are entered
function getNames(){
  let pName;
  do {
    pName = prompt("Player 1 name:", "Player 1");
  } while (pName == null || pName == "")
  document.getElementById("name1").innerHTML = pName;
  do {
    pName = prompt("Player 2 name:", "Player 2");
  } while (pName == null || pName == "")
  document.getElementById("name2").innerHTML = pName;
}

// When target is clicked
// Value is value of area
// Player is which Player
// 0 == left 1 == right
function targetClick(player, value) {
  let tot = parseInt(document.getElementById(player.concat("tot")).innerHTML);
  // Checks if the undo button was pressed
  if (value == "undo") {
    switch (player) {
      case "p0":
        p0Tot[round] -= p0Scores.pop();
        break;
      case "p1":
        p1Tot[round] -= p1Scores.pop();
        break;
    }
  } else {
    switch (player) {
      case "p0":
        p0Scores.push(value);
        p0Tot[round] += value;
        break;
      case "p1":
        p1Scores.push(value);
        p1Tot[round] += value;
        break;
      }
  }

  console.log(p0Scores);
  console.log(p1Scores);

  document.getElementById("p0tot").innerHTML = p0Tot[round];
  document.getElementById("p1tot").innerHTML = p1Tot[round];

  console.log("p0tot: " + p0Tot[round]);
  console.log("p1tot: " + p1Tot[round]);

  //let tot = parseInt(document.getElementById(player.concat("tot")).innerHTML);
  // Checks if the undo button was pressed
  /*if (value == "undo") {
    // If it was looks from the end for a number
    // Then turns that number into a "-"
    for (let i = 5; i >= 0; i--)
      if (document.getElementById(player.concat("axe", i)).innerHTML != "-") {
        tot -= parseInt(document.getElementById(player.concat("axe", i)).innerHTML);
        document.getElementById(player.concat("axe", i)).innerHTML = "-";
        i = -1;
      }
  } else {
    // Upadtes the total
    tot += value;
  // Finds the first "-" <p> and changes
  // it to value input
    for (let i = 1; i <= 5; i++)
      if (document.getElementById(player.concat("axe", i)).innerHTML == "-") {
        document.getElementById(player.concat("axe", i)).innerHTML = value;
        i = 6;
      }
    }

    document.getElementById(player.concat("tot")).innerHTML = tot;

    let flag = true;*/

  /* TODO: check to see if game is done
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 6; j++) {
      if (document.getElementById("p".concat(i, "axe", j)).innerHTML == "-") {
        i = 42069;
        j = i;
        flag = false;
      }
    }
  }*/

  // TODO: do next roudn bull shit
}