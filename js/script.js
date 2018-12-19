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

	if(width <= 820){
		if ($(".controls").is(':visible') != true){		
			$(".controls").hide();	
		}
	}else{
		$(".controls").show();
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

};

//accept cookie policy

function infoClose(){
	createCookie("infoClosed", "closed", 360);
	$('.info').hide();
	$( ".input-idnumber" ).focus();
};

function newsClose(){
	createCookie("newsClosed", "closed", 360);
	$('.news').hide();
	$( ".input-idnumber" ).focus();	
};

function savedItemClicked(item){
	$(".input-idnumber").val(item.text());
	$(".savedIDs").fadeOut("fast");
	updateTimetable();
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

	$('.input-idnumber').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			if($(window).width() <= 820){
				if ($(this).is(':visible')){
					$('.menuButton').trigger("click");
				}; 
			};
		};
	});

	$('.input-week').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			if($(window).width() <= 820){
				if ($(this).is(':visible')){
					$('.menuButton').trigger("click");
				};
			};
		};
	});

	$('.savebutton').on("click", function(){
		if($(window).width() <= 820){
			if ($(this).is(':visible')){
				$('.menuButton').trigger("click");
			};
		};
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
			}

        },
        swipeRight:function(event, direction, distance, duration, fingerCount) {

        	if($(window).width() <= 820){

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
			}
	        
	        updateTimetable();

        },
        swipeUp:function(event, direction, distance, duration, fingerCount) {

        	if($(window).width() <= 820){
        		week = (new Date()).getWeek();
	        	dateModifier = 0;
				$(".input-week").val((new Date()).getWeek());
	        	updateTimetable();
			}

        },
        threshold:30
      });
    });

});

