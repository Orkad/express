/*
 * Module dependencies
 */
var express = require('express');
var body_parser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

//MongoDB link
var URL = 'mongodb://localhost:27017/employeemanager';
var app = express();

app.use(express.static('public'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.set('view engine', 'jade');

app.get('/', function(req,res){
	res.render('index');
});



app.get('/collaborateurs', function (req, res) {
	MongoClient.connect(URL, function(err, db) {
		if(err)
			res.send('Impossible de joindre la base de donnée');
		db.collection('users').find({}).toArray(function(err,results){
			res.render('liste_employes',{users : results});
		});
	});
});

app.get('/collaborateurs/new', function (req, res) {
	res.render('nouvel_employe');
});

app.get('/collaborateurs/watch', function (req, res) {
	res.send('Ok');
});

app.post('/collaborateurs/new', function(req, res, next) {
   MongoClient.connect(URL, function(err, db) {
		if(err)
			res.send('Impossible de joindre la base de donnée');
		db.collection('users').insert(req.body);
		db.close();
		res.send('Collaborateur ajouté avec succès');
	});
});

app.listen(80);