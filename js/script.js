var dateModifier = 0;
var week = 0;
var date = new Date();
var dateDay = date.getDay();

//get week number function

Date.prototype.getWeek = function(){
					        var onejan = new Date(this.getFullYear(), 0, 1);
					        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
					     } 

// show and update saved id:s

function showSaved(){

	savedIDs = readCookie("savedIDs");

	$(".savedList").empty();

	if (savedIDs){

		savedItems = savedIDs.split("|");

		for (var i = savedItems.length - 1; i >= 0; i--) {
			if (savedItems[i].length > 0){
				$(".savedList").append("<li class='savedItems' onclick='savedItemClicked($(this))'>" + savedItems[i] + "</li>");				
			};	
		};

	} else {

		createCookie("savedIDs", "", 360);

	};

	$(".savedIDs").fadeIn("fast");

};


//update timetable image

function updateTimetable(){

	idnumber = $(".input-idnumber").val();
	width = $( window ).width();
	height = (window.innerHeight - $(".navbar").height());
	week = $(".input-week").val();

	dayOnly = $("#input-day").is(':checked');

	if (idnumber.length > 0){
		$("#background-roller").fadeIn("fast");
	}

	if(width <= 820){
		if ($(".controls").is(':visible') != true){		
			$(".controls").hide();	
		}
	}else{
		$(".controls").show();
	}

	savePosition = $(".savebutton").position();

	if(width > 820){
		console.log("desktop mode");
		$(".savedIDs").css("left", savePosition.left);
		$(".savedIDs").css("top", (savePosition.top + 75));
		$(".savedIDs").css("transform", "none");
	}else{
		console.log("mobile mode");
		$(".savedIDs").css("left", "50%");
		$(".savedIDs").css("top", "50%");
		$(".savedIDs").css("transform", "translate(-50%,-50%)");
	}

	currentDay = dateDay + dateModifier;

    if(dayOnly) {

    	$("#input-day-label").text("Show week");

	    switch(currentDay){
	    	case 1:
	    		day = 1;
	    		break;
	    	case 2:
	    		day = 2;
	    		break;
	    	case 3:
	    		day = 4;
	    		break;
	    	case 4:
	    		day = 8;
	    		break;
	    	case 5:
	    		day = 16;
	    		break;
	    	default:
	    		day = 0;
    	}

	} else {

    	$("#input-day-label").text("Show day");
	    day = 0;
	}

	createCookie("idnumber", idnumber, 360);

	if (idnumber.length > 0){
		$(".timetable").attr("src", ("http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=80080/sv-se&id=" + idnumber + "&period=&week=" + week + "&mode=0&day=" + day + "&width=" + width + "&height=" + height ));
	}

	$(".timetable").on("load", function(){
		setTimeout(showTime, 200);
		function showTime() {
			$(".timetable").css({"transform": "none", "opacity": 1});
			$("#background-roller").fadeOut("fast");
			
		}
	});

};


//accept cookie policy

function infoClose(){
	createCookie("infoClosed", "closed", 360);
	$('.info').hide();
	$( ".input-idnumber" ).focus();
};

//dismiss changelog

function newsClose(){
	createCookie("newsClosed", "closed", 360);
	$('.news').hide();
	$( ".input-idnumber" ).focus();	
};


//save inputed item in box

function savedItemClicked(item){
	$(".input-idnumber").val(item.text());
	$(".savedIDs").fadeOut("fast");
	updateTimetable();
};


//hide controls menu on mobile
function hideControls(){

	if($( window ).width() <= 820){
		$('.controls').slideUp('fast', function() {
		    if ($(this).is(':visible')){
		        $(this).css('display','flex');
		        $(".fas").removeClass("fa-bars").addClass("fa-times");
		    }else{
		        $(".fas").removeClass("fa-times").addClass("fa-bars");
		    };
		});
	}
};

$(window).on("load", function(){
	$(".input-idnumber").val(readCookie("idnumber"));

	$(".savedIDs").fadeOut(0);

	if($( window ).width() <= 820){

		if(readCookie("idnumber") != null){
			$(".controls").hide();
			$('#input-day').prop('checked', true);			
		}else{
			$(".fas").removeClass("fa-bars").addClass("fa-times");
			$('#input-day').prop('checked', true);
			$(".controls").show();		
		};

	}else{
		$(".controls").show();
	}

	if(readCookie("infoClosed") == "closed"){
		$('.info').hide();
	}else{
		$('.info').show();
	}

	if(readCookie("newsClosed") == "closed"){
		$('.news').hide();
	}else{
		$('.news').show();
	}


	$(".input-week").val((new Date()).getWeek());
	week = (new Date()).getWeek();

	//update triggers

	updateTimetable();

	$(".loader-main").slideToggle();


	$( window ).resize(function() {
		updateTimetable();
	});

	$('.input-idnumber').on('input', function() {
		updateTimetable();
	});

	$('.input-week').on('input', function() {
		updateTimetable();
	});

	$('#input-day').on('click', function() {
		updateTimetable();
		if($(window).width() <= 820){
			$('.menuButton').trigger("click");
		}
	});

	$('.menuButton').on('click', function(){
		$('.controls').slideToggle('fast', function() {
		    if ($(this).is(':visible')){
		        $(this).css('display','flex');
		        $(".fas").removeClass("fa-bars").addClass("fa-times");
		    }else{
		        $(".fas").removeClass("fa-times").addClass("fa-bars");
		    };
		});
	});

	$('.timetable').on('click', function(){
		hideControls()
	});

	$('.input-idnumber').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			hideControls()
		};
	});

	$('.input-week').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			hideControls()
		};
	});

	$('.savebutton').on("click", function(){
		hideControls()
	});

	$('#saveItem').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			savedIDs = readCookie("savedIDs");

			savedIDs +=	($("#saveItem").val() + "|");

			$("#saveItem").val("");

			createCookie("savedIDs", savedIDs, 360);

			showSaved();
		};
	});

	$(document).mouseup(function(e){
	var container = $(".savedIDs");

		// if the target of the click isn't the container nor a descendant of the container
		if (!container.is(e.target) && container.has(e.target).length === 0) 
		{
		    container.fadeOut("fast");
		}
	});

	$(function() {
      //Enable swiping...
      $(".timetable").swipe( {
        //Single swipe handler for left swipes
        swipeLeft:function(event, direction, distance, duration, fingerCount) {

        	if($(window).width() <= 820){

        		//hide timetable
				$(".timetable").css({"transform": "translateX(-100%) scale(0.8)"});

				setTimeout(hideAndMoveLeft, 100);
				function hideAndMoveLeft() {

	        		if ($("#input-day").is(':checked')){

		        		if (dateDay + dateModifier == 0){
		        			dateModifier = 0;
		        		} else if (dateDay + dateModifier == 6){
		        			dateModifier = 0;
		        		} else {
		        			dateModifier += 1;
		        		};

	        		} else {
	        			week = parseInt(week) + parseInt(1);
	        			$(".input-week").val(week);
	    			}

		        	updateTimetable();

					// show timetable again	
					$(".timetable").css({"transform": "translateX(100%) scale(0.8)", "opacity": 0});
				}
			}

        },
        swipeRight:function(event, direction, distance, duration, fingerCount) {

        	if($(window).width() <= 820){


				//hide timetable
				$(".timetable").css({"transform": "translateX(100%) scale(0.8)"});

				setTimeout(hideAndMoveRight, 100);
				function hideAndMoveRight() {

					if ($("#input-day").is(':checked')){

		        		if (dateDay + dateModifier == 0){
		        			dateModifier = 0;
		        		} else if (dateDay + dateModifier == 6){
		        			dateModifier = 0;
		        		} else {
		        			dateModifier -= 1;
		        		};

	        		} else {
	        			week -= parseInt(1);
	        			$(".input-week").val(week);
	    			}
	        		updateTimetable();

	    			// show timetable again
					$(".timetable").css({"transform": "translateX(-100%) scale(0.8)", "opacity": 0});

				}
			}
	        

        },
        swipeUp:function(event, direction, distance, duration, fingerCount) {

        	if($(window).width() <= 820){

        		//hide timetable
				$(".timetable").css({"transform": "translateY(-100%) scale(0.8)"});

				setTimeout(hideAndMoveUp, 100);
				function hideAndMoveUp() {
	        		week = (new Date()).getWeek();
		        	dateModifier = 0;
					$(".input-week").val((new Date()).getWeek());
		        	updateTimetable();

		        	//show timetable again
					$(".timetable").css({"transform": "translateY(100%) scale(0.8)", "opacity": 0});
				}
			}

        },
        threshold:30
      });
    });

});

