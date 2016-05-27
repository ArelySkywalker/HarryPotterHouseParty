$(document).ready(function() {
    var socket = new WebSocket("ws://localhost:8078");
	// socket.onopen = function(evt) {
		// alert("Yes");
	// };
    socket.onmessage = function(evt) {
        var scores = JSON.parse(evt.data);
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
    };
});
