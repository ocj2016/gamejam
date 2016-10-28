var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('<marquee>Hello World</marquee>');

});

app.use(express.static('public'));

app.listen(3000, function() {
    console.log("example gogogogo");
});