var express = require('express');
var router = express.Router();
var request = require('request');

/* GET Bank listing. */
router.get('/', function(req, res, next) {
	// This URL will give the list of all the type of Database (466) that exist on that server. ex: 
	// - 5/1-Year Adjustable Rate Mortgage FMAC/5US
	// - 15-Year Fixed Rate Mortgage FMAC/15US
	// - 30-Year Fixed Rate Mortgage FMAC/30US
	// - 30-Year Conventional Mortgage Rate FMAC/WRMORTG
	// Prices of Houses like:
	// - House Price Index - New York , FMAC/HPI_NY  --> https://www.quandl.com/api/v3/datasets/FMAC/HPI_NY.json?api_key=
	var url = 'https://www.quandl.com/api/v3/datasets.json?database_code=FMAC&per_page=2&sort_by=id&page=1&api_key=' + process.env.QUANDL_API_KEY;

	var callback = function(error, response, body) {
		if (error || response.statusCode >= 400) {
			return next(error || {
				statusCode: response.statusCode
			});
		}
		var data = JSON.parse(body);
		res.json(data);
	};

	request.get(url, callback);
});

module.exports = router;