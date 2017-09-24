$(document).ready(function() {
	//load all game variables here
	var Game = {
		animationPlaying: false,
		animationSpeed: 300,
		audio: new Audio('sounds/success_2.wav'),
		categories: {
			"Bring provisions" : {
				"Small snack" : 10,
				"Alcohol" : 15,
				"Big snack" : 20
			},
			"Win a game" : {
				"HP dice game" : 15,
				"HP Pong w/o snitch" : 20,
				"Codenames/Patchwork/Resistance" : 25,
				"Long game" : 40,
				"HP Pong with snitch" : 50
			},
			"Get drunk" : {
				"Take a shot" : 10,
				"Brew a potion" : 15
			},
			"Engage in costumed antics" : {
				"Wear a costume" : 15,
				"Re-enact a scene (2 mins)": 30,
				"Win costume contest" : 50
			}
		},
		clickDelay: 1500,
		houses: ['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'],
		possiblePoints: [1,5,10,15]
	}

	//load all user / prefect variables here
	var Prefect = {
		house: '',
		reason: '',
		detail: '',
	};

	//Load our templates
	var houseTemplate = $('#house-tempate').html(),
		pointsTemplate = $('#points-tempate').html();

	//load our audio right away so there is no delay on the first play
	Game.audio.load();

	//BUILD our house options
	var houseHTML = '';
	Game.houses.forEach(function(house){
		houseHTML += TemplateEngine(houseTemplate, { house: house });
	});
	$('#choose-house .row').append(houseHTML);

	//BUILD our points
	var pointsHTML = '';
	Game.possiblePoints.forEach(function(points){
		pointsHTML += TemplateEngine(pointsTemplate, { points: points });
	});
	$('#give-points .row').append(pointsHTML);

	//BUILD our category options
	var $reasons = $('.category.reason');
	var $details = $('.category.details');
	$.each(Game.categories,function(reason, details){
		$reasons.append('<option value="'+reason+'">'+reason+'</value>');
		$.each(details,function(detail, value){
			//using 'value' will give the details point value instead of the name
			$details.append('<option value="'+detail+'">'+detail+'</value>');
		});
	});

	//FIND all interactive elements
	var $chooseHouseDiv = $('#choose-house'),
		$chooseHouseBtns = $('#choose-house .house-option img'),
		$houseBadgeDiv = $('.house-badges'),
		$houseBadgeBtns = $('.house-badges img'),
		$givePoints = $('#give-points');

	//CREATE all our particles!
	initParticles();

	/*****************************
	 * ACTIONS
	 *****************************/

	//UPDATE reason for points
	Prefect.reason = $reasons.val();
	$reasons.change(function(e){
		Prefect.reason = $(this).val();
	});
	Prefect.detail = $details.val();
	$details.change(function(e){
		Prefect.detail = $(this).val();
	});

	//SELECT A HOUSE
	$chooseHouseBtns.click(function(e){
		Prefect.house = $(this).data('house');
		$chooseHouseDiv.addClass('house-selected');
		$houseBadgeDiv.addClass(Prefect.house);
		$houseBadgeBtns.attr('src','/images/badge_'+Prefect.house+'.png');
		setTimeout(function(){
			$chooseHouseDiv.hide();
			$givePoints.addClass('active');
		}, Game.animationSpeed);
	});

	//GIVE POINTS
	$houseBadgeDiv.click(function(e){
		var $thisBadge = $(this),
			thisPoints = $thisBadge.data('points');

		if(! Game.animationPlaying){
			Game.animationPlaying = true;
			Game.audio.play();
			$thisBadge.addClass('active');

			addPoints(thisPoints, Prefect.house, Prefect.reason, Prefect.detail);

			setTimeout(function(){
				$thisBadge.removeClass('active');
				Game.audio.pause();
				Game.audio.currentTime = 0;
				Game.animationPlaying = false;
			}, Game.clickDelay);
		}

	});

});

/**
 * Create common html bits using templates to
 */
function TemplateEngine(tpl, data) {
	for(var key in data){
		var re = new RegExp("<%" + key + "%>", "gi");
		tpl = tpl.replace(re, data[key]);
	}
	return tpl;
}

function getRandomInt(min, max) {
	min = parseInt(min);
	max = parseInt(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Load all particles here
function initParticles(){
	hearts();
}

/**
 * ADD POINTS to the Prefect's House
 */
function addPoints(points, house, reason, detail){
	var data = [];
	var dataRow = {
		"HouseName": house,
		"PointCategory": reason,
		"PointSubcategory": detail,
		"BaselineValue": points,
		"Modifier": 0
	};

	data.push(dataRow);

	$.post('/prefect',{data:JSON.stringify(data)});
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
