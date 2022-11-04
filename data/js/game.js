var round = 0;

let p0 = {
  scores: [],
  tot: [],
  name:"Name 1",
  throwNum: 0
};

let p1 = {
  scores: [],
  tot: [],
  name:"Name 2",
  throwNum: 0
};

function start() {init(p0, p1, 3);}

// When target is clicked
// Value is value of area
// Player is which Player
// 0 == left 1 == right
function targetClick(player, value) {
  // Checks if the undo button was pressed
  if (value == "undo") {
    // If next round button is there
    // Remove it
    let temp = document.getElementById("nextBut");
    if (temp != null) temp.remove();
    switch (player) {
      case "p0":
        // Makes sure there is something to undo
        if (p0.scores.length != 0 && p0.throwNum != 0) {
          // Removes last element
          p0.tot[round] -= p0.scores.pop();
          // Updates ui
          document.getElementById("p0axe".concat(p0.throwNum)).innerHTML = '-';
          // Decrements number of throws
          p0.throwNum--;
        }
        break;
      case "p1":
        if (p1.scores.length != 0 && p1.throwNum != 0) {
          p1.tot[round] -= p1.scores.pop();
          document.getElementById("p1axe".concat(p1.throwNum)).innerHTML = '-';
          p1.throwNum--;
        }
        break;
    }
  } else {
    switch (player) {
      case "p0":
        if (p0.throwNum <= 4) {
          // Increments number of throws
          p0.throwNum++;
          // Adds value to array
          p0.scores.push(value);
          // Increases total
          p0.tot[round] += value;
          // Updates UI
          document.getElementById("p0axe".concat(p0.throwNum)).innerHTML = value;
        }
        break;
      case "p1":
        if (p1.throwNum <= 4) {
          p1.throwNum++;
          p1.scores.push(value);
          p1.tot[round] += value;
          document.getElementById("p1axe".concat(p1.throwNum)).innerHTML = value;
        }
        break;
      }
  }

  // Updates round total
  document.getElementById("p0tot" + round).innerHTML = p0.tot[round];
  document.getElementById("p1tot" + round).innerHTML = p1.tot[round];

  // Calculates and updates point difference between players
  document.getElementById("p1PointDif").innerHTML = p0.tot[round] - p1.tot[round];
  document.getElementById("p2PointDif").innerHTML = p1.tot[round] - p0.tot[round];

  // Create next round button if both players threw 5 times
  if (p0.throwNum == 5 && p1.throwNum == 5) {
    let temp = document.getElementById("nextBut");
    if (temp == null) {
      let but = document.createElement("button");
      but.innerHTML = "Next Round";
      but.id = "nextBut";
      but.onclick = function() {
        round++;
        nextRound(p0, p1, round);
      }

      let gam = document.getElementById("game");
      gam.appendChild(but);
    }
  }
}
