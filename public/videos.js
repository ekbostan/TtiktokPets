
async function addVideo(tiktokurl,divElmt) {
  let videoNumber = tiktokurl.split("video/")[1];
  let block = document.createElement('blockquote');
  block.className = "tiktok-embed";
  block.cite = tiktokurl;
  block.setAttribute("data-video-id",videoNumber);
  block.style = "width: 325px; height: 563px;"
  let section = document.createElement('section');
  block.appendChild(section);
  divElmt.appendChild(block);
}

// Ye olde JSONP trick; to run the script, attach it to the body
function loadTheVideos() {
  body = document.body;
  script = newTikTokScript();
  body.appendChild(script);
}

// makes a script node which loads the TikTok embed script
function newTikTokScript() {
  let script = document.createElement("script");
  script.src = "https://www.tiktok.com/embed.js"
  script.id = "tiktokScript"
  return script;
}
function reloadVideo (divElmt) {

    let block = divElmt.getElementsByClassName("tiktok-embed")[0];
    console.log("block",block);
    let parent = block.parentNode;
    parent.removeChild(block);
    let script1 = document.getElementById("tiktokScript");
    let script2 = script1.nextElementSibling;
    let body = document.body; 
    body.removeChild(script1);
    body.removeChild(script2);
    addVideo(block.cite, divElmt);
    loadTheVideos();
}

