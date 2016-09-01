var express = require('express');
var app = express();
var port = process.env.PORT || 8080; //for Heroku

//answer to homepage requests
app.use('/', express.static(__dirname + '/public'));

//extract parameter sent and process it
app.param('date', function(req, res, next, date){
    //convert parameter to unix timestamp if in natural language
    var unix = Date.parse(date);
    //use unix value if supplied instead of natural language
    if (isNaN(unix))
        unix = Number(date);
        
    //convert unix timestamp to natural language date (eng)
    var dt = new Date(unix);
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    //create the natural language string to return
    var currDate = monthNames[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getUTCFullYear();
    //display null for natural language if supplied date is incorrect
    if (!Boolean(dt.getUTCFullYear()))
        currDate = null;
    //create a reply object
    var reply = {
        'unix' : unix,
        'natural' : currDate
    };
    //send reply to client
    res.send(reply);
    next();
});
//answer get requests with supplied parameters
app.get('/:date', function (req, res){});
//start server
app.listen(port, function () {
  console.log('Timestamp app listening on port 8080!');
});