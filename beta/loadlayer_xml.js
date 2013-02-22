/*
   LOADLAYER addon

   XML WAY EXPERIMENT NOT TO USE

   Req: genLIB [ GNU LGPL license ] : www.microbians.com
*/

function loadLayer(id,x,y,w,h,bg,url,msg,fnt,col,mbg) {
	this.domLayer=domLayer;
	this.domLayer(id,x,y,w,h,bg);
	this.msg=new domLayer(null,0,0,w,h,mbg,false,1)
	if (msg) this.msg.css.padding=5+'px'
	if (fnt) this.msg.css.font=fnt;
	if (col) this.msg.css.color=col;
	if (msg) this.msg.setHTML(msg,true)
	this.add(this.msg)
	if (url) this.setURL(url)
}
loadLayer.prototype=new domLayer

loadLayer.prototype.setURL=function(url) {
	this.url=url||null
	if (this.created) {
		this.html=""
		this.invokeEvent('beforeload')
		this.msg.setVisible(true)
		if (!is.ie) {
			var XMLObject=new XMLHttpRequest();
			XMLObject.open("GET",url,false);
			XMLObject.send(null);
			var html=new String(XMLObject.responseText||"").replace(/\r/,'')
			this.setHTML( unescape(loadLayer.correctLocations(this.url,html)))
			loadLayer.mannageLINK(this)
			setTimeout( this.toString()+'.msg.setVisible(false)', 20)
			this.invokeEvent('load')
		} else {
			var XMLObject=new ActiveXObject("Microsoft.XMLHTTP");
			XMLObject.open("GET",url,false);
			XMLObject.send(null);
			var html=new String(XMLObject.responseText||"").replace(/\r/,'')
			this.setHTML( unescape(loadLayer.correctLocations(this.url,html)))
			loadLayer.mannageLINK(this)
			setTimeout( this.toString()+'.msg.setVisible(false)', 20)
			this.invokeEvent('load')
		}
	} else {
		var l=new EventListener()
		l.oncreate=function(e) { var s=e.source; s.setURL(s.url) }
		this.addEventListener(l)
	}
}

loadLayer.prototype.loadTimer=function() {
	var lp=frames[this.iframe.name]
	if (!lp) {
		this.invokeEvent('load')
	} else {
		var b=(!lp.document.isLoading && lp.document && lp.document.body && lp.document.body.innerHTML && (lp.document.readyState=='interactive' || lp.document.readyState=='complete'))
		if (b) {
			var html=lp.document.body.innerHTML
			clearInterval(this.timerID);
			setTimeout(this.toString()+".loadHandler()",20)
		} else {
			setTimeout(this.toString() + '.loadTimer()',250);
		}
	}
}

loadLayer.prototype.loadHandler=function() {
	var lp=is.ie?frames[this.iframe.name]:this.LoadElm
	var html=is.ie?lp.document.body.innerHTML:lp.contentDocument.body.innerHTML
	this.setHTML( unescape(loadLayer.correctLocations(this.url,html)))
	loadLayer.mannageLINK(this)
	setTimeout( this.toString()+'.msg.setVisible(false)', 20)
	this.invokeEvent('load')
}

loadLayer.mannageLINK=function(el) {
	var links = el.elm.getElementsByTagName('A')
	if (links.length>0 ) {
	       	for (var i=0;i<links.length;i++) {
			var l=links[i]
			l.onmouseover = new Function('top.window.status="Link to..."; return true')
			var LayerExist=(l.target!=null && l.target!="" && l.target.substr(0,1)!="_" )?genLIB.all[l.target]:null
			if (l.target=="" || l.target==null || l.target=="_self" || LayerExist ) { 
				if ( LayerExist ) l.target=""
				if ( !( l.href.toString().toLowerCase().indexOf("javascript:") != -1 || l.href.toString().toLowerCase().indexOf("mailto:") != -1 )) {
					l.onmouseout= new Function('top.window.status=top.window.defaultStatus; return true');
					l.onmouseup = new Function('top.window.status=top.window.defaultStatus; return true');
					l.onfocus   = new Function('top.window.status="";this.blur();return false');
					elName=LayerExist?LayerExist.toString():el.toString();
					if ( self.location.pathname.indexOf(l.pathname)!=-1 && l.hash!='') { 
						pos=el.url.indexOf('#')
						pos=(pos!=-1)?pos:el.url.length
						l.href='javascript:'+elName+'.setURL("'+ el.url.substr(0,pos) + l.hash +'")'
					} else 	l.href='javascript:'+elName+'.setURL("'+ l.href +'");'
				}
			}
		}
	}
}

loadLayer.correctLocations=function(url,html) {
	var outCode,re;
	url=url.substr( 0, url.lastIndexOf("/")+1 )
	outCode = html.toString()
	outCode = outCode.replace( /src\=([\"|\'])([^\/|#])/ig , 'src=$1'+url+'$2');
	outCode = outCode.replace( /href\=([\"|\'])([^\/|http\:|#|javascript\:])/ig , 'href=$1'+url+'$2');
	return outCode
}

