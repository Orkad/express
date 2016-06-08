/*
 * Module dependencies
 */
var express = require('express');
var body_parser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

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
			db.close();
			res.render('liste_employes',{users : results});
		});
	});
});

app.get('/collaborateurs/new', function (req, res) {
	res.render('nouvel_employe');
});

app.get('/collaborateurs/watch', function (req, res) {
	MongoClient.connect(URL, function(err, db) {
		if(err)
			res.send('Impossible de joindre la base de donnée');
		db.collection('users').findOne({'_id':new ObjectID(req.query.id)},function(err, user) {
			db.close();
			res.render('employe_page_personnel',user);
		});
		
	});
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