var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var whatToSendBack = {
  	"title":"Triplex"
  }
  res.render("building", whatToSendBack);
});

module.exports = router;
