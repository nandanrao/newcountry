var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var routes = require('./routes');

/*
 * ALL ROUTING!
 *
 * You will find the Asynchronicity required by the assignment in
 * routes/index.js. 
 */
app.use('/', routes);
 
/*
 * Simple error handling. No actual logging setup. 
 */
app.use(function (err, req, res, next) {
    console.log("sending error 500!");
    res.status(500).send("whoooppssiee");
});

// Run App
app.listen(port, function () {
    console.log('listening on port', port);
});


module.exports = app;
