$(document).ready(function() {
	var animationPlaying = false;
	var audio = new Audio('sounds/success_2.wav');
	var prefect = {
		house: ''
	};


	//load our audio right away so there is no delay on the first play
	audio.load();

	//SELECT A HOUSE
	$('#choose-house .house-option img').click(function(e){
		prefect.house = $(this).data('house');
		$('#choose-house').addClass('house-selected');
		$('.house-badges img').attr('src','/images/badge_'+prefect.house+'.png');
		setTimeout(function(){
			$('#choose-house').hide();
			$('#give-points').addClass('active');

		}, 300);
	});

	//GIVE POINTS
	$('.house-badges').click(function(e){
		var $thisBadge = $(this);

		if(! animationPlaying){
			animationPlaying = true;
			audio.play();
			$thisBadge.addClass('active');

			setTimeout(function(){
				$thisBadge.removeClass('active');
				audio.pause();
				audio.currentTime = 0;
				animationPlaying = false;
			}, 2000);
		}

	});

	//create all our particles!
	hearts();
});

jQuery.rnd = function(m,n) {
  m = parseInt(m);
  n = parseInt(n);
  return Math.floor( Math.random() * (n - m + 1) ) + m;
}

function hearts() {
   $.each($(".house-badges"), function(){
	  var heartcount = 30;//($(this).width()/50)*5;
	  for(var i = 0; i <= heartcount; i++) {
		 var size = ($.rnd(20,50)/5);
		 $(this).append('<span class="particle" style="top:' + $.rnd(20,80) + '%; left:' + $.rnd(0,95) + '%;width:' + size + 'px; height:' + size + 'px;"></span>');
		 //animation-delay: ' + ($.rnd(0,30)/10) + 's;
	  }
   });
}
