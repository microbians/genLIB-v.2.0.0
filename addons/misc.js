/*
   MISC FUNCTIONS addon v.1.0
   Req: genLIB [ GNU LGPL license ] : www.microbians.com 
*/

parseQuery=function() {
	var a=[]
	var query=location.search.substring(1);
	var pairs=query.split("&"); 
	for(var i=0; i<pairs.length; i++) {
		var pos=pairs[i].indexOf('='); 
		if (pos==-1) continue; 
		var argname=pairs[i].substring(0,pos).toLowerCase(); 
		var value=pairs[i].substring(pos+1); 
		a[argname]=unescape(value); 
	}
	a['length']=pairs.length
	return a
}

setCookie=function(n,v){document.cookie=n+"="+v+"; expires=Monday, 04-Apr-2020 05:00:00 GMT"}
getCookie=function(n){var c=document.cookie;var i=c.indexOf(n);if(i!=-1){var nst=(c.indexOf("=",i)+1);var nen=c.indexOf(";",i);if (nen==-1){nen=c.length};return c.substring(nst,nen)}}
