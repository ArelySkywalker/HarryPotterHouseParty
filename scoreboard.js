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

var scoreAudio = new Audio('sounds/success_3.flac');
scoreAudio.load();
scoreAudio.volume = 0.5;

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

	initParticles();
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
	min = parseInt(min);
	max = parseInt(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ajaxd() {

	$.ajax({
		type: "GET",
		url: "update-scoreboard",
		success: function(res) {
		    var scores = JSON.parse(res);
		    $('.teamAvatar').each(function(index) {
				var $thisTeam = $(this),
					thisTeamScores = scores[index],
					newTotal = 0,
					lastTotal = $thisTeam.data('total');
				if (thisTeamScores.length===1){
					newTotal = thisTeamScores[0]
					$thisTeam.find('.CurrentPts').html(thisTeamScores[0]);
				}else {
					$('span.hsPt',$thisTeam).each(function(liIdx) {
						$thisTeam.html(thisTeamScores[liIdx]);
						newTotal += parseInt(thisTeamScores[liIdx]);
						console.log('new '+newTotal);
					});
					$('.CurrentPts',$thisTeam).html(newTotal);
				}

				if(lastTotal){
					if(newTotal > lastTotal){
						scoreAudio.play();
						$thisTeam.data('total', newTotal);
						$thisTeam.parents('.particle-container').addClass('active');
						setTimeout(function(){
							scoreAudio.pause();
							scoreAudio.currentTime = 0;
							$thisTeam.parents('.particle-container').removeClass('active');
						}, 1500);
					}
				}else{
					lastTotal = newTotal;
					$thisTeam.data('total', lastTotal)
				}
			});
		}
	});
}

//Load all particles here
function initParticles(){
	hearts();
}

//GENERATE our hearts
function hearts() {
	$.each($(".particle-container"), function(){
		var heartcount = getRandomInt(25,35);
		for(var i = 0; i <= heartcount; i++) {
			var size = getRandomInt(4,10);
			$(this).append('<span class="particle" style="top:' + getRandomInt(20,80) + '%; left:' + getRandomInt(0,95) + '%;width:' + size + 'px; height:' + size + 'px;"></span>');
			//animation-delay: ' + ($.rnd(0,30)/10) + 's;
		}
	});
}
