var express = require('express');
var router = express.Router();
const path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index1', { title: 'Express' });
});
router.get('/client2', function(req, res, next) {
  res.sendFile(path.resolve('/public/index1.html'), { title: 'Express' });
});

module.exports = router;
