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

function isValidDate(dateString) {
  // Attempt to create a Date object from the input string
  const parsedDate = new Date(dateString);

  // Check if the parsed date is a valid date and not NaN
  return !isNaN(parsedDate) && parsedDate.toString() !== 'Invalid Date';
}

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res)  {
  const date = req.params.date;
  
  if (!date || date.trim() === "") {
      const currentTime = new Date();
      res.json({
          "unix": currentTime.getTime(),
          "utc": currentTime.toUTCString()
      });
  } else {
      let inputDate;

      if (!isNaN(date)) {
          // If the input is a valid Unix timestamp in milliseconds
          inputDate = new Date(parseInt(date));
      } else {
          // If the input is a date string
          inputDate = new Date(date);
      }

      if (!isValidDate(inputDate)) {
          res.json({ error: 'Invalid Date' });
      } else {
          res.json({
              "unix": inputDate.getTime(),
              "utc": inputDate.toUTCString()
          });
      }
  }
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
