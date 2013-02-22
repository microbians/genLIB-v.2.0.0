/*
   BUTTON addon v.1.2
   Req: genLIB [ GNU LGPL license ] : www.microbians.com
*/

simplebutton=function(x,y,w,h,upBg,upCl,upHTML,ovBg,ovCl,ovHTML,dwBg,dwCl,dwHTML,slBg,slCl,slHTML,dsBg,dsCl,dsHTML,fontStyle,centerIt,fx,clickfn) {
	if (arguments.length==0) return
	this.domLayer=domLayer
	this.domLayer(null,x,y,w,h,upBg)

	this.fontStyle=fontStyle
	if (fontStyle) this.css.font=fontStyle

	this.upBg=upBg; this.upCl=upCl; this.upHTML=upHTML;
	this.ovBg=ovBg; this.ovCl=ovCl; this.ovHTML=ovHTML;
	this.dwBg=dwBg; this.dwCl=dwCl; this.dwHTML=dwHTML;
	this.slBg=slBg; this.slCl=slCl; this.slHTML=slHTML;
	this.dsBg=dsBg; this.dsCl=dsCl; this.dsHTML=dsHTML;

	this.fx=fx

	this.clickfn=clickfn
	this.clicked=false
	this.waitClick=false
	this.overbutton=false
	this.collection=null

	this.eventCT=new domLayer(null,0,0,w,h,null,true,null,'javascript:null')
	this.eventCT.setZ(200)

	var buttonevents=new EventListener(this);

	buttonevents.onmouseout=function(e) {	
		var o=e.target;	
		if (!o.clicked && !o.disabled && !o.waitClick) {
			if (o.upHTML) 	o.setHTML(o.upHTML)
			if (o.upBg) 	o.setBgColor(o.upBg);
			if (o.upCl) 	o.setColor(o.upCl);
		}
		o.overbutton=false
		e.bubble=false
	}

	buttonevents.onmouseover=function(e) {	
		var o=e.target;	
		if (!o.clicked && !o.disabled && !o.waitClick) {
			if (o.ovHTML) 	o.setHTML(o.ovHTML)
			if (o.ovBg) 	o.setBgColor(o.ovBg);
			if (o.ovCl) 	o.setColor(o.ovCl);
		}
		o.overbutton=true
		e.bubble=false
	}
	buttonevents.onmousedown=function(e) {	
		var o=e.target;	
		if (!o.clicked && !o.disabled && !o.waitClick) {
			if (o.dwHTML) 	o.setHTML(o.dwHTML)
			else if (o.dwBg && o.slHTML) o.setHTML(o.slHTML)
			else if (o.dwBg && o.upHTML) o.setHTML(o.upHTML)
			if (o.dwBg) 	o.setBgColor(o.dwBg);
			if (o.dwCl) 	o.setColor(o.dwCl);
		}
		o.overbutton=true
		e.bubble=false
	}
	buttonevents.onclick=function(e) {	
		var o=e.target;	
		if ( ((o.collection && !o.clicked) || (!o.collection))&&(!o.disabled) ) {
			var waitClick=false
			if (o.collection) {
				for (var i=0; i<o.collection.length; i++) {
					if ( o.collection[i].waitClick == true ) {
						waitClick=true
						break
					}
				}
			}
			if (!waitClick) { 
				if (o.collection) {
					for (var i=0; i<o.collection.length; i++) {
						o.collection[i].waitClick=true
						if (o!=o.collection[i] && !o.collection[i].disabled) {
							if (o.collection[i].upHTML) o.collection[i].setHTML(o.collection[i].upHTML)
							if (o.collection[i].upBg) o.collection[i].setBgColor(o.collection[i].upBg);
							if (o.collection[i].upCl) o.collection[i].setColor(o.collection[i].upCl);
							o.collection[i].clicked=false
						}
					}
				}
				setTimeout( o.toString()+".bgColorFX(0)",20); 
			}
		}
		e.bubble=false
	}
	this.bgColorFX=function(count) {
		if ( count % 2 == 0 ) 	{ if (this.slBg) this.setBgColor(this.slBg); }
		else 			{ if (this.upBg) this.setBgColor(this.upBg); }
		count++
		if ( count < 10 && this.fx) {
			setTimeout( this.toString()+".bgColorFX("+ count +")", 20 )
		} else {
			if (this.slHTML) this.setHTML(this.slHTML)
			if (this.slBg)   this.setBgColor(this.slBg);
			if (this.slCl)   this.setColor(this.slCl);
			if (this.collection) {
				this.clicked=true
				for (var i=0; i<this.collection.length; i++) this.collection[i].waitClick=false;
			} else { 
				if (this.overbutton) this.eventCT.invokeEvent("mouseover")
				else 		     this.eventCT.invokeEvent('mouseout')
			}
			if (this.clickfn) setTimeout(this.toString()+".clickfn()",250)
		}
	}
	this.eventCT.addEventListener(buttonevents);

	this.centerIt=(centerIt==true||centerIt=='center'||centerIt=='left'||centerIt=='right')?true:false

	var preHTML=centerIt?"<table style=\"font:"+this.css.font+";width:"+this.css.width+";height:"+this.css.height+";\" border=0 cellpadding=0 cellspacing=0><tr><td width=\""+this.w+"\" height=\""+this.h+"\" align=\""+(centerIt==true?'center':centerIt)+"\" valign=\"middle\">":''
	var posHTML=centerIt?"</td></tr></table>":''

	if (this.upHTML) this.upHTML=preHTML+this.upHTML+posHTML
	if (this.ovHTML) this.ovHTML=preHTML+this.ovHTML+posHTML
	if (this.dwHTML) this.dwHTML=preHTML+this.dwHTML+posHTML
	if (this.slHTML) this.slHTML=preHTML+this.slHTML+posHTML
	if (this.dsHTML) this.dsHTML=preHTML+this.dsHTML+posHTML

	this.setHTML(this.upHTML)
	this.setColor(upCl||'')

	this.add(this.eventCT)
};
simplebutton.prototype=new domLayer

simplebutton.prototype.disable=function() { 
	this.disabled=true
	this.clicked=false
	if (this.dsHTML) this.setHTML(this.dsHTML)
	if (this.dsBg)   this.setBgColor(this.dsBg);
	if (this.dsCl)   this.setColor(this.dsCl);
}

simplebutton.prototype.select=function() { 
	this.disabled=false
	this.clicked=true
	if (this.slHTML) this.setHTML(this.slHTML)
	else if (this.dwHTML) this.setHTML(this.dwHTML)
	if (this.slBg)   this.setBgColor(this.slBg);
	if (this.slCl)   this.setColor(this.slCl);
}

simplebutton.prototype.enable=function() { 
	this.disabled=false
	if (this.upHTML) this.setHTML(this.upHTML)
	if (this.upBg) 	 this.setBgColor(this.upBg);
	if (this.upCl) 	 this.setColor(this.upCl);
}

simplebutton.prototype.setColor=function(c) { 
	this.css.color=c
	if (this.centerIt) {
		if (is.ie&&is.mac) setTimeout(this.toString()+".elm.getElementsByTagName('TD')[0].style.color=\""+c+"\"",20)
		else this.elm.getElementsByTagName('TD')[0].style.color=c
	}
}

simplebutton.prototype._setHTML=simplebutton.prototype.setHTML
simplebutton.prototype.setHTML=function(html,b) { 
	if (this.html!=html) this._setHTML(html,b);
	if (this.centerIt&&this.fontStyle) {
		if (is.ie&&is.mac) setTimeout(this.toString()+".elm.getElementsByTagName('TD')[0].style.font="+this.toString()+".css.font",20)
		else this.elm.getElementsByTagName('TD')[0].style.font=this.css.font
	}
}

simplebutton.collection=function() {
	var a=arguments
	this.collection=new Array();
	for (var i=0; i<a.length; i++) {
		this.collection[i]=a[i]
		this.collection[i].collection=this.collection
	}
}

simplebutton.collection.prototype.disable=function() { var c=this.collection; for (var i=0; i<c.length; i++) { c[i].disabled=true;  c[i].invokeEvent('mouseout') } }
simplebutton.collection.prototype.enable =function() { var c=this.collection; for (var i=0; i<c.length; i++) { c[i].disabled=false; if (c[i].overbutton) c[i].eventCT.invokeEvent("mouseover"); else c[i].eventCT.invokeEvent('mouseout') } }
simplebutton.collection.prototype.reset  =function() { var c=this.collection; for (var i=0; i<c.length; i++) { c[i].disabled=false; c[i].clicked=false; if (c[i].overbutton) c[i].eventCT.invokeEvent("mouseover"); else c[i].eventCT.invokeEvent('mouseout') } }

simplebutton.collection.prototype.disableAll=function() { var c=this.collection; for (var i=0; i<c.length; i++) { c[i].disable() } }
simplebutton.collection.prototype.enableAll =function() { 
	var c=this.collection;
	for (var i=0; i<c.length; i++) {
		c[i].disabled=false;
		if (!c[i].clicked) {
			if (c[i].overbutton) c[i].eventCT.invokeEvent("mouseover");
			else 		     c[i].eventCT.invokeEvent('mouseout')
		} else {
			if (c[i].slHTML) c[i].setHTML(c[i].slHTML)
			if (c[i].slBg) c[i].setBgColor(c[i].slBg);
			if (c[i].slCl) c[i].setColor(c[i].slCl);
		}
	} 
}
