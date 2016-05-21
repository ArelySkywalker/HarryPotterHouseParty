var express = require('express');
var router = express.Router();

var fs = require('fs');
var someObj = JSON.parse(fs.readFileSync('teamdata.json', 'utf8'));

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
    res.render('index', {teamdata: someObj});
});

// GET prefect score updating window.
router.get('/prefect', function(req, res, next) {
    res.render('prefect');
});

// POST new score results to the server.
router.post('/prefect', function(req,res) {
    var data = JSON.parse(req.body.data);
    console.log(JSON.stringify(data)+" is my JAM THO");
    //fs.writeFile("testFile",data, function(err) {
	//if(err) {
	    //return console.log(err);
	//}
    //});
    console.log("data consists of "+data.length+" elements.");
    for (i = 0; i < data.length; i++) {
    	val = data[i];
    	console.log("This is inside the foreach loop. Printing val:");
    	console.log(val);
	if (teamdata[val.TeamName]) {
	    console.log(teamdata[val.TeamName].CurrentPts);
	    teamdata[val.TeamName].CurrentPts += parseInt(val.Modifier);
	}
    }
    res.send("");
});

    module.exports = router;
