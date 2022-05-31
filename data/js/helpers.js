/***********************
* File for minor helper functions
* Author Austin Campbell
************************/

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

function swapElements(obj1, obj2) {
  // Marks where obj1 is
  let temp = document.createElement("div");
  obj1.parentNode.insertBefore(temp, obj1);

  // Moves obj1 infront of obj2
  obj2.parentNode.insertBefore(obj1, obj2);

  // Move obj2 infront of marker
  temp.parentNode.insertBefore(obj2, temp);

  // Remove marker
  temp.parentNode.removeChild(temp);
}
