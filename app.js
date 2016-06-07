var express = require('express');
var body_parser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({
  extended: true
})); 

app.use(function (req, res, next) {
  console.log('Action at :', Date.now());
  next();
});

app.get('/collaborateurs', function (req, res) {
   res.sendFile( __dirname + "/views/" + "liste_employes.html" );
})

app.get('/collaborateurs/new', function (req, res) {
   res.sendFile( __dirname + "/views/" + "nouvel_employe.html" );
})

app.post('/collaborateurs/new', function(req, res, next) {
   console.log(req.body);
   res.send(req.body);
})

var server = app.listen(80);