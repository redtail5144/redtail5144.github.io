/********************
* File for round 1
* scripts
*******************/

/*****************
* Global Variables
******************/
// Contains all the stats
const stats = [0,0,0,0,0]; // Miss, blue, red, black, clutch
// Average of all throws
var avg = 0;
// History of all throws
const history = [];
// Possible score values
// Miss, blue, red, black, clutch
var pointVal = [0, 1, 3, 5, 7];
var clutchVal = 7;
var blackVal = 5;
var redVal = 3;
var blueVal = 1;
var missVal = 0;
// Total amount of throws
var games = 5;
// Number of throws
var throws = 0;

// Clears history and stats
function reset() {
  stats = [0,0,0,0,0];
  history = new array();
}

// Finds the average of all throws
function getAvg() {
  let score = 0;
  score += stats[0] * pointVal[0];
  score += stats[1] * pointVal[1];
  score += stats[2] * pointVal[2];
  score += stats[3] * pointVal[3];
  score += stats[4] * pointVal[4];

  return score / games;
}

// Adds val to history then increments stats
function add(val) {
  history.push(val);
  inc(val);
}

// Undoes the last throw
function undoLast() {
  if (history.length != 0) {
    let last = history.pop();
    dec(last);
  }
}

// Increments stat when hit
function inc(val) {
  switch (val) {
    case pointVal[4]:
      stats[4]++;
      break;
    case pointVal[3]:
      stats[3]++;
      break;
    case pointVal[2]:
      stats[2]++;
      break;
    case pointVal[1]:
      stats[1]++;
      break;
    case pointVal[0]:
      stats[0]++;
      break;
  }

  throws++;
  document.getElementById("throwNum").innerHTML = "Throw " + throws + "/75";
  document.getElementById("score").innerHTML = "You threw a " + val;

  checkDone();
}

// Decrements stat on undo
function dec(val) {
  switch (val) {
    case pointVal[4]:
      stats[4]--;
      break;
    case pointVal[3]:
      stats[3]--;
      break;
    case pointVal[2]:
      stats[2]--;
      break;
    case pointVal[1]:
      stats[1]--;
      break;
    case pointVal[0]:
      stats[0]--;
      break;
  }

  throws--;
  document.getElementById("throwNum").innerHTML = "Throw " + throws + "/75";
  document.getElementById("score").innerHTML = "Undid " + val;

  // If any stats are below 0, sets them to zero
  for (let i = 0; i < stats.length; i++)
    if (stats[i] < 0) stats[i] = 0;
}

function checkDone() {
  let tot = 0;
  for (let i = 0; i < stats.length; i++)
    tot += stats[i];

  // Do finsih shit here
  if (tot == 75) {
    // Removes the buttons on the screen
    var el = document.getElementById("buttons");
    el.remove();
    el = document.getElementById("message");
    el.remove();

    // Tells player they are finished
    alert("DONE");

    // Shows the average
    var head = document.getElementById("after");
    var text = document.createTextNode("Your Average is: " + getAvg());
    head.appendChild(text);

    for (let i = 0; i < stats.length; i++) {
      let br = document.createElement("br");
      head.appendChild(br);
      let stat = document.getElementById("after");
      let text = document.createTextNode("Number of " + pointVal[i] + "'s thrown: "
                                        + stats[i]);
      head.appendChild(text);
    }

    let but = document.getElementById("after");
    child = document.createElement("button");
    child.innerHTML = "RESTART";
    child.onclick = function() {
      alert("Throw Better");
      location.href = "round1.html";
    }
    but.appendChild(child);
  }
}
