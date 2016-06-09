/*
 * Module dependencies
 */
var express = require('express');
var body_parser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

//MongoDB link
var URL = 'mongodb://localhost:27017/employeemanager';
var db;

MongoClient.connect(URL, function(err, database) {
	if(!err)
		db = database;
});
	
var app = express();

app.use(express.static('public'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.set('view engine', 'jade');

app.get('/', function(req,res){
	res.render('index');
});



app.get('/collaborateurs', function (req, res) {
	if(db)
		db.collection('users').find({}).toArray(function(err,results){
			res.render('liste_employes',{users : results});
		});
	else
		res.send('Impossible de joindre la base de donnée');
});

app.get('/collaborateurs/new', function (req, res) {
	res.render('nouvel_employe');
});

app.get('/collaborateurs/watch', function (req, res) {
	if(db)
		db.collection('users').findOne({'_id':new ObjectID(req.query.id)},function(err, user) {
			res.render('employe_page_personnel',user);
		});
	else
		res.send('Impossible de joindre la base de donnée');
});

app.post('/collaborateurs/new', function(req, res, next) {
	if(db){
		db.collection('users').insert(req.body);
		res.send('Collaborateur ajouté avec succès');
	}
	else
		res.send('Impossible de joindre la base de donnée');
});

app.listen(80);