var express = require('express');
var body_parser = require('body-parser');
var URL = 'mongodb://localhost:27017/employeemanager';
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.use(express.static('public'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.set('view engine', 'jade');

app.get('/collaborateurs', function (req, res) {
   res.render('liste_employes');
})

app.get('/collaborateurs/new', function (req, res) {
	res.render('nouvel_employe');
})

app.post('/collaborateurs/new', function(req, res, next) {
   MongoClient.connect(URL, function(err, db) {
		if(err)
			res.send('Impossible de joindre la base de donnée');
		db.collection('users').insert(req.body);
		db.close();
		res.send('Collaborateur ajouté avec succès');
	});
	
})

var server = app.listen(80);