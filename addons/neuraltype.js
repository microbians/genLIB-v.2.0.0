/*
   NEURALTYPE + NEURALTYPE BUTTON addon v.1.6.0b
   Req: genLIB [ GNU LGPL license ] : www.microbians.com
*/

function neuralType(fontfile, w, h, ucrop, bcrop, chrsizes ) {
	this.sizeOf = chrsizes
	this.maxW=w
	this.maxH=h
	this.ucrop=ucrop
	this.bcrop=bcrop
	this.maxH=h
	this.name=fontfile
	this.kerning=new Array()
	this.file=neuralType.path + fontfile
}

neuralType.path=''
neuralType.font=[]
neuralType.fontImg=[]

// Set path of font folder
neuralType.setPath = function(path) { if (path.substring(path.length-1)!='/') path+='/'; neuralType.path = path }

// Include a font neuralType.include( fontname, color1, color2, ... )
neuralType.include=function() {
	var a=arguments
	var fontname=a[0]
	document.write('<script language="javascript" type="text/javascript" src="'+ neuralType.path + fontname +'.js"><\/script>');
	for (var i=1; i<a.length; i++) {
		var color=a[i]
		if (color != "" ) color="_" + color;
		neuralType.fontImg[ fontname+color ] =new Image();
		neuralType.fontImg[ fontname+color ].src =neuralType.path + fontname + color + ".gif"
		neuralType.fontImg[ fontname+color ].file=neuralType.path + fontname + color + ".gif"
	}
}

neuralType.txtWidth=function(fontname,txt,k) {
	if (!k) k=0;
	var font=neuralType.font[fontname]
	var tw=0
	for(var i=0; i<txt.length; i++) {
		var cc   =txt.charCodeAt(i)
		if ( (i+1) < txt.length ) nc=txt.charCodeAt(i+1) 
		else 			  nc=null
		tw   += font.sizeOf[cc-32] + k
		if (font.kerningfix && nc!=null) tw += font.kerningfix(cc, nc)
	}
	return tw
}

neuralType.txtHeight=function(fontname) { return neuralType.font[fontname].maxH }

neuralType.fontWrite=function(fontname,color,txt,k) {
	if (color != "") color="_" + color;
	if (!k) k=0;
	var font=neuralType.font[fontname]
	var w=font.maxW
	var h=font.maxH
	var addon=""
	var ht =""
	var pos=0;
	var nc=null;
	for(var i=0; i<txt.length; i++) {
		var cc=txt.charCodeAt(i)
		if((i+1) < txt.length) nc=txt.charCodeAt(i+1) 
		else 		       nc=null
		var cw=font.sizeOf[cc-32]
		var x=(cc-32) % 16;
		var y=Math.floor( (cc-32) / 16);
		var t=h*y;
		var l=w*x;
		var ox=-l+pos
		var oy=-t-font.ucrop
		var r=l+cw;
		var b=t+h-font.bcrop;
		if (is.ie6||!is.ie)  ht += "<span style='position:absolute;left:"+ ox +"px;top:"+ oy +"px;width:"+w*16+"px;height:"+h*14+"px;clip:rect("+ t +"px "+ r +"px "+ b +"px "+ l +"px);'><img src='"+ neuralType.fontImg[ fontname+color ].src +"'></span>"
		else        	     ht += "<span style='position:absolute;left:"+ ox +"px;top:"+ oy +"px;width:"+w*16+"px;height:"+h*14+"px;clip:rect("+ t +"px "+ r +"px "+ b +"px "+ l +"px);background-image:url("+ neuralType.fontImg[ fontname+color ].file +")'></span>"
		pos+=cw+k
		var scc=String.fromCharCode(cc)
		var snc=String.fromCharCode(nc)
		if (font.kerningfix && nc!=null) pos += font.kerningfix(cc,nc);
	}
	return ht
}

domLayer.prototype.fontWrite=function( fontname, color, txt , k) {
	this.setHTML( neuralType.fontWrite(fontname, color, txt , k), true)
}

if (window.button) {
	neuralType.button=function(x,y,w,h,upBg,ovBg,dwBg,slBg,upCol,slCol,fontname,txt,clickfn, fx) {
		var upHTML=neuralType.fontWrite( fontname, upCol , txt) 
		var slHTML=neuralType.fontWrite( fontname, slCol , txt) 
		this.txtLength=neuralType.txtWidth(fontname, txt)
		this.txtHeight=neuralType.txtHeight(fontname)
		this.centerX=Math.floor( (w/2)-(this.txtLength/2))
		this.centerY=Math.floor( (h/2)-(this.txtHeight/2))
		this.button=button;
		var centerfn=function() {
			this.upLyr.moveTo(this.centerX,this.centerY)
			this.slLyr.moveTo(this.centerX,this.centerY)
		}
		if (!fx) var fx=true; else fx=!fx;
		this.button(x, y, w, h, upBg,upHTML, ovBg,null, dwBg,null, slBg,slHTML, null,null, centerfn, fx, clickfn);
	}
	neuralType.button.prototype=new button;
}
