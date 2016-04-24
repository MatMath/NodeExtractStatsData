'use strict';

// var async = require('async');
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

// 2 - a Info page on how to call it with arguments. 
// https://www.quandl.com/data/ZILL/documentation/documentation
// http://static.quandl.com/zillow/city_codes.csv  --> To Get the area and the code.
router.get('/info', function(req, res, next) {
	var whatToSendBack = {
		"documentation": "https://www.quandl.com/data/ZILL/documentation/documentation"
	};
	res.render("rentPriceInfo", whatToSendBack);
});

// TODO: Fetch the hood_codes.csv and return it as JSON.
router.get('/hood_codes.json', function(req, res, next) {
	// With FS:
	fs.readFile('./public/json/hood_codes.json', function(err, data) {
		if (err) {
			throw err;
		}
		res.json(JSON.parse(data.toString()));
	});
});

/* GET Bank listing. */
router.get('/:hood', function(req, res, next) {
	// // ZILL will give the list of all the type of Database (1M+) that exist on that server. ex: 
	// https://www.quandl.com/data/ZILL/documentation/documentation
	// The route here will return 2 thing:
	// 1 - The data if well formatted. --> Return with the building the proper Average rent price. "RMP"

	// Step1: Get the Variable out of the route.
	// Step2: Get the data of that URL.+ get the data needed.

	// TODO: Get the neighborhood from the URL info. 

	// var neighborhood = "N00151";
	var neighborhood = req.params.hood;
	// neighborhood are selected from = http://static.quandl.com/zillow/hood_codes.csv
	var url = "https://www.quandl.com/api/v3/datasets/ZILL/" + neighborhood + "_RMP.json?api_key=" + process.env.QUANDL_API_KEY;
	request(url, function(err, response, body) {
		if (err) {
			return res.json(err);
		}
		var dataBack = {};
		try	{
			dataBack = JSON.parse(body);
		} catch(e) {
			err = new Error('Not Found');
			err.status = 404;
			return res.json(err);
		}
		if (!dataBack || !dataBack.dataset || !dataBack.dataset.dataset_code) {
			err = new Error('Not Found');
			err.status = 404;
			return res.json(err);
		}

		// Note: This can easily break if there is any change in the data structure
		var simplifiedData = {
			"DB": dataBack.dataset.dataset_code,
			"name": dataBack.dataset.name,
			"AverageRent": dataBack.dataset.data[0][1]
		};
		res.json(simplifiedData);
	});

});

module.exports = router;