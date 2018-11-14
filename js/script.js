//cookie handling functions

function createCookie(name,value,days){
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
};

function readCookie(name){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};

function eraseCookie(name){
	createCookie(name,"",-1);
};


//update timetable image

function updateTimetable(){

	idnumber = $(".input-idnumber").val();
	width = $( window ).width();
	height = ($( window ).height() - 50);

    date = new Date();
    dateDay = date.getDay();

	dayOnly = $("#input-day").is(':checked');

    if(dayOnly) {

    	$("#input-day-label").text("Show week");

	    switch(dateDay){
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
		$(".timetable").attr("src", ("http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=80080/sv-se&id=" + idnumber + "&period=&week=46&mode=0&day=" + day + "&width=" + width + "&height=" + height ));
	}

};

//accept cookie policy

function infoClose(){

	createCookie("infoClosed", "closed", 360);
	$('.info').hide();

}


$(window).on("load", function(){

	if(readCookie("infoClosed") == "closed"){
		$('.info').hide();
	}

	$(".input-idnumber").val(readCookie("idnumber"));

	//update triggers

	updateTimetable();	

	$( window ).resize(function() {
		updateTimetable();
	});

	$('.input-idnumber').on('input', function() {
		updateTimetable();
	});

	$('#input-day').on('click', function() {
		updateTimetable();
	});

});

