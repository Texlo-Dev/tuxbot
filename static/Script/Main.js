//Set Now Playing
function setStatus() {
  var status = document.getElementById("status").value;
  var code = document.getElementById("code").value;
  var requestURI = "?setstatus=" + encodeURIComponent(status) + "&code=" + encodeURIComponent(code);
  var curl = window.location.href;
  var curls = curl.split("/");
  var rootname = curls[0] + "//" + curls[2];
  var xmlHttp = new XMLHttpRequest();
  var encodedURL = rootname + "/api/status" + requestURI;
  console.log(encodedURL);
  xmlHttp.open("GET", encodedURL, false); // false for synchronous request
  xmlHttp.send(null);
  response = xmlHttp.responseText;
  console.log(response);
}
function sendMoodReq(mood) {
var code = document.getElementById("code").value;
var requestURI = "?setmood=" + encodeURIComponent(mood) + "&code=" + encodeURIComponent(code);
var curl = window.location.href;
var curls = curl.split("/");
var rootname = curls[0] + "//" + curls[2];
var xmlHttp = new XMLHttpRequest();
var encodedURL = rootname + "/api/mood" + requestURI;
console.log(encodedURL);
xmlHttp.open("GET", encodedURL, false); // false for synchronous request
xmlHttp.send(null);
response = xmlHttp.responseText;
console.log(response);
}
//Set Mood
function setDMood() {
  var radios = document.getElementsByName('mood');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      var mood = radios[i].value;
      console.log(mood);
      sendMoodReq(mood);
    }
  }
}
