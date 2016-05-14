var express = require('express');
var router = express.Router();

var fs = require('fs');
var someObj = JSON.parse(fs.readFileSync('teamdata.json', 'utf8'));

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
    res.render('index', {teamdata: someObj});
});

module.exports = router;
