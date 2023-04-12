
sendGetRequest("/getTwoVideos")
.then(function(Input_Videos){
  let urls = [Input_Videos[0].url,Input_Videos[1].url];
  let n_name = document.getElementsByClassName("p_class");
  n_name[0].textContent= Input_Videos[0].nickname;
  n_name[1].textContent= Input_Videos[1].nickname;
  
  let videoElmts = document.getElementsByClassName("tiktokDiv");
let reloadButtons = document.getElementsByClassName("reload");
let heartButtons = document.querySelectorAll("div.heart");

  
for (let i=0; i<2; i++) {
  let reload = reloadButtons[i]; 
  reload.addEventListener("click",function() { reloadVideo(videoElmts[i]) });
  heartButtons[i].classList.add("unloved");
} // for loop
 for (let i=0; i<2; i++) {
      addVideo(urls[i],videoElmts[i]);
    }
    // load the videos after the names are pasted in! 
    loadTheVideos();
 for (let j=0; j<2; j++) {
  let heart = heartButtons[j];
  heart.addEventListener("click",function() {   heartButtons[j].firstElementChild.removeChild(heartButtons[j].firstElementChild.firstElementChild);
  let full_heart = document.createElement("i");
  full_heart.classList.add("fas","fa-heart","loved");
  heartButtons[j].firstElementChild.appendChild(full_heart); 
  let better1;
  let worse1;
  if ( j== 1) {
    better1 = Input_Videos[1].rowIdNum;
    worse1 = Input_Videos[0].rowIdNum;
  } 
  else {
    worse1 = Input_Videos[1].rowIdNum;
    better1 =Input_Videos[0].rowIdNum;
  }
    
  let vid_data = {
    "better": better1,
    "worse": worse1,
  }  
    
sendPostRequest("/insertPref", JSON.stringify(vid_data))
  .then( function (response) {
    let text = response.text()
    //     console.log("Response recieved", response); // Please look at response data type, and also see what response.text() does.
    if (text == "continue") {
   //jsut reload
      window.location.reload();
    } else if (text == "pick winner") {
      window.location = "/winner.html";
    // }
  }})
  .catch( function(err) {
        console.log("POST request error",err);
  }) ;
  });
  
}
});  

let nextbtn = document.getElementById("nxtbutton");
  nextbtn.addEventListener("click",function() {
    sendGetRequest("/continue")
    .then(function(data){
      let size2 = data.length;
    if (size2<15){
      window.location.reload();
   
     }
   else
  {
     window.location = "/winner.html"
    }
    
    
  })
       });

async function sendPostRequest(url,data) {
  let params = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: data };
  console.log("about to send post request");
  
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}

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

