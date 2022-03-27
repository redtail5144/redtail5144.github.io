/********************
* File for round 1 scripts
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
const bigStats = [0,0,0,0,0];
// History of all throws
const history = [];
const bigHistory = [];
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
var bigThrows = 0;
// Flag for scoring bigaxe
var big = false;

// Clears history and stats
function reset() {
  stats = [0,0,0,0,0];
  bigStats = [0,0,0,0,0];
  history = new array();
  bigHistory = new array();
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
  // Hatchet Vals
  if (!big) {
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
    } else {
      // Big Vals
      switch (val) {
        case pointVal[4]:
          bigStats[4]++;
          break;
        case pointVal[3]:
            bigStats[3]++;
            break;
        case pointVal[2]:
            bigStats[2]++;
            break;
        case pointVal[1]:
            bigStats[1]++;
            break;
        case pointVal[0]:
            bigStats[0]++;
            break;
          }

        bigThrows++;
        document.getElementById("throwNum").innerHTML = "Throw " + bigThrows + "/15";
    }


  document.getElementById("score").innerHTML = "You threw a " + val;

  // Checks to see if game done
  checkDone();
}

// Decrements stat on undo
function dec(val) {
  // Hatchet Vals
  if (!big) {
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

    // If any stats are below 0, sets them to zero
    for (let i = 0; i < stats.length; i++)
      if (stats[i] < 0) stats[i] = 0;

      // Big Vals
      } else {
        switch (val) {
          case pointVal[4]:
            bigStats[4]--;
            break;
          case pointVal[3]:
              bigStats[3]--;
              break;
          case pointVal[2]:
              bigStats[2]--;
              break;
          case pointVal[1]:
              bigStats[1]--;
              break;
          case pointVal[0]:
              bigStats[0]--;
              break;
            }

          bigThrows--;
          document.getElementById("throwNum").innerHTML = "Throw " + bigThrows + "/15";

          // If any stats are below 0, sets them to zero
          for (let i = 0; i < bigStats.length; i++)
            if (bigStats[i] < 0) bigStats[i] = 0;
      }

  document.getElementById("score").innerHTML = "Undid " + val;
}

// Checks to see if throws are completed
// 75 Hatchet throws or 15 Big Axe throws
function checkDone() {
  if (!big) {
    // Checks if 75 hatchet throws are done
    let tot = 0;
    for (let i = 0; i < stats.length; i++)
      tot += stats[i];

    // If 75 throws have been made
    // Prompt user to throw big axe
    if (tot == 75) {
      // If yes enable big axe mode
      if (confirm("Throw Big Axe?")) {
        big = true;
      // If not show stats
      } else {
        showStats();
      }
    }
  // If 15 Big Axes have been thrown
  // Show stats
  } else if (bigThrows == 15){
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
  var head = document.getElementById("after");
  var text = document.createTextNode("HATCHET STATS");
  head.appendChild(text);// Shows the average

  let br = document.createElement("br");
  head.appendChild(br);

  // Shows hatchet average
  var head = document.getElementById("after");
  var text = document.createTextNode("Your Average is: " + getAvg());
  head.appendChild(text);

  // Displays number of each point val thrown
  for (let i = 0; i < stats.length; i++) {
    let br = document.createElement("br");
    head.appendChild(br);

    let stat = document.getElementById("after");
    let text = document.createTextNode("Number of " + pointVal[i] + "'s thrown: "
                                      + stats[i]);
    head.appendChild(text);
  }

  // If Big Axe was thrown show Big Stats
  if (big) {
    let br = document.createElement("br");
    head.appendChild(br);

    var head = document.getElementById("after");
    var text = document.createTextNode("BIG AXE STATS");
    head.appendChild(text);

    // Used for total big axe score
    let bigTot = 0;

    // Calculates total big axe score
    for (let i = 0; i < bigStats.length; i++)
      bigTot += pointVal[i] * bigStats[i];

    head.appendChild(br);

    // Shows Big Axe score out of max points
    var head = document.getElementById("after");
    var text = document.createTextNode("Total Score: " + bigTot + "/105");
    head.appendChild(text);

    // Displays number of each point val thrown
    for (let i = 0; i < bigStats.length; i++) {
      let br = document.createElement("br");
      head.appendChild(br);

      let stat = document.getElementById("after");
      let text = document.createTextNode("Number of " + pointVal[i] + "'s thrown: "
                                        + bigStats[i]);
      head.appendChild(text);
    }
  }

  // Adds restart button
  let but = document.getElementById("after");
  child = document.createElement("button");
  child.innerHTML = "RESTART";
  child.onclick = function() {
    alert("Throw Better");
    location.href = "round1.html";
  }
  but.appendChild(child);
}
