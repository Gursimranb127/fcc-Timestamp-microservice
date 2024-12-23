// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let result={};
app.get('/api/:date?',(req, res)=>{
  let givenDate = req.params.date;
  console.log(givenDate)
  if(!givenDate){
    let unix=new Date().getTime();
    let utc=new Date().toUTCString();
    console.log(unix, utc)
    result={unix:unix, utc:utc}
  }else if(givenDate.includes("-")){
    let unix=new Date(givenDate).getTime();
    let utc=new Date(givenDate).toUTCString();
    console.log(unix, utc)
    result={unix:unix, utc:utc}
  } else if(givenDate.includes("GMT")){
    const normalizedDate = givenDate.replace("GMT", "").trim();
    let unix=new Date(givenDate).getTime();
    let utc=new Date(givenDate).toUTCString();
    console.log(unix, utc)
    result={unix:unix, utc:utc}
  } else{
    let timestamp= parseInt(givenDate, 10);
    let unix=new Date(timestamp).getTime();
    let utc=new Date(timestamp).toUTCString();
    console.log(unix, utc)
    result={unix: unix, utc:utc}
  }
  if(isNaN(result["unix"]) || result["utc"]=== "Invalid Date"){
    result={error : "Invalid Date"}
  }
  res.json(result);
})