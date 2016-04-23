var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var whatToSendBack = {
  	"title":"Triplex"
  }
  res.render("building", whatToSendBack);
});

router.get('/list.json', function(req, res, next) {
  var whatToSendBack = {
  	"title":"Triplex Json"
  }
  res.json(whatToSendBack);
});

module.exports = router;
