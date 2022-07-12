var p0Scores = [];
var p0Tot = [0,0,0];
var p1Scores = [];
var p1Tot = [0,0,0];
var round = 0;
var p0ThrowNum = 0;
var p1ThrowNum = p0ThrowNum;
var p0Name = "Name 1";
var p1Name = "Name 2";

// Initalizes everything
// for the game
function init() {
  p0Scores = [];
  p0Tot = [0,0,0];
  p1Scores = [];
  p1Tot = [0,0,0];
  round = 0;
  getNames();
  document.getElementById("roundDisplay").innerHTML = "Round " + (round + 1);
}

// Alert box that gets names of throwers
// Loops until two non null non empty
// Names are entered
function getNames(){
  // Form for inputting player names
  var form = document.createElement("form");
  form.setAttribute("id", "nameInput")

  //Title
  var tit = document.createElement("h2");
  tit.innerHTML = "Enter Player Names";

  // Player 1 Name
  var pl0Name = document.createElement("input");
  pl0Name.setAttribute("type", "text");
  pl0Name.value = ("Player 1");
  var p0Lab = document.createElement("Label");
  p0Lab.htmlFor = "text";
  p0Lab.innerHTML = "<b>Player 1 Name: </b>";

  // Player 2 Name
  var pl1Name = document.createElement("input");
  pl1Name.setAttribute("type", "text");
  pl1Name.value = ("Player 2");
  var p1Lab = document.createElement("Label");
  p1Lab.htmlFor = "text";
  p1Lab.innerHTML = "<br><b>Player 2 Name: </b>";

  // Disclaimer
  var disclaimer = document.createElement("p");
  disclaimer.innerHTML = "Big Axe currently in development";

  // Submit Button
  var but = document.createElement("button");
  but.innerHTML = "Submit";
  but.type = "button";
  but.onclick = function() {
    p0Name = pl0Name.value;
    p1Name = pl1Name.value;
    displayGame();
  }

  form.appendChild(tit);
  form.appendChild(p0Lab);
  form.appendChild(pl0Name);
  form.appendChild(p1Lab);
  form.appendChild(pl1Name);
  form.appendChild(disclaimer);
  form.appendChild(but);
  document.body.appendChild(form);
}

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
        if (p0Scores.length != 0 && p0ThrowNum != 0) {
          // Removes last element
          p0Tot[round] -= p0Scores.pop();
          // Updates ui
          document.getElementById("p0axe".concat(p0ThrowNum)).innerHTML = '-';
          // Decrements number of throws
          p0ThrowNum--;
        }
        break;
      case "p1":
        if (p1Scores.length != 0 && p1ThrowNum != 0) {
          p1Tot[round] -= p1Scores.pop();
          document.getElementById("p1axe".concat(p1ThrowNum)).innerHTML = '-';
          p1ThrowNum--;
        }
        break;
    }
  } else {
    switch (player) {
      case "p0":
        if (p0ThrowNum <= 4) {
          // Increments number of throws
          p0ThrowNum++;
          // Adds value to array
          p0Scores.push(value);
          // Increases total
          p0Tot[round] += value;
          // Updates UI
          document.getElementById("p0axe".concat(p0ThrowNum)).innerHTML = value;
        }
        break;
      case "p1":
        if (p1ThrowNum <= 4) {
          p1ThrowNum++;
          p1Scores.push(value);
          p1Tot[round] += value;
          document.getElementById("p1axe".concat(p1ThrowNum)).innerHTML = value;
        }
        break;
      }
  }

  // Updates round total
  document.getElementById("p0tot" + round).innerHTML = p0Tot[round];
  document.getElementById("p1tot" + round).innerHTML = p1Tot[round];

  // Calculates and updates point difference between players
  document.getElementById("p1PointDif").innerHTML = p0Tot[round] - p1Tot[round];
  document.getElementById("p2PointDif").innerHTML = p1Tot[round] - p0Tot[round];

  // Create next round button if both players threw 5 times
  if (p0ThrowNum == 5 && p1ThrowNum == 5) {
    let temp = document.getElementById("nextBut");
    if (temp == null) {
      let but = document.createElement("button");
      but.innerHTML = "Next Round";
      but.id = "nextBut";
      but.onclick = function() {
        nextRound();
      }

      let gam = document.getElementById("game");
      gam.appendChild(but);
    }
  }
}

function nextRound() {
  // Remove next round button
  let temp = document.getElementById("nextBut");
  temp.remove();

  if (round == 2) showEnd();
  else {
    // Resets thrownums
    p0ThrowNum = 0;
    p1ThrowNum = p0ThrowNum;

    // Highlights who won the round
    // p0 won
    if (p0Tot[round] > p1Tot[round]) {
      console.log("p0 > p1");
      document.getElementById("p0tot" + round).style.backgroundColor = "green";
    // p1 won
    } else if (p0Tot[round] < p1Tot[round]) {
      document.getElementById("p1tot" + round).style.backgroundColor = "green";
      console.log("p0 < p1");
    // Tie
    } else {
      console.log("p0 = p1");
    }

    round++;

    // Reset the display
    document.getElementById("roundDisplay").innerHTML = "Round " + (round + 1);

    // Changes throws back to '-'
    for (let i = 1; i <= 5; i++) {
      document.getElementById("p0axe".concat(i)).innerHTML = '-';
      document.getElementById("p1axe".concat(i)).innerHTML = '-';
    }
  }

  // Switches the elemnts sides
  swapElements(document.getElementById("player1"),
                document.getElementById("player2"));

  swapElements(document.getElementById("p1Throws"),
                document.getElementById("p2Throws"));
}

function showEnd() {
  document.getElementById("game").style.display = "none";

  var rowDiv = document.createElement("div");
  rowDiv.id = "rowDiv";
  rowDiv.classList.add("row");

  document.body.appendChild(rowDiv);

  //===============Player 1===============//
  var p0Div = document.createElement("div");
  p0Div.id = "p0Scores";
  p0Div.classList.add("column");

  var p0ScoreDiv = document.createElement("div");
  p0ScoreDiv.className = "throws";

  let h = document.createElement("h2");
  h.innerHTML = p0Name;

  p0Div.appendChild(h);

  // Adds throws to screen
  for (let i = 0; i < 3; i++) {
    let p = document.createElement("p");
    for (let j = 0; j < 5; j++)
      p.innerHTML += p0Scores[(i * 5) + j] + " ";

    p0ScoreDiv.appendChild(p);
  }

  p0Div.appendChild(p0ScoreDiv);

  rowDiv.appendChild(p0Div);

  //================Totals================//
  var mDiv = document.createElement("div");
  mDiv.id = "endTots";
  mDiv.classList.add("column");

  h = document.createElement("h2");
  h.innerHTML = "Round Totals";

  mDiv.appendChild(h);

  for (let i = 0; i < 3; i++) {
    let p = document.createElement("p");
    p.innerHTML = p0Tot[i] + " : " + p1Tot[i];
    mDiv.appendChild(p);
  }

  let t1GTot = 0;
  let t2GTot = 0

  for (let i of p0Tot) {
    t1GTot += i;
  }

  for (let i of p1Tot) {
    t2GTot += i;
  }

  temp = document.createElement("p");
  temp.innerHTML = t1GTot + ":" + t2GTot;
  mDiv.appendChild(temp);

  rowDiv.appendChild(mDiv);

  //===============Player 2===============//
  var p1Div = document.createElement("div");
  p1Div.id = "p1Scores";
  p1Div.classList.add("column");

  var p1ScoreDiv = document.createElement("div");
  p1ScoreDiv.className = "throws";

  h = document.createElement("h2");
  h.innerHTML = p1Name;

  p1Div.appendChild(h);

  // Adds throws to screen
  for (let i = 0; i < 3; i++) {
    let p = document.createElement("p");
    for (let j = 0; j < 5; j++)
      p.innerHTML += p1Scores[(i * 5) + j] + " ";

    p1ScoreDiv.appendChild(p);
  }

  p1Div.appendChild(p1ScoreDiv);

  rowDiv.appendChild(p1Div);

  let but = document.createElement("button");
  but.innerHTML = "RESTART";
  but.onclick = function() {
    alert("Throw Better");
    location.href = "game.html";
  }

  document.body.appendChild(but);
}

// Shows Game UI
function displayGame() {
  document.getElementById("game").style.display = "block";
  document.getElementById("nameInput").style.display = "none";

  console.log("p0Name: " + p0Name);
  console.log("p1Name: " + p1Name);
  document.getElementById("name1").innerHTML = p0Name;
  document.getElementById("name1.1").innerHTML = p0Name;

  document.getElementById("name2").innerHTML = p1Name;
  document.getElementById("name2.2").innerHTML = p1Name;
}
