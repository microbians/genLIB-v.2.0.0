/*
   SCROLL addon v.1.0
   Req: genLIB [ GNU LGPL license ] : www.microbians.com
*/

function scroll(x,y,w,h,contentLayer,mBgOn,mBgOff,dBgUP,dBgOV,dBgDW) {
	this.domLayer=domLayer;
	this.domLayer( null,x,y,w+22,h);
	var l=new EventListener(this);

	this.mBgOn = mBgOn
	this.mBgOff= mBgOff
	this.dBgUP = dBgUP
	this.dBgOV = dBgOV
	this.dBgDW = dBgDW
	this.content 	= contentLayer
	this.slider 	= new domLayer(null,this.w-22,0,22,this.w, this.mBgOn)
	this.dragCT 	= new domLayer(null,this.w-22,0,22,8,this.dBgUP)

	this.dragCTevents = new EventListener(this);
	this.dragCTevents.onmouseover = function (e) {	
		if (!e.isondrag) e.target.dragCT.setBgColor(e.target.dBgOV);
		e.bubble=false
	}
	this.dragCTevents.onmousedown = function (e) {	
		if (!e.isondrag) e.target.dragCT.setBgColor(e.target.dBgDW);
		e.bubble=false
	}
	this.dragCTevents.onmouseout = function (e) {	
		if (!e.isondrag) e.target.dragCT.setBgColor(e.target.dBgUP);
		e.bubble=false
	}
	this.dragCTevents.onmouseclick = function (e) {	
		e.target.dragCT.setBgColor(e.target.dBgOV);
		e.bubble=false
	}
	this.dragCTevents.ondragstart = function (e) {
		e.target.dragCT.setBgColor(e.target.dBgDW);
		e.target.scrollInterval=setInterval(e.target.toString()+'.updateScroll()',20)
		e.bubble=false
	}

	this.dragCTevents.ondragend = function (e) {
		if (e.dragout) e.source.invokeEvent('mouseout')
		else e.source.invokeEvent('mouseover')
		clearInterval(e.target.scrollInterval);
		e.bubble=false
	}

	this.dragCT.setLimit(0,this.w,0+this.h,0+this.w-22);
	this.dragCT.addEventListener(this.dragCTevents);

	this.block(true)

	if (!this.content.eventListeners) var l = new EventListener(this);
	else { var l = this.content.eventListeners; this.content.eventListeners.target=this }

	l.onbeforeload = function (e) {	
		e.target.maxH=0;
		e.target.dragCT.moveTo(null,0)
		e.target.block(true)
	}

	l.onload = function (e) {
		e.target.maxH=e.target.content.contentH();
		e.target.content.moveTo(null,0)
		e.target.content.setClip( [ 0, null, e.target.h, null ] )
		if (e.target.maxH > e.target.h) e.target.block(false)
		e.target.invokeEvent('load')
	}
	if (!this.content.eventListeners) this.content.addEventListener(l);

	this.add(this.content)
	this.add(this.slider)
	this.add(this.dragCT)
}
scroll.prototype=new domLayer;

scroll.prototype.updateScroll=function() {
	var SCROLLCROP = Math.round( ( this.dragCT.y / (this.h-this.dragCT.h) ) * (this.maxH-this.h) )
	this.content.moveTo( null , -SCROLLCROP)
	this.content.setClip( [ SCROLLCROP, null, SCROLLCROP + this.h, null ] )
};

scroll.prototype.block=function(b) {
	if (b) {
		this.slider.setBgColor(this.mBgOff);
		this.dragCT.setVisible(false)
	} else {
		this.slider.setBgColor(this.mBgOn);
		this.dragCT.setVisible(true)
	}
};

