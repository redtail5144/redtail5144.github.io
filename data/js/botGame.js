var pScores = []; // Array of player scores
var pTot = [0,0,0]; // Array of total for each round
var bScores = []; // Array of bot scores
var bTot = [0,0,0]; // Array of total for each round
var round = 0; // Currnet round # - 1
var throwNum = 0;

// Weights of accuracy
// Second row keeps track of values
// Coresponding to wegihts
var botWeights = [0.0, 0.0, 0.0, 0.0];

// Bot clutch call rate
// And hit rate
var botClutch = [0.0, 0.0];

// Initalizes everything
// for the game
function init() {
  pScores = [];
  pTot = [0,0,0];
  botScores = [];
  botTot = [0,0,0];
  round = 0;
  botSetup();
  getNames();
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
      // Changes the last element back to '-'
      document.getElementById('paxe'.concat(throwNum)).innerHTML = '-';
      document.getElementById('baxe'.concat(throwNum)).innerHTML = '-';
      // Decrements the throw
      throwNum--;
      // Subtracts last value from total
      pTot[round] -= pScores.pop();
      bTot[round] -= bScores.pop();
    }
  // Number button pressed
  } else {
    throwNum++;

    // Adds value to pScores
    pScores.push(value);
    // Adds value to total
    pTot[round] += value;

    // Same thing but for bot
    let bVal = botTurn();
    bScores.push(bVal);
    bTot[round] += bVal;

    // Displays the throws
    let temp = (round * 5) + throwNum;
    console.log("Temp: " + temp);
    document.getElementById('paxe'.concat(throwNum)).innerHTML = pScores[temp-1];
    document.getElementById('baxe'.concat(throwNum)).innerHTML = bScores[temp-1];
  }

  // Updates the total
  document.getElementById('ptot').innerHTML = pTot[round];
  document.getElementById('btot').innerHTML = bTot[round];

  // Checks to see if round is done
  if (throwNum != 0 && throwNum % 5 == 0) {
    window.setTimeout(moveRound, 1);
  }

  console.log("Throw: " + throwNum);
  console.log("Scores: " + pScores);
  console.log("Bot Scores: " + bScores);
}

// Sets the bot up
// with scoring probability
function botSetup(black, red, blue, cCall, cHit) {
  botWeights[0] = black; // Sets black
  botWeights[1] = red; // Sets red
  botWeights[2] = blue; // Sets blue
  botWeights[3] = 100 - black - blue - red; // Sets miss
  botClutch[0] = cCall; // Sets clutch call rate
  botClutch[1] = cHit; // Sets clutch hit rate
}

// Bot takes turn
function botTurn() {
  let ac = Math.random() * 100;
  console.log("Rnd: " + ac);

  // If last throw and bot calls clutch
  if (throwNum == 5 && ac < botClutch[0]) {
    // Generate new number for hit
    ac = Math.random() * 100;
    // If hits return 7
    if (ac < botClutch[1]) return 7;
    else return 0;
  // If not last throw or bot doesn't go clutch
  } else {
    // If is in 5 range
    if (ac > 100 - botWeights[0]) {
      console.log(5);
      return 5;
    // If is in 3 range
    } else if (ac > 100 - botWeights[0] - botWeights[1]) {
      console.log(3);
      return 3;
    // If is in 1 range
    } else if (ac > 100 - botWeights[0] - botWeights[1] - botWeights[2]) {
      console.log(1);
      return 1;
    // If is in miss range
    } else if (ac > 100 - botWeights[0] - botWeights[1] - botWeights[2] - botWeights[3]) {
      console.log(0);
      return 0;
    }
  }
}

// Advances to the next round
function moveRound() {
  // If last round
  if (round == 2) {
    if (confirm("End Game?")) {
      // Display round total
      document.getElementById("pr".concat(round + 1)).innerHTML = pTot[round];
      document.getElementById("br".concat(round + 1)).innerHTML = bTot[round];

      // TODO: Check win shit here


    } else targetClick('undo');

  }else if (confirm("Move to Round " + (round + 2) + "?")) {
    throwNum = 0; // Sets throwNum back to 0
    round++; // move to next round

    // Reset the display
    document.getElementById("roundDisplay").innerHTML = "Round " + (round + 1);

    // Display round total
    document.getElementById("pr".concat(round)).innerHTML = pTot[round - 1];
    document.getElementById("br".concat(round)).innerHTML = bTot[round - 1];

    // Changes throws back to '-'
    for (let i = 1; i <= 5; i++) {
      document.getElementById("paxe".concat(i)).innerHTML = '-';
      document.getElementById("baxe".concat(i)).innerHTML = '-';
    }
    // Changes round total back to '-'
    document.getElementById('ptot').innerHTML = '-';
    document.getElementById('btot').innerHTML = '-';
  } else {
    targetClick('undo');
  }
}
