/*
   genLIB v.2.0.0
   (c) Gabriel Suchowolski,2000 | www.microbians.com

   Licensed under "Non-Commercial License" for "Research Use": research, evaluation, and educational use,
   excluding use or distribution for direct or indirect commercial (including strategic) gain or advantage.
*/

// BROWSERS
is=[];
is.dom  = document.getElementById?1:0;
is.ua   = navigator.userAgent.toLowerCase();
is.ie   = is.ua.match(/msie/)||0;
is.ie6  = is.ua.match(/msie 6/)||0;
is.ie5  = is.ua.match(/msie 5/)||0;
is.ie50 = is.ua.match(/msie 5\.0/)||0;
is.mac  = is.ua.match(/mac/)||0;

// MSG 4 NO DOM BROWSERS
if (!is.dom) {
	if (!window.noDOM) window.open('http://www.webstandards.org/upgrade/','noDOM',"toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1,width=630,height=500",true)
	else window.noDOM()
}

if (is.mac&&is.ie50) alert("SORRY, but you have a very old browser, you must have Internet Explorer 5.1 or better.");

// domLAYER
function domLayer(id,x,y,w,h,bgColor,visible,zindex,bgImage){
	if (arguments.length>0){
		this.elm=genLIB.elm.getElementById(id)
		this.childrens=[] 
		if (!this.elm){
			this.elm=genLIB.elm.createElement('DIV')
			this.elm.id=this.id=id||'domLayer'+(domLayer.count++)
			this.css=this.elm.style
			this.css.position='absolute'
			this.moveTo(x||0,y||0)
			this.resizeTo(w||'auto',h||'auto')
			this.setBgColor(bgColor||'transparent')
			this.setVisible(visible!=false?true:false )
			this.setZ(zindex||'')
			this.setBgImage(bgImage||'')
			this.parent=null
			this.created=false
		} else {
			this.id=this.elm.id
			this.css=this.elm.style
			this.css.position='absolute'
			this.x=this.elm.offsetLeft
			this.y=this.elm.offsetTop
			this.w=this.elm.offsetWidth
			this.h=this.elm.offsetHeight
			this.bgColor=this.css.backgroundColor||''
			var b=this.css.visibility; this.visible=(b=='inherit'||b=='show'||b=='visible'||b=='')
			this.z=this.css.zIndex
			var i=this.css.backgroundImage; this.bgImage=i.substring(4,i.length-1)||''
			this.parent=this.elm.parentNode.domLayer||null
			var ht=this.elm.innerHTML;var p=ht.toUpperCase().indexOf('<DIV');
			if (ht!='') this.elm.innerHTML=unescape(ht.substring(p<0?ht.length:p,ht.length))
			this.setHTML(unescape(ht.substring(0,p<0?ht.length:p)))
			this.created=true
		}
		this.css.cursor='default'
		genLIB.all[this.id]=this.elm.domLayer=this
		if(is.ie&&is.mac) this.elm.insertBefore(genLIB.elm.createElement('DIV'),this.elm.lastChild);
	}
}
domLayer.count=0

// CREATE & DESTROY
domLayer.prototype.add=function(el){ 
	el.parent=this;
	if(is.ie&&is.mac) this.elm.insertBefore(el.elm,this.elm.lastChild);
	else this.elm.appendChild(el.elm);
	this.childrens[this.childrens.length]=el
	if (this==genLIB.document || this.created){ el.created=true; el.invokeEvent('create'); var tmp=el.all(); for(var i in tmp){ tmp[i].created=true; tmp[i].invokeEvent('create') } }
}
domLayer.prototype.all=function(){ 
	if (this==genLIB.document) return genLIB.all
	var tmp=[]
	var c=this.elm.getElementsByTagName('DIV')
	for (var i=0;i<=c.length;i++) if (c[i] && c[i].domLayer) tmp[c[i].domLayer.id]=c[i].domLayer;
	return tmp
}
domLayer.prototype.del=function(){ 
	this.delAllChildrens()
	if (this.elm.html) this.elm.removeChild(this.elm.html);
	if (this.parent) this.parent.elm.removeChild(this.elm);
	this.drag=this.limit=this.css=this.x=this.y=this.w=this.h=this.z=this.visible=this.bgColor=this.bgImage=this.html=this.clip=this.elm=this.created=null
	if (this.parent) this.parent.childrens=genLIB.removeElement(this.parent.childrens,this);
	delete this.eventListeners,this.childrens,genLIB.all[this.id]
	this.id=null
}
domLayer.prototype.delAllChildrens=function(){ for(var i=this.childrens.length-1;i>=0;i--) this.childrens[i].del(); }

domLayer.prototype.remove=function(){ 
	if (this.parent){
		this.parent.childrens=genLIB.removeElement(this.parent.childrens, this)
		this.parent.elm.removeChild(this.elm);
		this.parent=null 
		this.created=false
	}
}
domLayer.prototype.isChildOf=function(o){ if (o) return o.all()[this.id]==this; else return null }
domLayer.prototype.toString=function(){return 'genLIB.all.'+this.id}

// DOMLAYER CONTROL
domLayer.prototype.moveTo=function(x,y)  { 
	if (x!=null){ 	this.x=x; this.css.left=x+'px'; }
	if (y!=null){	this.y=y; this.css.top =y+'px'; }
}
domLayer.prototype.setX=function(x){ this.moveTo(x,null) }
domLayer.prototype.setY=function(y){ this.moveTo(null,y) }
domLayer.prototype.getPageX=function()  { return this.parent?this.parent.getPageX()+this.x:0 }
domLayer.prototype.getPageY=function()  { return this.parent?this.parent.getPageY()+this.y:0 }
domLayer.prototype.setPageX=function(x){ if (this.parent) this.setX(this.parent.getPageX()-x); else this.setX(x) }
domLayer.prototype.setPageY=function(y){ if (this.parent) this.setX(this.parent.getPageY()-y); else this.setY(x) }
domLayer.prototype.resizeTo=function(w,h){
	if (w!=null){ this.w=w; this.css.width =(w!='auto'?(w<0?0:w)+'px':'auto') }
	if (h!=null){ this.h=h; this.css.height=(h!='auto'?(h<0?0:h)+'px':'auto') }
	var tmp='rect(0px '+ this.css.width + ' ' + this.css.height +' 0px)'
	if (is.ie&&is.mac) { setTimeout(this.toString()+'.css.clip="'+tmp+'"',10) }
	else this.css.clip=tmp
}
domLayer.prototype.setW=function(w){ this.resizeTo(w,null) }
domLayer.prototype.setH=function(h){ this.resizeTo(null,h) }


if(is.ie) domLayer.prototype.contentW=function(){ var tmp=this.css.width; this.css.width ='auto'; var w=this.elm.offsetWidth||0; this.css.width=tmp; return w; }
else 	  domLayer.prototype.contentW=function(){ var tmp=this.css.overflow; this.css.overflow='auto'; var w=this.elm.scrollWidth; this.css.overflow=tmp; return w; }

domLayer.prototype.contentH=function(){ var tmp=this.css.height; this.css.height='auto'; var h=this.elm.offsetHeight||0; this.css.height=tmp; return h; }

domLayer.prototype.setBgColor=function(b){ this.bgColor=b; this.css.backgroundColor=(b&&b!=''?b:'transparent') }
domLayer.prototype.setVisible=function(v){ this.visible=v; this.css.visibility=(v?'inherit':'hidden'); }
domLayer.prototype.setZ=function(z){ this.z=z; this.css.zIndex=z }
domLayer.prototype.setBgImage=function(p){ this.bgImage=p; this.css.backgroundImage=(p&&p!=''?'url('+p+')':'') }


domLayer.prototype.setHTML=function(html,destroy){ if (html!=null){
	if (!this.elm.html && !destroy){
		this.elm.html=genLIB.elm.createElement((is.ie&&is.mac)?'SPAN':'DIV')
		this.elm.insertBefore( this.elm.html, this.elm.firstChild  )
	}
	this.html=html
	if (!destroy) this.elm.html.innerHTML=html
	else {  if (this.elm.html) this.elm.html=null;
		this.elm.innerHTML=html
	}
}}
domLayer.prototype.setClip=function(clip){
	this.clip=clip;
	var c=this.getClip();
	for (var i=0;i<clip.length;i++) if (clip[i]==null) clip[i]=c[i];
	if (!is.ie){ this.css.width=clip[1]+'px'; this.css.height=clip[2]+'px' }
	if (is.ie5&&is.mac) { 
		if (clip[1]=='auto') clip[1]=this.contentW()
		if (clip[2]=='auto') clip[2]=this.contentH()
	}
	this.css.clip='rect('+clip[0]+'px '+clip[1]+'px '+clip[2]+'px '+clip[3]+'px)';
}
domLayer.prototype.getClip=function(){
	var c=this.css.clip;
	if (!c) return [0,0,0,0];
	else {	if (c.indexOf('rect(')>-1){
			c=c.split('rect(')[1].split(')')[0].split('px');
			for (var i=0;i<c.length;i++) c[i]=parseInt(c[i]);
			return [c[0],c[1],c[2],c[3]];
		}
		else return [0,this.x,this.y,0];
	}
}
domLayer.prototype.setLimit=function(t,r,b,l){ this.limit=[t,r,b,l] }

// EVENTLISTENER
EventListener=function(target){ this.target=target }

domEvent=function(type,source,target){
	this.type=type
	this.source=source
	this.target=target
	this.bubble=false
	this.cancelBubble=true
}

// MOUSEVENT
mouse=new domEvent();
mouse.isondrag=false
mouse.handler=function(e){
	if (!e) var e=event;
	var type=e.type
	mouse.type=type
	mouse.cancelBubble=false
	mouse.button=is.ie?(e.button==2?3:(e.button==4?2:e.button)):e.which
	if (!mouse.el){
		mouse.dragout=null
		var el=mouse.source=genLIB.containerOf(is.ie?e.srcElement:e.target)||genLIB.document
		if (!el.eventListeners && el!=genLIB.document) return true;
		var elorg=genLIB.containerOf((is.ie?(mouse.type=='mouseout'?e.toElement:(mouse.type=='mouseover'?e.fromElement:null)):e.relatedTarget))
		if ( elorg && elorg.isChildOf(el) && mouse.bubble || el==elorg ) return true;
		if ( elorg && elorg.isChildOf(el.parent) || elorg==el.parent ) mouse.cancelBubble=true;
	} else {
		var el=mouse.el
		if (mouse.type=='mousemove' && mouse.button!=0 ){ 
			var x=e.screenX-mouse.xOffset
			var y=e.screenY-mouse.yOffset
			if (mouse.el.limit){
				if (x<mouse.el.limit[3]) x=mouse.el.limit[3]; else if (x+mouse.el.w>mouse.el.limit[1]) x=mouse.el.limit[1]-mouse.el.w;
				if (y<mouse.el.limit[0]) y=mouse.el.limit[0]; else if (y+mouse.el.h>mouse.el.limit[2]) y=mouse.el.limit[2]-mouse.el.h;
			}
			if (mouse.el!=genLIB.document)setTimeout(mouse.el.toString()+'.moveTo('+x+','+y+')',20)
			if (mouse.isondrag) mouse.type='drag'
			else { mouse.isondrag=true; mouse.type='dragstart'; }
		} else if (mouse.type=='mouseup' || mouse.type=='click' && mouse.isondrag || mouse.type=='mousemove' && mouse.button==0){ 
				var x=is.ie?e.x+genLIB.document.elm.scrollLeft:e.pageX-window.pageXOffset
				var y=is.ie?e.y+genLIB.document.elm.scrollTop:e.pageY-window.pageYOffset
				var px=mouse.el.getPageX()
				var py=mouse.el.getPageY()
				if (x<px || x>px+mouse.el.w || y<py || y>py+mouse.el.h) mouse.dragout=true
				else mouse.dragout=false
				mouse.el=mouse.xOffset=mouse.yOffset=null
				mouse.type='dragend'
				mouse.isondrag=false 
		} else { return false }
		mouse.cancelBubble=true
	}
	mouse.pageX=is.ie?e.x+genLIB.document.elm.scrollLeft:e.pageX-window.pageXOffset
	mouse.pageY=is.ie?e.y+genLIB.document.elm.scrollTop:e.pageY-window.pageYOffset
	mouse.x=is.ie?e.x-(el.getPageX()-(genLIB.document.elm.offsetLeft-genLIB.document.elm.clientLeft)):e.layerX
	mouse.y=is.ie?e.y-(el.getPageY()-(genLIB.document.elm.offsetTop-genLIB.document.elm.clientTop)):e.layerY
	if (mouse.control) mouse.control(mouse.type,mouse);
	if (mouse.type=='mousedown' && el.drag) { mouse.el=el; mouse.xOffset=e.screenX-parseInt(el.x); mouse.yOffset=e.screenY-parseInt(el.y); }
	if (el.eventListeners) mouse.target=el.eventListeners.target;
	else mouse.target=null;
	el.invokeEvent(mouse.type,mouse)
	e.cancelBubble=true
       	return false
}

// GENERAL EVENTS
domLayer.prototype.addEventListener=function(listener){
	var l=this.eventListeners=listener;
	if (l['onmouseover']) this.addEvent('mouseover')
	if (l['onmousemove']) this.addEvent('mousemove')
	if (l['onmousedown']) this.addEvent('mousedown')
	if (l['onmouseup']  ) this.addEvent('mouseup')
	if (l['onmouseout'] ) this.addEvent('mouseout')
	if (l['onclick']    ) this.addEvent('click')
	if (l['ondblclick'] ) this.addEvent('dblclick')
	if (l['ondrag'] || l['ondragstart'] || l['ondragend']) this.addEvent('drag')
}
domLayer.prototype.addEvent=function (type){
	var el=(this==genLIB.document?this.doc:this.elm)
	if(type!='drag'){
		if (is.ie) el['on'+type]=mouse.handler
		else 	   el.addEventListener(type,mouse.handler,false)
	} else 	{ 
		genLIB.document.addEvent('mousemove')
		genLIB.document.addEvent('mouseup') 
		this.drag=true
	}
}
domLayer.prototype.killEvent=function (type){
	var el=(this==genLIB.document?this.doc:this.elm)
	if(type!='drag'){
		if (is.ie) el['on'+type]=null
		else 	   el.removeEventListener(type,mouse.handler,false)
	} else this.drag=false
}
domLayer.prototype.invokeEvent=function(type,event,argm){
	if(this.eventListeners && this.eventListeners['on'+type]){
		if(!event) var event=new domEvent(type,this,this.eventListeners.target);
		this.eventListeners['on'+type](event,argm)
		if(event.bubble && !event.cancelBubble && this.parent && this.parent.invokeEvent){
			event.source=this.parent;
			this.parent.invokeEvent(type,event)
		}
	}
}

// MAIN Object
genLIB=[]
genLIB.loaded=false
genLIB.onload=null
genLIB.onloadBackup=window.onload
genLIB.all=[]
genLIB.elm=document

// domDOC object
domDoc=function(frame){
	this.id='genLIB.document'
	this.elm=frame.document.body
	this.doc=frame.document
	this.css=this.elm.style
	this.frame=frame;
	this.parent=null
	this.doc.domLayer=this.elm.domLayer=this
	this.childrens=[]
	this.contentW=function() { return is.ie?this.elm.clientWidth:this.frame.innerWidth }
	this.contentH=function() { return is.ie?this.elm.clientHeight:this.frame.innerHeight }
}
domDoc.prototype=domLayer.prototype

// GENERAL Fn
genLIB.containerOf=function(el){
	if(!el) return null
	while( !el.domLayer && el.parentNode && el.parentNode!=el){ el=el.parentNode }
	return el.domLayer?(el.domLayer.eventListeners?el.domLayer:null):null
}
genLIB.removeElement=function(a,el){
	for (var i=0; i<a.length; i++){
		if (a[i] == el){
			if (a.splice) a.splice(i,1);
			else a=a.slice(0,i).concat(a.slice(i+1));
			break
		}
	}
	return a
}

// DRAG SELECTION FIX

if (is.ie) {
	document.onselectstart=function(){if(event.srcElement.tagName!='INPUT' && event.srcElement.tagName!='TEXTAREA'){return false}}
	document.ondragstart=function(){return false}
} else  document.onmousedown=function(e){if(e.target.tagName!='INPUT' && e.target.tagName!='TEXTAREA'){return false}};

// INCLUDE Fn
genLIB.path=''
genLIB.setPath=function(path){if (path.substring(path.length-1)!='/' && path!='') path+='/'; genLIB.path=path}
genLIB.include=function(js){js=js.replace(/\./g,'\/');document.write('<script language="javascript" type="text/javascript" src="'+genLIB.path+js+'.js"><\/script>'); }

//DEBUG
genLIB.debug=function(e) {
	if (!genLIB.debugwin) {
		genLIB.debugwin=window.open("","DEBUGWINDOW","width=400,height=200")
	}
	e="<font face='lucida console' size=1>"+e+"</font><br>"
	genLIB.debugwin.document.open()
	genLIB.debugwin.document.write(e)
}

// ONLOAD event
onload=function(){
	if (is.dom){
		genLIB.document=new domDoc(self)
		genLIB.loaded=true
		if (genLIB.onload) genLIB.onload();
		eval(genLIB.onloadBackup)
	}
}

// ONUNLOAD event
onunload=function(){	
	delete mouse
	genLIB.document.del()
	delete genLIB.document
	delete genLIB.all
	delete genLIB
}

// ONERROR event

/*
onerror=function(msg, url, lno) {
   genLIB.debug( 'ERROR '+msg+'<br>'+url+'<br>Line Number= '+lno+'<br>---------------------<br>' )
   return true
}
*/