var round = 0; // current round

// Player objects
let p0 = {
  id: "p0", // player id
  scores: [], // array of player scores
  tot: [], // array of totals for each round
  name:"Name 1", // player name
  throwNum: 0, // number of throws in a round
  roundsWon: 0 // number of rounds won
};

let p1 = {
  id: "p1", // player id
  scores: [], // array of player scores
  tot: [], // array of totals for each round
  name:"Name 2", // player name
  throwNum: 0, // number of throws in a round
  roundsWon: 0 // number of rounds won
};

function start() {
  init("Player 1 Name: " , "Player 2 Name: ", p0, p1, 3);
}

function targetClick(player, value) {
  if (player == "p0")
    addPoints(p0, value, 1);
    else
      addPoints(p1, value, 1);

  updateGame(p0, p1);
}
