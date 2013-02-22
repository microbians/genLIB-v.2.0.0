/*
   BUTTON addon v.1.3
   Req: genLIB [ GNU LGPL license ] : www.microbians.com
*/

function button(x,y,w,h,upBg,upHTML,ovBg,ovHTML,dwBg,dwHTML,slBg,slHTML,dsBg,dsHTML,oncreatefn,fx,clickfn) {
	if (arguments.length==0) return
	this.domLayer=domLayer
	this.domLayer(null,x,y,w,h,upBg)

	this.upBg=upBg
	this.ovBg=ovBg
	this.dwBg=dwBg
	this.slBg=slBg
	this.dsBg=dsBg

	this.fx=fx

	this.clickfn=clickfn
	this.clicked=false
	this.waitClick=false
	this.overbutton=false
	this.collection=null

	if (upHTML!=null) { this.upLyr=new domLayer(null,null,null,null,null,null,true);  this.upLyr.setHTML(upHTML,true) } else this.upLyr=null;
	if (ovHTML!=null) { this.ovLyr=new domLayer(null,null,null,null,null,null,false); this.ovLyr.setHTML(ovHTML,true) } else this.ovLyr=null;
	if (dwHTML!=null) { this.dwLyr=new domLayer(null,null,null,null,null,null,false); this.dwLyr.setHTML(dwHTML,true) } else this.dwLyr=null;
	if (slHTML!=null) { this.slLyr=new domLayer(null,null,null,null,null,null,false); this.slLyr.setHTML(slHTML,true) } else this.slLyr=null;
	if (dsHTML!=null) { this.dsLyr=new domLayer(null,null,null,null,null,null,false); this.dsLyr.setHTML(dsHTML,true) } else this.unLyr=null;

	this.eventCT=new domLayer(null,0,0,w,h,null,true,null,'javascript:null')
	this.eventCT.setZ(200)

	var buttonevents=new EventListener(this);

	buttonevents.onmouseout=function(e) {	
		var o=e.target;	
		if (!o.clicked && !o.disabled && !o.waitClick) {
			if (o.upBg) o.setBgColor(o.upBg);
			if (o.upLyr) {
					     o.upLyr.setVisible(true)
				if (o.ovLyr) o.ovLyr.setVisible(false)
				if (o.dwLyr) o.dwLyr.setVisible(false)
				if (o.slLyr) o.slLyr.setVisible(false)
				if (o.dsLyr) o.dsLyr.setVisible(false)
			}
		}
		o.overbutton=false
		e.bubble=false
	}
	buttonevents.onmouseover=function(e) {	
		var o=e.target;	
		if (!o.clicked && !o.disabled && !o.waitClick) {
			if (o.ovBg) o.setBgColor(o.ovBg);
			if (o.ovLyr) {
				if (o.upLyr) o.upLyr.setVisible(false)
					     o.ovLyr.setVisible(true)
				if (o.dwLyr) o.dwLyr.setVisible(false)
				if (o.slLyr) o.slLyr.setVisible(false)
				if (o.dsLyr) o.dsLyr.setVisible(false)
			}
		}
		o.overbutton=true
		e.bubble=false
	}
	buttonevents.onmousedown=function(e) {	
		var o=e.target;	
		if (!o.clicked && !o.disabled && !o.waitClick) {
			if (o.dwBg) o.setBgColor(o.dwBg);
			if (o.dwLyr) {
				if (o.upLyr) o.upLyr.setVisible(false)
				if (o.ovLyr) o.ovLyr.setVisible(false)
					     o.dwLyr.setVisible(true)
				if (o.slLyr) o.slLyr.setVisible(false)
				if (o.dsLyr) o.dsLyr.setVisible(false)
			} else if (o.dwBg && o.slLyr) {
				if (o.upLyr) o.upLyr.setVisible(false)
				if (o.ovLyr) o.ovLyr.setVisible(false)
					     o.slLyr.setVisible(true)
				if (o.dsLyr) o.dsLyr.setVisible(false)
 			} else if (o.dwBg && o.upLyr) {
					     o.upLyr.setVisible(true)
				if (o.ovLyr) o.ovLyr.setVisible(false)
				if (o.slLyr) o.slLyr.setVisible(false)
				if (o.dsLyr) o.dsLyr.setVisible(false)
			} 		
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
							if (o.upBg) o.collection[i].setBgColor(o.upBg);
							if (o.collection[i].upLyr) o.collection[i].upLyr.setVisible(true)
							if (o.collection[i].ovLyr) o.collection[i].ovLyr.setVisible(false)
							if (o.collection[i].dwLyr) o.collection[i].dwLyr.setVisible(false)
							if (o.collection[i].slLyr) o.collection[i].slLyr.setVisible(false)
							if (o.collection[i].dsLyr) o.collection[i].dsLyr.setVisible(false)
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
			if (this.slBg) this.setBgColor(this.slBg);
			if (this.slLyr) {
				if (this.upLyr) this.upLyr.setVisible(false)
				if (this.ovLyr) this.ovLyr.setVisible(false)
				if (this.dwLyr) this.dwLyr.setVisible(false)
						this.slLyr.setVisible(true)
				if (this.dsLyr) this.dsLyr.setVisible(false)
			}
			if (this.collection) this.clicked=true
			else { if (this.overbutton) this.eventCT.invokeEvent("mouseover"); else this.eventCT.invokeEvent('mouseout') }
			if (this.collection) for (var i=0; i<this.collection.length; i++) this.collection[i].waitClick=false;
			if (this.clickfn) setTimeout(this.toString()+".clickfn()",250)
		}
	}
	this.eventCT.addEventListener(buttonevents);

	if (oncreatefn) {
		this.oncreatefn=oncreatefn
		var l=new EventListener(this);
		l.oncreate=function(e) {
			var o=e.target
			if (o.oncreatefn == true) {
				if (o.upLyr) o.upLyr.moveTo( Math.floor( (o.w/2)-(o.upLyr.contentW()/2) ) , Math.floor( (o.h/2)-(o.upLyr.contentH()/2) ) )
				if (o.dwLyr) o.dwLyr.moveTo( Math.floor( (o.w/2)-(o.dwLyr.contentW()/2) ) , Math.floor( (o.h/2)-(o.dwLyr.contentH()/2) ) )
				if (o.ovLyr) o.ovLyr.moveTo( Math.floor( (o.w/2)-(o.ovLyr.contentW()/2) ) , Math.floor( (o.h/2)-(o.ovLyr.contentH()/2) ) )
				if (o.slLyr) o.slLyr.moveTo( Math.floor( (o.w/2)-(o.slLyr.contentW()/2) ) , Math.floor( (o.h/2)-(o.slLyr.contentH()/2) ) )
				if (o.dsLyr) o.dsLyr.moveTo( Math.floor( (o.w/2)-(o.dsLyr.contentW()/2) ) , Math.floor( (o.h/2)-(o.dsLyr.contentH()/2) ) )
			} else {
				if (o.oncreatefn!=false) o.oncreatefn()
			}
		}
		this.addEventListener(l);
	}

	if (this.upLyr) { this.add(this.upLyr); this.upLyr.setVisible(true)  }
	if (this.dwLyr) { this.add(this.dwLyr); this.dwLyr.setVisible(false) }
	if (this.ovLyr) { this.add(this.ovLyr); this.ovLyr.setVisible(false) }
	if (this.slLyr) { this.add(this.slLyr); this.slLyr.setVisible(false) }
	if (this.dsLyr) { this.add(this.dsLyr); this.dsLyr.setVisible(false) }
	this.add(this.eventCT)
};
button.prototype=new domLayer

button.prototype.disable=function() { 
	this.disabled=true
	this.clicked=false
	if (this.dsBg) this.setBgColor(this.dsBg);
	if(this.dsLyr) {
		if (this.upLyr) this.upLyr.setVisible(false)
		if (this.ovLyr) this.ovLyr.setVisible(false)
		if (this.dwLyr) this.dwLyr.setVisible(false)
		if (this.slLyr) this.slLyr.setVisible(false)
			        this.dsLyr.setVisible(true)
	}
}

button.prototype.select=function() { 
	this.disabled=false
	this.clicked=true
	if (this.slBg) this.setBgColor(this.slBg);
	if (this.upLyr) this.upLyr.setVisible(false)
	if (this.ovLyr) this.ovLyr.setVisible(false)
	if (this.dwLyr) this.dwLyr.setVisible(false)
	     if (this.slLyr) this.slLyr.setVisible(true);
	else if (this.dwLyr) this.dwLyr.setVisible(true);
	if (this.dsLyr) this.dsLyr.setVisible(false)
}

button.prototype.enable=function() { 
	this.disabled=false
	if (this.upBg) this.setBgColor(this.upBg);
	if(this.dsLyr) { 
		if (this.upLyr) this.upLyr.setVisible(true)
		if (this.ovLyr) this.ovLyr.setVisible(false)
		if (this.dwLyr) this.dwLyr.setVisible(false)
		if (this.slLyr) this.slLyr.setVisible(false)
			        this.dsLyr.setVisible(false)
	}
}

button.collection=function() {
	var a=arguments
	this.collection=new Array();
	for (var i=0; i<a.length; i++) {
		this.collection[i]=a[i]
		this.collection[i].collection=this.collection
	}
}

button.collection.prototype.disable=function() { var c=this.collection; for (var i=0; i<c.length; i++) { c[i].disabled=true;  c[i].invokeEvent('mouseout') } }
button.collection.prototype.enable =function() { var c=this.collection; for (var i=0; i<c.length; i++) { c[i].disabled=false; if (c[i].overbutton) c[i].eventCT.invokeEvent("mouseover"); else c[i].eventCT.invokeEvent('mouseout') } }
button.collection.prototype.reset  =function() { var c=this.collection; for (var i=0; i<c.length; i++) { c[i].disabled=false; c[i].clicked=false; if (c[i].overbutton) c[i].eventCT.invokeEvent("mouseover"); else c[i].eventCT.invokeEvent('mouseout') } }

button.collection.prototype.disableAll=function() { var c=this.collection; for (var i=0; i<c.length; i++) { c[i].disable() } }
button.collection.prototype.enableAll =function() { 
	var c=this.collection;
	for (var i=0; i<c.length; i++) {
		c[i].disabled=false;
		if (!c[i].clicked) {
			if (c[i].overbutton) c[i].eventCT.invokeEvent("mouseover");
			else 		     c[i].eventCT.invokeEvent('mouseout')
		} else {
			if (c[i].slBg) c[i].setBgColor(c[i].slBg);
			if (c[i].slLyr) {
				if (c[i].upLyr) c[i].upLyr.setVisible(false)
				if (c[i].ovLyr) c[i].ovLyr.setVisible(false)
				if (c[i].dwLyr) c[i].dwLyr.setVisible(false)
						c[i].slLyr.setVisible(true)
				if (c[i].dsLyr) c[i].dsLyr.setVisible(false)
			}
		}
	} 
}
