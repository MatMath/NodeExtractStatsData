var express = require('express');
var router = express.Router();

/* GET Bank listing. */
router.get('/', function(req, res, next) {
  var whatToSendBack = [
  {
  	"name":"Desjardins",
  	"variable3y": 2.10,
  	"variable5y": 2.4,
  	"fix5y":3,
  },
  {
  	"name":"CIBC",
  	"variable3y": 2.70,
  	"variable5y": 2.8,
  	"fix5y":3.5,
  },
  {
  	"name":"SCOTIA",
  	"variable3y": 3.10,
  	"variable5y": 3.4,
  	"fix5y":3.6,
  }];
  	
  res.json(whatToSendBack);
});

module.exports = router;