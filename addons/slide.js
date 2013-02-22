/*
   SLIDE addon v.1.0
   Req: genLIB [ GNU LGPL license ] : www.microbians.com : (Thanks to 1KdomLIB team)
*/

domLayer.prototype.slideXY=function(x1, y1, x2, y2, s) {
	x1=(x1==null?this.x:x1)
	y1=(y1==null?this.y:y1)
	x2=(x2==null?this.x:x2)
	y2=(y2==null?this.y:y2)
	s=s||5
	this.onslideXY=true
	var xs=(x1<x2)?1:-1
	var ys=(y1<y2)?1:-1
	xI=Math.ceil(Math.abs(x2-x1)/(11-s))
	yI=Math.ceil(Math.abs(y2-y1)/(11-s))
	this.move( x1+(xs*xI), y1+(ys*yI) )
	if( genLIB.betwen(x1,this.x,x2) || genLIB.betwen(y1,this.y,y2) ) setTimeout(this.toString() + ".slideXY("+this.x+","+this.y+","+x2+","+y2+","+s+")", 50)
	else {	this.onslideXY=null; this.invokeEvent('slideXYend') }
}

domLayer.prototype.slideWH=function(w1, h1, w2, h2, s) {
	w1=(w1==null?this.w:w1)
	h1=(h1==null?this.h:h1)
	w2=(w2==null?this.w:w2)
	h2=(h2==null?this.h:h2)
	s=s||5
	this.onslideWH=true
	var ws=(w1<w2)?1:-1
	var hs=(h1<h2)?1:-1
	wI=Math.ceil(Math.abs(w2-w1)/(11-s))
	hI=Math.ceil(Math.abs(h2-h1)/(11-s))
	this.size( w1+(ws*wI), h1+(hs*hI))
	if( genLIB.betwen(w1,this.w,w2) || genLIB.betwen(h1,this.h,h2) ) setTimeout(this.toString() + ".slideWH("+this.w+","+this.h+","+w2+","+h2+","+s+")", 50)
	else { this.onslideWH=null; this.invokeEvent('slideWHend') }
}

domLayer.prototype.slide=function(x1,y1,x2,y2, w1,h1,w2,h2, s, waiting) {
	if (waiting!=true){
		this.slideXY(x1, y1, x2, y2, s)
		this.slideWH(w1, h1, w2, h2, s)
	} 
	if (this.onslideXY || this.onslideWH) setTimeout(this.toString() + ".slide(null,null,null,null,null,null,null,null,null,true)",250);
	else this.invokeEvent('slideend')
}

domLayer.prototype.move=function(x,y) { 
	var ox=(this.toString()=='top.window'?top.window.offX||0:0);
	var oy=(this.toString()=='top.window'?top.window.offY||0:0);
	this.moveTo(x+ox,y+oy);
	if (this.toString() == "top.window") { this.x = x; this.y = y; } 
}
domLayer.prototype.size=function(w,h) { 
	var ow=(this.toString()=='top.window'?top.window.offW||0:0);
	var oh=(this.toString()=='top.window'?top.window.offH||0:0);
	this.resizeTo(w+ow,h+oh); 
	if (this.toString()=='top.window') { this.w = w; this.h = h; } 
}

// Check is in betwen
genLIB.betwen=function(x,n,y){ return(Math.min(x,y)<n && n<Math.max(x,y)) }

// SLIDE for window object
winInit = function(winobj,x,y,w,h) {
	el=eval(winobj)
	el.invokeEvent=domLayer.prototype.invokeEvent
	el.move=domLayer.prototype.move
	el.size=domLayer.prototype.size
	el.slideXY=domLayer.prototype.slideXY
	el.slideWH=domLayer.prototype.slideWH
	el.slide=domLayer.prototype.slide
	el.toString=new Function("return '"+ winobj +"';")

	if (!w) var w = (document.body.clientWidth||el.innerWidth)
	if (!h) var h = (document.body.clientHeight||el.innerHeight)
	el.resizeTo(w,h)
	var nw = (el.innerWidth||document.body.clientWidth)
	var nh = (el.innerHeight||document.body.clientHeight)
	el.offW=w-nw
	el.offH=h-nh
	el.size(w,h)
	if (!x) var x=(el.screenLeft||el.screenX)
	if (!y) var y=(el.screenTop||el.screenY)
	el.moveTo(x,y)
	var nx=(el.screenLeft||el.screenX)
	var ny=(el.screenTop||el.screenY)
	el.offX=x-nx
	el.offY=y-ny
	el.move(x,y)
}


