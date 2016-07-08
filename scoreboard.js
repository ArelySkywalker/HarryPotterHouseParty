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

$(document).ready(function() {
	setInterval("ajaxd()",3000);
});
