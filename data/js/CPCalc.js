// CP brackets for each discipline
var AmCpBrack = [1200,1300,1350,1400,1425,1450,1475,1500,1525,1550,1575];
var BaCpBrack = [850,875,900,925,950,975,1000,1025,1050,1075,1100];
var DualsCpBrack = [1150,1250,1300,1350,1400,1450,1500,1525,1550,1575];
var totGames = 28;

// Initalizes everything
// for the game
function init() {
  chooseDiscipline();
}

// Sets the
function calcSetup(dis, score, gp) {
  //Hides the form
  document.getElementById("disStuff").style.display = "none";

  //Games left in the league
  let gamesLeft = totGames - gp;

  // Calculates avg for the selected discipline
  switch (dis) {
    case "Hatchet":
      AmCpBrack.forEach((item) => {
        let j = document.createElement("p");
        let avg = (item - score) / gamesLeft;
        if (avg > 64) j.innerHTML = item + " : Not Possible";
        else if (avg <= 0) j.innerHTML = item + " : Already there";
        else j.innerHTML = item + " : " + avg + " avg";
        document.body.appendChild(j);
      });
      break;
    case "Big Axe":
      BaCpBrack.forEach((item) => {
        let j = document.createElement("p");
        let avg = (item - score) / gamesLeft;
        if (avg > 46) j.innerHTML = item + " : Not Possible";
        else if (avg <= 0) j.innerHTML = item + " : Already there";
        else j.innerHTML = item + " : " + avg + " avg";
        document.body.appendChild(j);
      });
      break;
    case "Duals":
      DualsCpBrack.forEach((item) => {
        let j = document.createElement("p");
        let avg = (item - score) / gamesLeft;
        if (avg > 64) j.innerHTML = item + " : Not Possible";
        else if (avg <= 0) j.innerHTML = item + " : Already there";
        else j.innerHTML = item + " : " + avg + " avg";
        document.body.appendChild(j);
      });
      break;
  }
}

//Used for inputting league data
function chooseDiscipline(){
  // Creates a form for stats input
  var form = document.createElement("form");
  form.setAttribute("id","disStuff");

  // Title
  var tit = document.createElement("h2");
  tit.innerHTML = "<b>Circuit Point Calculator</b>";

  //Enter league score
  var n = document.createElement("input");
  n.setAttribute('type',"number");
  n.value = "-";
  var nLab = document.createElement("Label");
  nLab.htmlFor = "text";
  nLab.innerHTML = "<b>Score: </b>";

  // Games played
  var g = document.createElement("input");
  g.setAttribute('type',"number");
  g.value = "-";
  var gLab = document.createElement("Label");
  gLab.htmlFor = "text";
  gLab.innerHTML = "<br><b>Games Played: </b>";

  // Choose which discipline
  var ai = document.createElement("select");
  ai.setAttribute('id', "dis");
  // Hatchet
  var op = new Option();
  op.value = "Hatchet";
  op.text = "Hatchet";
  ai.options.add(op);
  // Big Axe
  var op = new Option();
  op.value = "Big Axe";
  op.text = "Big Axe";
  ai.options.add(op);
  // Duals
  var op = new Option();
  op.value = "Duals";
  op.text = "Duals";
  ai.options.add(op);

  ai.value = "Hatchet"; // Default

  var aiLab = document.createElement("Label");
  aiLab.htmlFor = "text";
  aiLab.innerHTML = "<br><b>Discipline: </b>";

  var disclaimer = document.createElement("p");
  disclaimer.innerHTML = "Enter your score and games played to see what avg you need to throw to reach certain circuit point brackets";

  // Submit button
  var but = document.createElement("button");
  but.innerHTML = "Submit";
  but.type = "button";
  but.onclick = function() {
    calcSetup(ai.value, n.value, g.value);
  }

  // Adds everything to the screen
  form.appendChild(tit);
  form.appendChild(nLab);
  form.appendChild(n);
  form.appendChild(gLab);
  form.appendChild(g);
  form.appendChild(aiLab);
  form.appendChild(ai);
  form.appendChild(disclaimer);
  form.appendChild(but);
  document.body.appendChild(form);
}
