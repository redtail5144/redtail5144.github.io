/***********************
* File for minor helper functions
* Author Austin Campbell
************************/

// Initalized everything
function setUp() {
  // Gets all users from server
  getAllUsers();
  // Gets all issues from server
  getAllIssues();
  // Displays user's name
  showName();
  // Starts on create tab
  openTab(event, 'create');
}

// Sets the user's name
function setUserName() {
  // Gets name from text box
  var Tname = document.getElementById("uName").value;
  // If box is blank
  if(Tname == "") {
    alert("You must enter a name to enter!");
  } else {
    // Sets the global variable to the name
    window.name = Tname
    // Sends the user name to the server
    var resp = postData('http://localhost:1234/whap/add-user', {name: window.name});
    // Goes to the issue page
    window.location.href = "issue.html";
  }
}

// Shows the user name on screen
function showName() {
  document.getElementById("showName").innerHTML = "Welcome, <b>" + window.name;
  document.getElementById("showName").style.fontSize = "x-large";
}

// Function to open and swtich between the tabs
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Used for post request
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(data)
  });
  return await response.json();
}

// Used for get request
async function getData(url = '', data = {}) {
  // Gets the issue back
  fetch(url + data)
  .then((resp) => resp.json())
  .then(data => {
    // Puts new issue to screen
    newIssueDiv(data["result"]);
  })
  // If there is no issue by that name
  // Shows user an error
  .catch(rejected => {
    // Creates a <p> for the message
    var para = document.createElement("P");
    para.setAttribute("id","listAll");
    para.innerHTML = "There is no issue named " + data;
    // Adds to the bottom of the screen
    document.body.appendChild(para);
  });
}

// Used for put request
async function putData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(data)
  });
  return await response.json();
}

// Used for delete request
async function deleteData(url = '', data = {}) {
  fetch(url + data,
    {
      method: "DELETE",
      mode: 'cors'
    });
}

// Posts comment to screen
function newCommentDiv(obj, data) {
  // Clears screen
  clearText();
  // Shows issue
  newIssueDiv(obj);

  // Creates new div with id listAll
  var newDiv = document.createElement("div");
  newDiv.setAttribute("id","listAll");

  // shows all comments
  for(var i in data) {
    // Creates a <p> for the user
    var para = document.createElement("P");
    para.innerHTML = "<b>" + data[i]["author"] + ": </b>";
    newDiv.appendChild(para);

    var comment = document.createElement("P");
    comment.innerHTML = data[i]["body"];
    newDiv.appendChild(comment);
  }

  // Comment box
  var com = document.createElement("input");
  com.setAttribute('type',"text");
  com.setAttribute('name',"com");
  com.setAttribute('id', "com");
  newDiv.appendChild(com);

  // Submit button
  var but = document.createElement("button");
  but.innerHTML = "Submit";
  but.onclick = function() {
    // Url issue is sent to
    const url = 'http://localhost:1234/whap/add-comment';
    // Packs all the info into an object
    var send = {
      user : window.name,
      id: obj["ID"],
      comment : com.value
    }
    // Yeets the data to the server
    postData(url, send)
    // Tells users they did it
    .then(alert("You posted a comment!"))
    .then(getComments(obj));
  };
  newDiv.appendChild(but);

  // Adds to the bottom of the screen
  document.body.appendChild(newDiv);

}

// Posts users to the screen
function newUserDiv(obj) {
  // Creates new div with id listAll
  var newDiv = document.createElement("div");
  newDiv.setAttribute("id","listAll");

  // Creates <p> for user name
  var para = document.createElement("P");
  para.innerHTML = "<b>User Name:</b>" + obj["name"];
  newDiv.appendChild(para);

  // Creates <p> for user ID
  var parab = document.createElement("P");
  parab.innerHTML = "<b>User ID:</b>" + obj["ID"];
  newDiv.appendChild(parab);

  // Delete button
  var del = document.createElement("button");
  del.innerHTML = "<b>DELETE</b>";
  del.onclick = function() {
    // Checks if user is deleting them self
    if(window.name == obj["name"]) {
      alert("Goodbye " + window.name);
      window.location.href = "index.html";
      window.name = "";
      powerWordKill(obj["ID"]);
      // Can't delete other users
    } else {
      alert("Can only delete yourself kiddo");
    }
  };
  newDiv.appendChild(del);


  // Adds to the bottom of the screen
  document.body.appendChild(newDiv);
}

// Posts issues to the screen
function newIssueDiv(obj) {
  // Creates new div with id listAll
  var newDiv = document.createElement("div");
  newDiv.setAttribute("id","listAll");
  // Sets class to ID for easier searching
  newDiv.setAttribute("class", obj["ID"]);

  // Creates a <p> for the user
  var para = document.createElement("P");
  para.innerHTML = "<b>Submitted by: </b>" + obj["user"];
  newDiv.appendChild(para);

  // Creates a <p> for the title
  var para = document.createElement("P");
  para.innerHTML = "<b>Title: </b>" + obj["title"];
  newDiv.appendChild(para);

  // Creates a <p> for the status
  var para = document.createElement("P");
  var stat;
  para.innerHTML = "<b>Status: </b>" + obj["status"];
  newDiv.appendChild(para);

  // Creates a <p> for the ID
  para = document.createElement("P");
  para.innerHTML = "<b>ID: </b>" + obj["ID"];
  newDiv.appendChild(para);

  // Creates a <p> for the Description
  para = document.createElement("P");
  para.innerHTML = "<b>Description: </b>" + obj["description"];
  newDiv.appendChild(para);

  para = document.createElement("P");
  para.innerHTML = "<b>Operating System: </b>" + obj["os"];
  newDiv.appendChild(para);

  // Creates a <p> for the priority
  para = document.createElement("P");
  para.innerHTML = "<b>Priority: </b>" + obj["priority"];
  newDiv.appendChild(para);

  // Creates a <p> for the component
  para = document.createElement("P");
  para.innerHTML = "<b>Component: </b>" + obj["component"];
  newDiv.appendChild(para);

  // Creates a <p> for the assignee
  para = document.createElement("P");
  para.innerHTML = "<b>Assignee: </b>" + obj["assignee"];
  newDiv.appendChild(para);

  // Creates button that takes you to edit issue
  var edit = document.createElement("button");
  edit.innerHTML = "Edit";
  edit.onclick = function() {
    clearText();
    for(var i in fuck) {
      if(fuck[i]["ID"] == obj["ID"]) {
        editIssue(fuck[i]);
      }
    }
  };
  newDiv.appendChild(edit);

  // Button to show all the comments
  var but = document.createElement("button");
  but.innerHTML = "Comments";
  but.onclick = function() {getComments(obj)};
  newDiv.appendChild(but);

  // Adds to the bottom of the screen
  document.body.appendChild(newDiv);
}

// Clears issues when switching off tabs
function clearText() {
  // While there are elements with ID listAll
  // Remove them
  while(document.getElementById("listAll")) {
    if(document.getElementById("listAll") != null) {
      document.getElementById("listAll").remove();
    }
  }
}

// Fills drop down with users
function makeAssDrop() {
  var assDrop = document.getElementById("assignee");
  for(var i in users) {
    var x = new Option();
    x.value = users[i]["name"];
    x.text = x.value;
    assDrop.add(x);
  }
}
