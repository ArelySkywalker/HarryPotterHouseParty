var url = require('url');
var WebSocketServer = require('ws').Server;

var express = require('express');
var router = express.Router();

var fs = require('fs');
var teamdata = JSON.parse(fs.readFileSync('teamdata.json', 'utf8'));

//Construct team index for houses
var houseIndex = {};
for (var teamName in teamdata) {
    for (var houseName in teamdata[teamName].Houses) {
        houseIndex[houseName] = teamName;
    }
}

var server = require('http').createServer();
//For the time being, there's absolutely no reason to keep the category info on
//the server and beam info back and forth from it to the client. (If the
//category list were really big, that would be concerning -- but it's not.) So I've put all
//the category info in prefect.js and referencing it all from there directly.
/*var categories = {
    "Bring provisions" : {
	"Small snack" : 10,
	"Alcohol" : 15,
    	"Big snack" : 20},
    "Win a game" : {
	"HP dice game" : 15,
	"HP Pong w/o snitch" : 20,
	"Codenames/Patchwork/Resistance" : 25,
    	"Long game" : 40,
    	"HP Pong with snitch" : 50},
    "Get drunk" : {
	"Take a shot" : 10,
	"Brew a potion" : 15},
    "Engage in costumed antics" : {
	"Wear a costume" : 15,
	"Re-enact a scene (2 mins)": 30,
	"Win costume contest" : 50}
};*/

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {teamdata: teamdata});
});

// GET prefect score updating window.
router.get('/prefect', function(req, res, next) {
    res.render('prefect');
});

// GET team names from server.
router.get('/house-names', function(req, res, next) {
    res.send(JSON.stringify(Object.keys(houseIndex)));
});

// POST new score results to the server.
router.post('/prefect', function(req,res) {
    var data = JSON.parse(req.body.data);
    data.forEach(function(val) {
	if (houseIndex[val.HouseName]) {
	    var scoreDel = parseInt(val.BaselineValue) + (parseInt(val.Modifier) || 0);
	    teamdata[houseIndex[val.HouseName]].Houses[val.HouseName] += scoreDel;
	}
    });
    res.send("");
});

// GET current scores from server.
router.get('/update-scoreboard', function(req,res) {

    var scores = [];
    for (var team in teamdata) {
	var teamscore = [];
	var houseList = teamdata[team].Houses;
	for (var house in houseList) teamscore.push(houseList[house]);
	scores.push(teamscore);
    }
    res.send(JSON.stringify(scores));
});
module.exports = router;
