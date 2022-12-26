sendGetRequest("/getWinner")
.then(function(Winner_video){
let winner_url = Winner_video.url;
console.log(winner_url);

// when this page is opened, get the most recently added video and show it.
// function is defined in video.js
let divElmt = document.getElementById("tiktokDiv");

let reloadButton = document.getElementById("reload");
// set up button to reload video in "tiktokDiv"
reloadButton.addEventListener("click",function () {
  reloadVideo(tiktokDiv);
});



// always shows the same hard-coded video.  You'll need to get the server to 
// compute the winner, by sending a 
// GET request to /getWinner,
// and send the result back in the HTTP response.
console.log(winner_url, "THIS IS THE URL");
showWinningVideo(winner_url);
document.getElementById("winner1").textContent = "The winner is " + Winner_video.nickname;

function showWinningVideo(data) {
  
  let winningUrl = data;
   
  addVideo(winningUrl, divElmt);
 
  loadTheVideos();
}

});
async function sendGetRequest(url) {
  params = {
    method: 'GET',
    headers: {'Content-Type': 'text/plain'}
     };
  
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    throw Error(response.status);
  }
}