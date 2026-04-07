const urlBase = "/api";
const extension = "php";

let userId = 0;
let firstName = "";
let lastName = "";

function setElementText(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function doLogin() {
  userId = 0;
  firstName = "";
  lastName = "";

  const login = document.getElementById("loginName").value;
  const password = document.getElementById("loginPassword").value;
  // const hash = md5(password);

  setElementText("loginResult", "");

  const payload = { login, password };
  // const payload = { login, password: hash };
  const jsonPayload = JSON.stringify(payload);

  const url = `${urlBase}/Login.${extension}`;
  const xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function onReadyStateChange() {
      if (this.readyState === 4 && this.status === 200) {
        const jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if (userId < 1) {
          setElementText("loginResult", "User/Password combination incorrect");
          return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();
        window.location.href = "color.html";
      }
    };
    xhr.send(jsonPayload);
  } catch (error) {
    setElementText("loginResult", error.message);
  }
}

function saveCookie() {
  const minutes = 20;
  const date = new Date();

  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie = `firstName=${firstName},lastName=${lastName},userId=${userId};expires=${date.toGMTString()}`;
}

function readCookie() {
  userId = -1;

  const data = document.cookie;
  const splits = data.split(",");

  for (let i = 0; i < splits.length; i += 1) {
    const currentValue = splits[i].trim();
    const tokens = currentValue.split("=");

    if (tokens[0] === "firstName") {
      firstName = tokens[1];
    } else if (tokens[0] === "lastName") {
      lastName = tokens[1];
    } else if (tokens[0] === "userId") {
      userId = Number.parseInt(tokens[1].trim(), 10);
    }
  }

  if (userId < 0) {
    window.location.href = "index.html";
  } else {
    setElementText("userName", `Logged in as ${firstName} ${lastName}`);
  }
}

function doLogout() {
  userId = 0;
  firstName = "";
  lastName = "";
  document.cookie = "firstName=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}

function addColor() {
  const newColor = document.getElementById("colorText").value;
  setElementText("colorAddResult", "");

  const payload = { color: newColor, userId };
  const jsonPayload = JSON.stringify(payload);

  const url = `${urlBase}/AddColor.${extension}`;
  const xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function onReadyStateChange() {
      if (this.readyState === 4 && this.status === 200) {
        setElementText("colorAddResult", "Color has been added");
      }
    };
    xhr.send(jsonPayload);
  } catch (error) {
    setElementText("colorAddResult", error.message);
  }
}

function searchColor() {
  const search = document.getElementById("searchText").value;
  let colorList = "";

  setElementText("colorSearchResult", "");

  const payload = { search, userId };
  const jsonPayload = JSON.stringify(payload);
  const url = `${urlBase}/SearchColors.${extension}`;
  const xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function onReadyStateChange() {
      if (this.readyState === 4 && this.status === 200) {
        setElementText("colorSearchResult", "Color(s) has been retrieved");

        const jsonObject = JSON.parse(xhr.responseText);

        for (let i = 0; i < jsonObject.results.length; i += 1) {
          colorList += jsonObject.results[i];
          if (i < jsonObject.results.length - 1) {
            colorList += "<br>\r\n";
          }
        }

        document.getElementById("colorList").innerHTML = colorList;
      }
    };
    xhr.send(jsonPayload);
  } catch (error) {
    setElementText("colorSearchResult", error.message);
  }
}

window.doLogin = doLogin;
window.readCookie = readCookie;
window.doLogout = doLogout;
window.addColor = addColor;
window.searchColor = searchColor;
