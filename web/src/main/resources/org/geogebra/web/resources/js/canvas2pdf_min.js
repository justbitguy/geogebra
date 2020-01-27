/*
 *
 *  A canvas to PDF converter. Uses a mock canvas context to build a PDF document.
 *
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  Author:
 *  Joshua Gould
 *
 *  @license Copyright (c) 2017 Joshua Gould
 */
!function(t){"use strict";var e=void 0!==e?e:{};function o(t,e,o,n){t=t%360+360*(t<0);var r=o+(o<.5?o:1-o)*(e=isNaN(t)||isNaN(e)?0:e),s=2*o-r;return g(i(t>=240?t-240:t+120,s,r),i(t,s,r),i(t<120?t+240:t-120,s,r),n)}function i(t,e,o){return 255*(t<60?e+(o-e)*t/60:t<180?o:t<240?e+(o-e)*(240-t)/60:e)}"undefined"!=typeof module&&module.exports?module.exports=e:"function"==typeof define&&define.amd?define((function(){return e})):t.canvas2pdf=e;var n,r,s="\\s*([+-]?\\d+)\\s*",a="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",h="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",c=new RegExp("^rgb\\("+[s,s,s]+"\\)$"),p=new RegExp("^rgb\\("+[h,h,h]+"\\)$"),f=new RegExp("^rgba\\("+[s,s,s,a]+"\\)$"),d=new RegExp("^rgba\\("+[h,h,h,a]+"\\)$"),l=new RegExp("^hsl\\("+[a,h,h]+"\\)$"),u=new RegExp("^hsla\\("+[a,h,h,a]+"\\)$"),g=function(t,e,o,i){return{c:t/255+" "+e/255+" "+o/255,a:i}},m=function(t){if(!t)return{c:"0 0 0",a:1};var e,i=function(t,e){return t.substring(0,e.length)===e};if(!i(t,"rgb")&&!i(t,"hsl")){var n=document.createElement("div");n.style.color=t,document.body.appendChild(n),t=window.getComputedStyle(n).color+"",document.body.removeChild(n)}var r=((t=t.replace(/\s/g,""))+"").trim().toLowerCase();return(e=c.exec(r))?g(e[1],e[2],e[3],1):(e=p.exec(r))?g(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=f.exec(r))?g(e[1],e[2],e[3],e[4]):(e=d.exec(r))?g(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=l.exec(r))?o(e[1],e[2]/100,e[3]/100):(e=u.exec(r))?o(e[1],e[2]/100,e[3]/100,e[4]):{c:t,a:1}};
/*
	@license MIT LICENSE
	Copyright (c) 2014 Devon Govett

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
function y(){this.objects=[],this.catalog=this.add(new C),this.pages=this.add(new P),this.catalog.setPages(this.pages),this.pageWidth=8.27,this.pageHeight=11.69,this.textStyle=new I,this.fonts=[],this.lineWidth=1,this.lineEndType=0,this.alpha=1,e.usePako=!1}function C(){}function P(){this.pages=[]}function x(t,e,o,i){this.pdf=t,this.fonts=[],this.images=[],this.fillImages=[],this.alphas=[],this.fillColor="0 0 0 ",this.strokeColor="0 0 0 ",this.lineWidth=2,this.lineCap=0,this.lineJoin=1,this.fontSize=12,this.font="normal",this.width=72*e,this.height=72*o,this.pagesID=i,this._ctm=[1,0,0,1,0,0]}function v(t){this.fontName=t}function T(){this.stream=""}function S(t){this.width=t.width,this.height=t.height;for(var o=t.getContext("2d"),i=new Uint8Array(this.height*this.width*3),n=o.getImageData(0,0,this.width,this.height),r=0,s=0;s<this.height;s++)for(var a=0;a<this.width;a++){var h=n.data[4*(a+s*this.width)],c=n.data[4*(a+s*this.width)+1],p=n.data[4*(a+s*this.width)+2];i[r++]=h,i[r++]=c,i[r++]=p}e.usePako&&(i=pako.deflate(i));var f=[];for(r=0;r<i.length;r++)f.push(String.fromCharCode(i[r]));this.stream=f.join("")}function b(t,e,o,i,n){this.page=n,this.x1=t,this.y1=e,this.x2=o,this.y2=i,this.cols=["white","black"]}function w(t){this.width=t.width,this.height=t.height;for(var e=t.getContext("2d"),o=[this.width+" 0.0000 0.0000 -"+this.height+" 0.0000 "+this.height+" cm ","BI ","/Width "+this.width+" ","/Height "+this.height+" ","/ColorSpace /DeviceRGB ","/BitsPerComponent 8 ","ID\n"],i=e.getImageData(0,0,this.width,this.height),n=this.height-1;n>=0;n--)for(var r=0;r<this.width;r++){var s=i.data[4*(r+n*this.width)],a=i.data[4*(r+n*this.width)+1],h=i.data[4*(r+n*this.width)+2];o.push(String.fromCharCode(s)),o.push(String.fromCharCode(a)),o.push(String.fromCharCode(h))}o.push("\nEI\n"),this.stream=o.join("")}function I(){this.fontName="Helvetica",this.fontSize=12,this.italic=!1,this.bold=!1,this.font=void 0,this.alpha=1}e.PdfContext=function(t,e){var o=this,i=new y;this.doc=i;var n=document.createElement("canvas");this.context=n.getContext("2d"),i.pageSetWidth(t/72),i.pageSetHeight(e/72),i.addPage();var r="10px Helvetica";this.textAlign="left",this.textBaseline="alphabetic",Object.defineProperty(this,"fillStyle",{get:function(){return this.fillColor},set:function(t){if(this.fillColor=t,t instanceof b)console.log("TODO",o.doc);else{var e=m(t);o.doc.fillColor(e.c,e.a)}}}),Object.defineProperty(this,"strokeStyle",{get:function(){return o.doc.strokeColor()},set:function(t){var e=m(t);o.doc.strokeColor(e.c,e.a)}}),Object.defineProperty(this,"lineWidth",{get:function(){return o.doc.setLineWidth()},set:function(t){o.doc.setLineWidth(t)}}),Object.defineProperty(this,"lineCap",{get:function(){return"butt"},set:function(t){o.doc.lineCap(t)}}),Object.defineProperty(this,"lineJoin",{get:function(){return"miter"},set:function(t){o.doc.lineJoin(t)}}),Object.defineProperty(this,"miterLimit",{get:function(){return 10},set:function(t){}}),Object.defineProperty(this,"globalAlpha",{get:function(){return o.doc.opacity()},set:function(t){o.doc.opacity(t)}}),Object.defineProperty(this,"font",{get:function(){return r},set:function(t){this.context.font=t,r=t;var e,i,n=((i=(e=/^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\"\sa-z]+?)\s*$/i).exec(o.font))||(console.log("error parsing font "+o.font),i=e.exec("10px Helvetica")),i[6].indexOf("sans-serif")>-1&&(i[6]="Helvetica"),i[6].indexOf("serif")>-1&&(i[6]="Times-Roman"),{style:i[1]||"normal",size:parseInt(i[4])||10,family:i[6]||"Helvetica",weight:i[3]||"normal"});o.doc.fontSize(n.size),o.doc.font(n.family),o.doc.setFontStyle("normal"!=n.weight,"normal"!=n.style,!1)}}),this.font=r,this.strokeStyle="rgb(0,0,0)",this.fillStyle="rgb(0,0,0)"},e.PdfContext.prototype.end=function(){this.doc.end()},e.PdfContext.prototype.addPage=function(){this.doc.addPage()},e.PdfContext.prototype.save=function(){this.doc.save()},e.PdfContext.prototype.restore=function(){this.doc.restore()},e.PdfContext.prototype.transform=function(t,e,o,i,n,r){this.doc.transform(t,e,o,i,n,r)},e.PdfContext.prototype.scale=function(t,e){this.doc.scale(t,e)},e.PdfContext.prototype.rotate=function(t){var e=180*t/Math.PI;this.doc.rotate(e)},e.PdfContext.prototype.translate=function(t,e){this.doc.translate(t,e)},e.PdfContext.prototype.beginPath=function(){this.doc.beginPath()},e.PdfContext.prototype.moveTo=function(t,e){this.doc.moveTo(t,e)},e.PdfContext.prototype.closePath=function(){this.doc.closePath()},e.PdfContext.prototype.lineTo=function(t,e){this.doc.lineTo(t,e)},e.PdfContext.prototype.stroke=function(){this.doc.stroke()},e.PdfContext.prototype.fill=function(t){this.doc.fill(t)},e.PdfContext.prototype.rect=function(t,e,o,i){this.doc.rect(t,e,o,i)},e.PdfContext.prototype.fillRect=function(t,e,o,i){this.doc.beginPath(),this.doc.rect(t,e,o,i),this.doc.fill()},e.PdfContext.prototype.strokeRect=function(t,e,o,i){this.doc.beginPath(),this.doc.rect(t,e,o,i),this.doc.stroke()},e.PdfContext.prototype.clearRect=function(t,e,o,i){var n=this.doc.fillColor();this.doc.fillColor("white"),this.doc.rect(t,e,o,i),this.doc.fill(),this.doc.fillColor(n)},e.PdfContext.prototype.arc=function(t,e,o,i,n,r){this.doc.arc(t,e,o,i,n,r)},e.PdfContext.prototype.bezierCurveTo=function(t,e,o,i,n,r){this.doc.bezierCurveTo(t,e,o,i,n,r)},e.PdfContext.prototype.quadraticCurveTo=function(t,e,o,i){this.doc.quadraticCurveTo(t,e,o,i)},e.PdfContext.prototype.createLinearGradient=function(t,e,o,i){return this.doc.linearGradient(t,e,o,i)},e.PdfContext.prototype.createRadialGradient=function(t,e,o,i,n,r){var s=this.doc.radialGradient(t,e,o,i,n,r);return s.addColorStop=function(t,e){var o=m(e);s.stop(t,o.c,o.a)},s},e.PdfContext.prototype.fillText=function(t,e,o){t&&t.trim().length&&this.doc.textAdd(e,o,t)},e.PdfContext.prototype.strokeText=function(t,e,o){console.log("strokeText not implemented, use fillText")},e.PdfContext.prototype.measureText=function(t){return this.context.measureText(t+"")},e.PdfContext.prototype.clip=function(){this.doc.clip()},e.PdfContext.prototype.getPDFbase64=function(){return this.doc.getBase64Text()},e.PdfContext.prototype.getPDFtext=function(){return this.doc.getText()},e.PdfContext.prototype.drawImage=function(t,e,o,i,n){return this.doc.drawImage(t,e,o,i,n)},e.PdfContext.prototype.setLineDash=function(t){return this.doc.setLineDash(t)},e.PdfContext.prototype.createPattern=function(t,e){this.doc.imageTileLoad(t)},e.PdfContext.prototype.setTransform=function(){console.log("setTransform not implemented")},e.PdfContext.prototype.drawFocusRing=function(){console.log("drawFocusRing not implemented")},e.PdfContext.prototype.createImageData=function(){console.log("drawFocusRing not implemented")},e.PdfContext.prototype.getImageData=function(){console.log("getImageData not implemented")},e.PdfContext.prototype.putImageData=function(){console.log("putImageData not implemented")},e.PdfContext.prototype.globalCompositeOperation=function(){console.log("globalCompositeOperation not implemented")},e.PdfContext.prototype.arcTo=function(t,e,o,i,n){console.log("arcTo not implemented")},y.prototype.add=function(t){return this.objects.push(t),t.id=this.objects.length,t},y.prototype.pageSetWidth=function(t){this.pageWidth=t},y.prototype.pageSetHeight=function(t){this.pageHeight=t},y.prototype.addPage=function(){this.currentPage=new x(this,this.pageWidth,this.pageHeight,this.pages.id),this.add(this.currentPage),this.pages.addPage(this.currentPage);var t=new T;this.add(t),this.currentPage.setStream(t)},y.prototype.font=function(t){this.currentPage.setFontName(t)},y.prototype.fontSize=function(t){this.currentPage.setFontSize(t)},y.prototype.lineJoin=function(t){this.currentPage.setLineJoin(t)},y.prototype.lineCap=function(t){this.currentPage.setLineCap(t)},y.prototype.setLineWidth=function(t){this.currentPage.setLineWidth(t)},y.prototype.strokeColor=function(t,e){this.currentPage.setStrokeColor(t,e)},y.prototype.fillColor=function(t,e){this.currentPage.setFillColor(t,e)},y.prototype.pageSetCurrent=function(t){this.currentPage=t},y.prototype.font=function(t){this.textStyle.setFontName(t)},y.prototype.fontSetSize=function(t){this.textStyle.fontSetSize(t)},y.prototype.setFontStyle=function(t,e){this.textStyle.setFontStyle(t,e)},y.prototype.fontSetColor=function(t,e,o){this.textStyle.setColor(new PDFColor(t,e,o))},y.prototype.setFont=function(t){var e=t.getFontName();if(null!=e){var o,i=null;for(o=0;o<this.fonts.length;o++)this.fonts[o].fontName==e&&(i=this.fonts[o]);null==i&&(i=new v(e),this.add(i),this.fonts.push(i)),t.setFont(i)}},y.prototype.textAdd=function(t,e,o){var i=this.textStyle.clone();this.setFont(i),this.currentPage.textAdd(t,e,o,i)},y.prototype.imageLoadFromCanvas=function(t){t=new S(t),this.add(t),this.currentImage=t},y.prototype.imageTileLoadFromCanvas=function(t){t=new w(t),this.add(t),this.currentPage.currentImageTile=t},y.prototype.linearGradient=function(t,e,o,i){var n=new b(t,e,o,i,this.currentPage);return this.add(n),this.currentPage.currentImageTile=n,this.addPatternToPage(n),n},y.prototype.doDrawImage=function(t,e,o,i){this.currentPage.drawImage(t,e,this.currentImage,this.alpha,o,i)},y.prototype.addPatternToPage=function(t){this.currentPage.addPatternToPage(t)},y.prototype.moveTo=function(t,e){this.currentPage.moveTo(t,e)},y.prototype.lineTo=function(t,e){this.currentPage.lineTo(t,e)},y.prototype.bezierCurveTo=function(t,e,o,i,n,r){this.currentPage.bezierCurveTo(t,e,o,i,n,r)},y.prototype.translate=function(t,e){this.currentPage.translate(t,e)},y.prototype.transform=function(t,e,o,i,n,r){this.currentPage.transform(t,e,o,i,n,r)},y.prototype.drawImage=function(t,e,o,i,n){if("img"==t.nodeName.toLowerCase()){var r=document.createElement("canvas");r.width=t.width,r.height=t.height,r.getContext("2d").drawImage(t,0,0),t=r}this.imageLoadFromCanvas(t),this.doDrawImage(e,o,t.width,t.height)},y.prototype.imageTileLoad=function(t){if("img"==t.nodeName.toLowerCase()){var e=document.createElement("canvas");e.width=t.width,e.height=t.height,e.getContext("2d").drawImage(t,0,0),t=e}this.imageTileLoadFromCanvas(t),this.addPatternToPage(this.currentPage.currentImageTile)},y.prototype.scale=function(t,e,o){this.currentPage.scale(t,e,o)},y.prototype.rotate=function(t,e){this.currentPage.rotate(t,e)},y.prototype.beginPath=function(){this.currentPage.beginPath()},y.prototype.arc=function(t,e,o,i,n,r){this.currentPage.arc(t,e,o,i,n,r)},y.prototype.closePath=function(){this.currentPage.closePath()},y.prototype.stroke=function(){this.currentPage.stroke()},y.prototype.clip=function(t){this.currentPage.clip(t)},y.prototype.opacity=function(t){this.currentPage.setAlpha(t)},y.prototype.setLineDash=function(t){this.currentPage.setLineDash(t)},y.prototype.save=function(){this.currentPage.saveContext()},y.prototype.restore=function(){this.currentPage.restoreContext()},y.prototype.fill=function(t){this.currentPage.fill(t)},y.prototype.rect=function(t,e,o,i){this.currentPage.rect(t,e,o,i)},y.prototype.quadraticCurveTo=function(t,e,o,i){this.currentPage.quadraticCurveTo(t,e,o,i)},y.prototype.graphicsSetAlpha=function(t){this.alpha=Math.floor(100*t/255)/100,this.textStyle.setAlpha(t)},y.prototype.graphicsSetLineEndType=function(t){this.lineEndType=t},y.prototype._write=function(t){this.stream+=t+"\n"},y.prototype.getObject=function(t){var e,o;for(this.stream="",this._write("%PDF-1.7"),e=0;e<this.objects.length;e++)(o=this.objects[e]).offset=this.stream.length,o=o.getObject(this,t),this._write(o);t=this.stream.length,this._write("xref"),this._write("0 "+(this.objects.length+1)),this._write("0000000000 65535 f");var i=this.objects;for(e=0;e<i.length;e++){var s=("0000000000"+(s=this.objects[e].offset)).slice(-10);this._write(s+" 00000 n")}return this._write("trailer"),this._write(n.convert({Size:this.objects.length+1,Root:new r(this.catalog.id+" 0 R")})),this._write("startxref"),this._write(t),this._write("%%EOF"),this.stream},y.prototype.getBase64Text=function(){return"data:application/pdf;base64,"+btoa(this.getObject(this))},C.prototype.setPages=function(t){this.props={Type:"Catalog",Pages:new r(t.id+" 0 R")}},C.prototype.getObject=function(t){return n.makeObject(this.props,this.id)},P.prototype.addPage=function(t){return this.pages.push(t),t.setPageNumber(this.pages.length),t},P.prototype.getObject=function(t){for(var e="[",o=0;o<this.pages.length;o++)e+=this.pages[o].id,e+=" 0 R ";e+="]";var i={Type:"Pages",Count:this.pages.length,Kids:new r(e)};return n.makeObject(i,this.id)},x.prototype.setStream=function(t){this.pdfStream=t,this.transform(1,0,0,-1,0,this.height)},x.prototype.setPageNumber=function(t){this.pageNumber=t},x.prototype.textAdd=function(t,e,o,i){var r=this.fontSize;-1==this.fonts.indexOf(i.font)&&this.fonts.push(i.font),o=n.convert(new String(o)),this.setAlpha(i.alpha),e=this.height-e,this.saveContext(),this.transform(1,0,0,-1,0,this.height),this.pdfStream.addText("BT "+this.strokeColor+" rg /F"+i.font.id+" "+r+" Tf 1 0 0 1 "+t+" "+e+" cm "+o+"Tj ET "),this.restoreContext()},x.prototype.setAlpha=function(t){if(t!=this.currentAlpha){-1==this.alphas.indexOf(t)&&this.alphas.push(t);var e=this.alphas.indexOf(t);this.pdfStream.addText("/Alpha"+e+" gs "),this.currentAlpha=t}},x.prototype.moveTo=function(t,e){this.pdfStream.addText(t+" "+e+" m ")},x.prototype.setLineWidth=function(t){this.lineWidth=t},x.prototype.lineTo=function(t,e){this.pdfStream.addText(t+" "+e+" l ")},x.prototype.bezierCurveTo=function(t,e,o,i,n,r){this.pdfStream.addText(t+" "+e+" "+o+" "+i+" "+n+" "+r+" c ")},x.prototype.transform=function(t,e,o,i,n,r){var s,a,h,c,p,f,d,l,u;a=(s=this._ctm)[0],h=s[1],c=s[2],p=s[3],f=s[4],d=s[5],s[0]=a*t+c*e,s[1]=h*t+p*e,s[2]=a*o+c*i,s[3]=h*o+p*i,s[4]=a*n+c*r+f,s[5]=h*n+p*r+d,u=function(){var s,a,h,c;for(c=[],s=0,a=(h=[t,e,o,i,n,r]).length;s<a;s++)l=h[s],c.push(+l.toFixed(5));return c}().join(" "),this.pdfStream.addText(u+" cm ")},x.prototype.translate=function(t,e){this.transform(1,0,0,1,t,e)},x.prototype.rotate=function(t,e){var o,i,n,r,s,a,h;null==e&&(e={}),i=t*Math.PI/180,o=Math.cos(i),n=Math.sin(i),r=s=0,null!=e.origin&&(a=(r=(h=e.origin)[0])*n+(s=h[1])*o,r-=r*o-s*n,s-=a),this.transform(o,n,-n,o,r,s)},x.prototype.scale=function(t,e,o){var i,n,r;null==e&&(e=t),null==o&&(o={}),i=n=0,null!=o.origin&&(i=(r=o.origin)[0],n=r[1],i-=t*i,n-=e*n),this.transform(t,0,0,e,i,n)},x.prototype.stroke=function(){this.pdfStream.addTextCheckMerge("S ")},x.prototype.clip=function(t){this.pdfStream.addText((/even-?odd/.test(t)?"W* ":"W ")+" n ")},x.prototype.setLineDash=function(t){this.lineDash=t},x.prototype.saveContext=function(){this.pdfStream.addText("q ")},x.prototype.restoreContext=function(){this.pdfStream.addText("Q ")},x.prototype.fill=function(t){this.currentImageTile&&(this.pdfStream.addText("/Pattern cs "),this.pdfStream.addText("/Pattern CS "),this.pdfStream.addText("/Paint"+this.currentImageTile.id+" scn "),this.pdfStream.addText("/Paint"+this.currentImageTile.id+" SCN "),this.currentImageTile=void 0),this.pdfStream.addTextCheckMerge(/even-?odd/.test(t)?"f* ":"f ")},x.prototype.beginPath=function(){if(this.lineDash){this.pdfStream.addText("[");for(var t=0;t<this.lineDash.length;t++)this.pdfStream.addText(this.lineDash[t]),this.pdfStream.addText(" ");this.pdfStream.addText("] 0 d ")}this.setAlpha(this.alpha),this.pdfStream.addText(this.fillColor+" rg "),this.pdfStream.addText(this.strokeColor+" RG "),this.pdfStream.addText(this.lineCap+" J "+this.lineJoin+" j "+(1|this.lineWidth)+" w ")},x.prototype.setStrokeColor=function(t,e){this.strokeColor=t||"0 0 0",this.alpha=e},x.prototype.setFillColor=function(t,e){this.fillColor=t||"0 0 0",this.alpha=e},x.prototype.closePath=function(){this.pdfStream.addText("h ")},x.prototype.quadraticCurveTo=function(t,e,o,i){return this.pdfStream.addText(t+" "+e+" "+o+" "+i+" v ")},x.prototype._bezierCurve=function(t,e,o,i,n,r){var s=Math.PI,a=o,h=i,c=Math.cos(n*s/180),p=Math.sin(n*s/180),f=Math.cos((n+r)*s/180),d=Math.sin((n+r)*s/180),l=t+a*c,u=e-h*p,g=-a*p,m=-h*c,y=t+a*f,C=e-h*d,P=-a*d,x=-h*f,v=Math.tan(r/2*s/180),T=Math.sin(r*s/180)*(Math.sqrt(4+3*v*v)-1)/3;return Math.sqrt(g*g+m*m),Math.sqrt(P*P+x*x),[l,u,l+T*g,u+T*m,y-T*P,C-T*x,y,C]},x.prototype.arc=function(t,e,o,i,n,r){i*=180/Math.PI,n*=180/Math.PI;for(var s=o-1,a=o-1,h=Math.ceil(Math.abs(n/45)),c=i,p=n/h,f=0;f<h;f++){var d=this._bezierCurve(t,e,s,a,c,p);0==f&&this.moveTo(d[0],d[1]),this.bezierCurveTo(d[2],d[3],d[4],d[5],d[6],d[7]),c+=p}},x.prototype.rect=function(t,e,o,i){var n=t+o,r=e+i;this.pdfStream.addText(t+" "+e+" m "+n+" "+e+" l "+n+" "+r+" l "+t+" "+r+" l "+t+" "+e+" l ")},x.prototype._CAP_STYLES={BUTT:0,ROUND:1,SQUARE:2},x.prototype.setLineCap=function(t){"string"==typeof t&&(t=this._CAP_STYLES[t.toUpperCase()]),this.lineCap=t},x.prototype._JOIN_STYLES={MITER:0,ROUND:1,BEVEL:2},x.prototype.setLineJoin=function(t){"string"==typeof t&&(t=this._JOIN_STYLES[t.toUpperCase()]),this.lineJoin=t},x.prototype.setFontSize=function(t){this.fontSize=t},x.prototype.transform=function(t,e,o,i,n,r){var s,a,h,c,p,f,d,l,u;a=(s=this._ctm)[0],h=s[1],c=s[2],p=s[3],f=s[4],d=s[5],s[0]=a*t+c*e,s[1]=h*t+p*e,s[2]=a*o+c*i,s[3]=h*o+p*i,s[4]=a*n+c*r+f,s[5]=h*n+p*r+d,u=function(){var s,a,h,c;for(c=[],s=0,a=(h=[t,e,o,i,n,r]).length;s<a;s++)l=h[s],c.push(+l.toFixed(5));return c}().join(" "),this.pdfStream.addText(u+" cm ")},x.prototype.drawImage=function(t,e,o,i,n,r){this.saveContext(),this.transform(1,0,0,-1,0,0),this.translate(t,-r-e),this.scale(n,r),this.pdfStream.addText("/Image"+o.id+" Do "),this.restoreContext(),-1==this.images.indexOf(o)&&this.images.push(o)},x.prototype.addPatternToPage=function(t){-1==this.fillImages.indexOf(t)&&this.fillImages.push(t)},x.prototype.getObject=function(t){t.pageSetCurrent(this);var e={Type:"Page"};e.Parent=new r(this.pagesID+" 0 R"),e.MediaBox=[0,0,this.width,this.height],e.Contents=new r(this.pdfStream.id+" 0 R");var o="<<";if(this.fonts.length>0)for(var i=0;i<this.fonts.length;i++){var s=this.fonts[i];o+="/F"+s.id+" "+s.id+" 0 R"}o+=">>";var a={};if(this.alphas.length>0)for(i=0;i<this.alphas.length;i++){var h=this.alphas[i];(isNaN(h)||void 0===h)&&(h="1"),"string"==typeof h&&(h*=1),a["Alpha"+i]={CA:h,ca:h}}var c="<<";if(this.images.length>0)for(var p=0;p<this.images.length;p++)c+="/Image"+(s=this.images[p]).id+" "+s.id+" 0 R";c+=">>";var f="<<";if(this.fillImages.length>0)for(p=0;p<this.fillImages.length;p++)f+="/Paint"+(s=this.fillImages[p]).id+" "+s.id+" 0 R";return f+=">>",e.Resources={},this.fonts.length>0&&(e.Resources.Font=new r(o)),this.alphas.length>0&&(e.Resources.ExtGState=a),this.fillImages.length>0&&(e.Resources.Pattern=new r(f)),this.images.length>0&&(e.Resources.XObject=new r(c)),n.makeObject(e,this.id)},v.TIMES=["Times-Roman","Times-Italic","Times-Bold","Times-BoldItalic"],v.HELVETICA=["Helvetica","Helvetica-Oblique","Helvetica-Bold","Helvetica-BoldOblique"],v.getPDFName=function(t,e,o){var i=(e?2:0)+(o?1:0);return"Helvetica"==t?v.HELVETICA[i]:v.TIMES[i]},v.prototype.getObject=function(t){var e={Subtype:"Type1",Name:"F"+this.id,BaseFont:this.fontName,Encoding:"WinAnsiEncoding",Type:"Font"};return n.makeObject(e,this.id)},T.prototype.addText=function(t){this.stream+=t},T.prototype.addTextCheckMerge=function(t){function e(t,e){return-1!==t.indexOf(e,t.length-e.length)}"f* "==t&&e(this.stream," S ")?this.stream=this.stream.substring(0,this.stream.length-3)+" B* ":"S "==t&&e(this.stream," f* ")?this.stream=this.stream.substring(0,this.stream.length-4)+" B* ":"f "==t&&e(this.stream," S ")?this.stream=this.stream.substring(0,this.stream.length-3)+" B ":"S "==t&&e(this.stream," f ")?this.stream=this.stream.substring(0,this.stream.length-3)+" B ":this.stream+=t},T.prototype.replaceText=function(t,e){this.stream=this.stream.replace(t,e)},T.prototype.getObject=function(t){var o=this.stream;if(e.usePako){o=pako.deflate(o);for(var i=[],r=0;r<o.length;r++)i.push(String.fromCharCode(o[r]));o=i.join("")}var s={Length:o.length};return e.usePako&&(s.Filter="FlateDecode"),n.makeObject(s,this.id,o)},S.prototype.writeImage=function(t){this.stream=t},S.prototype.getObject=function(){var t={Type:"XObject",Width:this.width,Height:this.height,Subtype:"Image",ColorSpace:"DeviceRGB",BitsPerComponent:8,Name:"Image"+this.id,Length:this.stream.length};return e.usePako&&(t.Filter="FlateDecode"),n.makeObject(t,this.id,this.stream)},b.prototype.addColorStop=function(t,e){0!=t&&1!=t&&console.error("only 0 and 1 suppored for addColorStop",t),this.cols[Math.round(t)]=e},b.prototype.getObject=function(){var t=m(this.cols[0]).c.split(" "),e=m(this.cols[1]).c.split(" "),o={Type:"Pattern",PatternType:2,Shading:{ShadingType:2,Extend:[!0,!0],Coords:[this.x1,this.page.height-this.y1,this.x2,this.page.height-this.y2],ColorSpace:"DeviceRGB",Function:{FunctionType:2,N:1,Domain:[0,1],C0:[1*t[0],1*t[1],1*t[2]],C1:[1*e[0],1*e[1],1*e[2]]}}};return n.makeObject(o,this.id,this.stream)},w.prototype.writeImage=function(t){this.stream=t},w.prototype.getObject=function(){var t={Type:"Pattern",PatternType:1,PaintType:1,TilingType:1,BBox:[0,0,this.width,this.height],XStep:this.width,YStep:this.height,Length:this.stream.length,Resources:{ProcSet:["PDF","ImageC"]}};return n.makeObject(t,this.id,this.stream)},I.prototype.setFontName=function(t){this.fontName=t,this.font=void 0},I.prototype.fontSetSize=function(t){this.fontSize=t},I.prototype.setFontStyle=function(t,e){this.bold=t,this.italic=e},I.prototype.setColor=function(t){this.color=t},I.prototype.setAlpha=function(t){this.alpha=t},I.prototype.getFontName=function(){return v.getPDFName(this.fontName,this.bold,this.italic)},I.prototype.setFont=function(t){this.font=t},I.prototype.clone=function(){var t=new I;return t.fontName=this.fontName,t.fontSize=this.fontSize,t.bold=this.bold,t.italic=this.italic,t.color=this.color,t.alpha=this.alpha,t.font=this.font,t},n=function(){var t,e,o;function i(){}return o=function(t,e){return(Array(e+1).join("0")+t).slice(-e)},e=/[\n\r\t\b\f\(\)\\]/g,t={"\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","\\":"\\\\","(":"\\(",")":"\\)"},i.makeObject=function(t,e,o){var n=e+" 0 obj\n"+i.convert(t);return o&&(n+="\nstream\n"+o+"\nendstream\n"),n+"endobj\n"},i.convert=function(n){var s,a,h,c,p,f,d,l,u;if("string"==typeof n)return"/"+n;if(n instanceof String){for(h=!1,a=l=0,u=(f=n.replace(e,(function(e){return t[e]}))).length;l<u;a=l+=1)if(f.charCodeAt(a)>127){h=!0;break}if(h){var g="";for(a=l=0,u=f.length;l<u;a=l+=1)f.charCodeAt(a)<=127?g+=f[a]:g+="?";f=g}return"("+f+")"}if(n instanceof r)return n.toString();if(n instanceof Date)return"(D:"+o(n.getUTCFullYear(),4)+o(n.getUTCMonth()+1,2)+o(n.getUTCDate(),2)+o(n.getUTCHours(),2)+o(n.getUTCMinutes(),2)+o(n.getUTCSeconds(),2)+"Z)";if(Array.isArray(n))return"["+function(){var t,e,o;for(o=[],t=0,e=n.length;t<e;t++)s=n[t],o.push(i.convert(s));return o}().join(" ")+"]";if("[object Object]"==={}.toString.call(n)){for(c in p=["<<"],n)d=n[c],p.push("/"+c+" "+i.convert(d));return p.push(">>"),p.join("")+"\n"}return""+n},i}(),r=function(t){function e(t){this.str=t}return e.prototype.toString=function(){return this.str},e}()}("undefined"!=typeof window?window:this);