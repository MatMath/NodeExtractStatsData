var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
	var data = {
		title: 'API possible routes',
		location: req.location,
		possibleRoutes: [{
			url: '/buildings',
			description: 'List of possible building type from the system.'
		},{
			url: '/intrates',
			description: 'List of the current Interest rate offer globally, 5, 15, 30 years fix and variable.'
		},{
			url: '/medRentOfArea/:areaCode',
			description: 'With the neighborhood code given return the median rent for the area.'
		}]
	};

	res.render('index', data);
});

module.exports = router;