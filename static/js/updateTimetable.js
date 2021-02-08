//update timetable image

function updateTimetable(){

	idnumber = $(".input-idnumber").val();
	width = $( window ).width() + 6;
	height = (window.innerHeight - $(".navbar").height() + 1);

	if ($("#roundedMode").is(':checked')){
		height -= 25;
		createCookie("roundedMode", "rounded", 360);
	}else{
		createCookie("roundedMode", "straight", 360);
	}

	week = $(".input-week").val();

	dayOnly = $("#input-day").is(':checked');

	if (idnumber.length > 0){
		$("#background-roller").fadeIn("fast");
	}

	savePosition = $(".savebutton").offset();

	if(width > 820){
	$(".savedIDs").css("right", 0);
	$(".savedIDs").css("top", 50);
	$(".savedIDs").css("transform", "none");
	}else{
		$(".savedIDs").css("left", "auto");
		$(".savedIDs").css("top", "auto");
		$(".savedIDs").css("transform", "none");
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
			$('.arrow').removeClass('arrow-loading');

			$('.timetable').fadeIn(500);
			$(".timetable").css({"transform": "none", "opacity": 1});
			$("#background-roller").fadeOut("fast");
			$(".arrow-center-text").text(week);
			
		}
	});

};