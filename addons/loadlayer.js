/*
   LOADLAYER addon v.2.0.1
   Req: genLIB [ GNU LGPL license ] : www.microbians.com
*/

function loadLayer(id,x,y,w,h,bg,url,msg,fnt,col,mbg) {
	if (arguments.length==0) return
	this.domLayer=domLayer;
	this.domLayer(id,x,y,w,h,bg);
	this.msg=new domLayer(null,0,0,w,h,mbg,false,1)
	if (msg) this.msg.css.padding=5+'px'
	if (fnt) this.msg.css.font=fnt;
	if (col) this.msg.css.color=col;
	if (msg) this.msg.setHTML(msg,true)
	this.iframename=this.id+"LOADLAYER"

	if (is.ie) this.createIFRAME();

	this.add(this.msg)
	if (url) setTimeout(this.toString()+".setURL('"+url+"')",50)
}
loadLayer.prototype=new domLayer

loadLayer.prototype.setURL=function(url) {
	this.url=url||''
	if (this.created) {
		if(!is.ie) this.createIFRAME();
		this.getIFRAME()

		this.invokeEvent('beforeload')
		this.msg.setVisible(true)

		this.setIFRAME()

	} else {
		var l=new EventListener()
		l.oncreate=function(e) { var s=e.source; s.setURL(s.url) }
		this.addEventListener(l)
	}
}

loadLayer.prototype.createIFRAME=function(){
	this.setHTML('<IFRAME ID="'+this.iframename+'" src="about:blank" STYLE="position:absolute;left:-2000px;top:-2000px;width:200px;height:200px;"></IFRAME>',true);
}

loadLayer.prototype.getIFRAME=function(){
	this.iframe=is.ie?frames[this.iframename]:genLIB.document.doc.getElementById(this.iframename)
}

loadLayer.prototype.setIFRAME=function(){
	if (is.ie) {
		if (this.iframe.document) {
			this.iframe.document.open("text/html", "replace")
			this.iframe.document.write("<body onload=\"self.domLayer.finish()\"><iframe style=\"position:absolute;top:0px;left:0px;width:200px;height:200px;\" id=\"loader\" src=\""+this.url+"\"></iframe></body>")
			this.iframe.document.close()
			this.iframe.domLayer=this
			this.iframe.document.isLoading=true
		} else this.setTimeout(this.toString()+".setIFRAME()",50)
	} else {
		if (this.iframe.contentDocument.location) {
			this.iframe.domLayer=this
			if (self.document.location.protocol!='file:') this.iframe.onload=function(){ this.onload=null; this.domLayer.finish() };
			this.iframe.contentDocument.location.replace(this.url)
			if (self.document.location.protocol=='file:') setTimeout(this.toString()+".onloadOffline()",100)
		} else this.setTimeout(this.toString()+".setIFRAME()",50)
	}
}

// Patch MOZ not fire load event on iframe over "file:" protocol
loadLayer.prototype.onloadOffline=function() {
	if(this.iframe.contentDocument&&this.iframe.contentDocument.documentElement.baseURI!='about:blank'&&this.iframe.contentDocument.documentElement.getElementsByTagName("body")[0]&&this.iframe.contentDocument.documentElement.getElementsByTagName("body")[0].innerHTML) this.finish();
	else setTimeout(this.toString()+".onloadOffline()",50);
}

loadLayer.prototype.finish=function() {

	var lp  =is.ie?this.iframe.frames['loader']:this.iframe.contentWindow
	var doc =is.ie?this.iframe.frames['loader'].document.body:this.iframe.contentDocument.documentElement.getElementsByTagName("body")[0]

	externalfn=lp.externalFunctions
	if (externalfn) {
		for (k in externalfn) {
			var t=typeof(externalfn[k])
			if (k!="onload") {
				     if (t=="function") eval(k+"="+externalfn[k].toString())
				else if (t=="object")   eval(k+"="+externalfn[k])
				else if (t=="string")   eval(k+"=\""+externalfn[k].replace( /\"/ig ,"\\\"").replace( /\\/ig ,"\\\\")+"\"")
			} else {
				eval(this.toString()+".tmpfn="+externalfn[k].toString())
				eval(this.toString()+".tmpfn()")
				eval("delete "+this.toString()+".tmpfn")
			}
		}
		
	}

	if (!is.ie) var bs=[];
	var imgtmp=doc.getElementsByTagName('img')
	var bsmax=imgtmp.length
      	for (var i=0;i<imgtmp.length;i++) {
		if (!is.ie) {
			bs[i]=[]
			bs[i].w=imgtmp[i].offsetWidth
			bs[i].h=imgtmp[i].offsetHeight
		}
		imgtmp[i].id=this.id+"IMG"+i
	}

	html=unescape(loadLayer.correctHTML(this.url,doc.innerHTML))

	if (is.ie) {
		this.iframe.document.open("text/html", "replace")
		this.iframe.document.write("")
		this.iframe.document.close()
	} else this.iframe.contentDocument.location.replace('about:blank')

	this.setHTML(html);

	if (!is.ie) {
       		for (var i=0;i<bsmax;i++) {
			imgtmp=genLIB.elm.getElementById(this.id+"IMG"+i)
			imgtmp.width=bs[i].w
			imgtmp.height=bs[i].h
		}
	}

	loadLayer.mannageLINK(this)

	if (is.ie) loadLayer.waitIMG(this,bsmax)
	else {
		setTimeout( this.toString()+'.msg.setVisible(false)', 50)
		setTimeout( this.toString()+'.invokeEvent("load")',100)
	}
}

loadLayer.waitIMG=function(el,bsmax) {
	var loaded=true
	for (var i=0;i<bsmax;i++) {
		var imgtmp=genLIB.elm.getElementById(el.id+"IMG"+i)
		loaded=loaded&imgtmp.ready
		if (!loaded) break;
	}
	if (loaded) {
		setTimeout( el.toString()+'.msg.setVisible(false)', 50)
		setTimeout( el.toString()+'.invokeEvent("load")',100)
	} else setTimeout( 'loadLayer.waitIMG('+el.toString()+','+bsmax+')',50)
}

loadLayer.mannageLINK=function(el) {
	var links = el.elm.getElementsByTagName('A')
	if (links.length>0 ) {
	       	for (var i=0;i<links.length;i++) {
			var l=links[i]
			l.onmouseover = new Function('window.status="Link to..."; return true')
			var LayerExist=(l.target!=null && l.target!="" && l.target.substr(0,1)!="_" )?genLIB.all[l.target]:null
			if (l.target=="" || l.target==null || l.target=="_self" || LayerExist ) { 
				if ( LayerExist ) l.target=""
				if ( !( l.href.toString().toLowerCase().indexOf("javascript:") != -1 || l.href.toString().toLowerCase().indexOf("mailto:") != -1 )) {
					l.onmouseout= new Function('window.status=""; return true');
					l.onmouseup = new Function('window.status=""; return true');
					l.onfocus   = new Function('window.status="";this.blur();return false');
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


loadLayer.correctHTML=function(url,html) {
	var u=url.substr( 0, url.lastIndexOf("/")+1 )
	var c=html.toString()

	c = c.replace( / src=([\'|\"]*)([^\'|\"|>| ]+)([\'|\"]*)/ig , ' src=\"$2\"');
	c = c.replace( /src\=([\"|\'])([^\/|#])/ig , 'src=$1'+u+'$2');
	c = c.replace( /src\=\"([^f]+)file:/ig , 'src=\"file:');
	c = c.replace( /src\=\"([^h]+)http:/ig , 'src=\"http:');
	c = c.replace( /href\=([\"|\'])([^\/|http\:|#|javascript\:|mailto\:])/ig , 'href=$1'+u+'$2');

	if (is.ie) c=c.replace( /\<IMG /ig , '<IMG onload="this.ready=true" onerror="this.ready=true" ');
	return c
}
