// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/", (req, res) => {
    res.json({ unix:new Date().getTime(), utc: new Date().toUTCString() });
  });
  
app.get('/api/timestamp/:date_string',(req,res) => { 
    const value = req.params.date_string;
    const theDate = new Date(value);
    const utcValue = theDate.toUTCString();
    const milsec = theDate.getTime();
  if (/\d{5,}/.test(value)) {
    res.json({ unix: value, utc: utcValue });
  }else{
 let dateObject = new Date(value);
    if (dateObject.toString() === "Invalid Date") {
       res.json({ error: "Invalid Date" });
   }

   else{res.json({"unix":milsec, "utc":utcValue});
        
} 
  }
  
   });



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});