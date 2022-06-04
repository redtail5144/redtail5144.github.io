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
  tit.innerHTML = "Enter Team Names";

  // Team 1 Name
  var t0Name = document.createElement("input");
  t0Name.setAttribute("type", "text");
  t0Name.value = ("Team 1");
  var t0Lab = document.createElement("Label");
  t0Lab.htmlFor = "text";
  t0Lab.innerHTML = "<b>Team 1 Name: </b>";

  // Team 2 Name
  var t1Name = document.createElement("input");
  t1Name.setAttribute("type", "text");
  t1Name.value = ("Team 2");
  var t1Lab = document.createElement("Label");
  t1Lab.htmlFor = "text";
  t1Lab.innerHTML = "<br><b>Team 2 Name: </b>";

  // Disclaimer
  var disclaimer = document.createElement("p");
  disclaimer.innerHTML = "Big Axe currently in development";

  // Submit Button
  var but = document.createElement("button");
  but.innerHTML = "Submit";
  but.type = "button";
  but.onclick = function() {
    p0Name = t0Name.value;
    p1Name = t1Name.value;
    displayGame();
  }

  form.appendChild(tit);
  form.appendChild(t0Lab);
  form.appendChild(t0Name);
  form.appendChild(t1Lab);
  form.appendChild(t1Name);
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
          let last = p0Scores.pop();
          p0Tot[round] -= last;

          // Updates ui
          if (p0ThrowNum % 1 == 0) {
            let temp2 = parseInt(document.getElementById("p0axe".concat(Math.ceil(p0ThrowNum))).innerHTML);
            temp2 -= last;
            document.getElementById("p0axe".concat(Math.ceil(p0ThrowNum))).innerHTML = temp2;
          } else
            document.getElementById("p0axe".concat(Math.ceil(p0ThrowNum))).innerHTML = '-';

          // Decrements number of throws
          p0ThrowNum -= 0.5;
        }
        break;
      case "p1":

      // Makes sure there is something to undo
        if (p1Scores.length != 0 && p1ThrowNum != 0) {

          // Removes last element
          let last = p1Scores.pop()
          p1Tot[round] -= last;

          // Updates ui
          if (p1ThrowNum % 1 == 0) {
            let temp2 = parseInt(document.getElementById("p1axe".concat(Math.ceil(p1ThrowNum))).innerHTML);
            temp2 -= last;
            document.getElementById("p1axe".concat(Math.ceil(p1ThrowNum))).innerHTML = temp2;
          } else
            document.getElementById("p1axe".concat(Math.ceil(p1ThrowNum))).innerHTML = '-';

          // Decrements number of throws
          p1ThrowNum -= 0.5;
        }
        break;
    }
  } else {
    switch (player) {
      case "p0":

        // Makes sure 5 axes havn't been thrown
        if (Math.floor(p0ThrowNum) <= 4) {

          // Increments number of throws
          p0ThrowNum += 0.5;

          // Adds value to array
          p0Scores.push(value);

          // Increases total
          p0Tot[round] += value;

          // Updates UI with score of current axe
          if (p0ThrowNum % 1 == 0) { // Checks to see if both team members have thrown
            let temp = parseInt(document.getElementById("p0axe".concat(Math.ceil(p0ThrowNum))).innerHTML);
            temp += value;
            document.getElementById("p0axe".concat(Math.ceil(p0ThrowNum))).innerHTML = temp;
          } else
            document.getElementById("p0axe".concat(Math.ceil(p0ThrowNum))).innerHTML = value;

            if (p0ThrowNum % 1 == 0) {
              let temp = document.getElementById("t1ThrowCount").innerHTML;
              document.getElementById("t1ThrowCount").innerHTML = temp + "," + value;
            } else {
              document.getElementById("t1ThrowCount").innerHTML = "Throw: " + value;
            }
        }
        break;

      case "p1":

        // Makes sure 5 axes havn't been thrown
        if (Math.floor(p1ThrowNum) <= 4) {

          // Increments number of throws
          p1ThrowNum += 0.5;

          // Adds value to array
          p1Scores.push(value);

          // Increases total
          p1Tot[round] += value;

          // Updates ui with score of current axe
          if (p1ThrowNum % 1 == 0) { // Checks to see if both players have thrown
            let temp = parseInt(document.getElementById("p1axe".concat(Math.ceil(p1ThrowNum))).innerHTML);
            temp += value;
            document.getElementById("p1axe".concat(Math.ceil(p1ThrowNum))).innerHTML = temp;
          } else
            document.getElementById("p1axe".concat(Math.ceil(p1ThrowNum))).innerHTML = value;
        }
        break;
      }
  }

  // Updates round total
  document.getElementById("p0tot" + round).innerHTML = p0Tot[round];
  document.getElementById("p1tot" + round).innerHTML = p1Tot[round];

  // Calculates and updates point difference between players
  document.getElementById("t1PointDif").innerHTML = p0Tot[round] - p1Tot[round];
  document.getElementById("t2PointDif").innerHTML = p1Tot[round] - p0Tot[round];

  // Updates the throw count indicator
  //document.getElementById("t1ThrowCount").innerHTML = "Throw: " + (p0ThrowNum * 2) % 2 + "/2"
  //document.getElementById("t2ThrowCount").innerHTML = "Throw: " + (p1ThrowNum * 2) % 2 + "/2"

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

    round++;

    // Reset the display
    document.getElementById("roundDisplay").innerHTML = "Round " + (round + 1);
    document.getElementById("t1PointDif").innerHTML = "-";
    document.getElementById("t2PointDif").innerHTML = "-";

    // Changes throws back to '-'
    for (let i = 1; i <= 5; i++) {
      document.getElementById("p0axe".concat(i)).innerHTML = '-';
      document.getElementById("p1axe".concat(i)).innerHTML = '-';
    }
  }

  // Switches the elements sides
  swapElements(document.getElementById("team1"),
                document.getElementById("team2"));

  swapElements(document.getElementById("t1Throws"),
                document.getElementById("t2Throws"));
}

// Shows stats at the end
function showEnd() {
  document.getElementById("game").style.display = "none";

  var rowDiv = document.createElement("div");
  rowDiv.id = "rowDiv";
  rowDiv.classList.add("row");

  document.body.appendChild(rowDiv);

  //===============Team 1===============//
  var p0Div = document.createElement("div");
  p0Div.id = "p0Scores";
  p0Div.classList.add("column");

  var p0ScoreDiv = document.createElement("div");
  p0ScoreDiv.className = "throws";

  let h = document.createElement("h2");
  h.innerHTML = p0Name;

  p0Div.appendChild(h);

  // Adds throws to screen
  let temp = 0;
  for (let i = 0; i < 3; i++) {
    let p = document.createElement("p");
    for (let j = 0; j < 10; j++) {
      // If next set of throws set to first throw
      if (j % 2 == 0)
        temp = p0Scores[(i * 10) + j];
      // Else add partners throw
      else {
        temp += p0Scores[(i * 10) + j];

        p.innerHTML += temp + ', ';
      }
    }
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

  //===============Team 2===============//
  var p1Div = document.createElement("div");
  p1Div.id = "p1Scores";
  p1Div.classList.add("column");

  var p1ScoreDiv = document.createElement("div");
  p1ScoreDiv.className = "throws";

  h = document.createElement("h2");
  h.innerHTML = p1Name;

  p1Div.appendChild(h);

  temp = 0;
  for (let i = 0; i < 3; i++) {
    let p = document.createElement("p");
    for (let j = 0; j < 10; j++) {
      // If next set of throws set to first throw
      if (j % 2 == 0)
        temp = p1Scores[(i * 10) + j];
      // Else add partners throw
      else {
        temp += p1Scores[(i * 10) + j];

        p.innerHTML += temp + ', ';
      }
    }
    p1ScoreDiv.appendChild(p);
  }

  p1Div.appendChild(p1ScoreDiv);

  rowDiv.appendChild(p1Div);

  let but = document.createElement("button");
  but.innerHTML = "RESTART";
  but.onclick = function() {
    alert("Throw Better");
    location.href = "doubles.html";
  }

  document.body.appendChild(but);
}

// Shows Game UI
function displayGame() {
  document.getElementById("game").style.display = "block";
  document.getElementById("nameInput").style.display = "none";

  document.getElementById("name1").innerHTML = p0Name;
  document.getElementById("name1.1").innerHTML = p0Name;
    document.getElementById("t1Head").innerHTML = p0Name;

  document.getElementById("name2").innerHTML = p1Name;
  document.getElementById("name2.2").innerHTML = p1Name;
    document.getElementById("t2Head").innerHTML = p1Name;

}
