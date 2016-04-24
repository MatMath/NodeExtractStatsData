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
	// var url = 'https://www.quandl.com/api/v3/datasets.json?database_code=FMAC&per_page=2&sort_by=id&page=1&api_key=' + process.env.QUANDL_API_KEY;
	res.interestRate = [];
	// I made it as an array because it would be easier to make 4 different call asynch and still write at the right location (attemp)
	var urls = [
		"https://www.quandl.com/api/v3/datasets/FMAC/5US.json?api_key=",
		"https://www.quandl.com/api/v3/datasets/FMAC/15US.json?api_key=",
		"https://www.quandl.com/api/v3/datasets/FMAC/30US.json?api_key=",
		"https://www.quandl.com/api/v3/datasets/FMAC/WRMORTG.json?api_key="
	];
	var numberOfCalls = 0;
	var callback = function(error, response, body) {
		if (error || response.statusCode >= 400) {
			return next(error || {
				statusCode: response.statusCode
			});
		}
		var data = JSON.parse(body);
		var simplifiedData = {
			"DB":body.dataset_code,
			"name":body.name,
			"latestIntRate":body.data[0][1]
		};
		res.interestRate.push(simplifiedData);
		
		if (completed_request == urls.length) {
	        res.json(res.interestRate);
	    }
		
	};

	for (var url in urls) {
	  request.get(url + process.env.QUANDL_API_KEY, callback);
	}

	// request.get(url, callback);
});

module.exports = router;