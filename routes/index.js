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
		},{
			url: '/medRentOfArea/info',
			description: 'Information on where the code come from and what it mean.'
		},{
			url: '/medRentOfArea/hood_codes.json',
			description: 'Json list of all the neighborhood code available at 2016.04.04.'
		}]
	};

	res.render('index', data);
});

module.exports = router;