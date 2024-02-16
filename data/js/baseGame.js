//Boolean bigStick = false; // Flag for if playing big axe

// Initalizes the game
// n1 Text for player 1 name entry
// n2 Text for player 2 name entry
// p0 Player 0 object
// p1 Player 1 object
// maxRound Maximum number of rounds in a match
function init(n1, n2, p0, p1, maxRound) {
  p0.scores = []; // Sets scores to empty array
  p1.scores = []; // Sets scores to empty array
  p0.tot = [0,0,0];
  p1.tot = [0,0,0];
  p0.roundsWon = 0;
  p1.roundsWon = 0;
  getNames(n1, n2, p0, p1); // Gets the names of players
  // Displays the round
  document.getElementById("roundDisplay").innerHTML = "Round " + (1);
}

// Creates form for player names
// n1 Text for first Label
// n2 Text for second label
// p0 Player 0 object
// p1 Player 1 object
function getNames(n1, n2, p0, p1){
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
  p0Lab.innerHTML = "<b>" + n1 + "</b>";

  // Player 2 Name
  var pl1Name = document.createElement("input");
  pl1Name.setAttribute("type", "text");
  pl1Name.value = ("Player 2");
  var p1Lab = document.createElement("Label");
  p1Lab.htmlFor = "text";
  p1Lab.innerHTML = "<br><b>" + n2 + "</b>";

  // Disclaimer
  var disclaimer = document.createElement("p");
  disclaimer.innerHTML = "IATF game. Big Axe currently in development";

  // Submit Button
  var but = document.createElement("button");
  but.innerHTML = "Submit";
  but.type = "button";
  but.onclick = function() {
    p0.name = pl0Name.value;
    p1.name = pl1Name.value;
    displayGame(p0, p1);
  }

  // Adds all to the form
  form.appendChild(tit);
  form.appendChild(p0Lab);
  form.appendChild(pl0Name);
  form.appendChild(p1Lab);
  form.appendChild(pl1Name);
  form.appendChild(disclaimer);
  form.appendChild(but);
  document.body.appendChild(form);
}

// Removes name form and displays the game UI
// p0 Player 0 object
// p1 Player 1 object
function displayGame(p0, p1) {
  document.getElementById("game").style.display = "block";
  document.getElementById("nameInput").style.display = "none";

  document.getElementById("p1Head").innerHTML = p0.name;
  document.getElementById("name1").innerHTML = p0.name;
  document.getElementById("name1.1").innerHTML = p0.name;

  document.getElementById("p2Head").innerHTML = p1.name;
  document.getElementById("name2").innerHTML = p1.name;
  document.getElementById("name2.2").innerHTML = p1.name;
}

// Adds points to players scores and totals
// player Player to add points to
// value Value of button pressed
// throwInc Used to increment throw count, 1 = standard 0.5 = doubles
function addPoints(player, value, throwInc) {
  // Checks if the undo button was pressed
  if (value == "undo") {
    // If next round button is there
    // Remove it
    let temp = document.getElementById("nextBut");
    if (temp != null) temp.remove();

    // Makes sure there is something to undo
    if (player.scores.length != 0 && player.throwNum != 0) {

    // Removes last element
    let last = player.scores.pop();
    player.tot[round] -= last;

    // Updates ui

    // Checks if first value inputted
    // throwInc != 1 used to check if doubles
    if (player.throwNum % 1 == 0 & throwInc != 1) {
      // Gets value currently displays and subtracts it from current throw
      // Only used in doubles
      let temp2 = parseInt(document.getElementById(player.id +
        "axe".concat(Math.ceil(player.throwNum))).innerHTML);
      temp2 -= last;
      document.getElementById(player.id +
        "axe".concat(Math.ceil(player.throwNum))).innerHTML = temp2;
      // If not first value or not doubles
      } else {
            // Replaces value with '-'
            document.getElementById(player.id +
              "axe".concat(Math.ceil(player.throwNum))).innerHTML = '-';
          }
          // Decrements number of throws
          player.throwNum -= throwInc;
        }
  // For non undo inputs
  } else {
        // Makes sure 5 axes havn't been thrown
        if (Math.floor(player.throwNum) <= 4) {
          // Increments number of throws
          player.throwNum += throwInc;

          // Adds value to array
          player.scores.push(value);

          // Increases total
          player.tot[round] += value;

          // Updates UI with score of current axe

          // Checks if both team members have thrown or game is not doubles
          if (player.throwNum % 1 == 0 && throwInc != 1) {
            // Gets value displayed and adds value
            let temp = parseInt(document.getElementById(player.id +
              "axe".concat(Math.ceil(player.throwNum))).innerHTML);
            temp += value;
            document.getElementById(player.id +
              "axe".concat(Math.ceil(player.throwNum))).innerHTML = temp;
          // If no team member has thrown or not doubles
          } else {
            // Dispalys the value
            document.getElementById(player.id +
              "axe".concat(Math.ceil(player.throwNum))).innerHTML = value;
          }
        }
      }

  // Shows last throw done

  // Checks if first value inputted
  if (player.throwNum % 1 == 0) {
    // Checks not doubles
    if (player.throwNum > 0 & throwInc != 1) {
      // Shows last 2 values inputted
      document.getElementById(player.id + "ThrowCount").innerHTML =
      "Throws: " + player.scores[player.scores.length - 2] + "," +
      player.scores[player.scores.length - 1];
    // If is not doubles and atleast 1 value inputted
    } else if (throwInc == 1 && player.throwNum > 0) {
    // Displays last value inputted
    document.getElementById(player.id + "ThrowCount").innerHTML =
      "Throws: " + player.scores[player.scores.length - 1];
    }
    // If no values inputted do not display anything
    else
      document.getElementById(player.id + "ThrowCount").innerHTML = "Throws: ";
  // If not first value inputted
  } else {
    // Displays last value inputted
    document.getElementById(player.id + "ThrowCount").innerHTML =
      "Throws: " + player.scores[player.scores.length - 1];
  }

  // Updates round total
  document.getElementById(player.id + "tot" + round).innerHTML = player.tot[round];
}

// Updates point difference and displays next round button if round over
// p0 Player 0 object
// p1 Player 1 object
function updateGame(p0,p1) {
  // Calculates and displays point difference
  document.getElementById("p0PointDif").innerHTML = p0.tot[round] - p1.tot[round];
  document.getElementById("p1PointDif").innerHTML = p1.tot[round] - p0.tot[round];

  // Create next round button if both players threw 5 times
  // TODO: Fix This / Maybe move to new function
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
      but.style.setProperty('position', 'fixed');
      but.style.setProperty('bottom', '0');

      let gam = document.getElementById("game");
      gam.appendChild(but);
    }
  }
}

// Moves game to next round
// p0 Player 0 object
// p1 Player 1 object
// round Current Round
function nextRound(p0, p1, round) {
  // Remove next round button
  let temp = document.getElementById("nextBut");
  temp.remove();

  // Checks if game is over
  if (round - 1 == 2)
    if (p0.roundsWon == p1.roundsWon)
      //bigAxe(p0, p1);
      showEnd(p0, p1);
    // Display end if game over
    else
      showEnd(p0, p1);
  // If game not over
  else {
    // Resets thrownums
    p0.throwNum = 0;
    p1.throwNum = p0.throwNum;

    // Highlights who won the round
    // p0 won
    if (p0.tot[round - 1] > p1.tot[round - 1]) {
      document.getElementById("p0tot" + (round - 1)).style.backgroundColor = "green";
      p0.roundsWon++;
    }
    // p1 won
    else if (p0.tot[round - 1] < p1.tot[round - 1]) {
      document.getElementById("p1tot" + (round - 1)).style.backgroundColor = "green";
      p1.roundsWon++;
    // Tie
    } else {
    }
  }

  clearDisplay(round);

  // Switches the elemnts sides
  swapElements(document.getElementById("player1"),
                document.getElementById("player2"));

  swapElements(document.getElementById("p1Throws"),
                document.getElementById("p2Throws"));
}

// Swaps two elements in UI
// e1 First element to be swapped
// e1 Second element to be swapped
function swapElements(e1, e2) {
  e2Copy = e2.cloneNode(true);
  e1.parentNode.insertBefore(e2Copy, e1);
  e2.parentNode.insertBefore(e1, e2);
  e2.parentNode.replaceChild(e2, e2Copy);
}

// Displays the end stats of game
// p0 Player 0 object
// p1 Player 1 object
function showEnd(p0, p1) {
  // Clears game UI
  document.getElementById("game").style.display = "none";

  // Creates div for elements
  var rowDiv = document.createElement("div");
  rowDiv.id = "rowDiv";
  rowDiv.classList.add("row");

  document.body.appendChild(rowDiv);

  //===============Player 0===============//
  var p0Div = document.createElement("div");
  p0Div.id = "p0Scores";
  p0Div.classList.add("column");

  var p0ScoreDiv = document.createElement("div");
  p0ScoreDiv.className = "throws";

  let h = document.createElement("h2");
  h.innerHTML = p0.name;

  p0Div.appendChild(h);

  // Adds throws to screen
  // Goes through each round
  for (let i = 0; i < p0.tot.length; i++) {
    // temp <p> for display throw
    let p = document.createElement("p");
    // makes sure it only displays current round
    for (let j = 0; j < (p0.scores.length / p0.tot.length); j++)
      p.innerHTML += p0.scores[(i * (p0.scores.length / p0.tot.length)) + j] + " ";

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

  // Displays both players totals against each other
  for (let i = 0; i < p0.tot.length; i++) {
    let p = document.createElement("p");
    p.innerHTML = p0.tot[i] + " : " + p1.tot[i];
    mDiv.appendChild(p);
  }

  // Used for overall game score
  let t1GTot = 0;
  let t2GTot = 0

  for (let i of p0.tot) {
    t1GTot += i;
  }

  for (let i of p1.tot) {
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
  h.innerHTML = p1.name;

  p1Div.appendChild(h);

  // Adds throws to screen
  // Goes through each round
  for (let i = 0; i < p1.tot.length; i++) {
    // Temp <p> for displaying throws
    let p = document.createElement("p");
    // Makes sure only current round is displayed
    for (let j = 0; j < (p1.scores.length / p1.tot.length); j++)
      p.innerHTML += p1.scores[(i * (p1.scores.length / p1.tot.length)) + j] + " ";

    p1ScoreDiv.appendChild(p);
  }

  p1Div.appendChild(p1ScoreDiv);

  rowDiv.appendChild(p1Div);

	// Gets current page for restart button
  let urlTemp = window.location.href;
  
  let but = document.createElement("button");
  but.innerHTML = "RESTART";
  but.onclick = function() {
    alert("Throw Better");
    location.href = urlTemp;
  }

  document.body.appendChild(but);
}

// Clears display for new round
// round Current round being played
function clearDisplay(round) {
  // Reset the display
  document.getElementById("roundDisplay").innerHTML = "Round " + (round + 1);

  // Changes throws back to '-'
  for (let i = 1; i <= 5; i++) {
    document.getElementById("p0axe".concat(i)).innerHTML = '-';
    document.getElementById("p1axe".concat(i)).innerHTML = '-';
  }
}

// Used for big axe round
// p0 Player 0 object
// p1 Player 1 object
function bigAxe(p0, p1) {
  alert("BIG AXE");
}
