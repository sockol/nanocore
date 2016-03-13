var express = require('express');
var app = express();


//static files
app.use(express.static('public'));
app.use(express.static('templates')); 

// This responds with "Hello World" on the homepage
app.get('/', function(req, res) {

    // console.log("Got a GET request for the homepage");
    // res.send('Hello GET');

    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    res.sendFile(__dirname + "/templates/" + "index.html");
})

// This responds a GET request for the /list_user page.
app.get('/timeline', function(req, res) {

    res.sendFile(__dirname + "/timeline/" + "index.html");
})

// This responds a GET request for the /list_user page.
app.get('/portfolio/*', function(req, res) {

    res.sendFile(__dirname + "/templates/" + "index.html");
})

app.get('/404', function(req, res) {
    res.sendFile(__dirname + "/templates/" + "index.html");
})

app.get('*', function(req, res){
    res.sendFile(__dirname + "/templates/" + "index.html");
});

app.use(function(req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', {
            url: req.url
        });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({
            error: 'Not found'
        });
        return;
    }

    // default to plain-text. send()
    res.sendFile(__dirname + "/templates/" + "index.html");
});


var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);

}); 