var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');


router.get("/", function(req, res) {

  // call the model method that gets all the burgers
  burger.all(function(err, data) {

    if (err) { return res.status(500).end(); }
    
    res.render("index", { burgers: data });
  });
});

router.get('/', function(req, res){
	res.redirect('/burgers')
});

router.get('/burgers', function(req, res){
	burger.all(function(data){
		var hndlebars = {burgers: data};

		console.log(hndlebars);

		res.render('index', hndlebars);
	});
});

router.post('/burgers/create', function(req, res){
	burger.create(['burger_name'], [req.body.b_name], function(data){
		res.redirect('/burgers')
	});
});

router.put('/burgers/update/:id', function(req, res){
	var condition = 'id = ' + req.params.id;

	console.log('condition ', condition);

	burger.update({'devoured': req.body.devoured}, condition, function(data){
		res.redirect('/burgers');
	});
});

module.exports = router;

