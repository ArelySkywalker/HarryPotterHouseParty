$(document).ready(function() {
    console.log("Test");
    var socket = new WebSocket("ws://localhost:8078");
	socket.onopen = function(evt) {
		alert("Yes");
	};
    socket.onmessage = function(evt) {
        var scores = JSON.parse(evt.data);
        $('.teamAvatar').each(function(index) {
            $('.CurrentPts',this).html(scores[index]);
        });
    };
});
