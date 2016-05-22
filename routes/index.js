var express = require('express');
var router = express.Router();

var fs = require('fs');
var teamdata = JSON.parse(fs.readFileSync('teamdata.json', 'utf8'));

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
    res.render('index', {teamdata: teamdata});
});

// GET prefect score updating window.
router.get('/prefect', function(req, res, next) {
    res.render('prefect');
});

// GET team names from server.
router.get('/team-names', function(req, res, next) {
    res.send(JSON.stringify(Object.keys(teamdata)));
});

// POST new score results to the server.
router.post('/prefect', function(req,res) {
    var data = JSON.parse(req.body.data);
    //console.log(JSON.stringify(data)+" is my JAM THO");
    //fs.writeFile("testFile",data, function(err) {
	//if(err) {
	    //return console.log(err);
	//}
    //});
    console.log("data consists of "+data.length+" elements.");
    data.forEach(function(val) {
	if (teamdata[val.TeamName] && val.Modifier) {
	    teamdata[val.TeamName].CurrentPts += parseInt(val.Modifier);
	    console.log(teamdata[val.TeamName].CurrentPts)
	}
    });
    res.send("");
});
    module.exports = router;
