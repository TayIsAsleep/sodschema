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

	createCookie("idnumber", idnumber, 360);

	if (idnumber.length > 0){
		$(".timetable").attr("src", ("http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=80080/sv-se&id=" + idnumber + "&period=&week=46&mode=0&day=0&width=" + width + "&height=" + height ));
	}

};


$(window).on("load", function(){

	$(".input-idnumber").val(readCookie("idnumber"));

	//update triggers

	updateTimetable();	

	$( window ).resize(function() {
		updateTimetable();
	});

	$('.input-idnumber').on('input', function() {
		updateTimetable();
	});

});

