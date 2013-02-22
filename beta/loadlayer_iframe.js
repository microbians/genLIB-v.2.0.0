/*
   LOADLAYER addon v.1.0.2

   IFRAME WAY EXPERIMENT NOT TO USE

   Req: genLIB [ GNU LGPL license ] : www.microbians.com
*/

function loadLayer(id,x,y,w,h,bg,url,msg,fnt,col,mbg) {
	this.iframe=new domLayer(id,0,0,w-10,h-20,null,null,null,null,'IFRAME')
	this.domLayer=domLayer;
	this.domLayer(this.iframe.id+"_container",x,y,w,h,bg);
	this.msg=new domLayer(null,0,0,w,h,mbg,false,1)
	if (msg) this.msg.css.padding=5+'px'
	if (fnt) this.msg.css.font=fnt;
	if (col) this.msg.css.color=col;
	if (msg) this.msg.setHTML(msg,true)

	this.iframe.elm.frameBorder=0
	this.iframe.elm.marginWidth=0
	this.iframe.elm.marginHeight=0

	this.add(this.iframe)
	this.add(this.msg)

	if (url) this.setURL(url)
/*
t=""	
for (k in this.iframe.elm) {
	t+=k+" | ";
}
alert(t)
*/
}
loadLayer.prototype=new domLayer

loadLayer.prototype.setURL=function(url) {
	this.url=url||null
	if (this.created) {
		this.html=""
		this.invokeEvent('beforeload')
		this.msg.setVisible(true)
		var fr=frames[this.iframe.id]
		fr.location.replace(url)
		if (is.ie) this.iframe.elm.onreadystatechange=function(){ if (this.readyState=='interactive'||this.readyState=='complete') { this.onreadystatechange=null; genLIB.all[this.id+"_container"].loaded() } }
		else       this.iframe.elm.onload=function(){ this.onload=null; genLIB.all[this.id+"_container"].loaded() }
	} else {
		var l=new EventListener()
		l.oncreate=function(e) { var s=e.source; s.setURL(s.url) }
		this.addEventListener(l)
	}
}

loadLayer.prototype.loaded=function() {
	this.msg.setVisible(false)
	this.invokeEvent('load')
}
