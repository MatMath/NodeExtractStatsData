var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
	var data = {
		title: 'Mathieu',
		quality: "Awesomeness",
		location: req.location
	};

	res.render('index', data);
});

module.exports = router;