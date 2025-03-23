/********************
* File for marathon scripts
*******************/

/*****************
* for sending to
* google sheets
******************
const SPREADSHEET_ID = 1Mp4rkt2fi6XVNe88p0bdwd0D7aXT3cWemprHAOJvqPM;
const CLIENT_ID =  '29280344468-e4o9i8fl806pbsrpubftvnaiq2qv8kak.apps.googleusercontent.com';
const API_KEY = 'AIzaSyARQbxH6u-f3Rsx7ksedH05p5GCzFjXeDs';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';*/

/*****************
* Global Variables
******************/
// Contains all the stats
// Miss, blue, red, black, clutch
const stats = [0,0,0,0,0];
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
var games = 3;
// Number of throws
var throws = 0;
// Amount of total throws
var totThrows = games * 15;

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
  console.log("inc:"+val);
  // Hatchet Vals
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
  document.getElementById("throwNum").innerHTML = "Throw " + throws + "/" + totThrows;

  document.getElementById("score").innerHTML = "You threw a " + val;

  // Checks to see if game done
  checkDone();
}

// Decrements stat on undo
function dec(val) {
  // Hatchet Vals
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
    document.getElementById("throwNum").innerHTML = "Throw " + throws + "/" + totThrows;

    // If any stats are below 0, sets them to zero
    for (let i = 0; i < stats.length; i++)
      if (stats[i] < 0) stats[i] = 0;

  document.getElementById("score").innerHTML = "Undid " + val;
}

// Checks to see if throws are completed
// 75 Hatchet throws or 15 Big Axe throws
function checkDone() {
  // If have reached max amount of throws
  // Show stats
  if (throws == totThrows) {
    alert("Done!");
    showStats();
  }
}

// Shows the stats after throwing
function showStats() {
  // Removes the buttons on the screen
  var el = document.getElementById("buttons");
  el.remove();
  el = document.getElementById("message");
  el.remove();

  // Displays Hatchet Stats
  let hatHead = "HATCHET STATS";
  let result = hatHead.bold();
  document.getElementById("hatStatsHead").innerHTML = result;

  // Shows hatchet average
  var head = document.getElementById("hatStats");
  var text = document.createTextNode("Your Average is: " + getAvg());
  head.appendChild(text);

  let br = document.createElement("br");
  head.appendChild(br);

  // Displays number of each point val thrown
  for (let i = 0; i < stats.length; i++) {
    let stat = document.getElementById("hatStats");
    let text = document.createTextNode("Number of " + pointVal[i] + "'s thrown: "
                                      + stats[i]);
    head.appendChild(text);

    let br = document.createElement("br");
    head.appendChild(br);
  }

  // Adds restart button
  let but = document.getElementById("restartButt");
  child = document.createElement("button");
  child.innerHTML = "RESTART";
  child.onclick = function() {
    alert("Throw Better");
    location.href = "marathon.html";
  }
  but.appendChild(child);
}
