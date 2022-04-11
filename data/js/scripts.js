/********************
* File for major functions
* Author Austin Campbell
*******************/

/*****************
* Global Variables
******************/
// Array of all issues
// Called fucked because JS
// Complained for any other name
var fuck = new Array();
// Array of all users
var users = new Array();

// Deletes issue by id
function deleteIssue(id) {
  var url = 'http://localhost:1234/whap/issues?ID=';
  deleteData(url, id)
  .catch(rejected => {
    alert("Somehow ya broke it\n" +
          "Don't know how but ya did");
  });
}

// Deletes user by id
function powerWordKill(id) {
  var url = 'http://localhost:1234/whap/users?ID=';
  deleteData(url, id)
  .catch(rejected => {
    alert("Somehow ya broke it\n" +
          "Don't know how but ya did");
  });
}

// Used for editing an issue
// Creates a new form already filled
// in with the issue's details
function editIssue(obj) {
  // Creates a form for editied issue
  var form = document.createElement("form");
  form.setAttribute("id","listAll");

  // ID of issue
  var id = document.createElement("p");
  id.innerHTML = "<b>ID:</b>" + obj["ID"];

  // Title box
  var tit = document.createElement("input");
  tit.setAttribute('type',"text");
  tit.setAttribute('name',"Title");
  tit.setAttribute('id', "title");
  tit.value = obj["title"];
  var tlabel = document.createElement("Label");
  tlabel.htmlFor = "text";
  tlabel.innerHTML = "<b>Title:</b>";

  // Status option
  var stat = document.createElement("select");
  stat.setAttribute('id', "status");
  // Adds New option
  var op = new Option();
  op.value = "New";
  op.text = "New";
  stat.options.add(op);
  // Adds Assigned option
  var op = new Option();
  op.value = "Assigned";
  op.text = "Assigned";
  stat.options.add(op);
  // Adds fixed option
  var op = new Option();
  op.value = "Fixed";
  op.text = "Fixed";
  stat.options.add(op);
  // Adds won't fix option
  var op = new Option();
  op.value = "Won't Fix";
  op.text = "Won't Fix";
  stat.options.add(op);
  stat.value = obj["status"];
  var slabel = document.createElement("Label");
  slabel.htmlFor = "text";
  slabel.innerHTML = "<b>Status:</b>";

  // Description Box
  var des = document.createElement("TEXTAREA");
  des.setAttribute('type',"text");
  des.setAttribute('name',"Description");
  des.setAttribute('rows', "5");
  des.setAttribute('cols', "50");
  des.setAttribute('id', "msg");
  des.value = obj["description"];
  var dlabel = document.createElement("Label");
  dlabel.htmlFor = "text";
  dlabel.innerHTML = "<b>Description:</b>";

  // OS option
  var os = document.createElement("select");
  os.setAttribute('id', "OS");
  // Adds Windows option
  var oop = new Option();
  oop.value = "Windows";
  oop.text = "Windows";
  os.options.add(oop);
  // Adds Linux option
  var oop = new Option();
  oop.value = "Linux";
  oop.text = "Linux";
  os.options.add(oop);
  // Adds Mac option
  var oop = new Option();
  oop.value = "Mac";
  oop.text = "Mac";
  os.options.add(oop);
  os.value = obj["os"];
  var olabel = document.createElement("Label");
  olabel.htmlFor = "text";
  olabel.innerHTML = "<br><b>OS:</b>";

  // Priority option
  var prio = document.createElement("select");
  prio.setAttribute('id', "priority");
  // Adds Low option
  var pop = new Option();
  pop.value = "Low";
  pop.text = "Low";
  prio.options.add(pop);
  // Adds Medium option
  var pop = new Option();
  pop.value = "Medium";
  pop.text = "Medium";
  prio.options.add(pop);
  // Adds High option
  var pop = new Option();
  pop.value = "High";
  pop.text = "High";
  prio.options.add(pop);
  // Adds Very High option
  var pop = new Option();
  pop.value = "Very High";
  pop.text = "Very High";
  prio.options.add(pop);
  // Adds World Ending option
  var pop = new Option();
  pop.value = "World Ending";
  pop.text = "World Ending";
  prio.options.add(pop);
  prio.value = obj["priority"];
  var plabel = document.createElement("Label");
  plabel.htmlFor = "text";
  plabel.innerHTML = "<br><b>Priority:</b>";

  // Component box
  var com = document.createElement("input");
  com.setAttribute('type',"text");
  com.setAttribute('name',"Com");
  com.setAttribute('id',"component");
  com.value = obj["component"];
  var clabel = document.createElement("Label");
  clabel.htmlFor = "text";
  clabel.innerHTML = "<br><b>Component:</b>";

  // Assignee box
  var ass = document.createElement("select");
  // Adds all users as possible ass
  for(var i in users) {
    var x = new Option();
    x.value = users[i]["name"];
    x.text = x.value;
    ass.add(x);
  }
  var alabel = document.createElement("Label");
  alabel.htmlFor = "text";
  alabel.innerHTML = "<br><b>Assignee:</b>";

  // Submit button
  var but = document.createElement("button");
  but.innerHTML = "Submit";
  but.onclick = function() {
    // Url issue is sent to
    const url = 'http://localhost:1234/whap/issues?id=' + obj["ID"];
    // Packs all the info into an object
    var data = {
      name: tit.value,
      id: obj["ID"],
      status: stat.value,
      des: des.value,
      prio: prio.value,
      os: os.value,
      com: com.value,
      ass: ass.value
    }
    // Yeets the data to the server
    putData(url,data)
    // Tells users they did it
    .then(alert("You edited it!"));
  };

  // Delete button
  var del = document.createElement("button");
  del.innerHTML = "<b>DELETE</b>";
  del.onclick = function() {
    alert("Are you sure you want to delete this issue?\n" +
    "Just kidding, it's too late, it's fucking gone.");
    deleteIssue(obj["ID"]);
  }

  // <p> for styling
  var para = document.createElement("p");

  // Adds everything to the screen
  form.appendChild(id);
  form.appendChild(tlabel);
  form.appendChild(tit);
  form.appendChild(dlabel);
  form.appendChild(des);
  form.appendChild(clabel);
  form.appendChild(com);
  form.appendChild(alabel);
  form.appendChild(ass);
  form.appendChild(para);
  form.appendChild(slabel);
  form.appendChild(stat);
  form.appendChild(plabel);
  form.appendChild(prio);
  form.appendChild(olabel);
  form.appendChild(os);
  form.appendChild(but);
  form.appendChild(del);
  document.body.appendChild(form);
}

// Searches by ID
function searchByID() {
  // Gets data from search box
  var id = document.getElementById("search").value;
  // Url being sent to
  var url = 'http://localhost:1234/whap/issues?ID=';

  // Checks if user inputted a name
  if (id != "") {
    getData(url, id);
  } else {
    alert("Can't leave search blank");
  }
}

// Searches by title
function searchByTitle() {
  // Gets data from search box
  var name = document.getElementById("search").value;
  // Url being sent to
  var url = 'http://localhost:1234/whap/issues?name=';

  // Checks if user inputted a name
  if (name != "") {
    getData(url, name);
  } else {
    alert("Can't leave search blank");
  }
}

// Gets all issues from server
function getAllIssues() {
  // Fetches all issues from server
  fetch('http://localhost:1234/whap/issues?' + 'getAllIssues')
  .then((resp) => resp.json())
  .then(function(data) {
    // Loads them all into fuck
    fuck = data["result"];
  });
}

//Shows all issues
function showAllIssues() {
  // Creates new div for each issue
  for(var i in fuck) {
    newIssueDiv(fuck[i]);
  }
}

// Gets all users
function getAllUsers() {
  // Fetches all users from server
  fetch('http://localhost:1234/whap/users?' + 'getAllUsers')
  .then((resp) => resp.json())
  .then(function(data) {
    users = data["result"];
    // Loads them into the assignee drop down
    makeAssDrop();
  });
}

//Shows all users
function showAllUsers() {
  // Creates div for each users
  for(var i in users) {
    newUserDiv(users[i]);
  }
}

// Gets comments for an issue
function getComments(obj) {
  // Fetches all comments from server
  fetch('http://localhost:1234/whap/comments?id=' + obj["ID"])
  .then((resp) => resp.json())
  .then(function(data) {
    if (data.hasOwnProperty("result")) {
      newCommentDiv(obj, data["result"]);
    }
  })
  .catch(rejected => {
    console.log(rejected);
  });
}

// Sends new issue to server
function sendToServer() {
  // Url issue is sent to
  const url = 'http://localhost:1234/whap/add-issue?' + 'iss';
  // Data being sent
  var data = {
    name: document.getElementById("title").value,
    des: document.getElementById("msg").value,
    prio: document.getElementById("priority").value,
    os: document.getElementById("OS").value,
    com: document.getElementById("component").value,
    ass: document.getElementById("assignee").value,
    user: window.name
  };

  // Posts the data
  var resp = postData('http://localhost:1234/whap/add-issue', data)
  // Tells user they did it
  .then(alert("You did it"));
}
