'use strict';

var async = require('async');
var express = require('express');
var router = express.Router();
var request = require('request');

/* GET Bank listing. */
router.get('/', function(req, res, next) {
	// // This URL will give the list of all the type of Database (466) that exist on that server. ex: 
	// // - 5/1-Year Adjustable Rate Mortgage FMAC/5US
	// // - 15-Year Fixed Rate Mortgage FMAC/15US
	// // - 30-Year Fixed Rate Mortgage FMAC/30US
	// // - 30-Year Conventional Mortgage Rate FMAC/WRMORTG
	// // Prices of Houses like:
	// // - House Price Index - New York , FMAC/HPI_NY  --> https://www.quandl.com/api/v3/datasets/FMAC/HPI_NY.json?api_key=
	// // var url = 'https://www.quandl.com/api/v3/datasets.json?database_code=FMAC&per_page=2&sort_by=id&page=1&api_key=' + process.env.QUANDL_API_KEY;
	// res.interestRate = [];
	// // I made it as an array because it would be easier to make 4 different call asynch and still write at the right location (attemp)


	// https://github.com/caolan/async#autotasks-concurrency-callback
	var tasks = {};

	tasks.getAll = function(next) {

		var urls = [
			"https://www.quandl.com/api/v3/datasets/FMAC/5US.json?api_key=",
			"https://www.quandl.com/api/v3/datasets/FMAC/15US.json?api_key=",
			"https://www.quandl.com/api/v3/datasets/FMAC/30US.json?api_key=",
			"https://www.quandl.com/api/v3/datasets/FMAC/WRMORTG.json?api_key="
		];

		var fetchQuandl = function(url, next) {
			request(url + process.env.QUANDL_API_KEY, function(err, response, body){
				var dataBack = JSON.parse(body);
				// Note: This can easily break if there is any change in the data structure
				var simplifiedData = {
					"DB": dataBack.dataset.dataset_code,
					"name": dataBack.dataset.name,
					"latestIntRate": dataBack.dataset.data[0][1]
				};
				next(null, simplifiedData);
			});
		};

		async.map(urls, fetchQuandl, function(err, results) {
			if (err) {
				return next(err);
			}
			next(null, results);
		});
	};

	tasks.reduce = ['getAll',
		function(results, next) {
			var data = results.getAll;
			next(null, data);
		}
	];

	async.auto(tasks, function(err, results) {
		if (err) {
			res.json(err);
		}
		res.json(results.reduce);
	});


});

module.exports = router;