sendGetRequest("/getWinner")
.then(function(Winner_video){
let winner_url = Winner_video.url;
console.log(winner_url);

let divElmt = document.getElementById("tiktokDiv");

let reloadButton = document.getElementById("reload");
reloadButton.addEventListener("click",function () {
  reloadVideo(tiktokDiv);
});

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
