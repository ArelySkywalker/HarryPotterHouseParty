var uuid = require('node-uuid');

function Team(teamname,teamlogo,members) {
    //@ String -- name of team.
    this.TeamName = teamname;
    //@ String -- relative file path to team logo image.
    this.TeamLogo = teamlogo;
    //@ Array[Player] -- list of players on this team. Score of team calculated by summing
    // the point values of each achievement of each player
    this.Members = members;
    this.CurrentScore = function () {
	var currscore = 0;
	this.Members.forEach( function(member,idx,array) {
	    currscore += member.CurrentScore();
	});
	return currscore;
    }
    this.addMember = function(player) { this.Members.push(player); }
}

function Player(name,img) {
    this.Name=name;
    this.Image=img;
    this.Id = uuid.v4(); // Generate unique id upon construction
    this.Achievements = [];
    this.CurrentScore=function() {
    	var currscore = 0;
	this.Achievements.forEach( function(ach,idx,array) {
	    currscore += ach.Value();
	});
	return currscore;
    }
    this.achieve = function(baseRef,modifier) {
    	this.Achievements.push(new Achievement(baseRef,modifier));
    }
}

function Achievement(baseRef,modifier) {
    this.baseRef = baseRef;
    this.modifier = modifier;
    this.Value = function() { return this.baseRef + this.modifier };
}

module.exports.Team = Team;
module.exports.Player = Player;
module.exports.Achievement = Achievement;

teamData_test = function() {
var Stav = new Player("Stav","");
var Arely = new Player("Arely","");
var Ravenclaw = new Team("Ravenclaw","",[Stav]);
Stav.achieve(50,20);
Arely.achieve(-15,215);
Ravenclaw.addMember(Arely);
console.log(Ravenclaw.CurrentScore());
}

