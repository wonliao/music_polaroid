google.load("jquery", "1.3.1");
google.load("jqueryui", "1.7.0");
google.setOnLoadCallback(function()
{
	var t;

	$(".polaroid").each(function (i) {
		var tempVal = Math.round(Math.random());
		if(tempVal == 1) {
			var rotDegrees = randomXToY(330, 360); // rotate left
		} else {
			var rotDegrees = randomXToY(0, 30); // rotate right
		}

		if(window.innerWidth == undefined) { 
			var wiw = 1000;
			var wih = 700;
		} else {
			var wiw = window.innerWidth;
			var wih = window.innerHeight;	
		}
		
		var cssObj = { 'left' : Math.random()*(wiw-400),
			'top' : Math.random()*(wih-400),
			'-webkit-transform' : 'rotate('+ rotDegrees +'deg)',  // safari only
			'transform' : 'rotate('+ rotDegrees +'deg)' }; // added in case CSS3 is standard
		$(this).css(cssObj);
	});

	var zindexnr = 1;

	var dragging = false;
	
	$(".youtube_iframe").click( function(e) {
		
		console.log("click");
	});

	$(".polaroid").dblclick(function(e){
		console.log("polaroid");
		if(!dragging) {

			zindexnr++;
			var cssObj = 
			{ 
				'z-index' : zindexnr,
				'transform' : 'rotate(0deg)',	 // added in case CSS3 is standard
				'-webkit-transform' : 'rotate(0deg)',
			};
			$(this).css(cssObj);
			
			$(this).find("._img").hide();
			var youtube_id = $(this).find("._img").attr("alt");
			$(this).find("._iframe").attr("src", "http://www.youtube.com/embed/"+youtube_id).show();
		}
	});

	$(".polaroid").draggable({
		cursor: 'crosshair',
		start: function(event, ui) {
			
			console.log("start");

			dragging = true;
			zindexnr++;

			var cssObj =
			{ 
				'box-shadow' : '#888 5px 10px 10px', // added in case CSS3 is standard
				'-webkit-box-shadow' : '#888 5px 10px 10px', // safari only
				'transform' : 'rotate(0deg)', // added in case CSS3 is standard
				'-webkit-transform' : 'rotate(0deg)', // safari only
				'z-index' : zindexnr 
			};
			$(this).css(cssObj);

			t = setTimeout( function() {
				console.log("test 2");
				 $(document).trigger("mouseup")
			}, 2500);
		},
		stop: function(event, ui) {

			console.log("stop");
			clearTimeout(t);
			
			var tempVal = Math.round(Math.random());
			
			if(tempVal == 1) {
				var rotDegrees = randomXToY(330, 360); // rotate left
			} else {
				var rotDegrees = randomXToY(0, 30); // rotate right
			}
			
			var cssObj = 
				{ 
					'box-shadow' : '', // added in case CSS3 is standard
					'-webkit-box-shadow' : '', // safari only
					'transform' : 'rotate('+ rotDegrees +'deg)', // added in case CSS3 is standard
					'-webkit-transform' : 'rotate('+ rotDegrees +'deg)' // safari only
				};
			$(this).css(cssObj);
			dragging = false;
		}
	});

	function randomXToY(minVal,maxVal,floatVal) {
		var randVal = minVal+(Math.random()*(maxVal-minVal));
		return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
	}
	
	$("#openBtn").click( function() {

		$(".polaroid").each(function (i) {

			var x = Math.floor(i%3) * 210 + 50;
			var y = Math.floor(i/3) * 300 + 100;

			var cssObj = {
				'left' : x,
				'top' : y,
				'-webkit-transition': 'all 1s ease-in-out',
				'-moz-transition': 'all 1s ease-in-out',
				'-o-transition': 'all 1s ease-in-out',
				'transition': 'all 1s ease-in-out'
			}
			$(this).css(cssObj);
		});
	});
	
	$("#closeBtn").click( function() {

		$(".polaroid").each(function (i) {

			var cssObj = {
							'left' : '30%',
							'top' : '35%',
							'animation': '5s',
							'-webkit-animation': '5s'
						}
			$(this).css(cssObj);
		});
	});
});