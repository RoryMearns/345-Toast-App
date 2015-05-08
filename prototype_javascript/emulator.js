/* Emulator for 345 Assignment: Rory Mearns (ID.3928873) */


// Canvas elemnt
var canvas = $("#proto_canvas").get(0);
var ctx = canvas.getContext("2d");	


$(document).ready(function() {
	$("#up").click(function() {
		//alert("UP is working");
	});
	$("#down").click(function() {
		//alert("DOWN is working");
	});
	$("#left").click(function() {
		//alert("LEFT is working");
	});
	$("#right").click(function() {
		//alert("RIGHT is working");
	});
	$("#enter").click(function() {
		//alert("SELECT is working");
	});
	//ctx.fillRect(0, 0, 60, 60);
});


/* 
Functions I wand the emulator to handle:

------ WRITING TO THE SCREEN ------
drawPNG(x, y, w, h);
drawText(x, y, size, color, string);	// Should size be in point? 
drawRect(x, y, w, h, color);
drawCircle(x, y, w, h, color);

------ FETCHING FUNCTIONAL DATA ------
getTime();
getDate();
getDay();

------ DELIVERING ALERTS ------
alert();		// ??? not so sure about this one...


------ DELIVERING INPUT TO THE PROGRAM ------
...Not sure if I should just deliver it straight to the program...
*/


