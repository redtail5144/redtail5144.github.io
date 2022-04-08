var pScores = []; // Array of player scores
var pTot = [0,0,0]; // Array of total for each round
var botScores = []; // Array of bot scores
var botTot = [0,0,0]; // Array of total for each round
var round = 0; // Currnet round # - 1
var throwNum = 0;

// Initalizes everything
// for the game
function init() {
  pScores = [];
  pTot = [0,0,0];
  botScores = [];
  botTot = [0,0,0];
  round = 0;
  botSetup();
  //getNames();
  document.getElementById("roundDisplay").innerHTML = "Round " + (round + 1);
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
}

// When target is clicked
// Value is value of area
function targetClick(value) {
  // If undo button pressed
  if (value == "undo") {
    // Makes sure there is something to undo
    if (throwNum != 0) {
      throwNum--;
      pTot[round] -= pScores.pop();

      let temp = (round * 5) + (throwNum + 1);
      document.getElementById('paxe'.concat(temp)).innerHTML = '-';
    }
  // Number button pressed
  } else {
    throwNum++;
    pScores.push(value);
    pTot[round] += value;

    let temp = (round * 5) + throwNum;
    console.log(temp);
    document.getElementById('paxe'.concat(temp)).innerHTML = pScores[temp-1];
  }

  document.getElementById('ptot').innerHTML = pTot[round];

  // Checks to see if round is done
  if (throwNum != 0 && throwNum % 5 == 0) {
    window.setTimeout(moveRound, 1);
  }
}

// Sets the bot up
// with scoring probability
function botSetup() {

}

// Bot takes turn
function botTurn() {

}

function moveRound() {
  if (confirm("Move to Round 2?")) {
    throwNum = 0; // Sets throwNum back to 0
    round++; // move to next round

    // Reset the display
    document.getElementById("roundDisplay").innerHTML = "Round " + (round + 1);
    for (let i = 1; i <= 5; i++) {
      document.getElementById("paxe".concat(i)).innerHTML = '-';
    }
    document.getElementById('ptot').innerHTML = '-';
  } else {
    targetClick('undo');
  }
}
