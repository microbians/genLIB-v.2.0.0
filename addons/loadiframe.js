/*
   loadIframe addon v.1.0.4
   Req: genLIB [ GNU LGPL license ] : www.microbians.com
*/

function loadIframe(id,x,y,w,h,bg,url,msg,fnt,col,mbg) {
	if (arguments.length==0) return
	this.domLayer=domLayer;
	this.domLayer(id,x,y,w,h,bg);
	this.iframename=this.id+"loadIframe"
	this.setHTML('<IFRAME NAME="'+this.iframename+'" ID="'+this.iframename+'" style="position:absolute;top:0px;left:0px;width:'+w+'px;height:'+h+'px;border:0px;" scrolling=no frameborder=0></IFRAME>',true);
	if (url) setTimeout(this.toString()+".setURL('"+url+"')",50)
}
loadIframe.prototype=new domLayer


loadIframe.prototype.setURL=function(url) {
	this.url=url||''
	if (this.created) {
		this.invokeEvent('beforeload')
		this.loaded=false
		this.iframeWindow=frames[this.iframename]
		this.iframe=document.getElementById(this.iframename)
		this.iframeWindow.location.replace(url)
		this.iframeWindow.document.isLoading=true
		this.iframe.domLayer=this
		if (is.ie) 	setTimeout(this.toString()+".wfrm()",50)
		else {
			this.iframe.domLayer=this
			if (self.document.location.protocol!='file:') this.iframe.onload=function(){ this.onload=null; this.domLayer.finish() };
			this.iframe.contentDocument.location.replace(this.url)
			if (self.document.location.protocol=='file:') setTimeout(this.toString()+".onloadOffline()",100)
		}
	} else {
		var l=new EventListener()
		l.oncreate=function(e) { var s=e.source; s.setURL(s.url) }
		this.addEventListener(l)
	}
}

// Patch MOZ not fire load event on iframe over "file:" protocol
loadIframe.prototype.onloadOffline=function() {
	if(this.iframe.contentDocument&&this.iframe.contentDocument.documentElement.baseURI!='about:blank'&&this.iframe.contentDocument.documentElement.getElementsByTagName("body")[0]&&this.iframe.contentDocument.documentElement.getElementsByTagName("body")[0].innerHTML) this.finish();
	else setTimeout(this.toString()+".onloadOffline()",50);
}


loadIframe.prototype.wfrm=function() {
	if (!this.iframeWindow.document.isLoading && (this.iframeWindow.document.readyState=='interactive' || this.iframeWindow.document.readyState=='complete') ) this.finish()
	else setTimeout(this.toString()+".wfrm()",50)
}

loadIframe.prototype.finish=function() {
	this.loaded=true
	var html=this.iframeWindow.document.body.innerHTML
alert(this.iframeWindow.document.body.offsetHeight)
	alert(html)
	this.invokeEvent('load')
}

