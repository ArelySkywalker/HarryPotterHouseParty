var lastQuote = null,
    FADESPEED = 500,
    UPDATESPEED = 3000,
    QUOTESPEED = 10000;

//any quotes you would like to display on the screen can be added here
var quotes = ['"It just means these tasks are designed to test you. In the most brutal way, they\'re almost cruel."<br />- Hermione',
            '"You\'re a wizard, Harry."<br />- Hagrid',
            '"It does not do to dwell on dreams and forget to live."<br />- Dumbledore',
            '"Fear of a name increases fear of the thing itself."<br />- Dumbledore',
            '"Of course it is happening inside your head, Harry, but why on earth should that mean it is not real?"<br />- Dumbledore',
            '"Happiness can be found, even in the darkest of times, if only one remembers to turn on the light."<br />- Dumbledore',
            '"I mean, it\'s sort of exciting isn\'t it? Breaking the rules."<br />- Hermione'];

$(document).ready(function() {
    setupScoreboard();
	setInterval(ajaxd,UPDATESPEED);
    setInterval(rotateQuotes,QUOTESPEED);
});

function setupScoreboard(){
    var teams = [
            {
                id: 1,
                name: 'Ravenclaw'
            },
            {
                id: 2,
                name: 'Slytherin'
            },
            {
                id: 3,
                name: 'Gryffindor'
            },
            {
                id: 4,
                name: 'Hufflepuff'
            }
        ],
        startingPoints = 60,
        $scoreTable = $('#scoreTable'),
        teamTemplate = $('#team-tempate').html(),
        lastQuote = getRandomInt(1, quotes.length) - 1;

    $('h2.header-subtitle').html(quotes[lastQuote]);

    for(var key in teams){
        //console.log(teams[key]);
        var newTeam = TemplateEngine(teamTemplate, {
                        id: teams[key].id,
                        name: teams[key].name,
                        points: startingPoints
                    });

        $scoreTable.append(newTeam);
    }

    $scoreTable.append('<div class="clearfix"></div>');

}

function TemplateEngine(tpl, data) {
	for(var key in data){
		var re = new RegExp("<%" + key + "%>", "gi");
		tpl = tpl.replace(re, data[key]);
	}
	return tpl;
}

function rotateQuotes(){
    var newQuote = getRandomInt(1, quotes.length) - 1;

    //prevent the same quote being used twice
    while(newQuote == lastQuote){
        newQuote = getRandomInt(1, quotes.length) - 1;
    }

    $('h2.header-subtitle').fadeOut( FADESPEED, "linear", function(){
        $('h2.header-subtitle').html(quotes[newQuote]).fadeIn( FADESPEED, "linear");
    } );
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ajaxd() {
    $.ajax({
	type: "GET",
	url: "update-scoreboard",
	success: function(res) {
	    var scores = JSON.parse(res);
	    $('.teamAvatar').each(function(index) {
		thisTeamScores = scores[index];
		if (thisTeamScores.length===1) $('.CurrentPts',this).html(thisTeamScores[0]);
		else {
		    var newTotal = 0;
		    $('span.hsPt',this).each(function(liIdx) {
			$(this).html(thisTeamScores[liIdx]);
			newTotal += parseInt(thisTeamScores[liIdx]);
		    });
		    $('.CurrentPts',this).html(newTotal);
		}
	    });
	}
    });
}
