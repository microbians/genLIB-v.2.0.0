/*
	NOSECONDMOUSE v.1.1b
	(c) Gabriel Suchowolski power[z]one / www.microbians.com / powerz@microbians.com
	Distributed under the terms of the GNU LGPL license (www.gnu.org)
	Available at http://www.microbians.com
*/

function NSclick(e) {
	if (navigator.appName=="Netscape" && parseInt(navigator.appVersion)==4) { 
		if (e.which == 3) {
			return false;
		}
	}
	if (navigator.appName=="Netscape" && parseInt(navigator.appVersion)>=5) { 
    		if (e.button == 2 || e.button == 3) {
      			e.preventDefault();
			return false;
  		}
	}
}

if (navigator.appName=="Netscape" && parseInt(navigator.appVersion)==4) { 
	document.onmousedown=NSclick;
	document.captureEvents(Event.MOUSEDOWN);
}
if (navigator.appName=="Netscape" && parseInt(navigator.appVersion)>=5) { 
	document.onmouseup=NSclick;
}
if (navigator.appName=="Microsoft Internet Explorer") { 
	document.oncontextmenu = new Function("return false;")
}


