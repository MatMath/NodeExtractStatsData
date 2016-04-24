var express = require('express');
var router = express.Router();

/* GET Building listing. */
router.get('/', function(req, res, next) {
  var whatToSendBack = {
  	"title":"Triplex"
  }
  res.render("building", whatToSendBack);
});

router.get('/list.json', function(req, res, next) {
  var whatToSendBack = [{
  	"Title":"House",
  	"Appartment":1,
  	"RevenuPerApp":0,
  },{
  	"Title":"Duplex",
  	"Appartment":2,
  	"RevenuPerApp":0,
  },{
  	"Title":"Triplex",
  	"Appartment":3,
  	"RevenuPerApp":0,
  },{
  	"Title":"Fourplex",
  	"Appartment":4,
  	"RevenuPerApp":0,
  }];

  res.json(whatToSendBack);
});

module.exports = router;
