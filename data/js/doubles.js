var round = 0; // Current Round

let p0 = {
  id: "p0",
  scores: [],
  tot: [],
  name:"Name 1",
  throwNum: 0
};

let p1 = {
  id: "p1",
  scores: [],
  tot: [],
  name:"Name 2",
  throwNum: 0
};

// Initalizes everything
// for the game
function start() {
  init("Team 1 Name: " , "Team 2 Name: ", p0, p1, 3);
}

// When target is clicked
// Value is value of area
// Player is which Player
// 0 == left 1 == right
function targetClick(player, value) {
  if (player == "p0")
    addPoints(p0, value, 0.5);
    else
      addPoints(p1, value, 0.5);
}
