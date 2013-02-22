/*
   CALENDAR addon v.1.0 beta [ NOT FINISHED ]
   Req: genLIB, button, neuraltype | [ GNU LGPL license ] | www.microbians.com
   This addon start from calendarpopup from Matt Kruse <matt@mattkruse.com> / http://www.mattkruse.com/
*/

// CONSTRUCTOR for the CalendarPopup Object
function calendar(x,y,cw,ch) {
	if (arguments.length==0) return
	this.domLayer=domLayer
	this.domLayer(null,x,y,(cw+1)*7,(ch+1)*7)

	this.monthNames = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	this.dayHeaders = new Array("S","M","T","W","T","F","S");
	this.start = 0;
}
calendar.prototype=new domLayer

// Months names
calendar.prototype.months=function() { for (var i=0; i<arguments.length; i++) { this.monthNames[i]=arguments[i] } }

// Days names
calendar.prototype.days=function()   { for (var i=0; i<arguments.length; i++) { this.dayHeaders[i]=arguments[i] } }

// Set the day of the week (0-7) that the calendar display starts on
// This is for countries other than the US whose calendar displays start on Monday(1), for example
calendar.prototype.startday=function(day) { this.start = day }

// Return a string containing all the calendar code to be displayed
calendar.prototype.draw=function() {
	var a=arguments;
	var now = new Date();
	if (a.length>0) var month=a[0]; else var month=now.getMonth()+1;
	if (a.length>1) var year =a[1]; else var year =now.getFullYear();
	var daysinmonth= new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);

	// leap year
	if ( ((year%4==0) && (year%100!=0)) || (year%400==0) ) daysinmonth[2]=29;

	var current_month = new Date(year,month-1,1);
	var display_year  = year;
	var display_month = month;
	var display_date  = 1;
	var weekday = current_month.getDay();
	var offset = 0;
	if (weekday>=this.start) offset=weekday-this.start;
	else 			 offset=7-this.start+weekday;
	if (offset>0) {
		display_month--;
		if (display_month < 1) { display_month = 12; display_year--; }
		display_date = daysinmonth[display_month]-offset+1;
	}
	var next_month = month+1;
	var next_month_year = year;
	if (next_month > 12) { next_month=1; next_month_year++; }
	var last_month = month-1;
	var last_month_year = year;
	if (last_month < 1) { last_month=12; last_month_year--; }

	result=''
	result += '<table width='+this.w+' border=0 borderwidth=0 cellspacing=1 cellpadding=0>\n';
	result += '<TR>\n';
	result += '	<TD bgcolor="red" align=left valign=top style="font:'+this.css.font+'" width='+Math.round((this.w-7)/7)+' height='+Math.round((this.h-7)/7)+'><b>'+this.dayHeaders[(this.start+0)%7]+'</b></TD>\n';
	result += '	<TD bgcolor="red" align=left valign=top style="font:'+this.css.font+'" width='+Math.round((this.w-7)/7)+' height='+Math.round((this.h-7)/7)+'><b>'+this.dayHeaders[(this.start+1)%7]+'</b></TD>\n';
	result += '	<TD bgcolor="red" align=left valign=top style="font:'+this.css.font+'" width='+Math.round((this.w-7)/7)+' height='+Math.round((this.h-7)/7)+'><b>'+this.dayHeaders[(this.start+2)%7]+'</b></TD>\n';
	result += '	<TD bgcolor="red" align=left valign=top style="font:'+this.css.font+'" width='+Math.round((this.w-7)/7)+' height='+Math.round((this.h-7)/7)+'><b>'+this.dayHeaders[(this.start+3)%7]+'</b></TD>\n';
	result += '	<TD bgcolor="red" align=left valign=top style="font:'+this.css.font+'" width='+Math.round((this.w-7)/7)+' height='+Math.round((this.h-7)/7)+'><b>'+this.dayHeaders[(this.start+4)%7]+'</b></TD>\n';
	result += '	<TD bgcolor="red" align=left valign=top style="font:'+this.css.font+'" width='+Math.round((this.w-7)/7)+' height='+Math.round((this.h-7)/7)+'><b>'+this.dayHeaders[(this.start+5)%7]+'</b></TD>\n';
	result += '	<TD bgcolor="red" align=left valign=top style="font:'+this.css.font+'" width='+Math.round((this.w-7)/7)+' height='+Math.round((this.h-7)/7)+'><b>'+this.dayHeaders[(this.start+6)%7]+'</b></TD>\n';
	result += '</TR>\n';

	for (var row=0; row<=5; row++) {
		for (var col=0; col<=6; col++) {
			display_datetxt=display_date
			if (display_month == month) {
				date_class = "calthismonth";
			}
			else {
				display_datetxt=''
			}
			if ((display_month == now.getMonth()+1) && (display_date==now.getDate()) && (display_year==now.getFullYear())) {
			}
			else {
				td_class="calmonth";
			}
			display_date++;
			if (display_date > daysinmonth[display_month]) {
				display_date=1;
				display_month++;
				}
			if (display_month > 12) {
				display_month=1;
				display_year++;
				}
			result += '<td onclick="alert(\'click\')" onmouseover="this.style.background=\'green\'" onmouseout="this.style.background=\'red\'" bgcolor="red" align=left valign=top style="cursor:hand;font:'+this.css.font+'" height='+Math.round((this.h-7)/7)+'><a href="javascript:;">'+display_date+'</a></td>'
		}
		result += '</TR>';
	}
	result += '</table>\n';
	this.setHTML(result,true)
}
