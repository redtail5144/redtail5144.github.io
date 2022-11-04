function init(p0, p1, maxRound) {
  p0.scores = [];
  p1.scores =[];
  p0.tot = [0,0,0];//new Array(maxRound);
  p1.tot = [0,0,0];//new Array(maxRound);
  getNames(p0, p1);
  document.getElementById("roundDisplay").innerHTML = "Round " + (1);
}

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

function showEnd(p0, p1) {
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
  h.innerHTML = p0.name;

  p0Div.appendChild(h);

  // Adds throws to screen
  for (let i = 0; i < 3; i++) {
    let p = document.createElement("p");
    for (let j = 0; j < 5; j++)
      p.innerHTML += p0.scores[(i * 5) + j] + " ";

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
    p.innerHTML = p0.tot[i] + " : " + p1.tot[i];
    mDiv.appendChild(p);
  }

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
  for (let i = 0; i < 3; i++) {
    let p = document.createElement("p");
    for (let j = 0; j < 5; j++)
      p.innerHTML += p1.scores[(i * 5) + j] + " ";

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

function getNames(p0, p1){
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
    p0.name = pl0Name.value;
    p1.name = pl1Name.value;
    displayGame(p0, p1);
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

function nextRound(p0, p1, round) {
  console.log("Round: " + round);
  // Remove next round button
  let temp = document.getElementById("nextBut");
  temp.remove();

  if (round - 1 == 2) showEnd(p0, p1);
  else {
    // Resets thrownums
    p0.throwNum = 0;
    p1.throwNum = p0.throwNum;

    // Highlights who won the round
    // p0 won
    if (p0.tot[round - 1] > p1.tot[round - 1]) {
      document.getElementById("p0tot" + (round - 1)).style.backgroundColor = "green";
    // p1 won
  } else if (p0.tot[round - 1] < p1.tot[round - 1]) {
      document.getElementById("p1tot" + (round - 1)).style.backgroundColor = "green";
    // Tie
    } else {
    }

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

function showEnd(p0, p1) {
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
  h.innerHTML = p0.name;

  p0Div.appendChild(h);

  // Adds throws to screen
  for (let i = 0; i < 3; i++) {
    let p = document.createElement("p");
    for (let j = 0; j < 5; j++)
      p.innerHTML += p0.scores[(i * 5) + j] + " ";

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
    p.innerHTML = p0.tot[i] + " : " + p1.tot[i];
    mDiv.appendChild(p);
  }

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
  for (let i = 0; i < 3; i++) {
    let p = document.createElement("p");
    for (let j = 0; j < 5; j++)
      p.innerHTML += p1.scores[(i * 5) + j] + " ";

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
