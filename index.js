'use strict'
// index.js
// This is our main server file

// A static server using Node and Express
const express = require("express");

// local modules
const db = require("./sqlWrap");
const win = require("./pickWinner");


// gets data out of HTTP request body 
// and attaches it to the request object
const bodyParser = require('body-parser');


/* might be a useful function when picking random videos */
function getRandomInt(max) {
  let n = Math.floor(Math.random() * max);
  // console.log(n);
  return n;
}


/* start of code run on start-up */
// create object to interface with express
const app = express();

// Code in this section sets up an express pipeline
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})
// make all the files in 'public' available 
app.use(express.static("public"));

// if no file specified, return the main page
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/compare.html");
});

// Get JSON out of HTTP request body, JSON.parse, and put object into req.body
app.use(bodyParser.json());



app.get("/getWinner", async function(req, res) {
  console.log("getting winner");
  try {
  let winner = await win.computeWinner(8,true);
  console.log(winner);
  let sql = `SELECT * FROM VideoTable WHERE rowIdNum = ${winner}`;
  let cmd = await db.get(sql);
    return res.send(JSON.stringify(cmd));
    
  
  } catch(err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/getTwoVideos", async(req, res) =>{

let sql = 'SELECT * FROM VideoTable;';
let all_videos = await db.all(sql);
let random1 = getRandomInt(all_videos.length);
let random2 = getRandomInt(all_videos.length);

while(random1 == random2)
  {
    random2 = getRandomInt(all_videos.length);
  }

let tiktok_videos = [all_videos[random1],all_videos[random2]];

  return res.send(JSON.stringify(tiktok_videos));
  
});

app.post("/insertPref", (req, res) =>{
  let video = req.body;
  insertPrefTable(video)
  .then(function(isFull) { 
    console.log("Successful", isFull) //TODO: had server send continue or pick winner.
     if (!isFull) {
      return res.send("continue");
     } else {
       return res.send("pick winner");
     }
  })
    
.catch(function(error) { console.log("Error",error)} );
  console.log("sending Response")
  return res.send('recieved POST');
});
app.get("/continue", async(req, res) =>{

let sql = 'SELECT * FROM PrefTable;';
let all_videos10 = await db.all(sql);

  return res.send(JSON.stringify(all_videos10));
  
});

app.use(function(req, res){
  res.status(404); 
  res.type('txt'); 
  res.send('404 - File '+req.url+' not found'); 
});

const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});
 
  async function insertPrefTable(video) {
  let cmd3 = 'SELECT * FROM PrefTable;'
  let res = await db.all(cmd3); 
    let isFull = false;
  let db_size = res.length;
    console.log("THIS IS THE INSERT", db_size)
  if(db_size < 15) { 
    const sql_v = "INSERT into PrefTable (better,worse) values (?,?)";
    await db.run(sql_v,[video.better, video.worse]);
  } else {
    isFull = true;
    console.log("Database is full");
  }
    
    return isFull;
}
