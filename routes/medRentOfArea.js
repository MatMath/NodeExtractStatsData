'use strict';

// var async = require('async');
var express = require('express');
var router = express.Router();
var request = require('request');

/* GET Bank listing. */
router.get('/', function(req, res, next) {
	// // ZILL will give the list of all the type of Database (1M+) that exist on that server. ex: 
	// https://www.quandl.com/data/ZILL/documentation/documentation
	// The route here will return 2 thing:
	// 1 - The data if well formatted. --> Return with the building the proper Average rent price.
	// 2 - a Info page on how to call it with arguments. 
	// https://www.quandl.com/data/ZILL/documentation/documentation
	// http://static.quandl.com/zillow/city_codes.csv  --> To Get the area and the code.

	// Step1: Get the Variable out of the route.
	// Step2: Get the data of that URL.+ get the data needed.
	var neighborhood = "N00151";
	// neighborhood sre selected from = http://static.quandl.com/zillow/hood_codes.csv
	var url = "https://www.quandl.com/api/v3/datasets/ZILL/" + neighborhood + "_RMP.json?api_key=" + process.env.QUANDL_API_KEY;
	request(url, function(err, response, body) {
		var dataBack = JSON.parse(body);
		// Note: This can easily break if there is any change in the data structure
		var simplifiedData = {
			"DB": dataBack.dataset.dataset_code,
			"name": dataBack.dataset.name,
			"AverageRent": dataBack.dataset.data[0][1]
		};
		res.json(simplifiedData);
	});

});

router.get('/info', function(req, res, next) {
  var whatToSendBack = {
  	"documentation":"https://www.quandl.com/data/ZILL/documentation/documentation"
  }
  res.render("rentPriceInfo", whatToSendBack);
});

module.exports = router;