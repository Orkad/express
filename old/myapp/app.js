
var express = require('express');
var cons = require('consolidate');
var bodyParser = require('body-parser');
var app = express();


function errorHandler(err, req, res, next){
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	res.render('error_template', {error: err});
}


app.engine('html', cons.jade);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser());
app.use(errorHandler);

app.get('/', function(req, res, next){
	res.render('fruits', {'fruits' : ['pomme', 'poire', 'pêche', 'banane']});
});

app.post('/favorite_fruit', function (req, res, next) {
  var favorite = req.body.fruit;
  if(typeof favorite == 'undefined')
  {
	  next(Error('please choose a fruit'));
  }
  else{
	  res.send("Ton fruit est :" + favorite);
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
