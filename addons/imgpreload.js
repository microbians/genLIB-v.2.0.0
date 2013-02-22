/*
   IMGPRELOADER addon v.1.2
   Req: genLIB [ GNU LGPL license ] : www.microbians.com
*/

domImg=new Object();
domImg.imgs=new Array();
domImg.done=0
domImg.error=0

domImg.addImg = function (src) {
	var imgs=domImg.imgs
	var max=imgs.length
	domImg.queued++
	imgs[max] = new Image();
	imgs[max].loaded=false
	imgs[max].onload=function() { this.loaded=false; domImg.done++ }
	imgs[max].onerror=function () { domImg.done++; domImg.error++; window.status='[ ... ] some images not fount' }
	imgs[max].src=src
	return imgs[max]
}

domImg.onImgLoaded = function(){}

domImg.check = function(aredone) {
	var imgs = domImg.imgs
	var max  = imgs.length
	if (domImg.onload) {
		if (aredone!=domImg.done) domImg.onImgLoaded();
		if (domImg.done<max) setTimeout('domImg.check('+domImg.done+')', 20)
		else setTimeout('domImg.onload()', 500)
	}
}

domImg.html = function(imgObj,w,h) {
	var w=w?w:imgObj.width
	var h=h?h:imgObj.height
	if (is.mac&&is.ie && w==1 && !h) { w=h=null }
	var s=''
	if (w) s+=' width='+w
	if (h) s+=' height='+h
	return '<img src="'+imgObj.src+'"'+s+' border=0>'
}
