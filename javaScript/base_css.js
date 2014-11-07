//css selector

/*
	
from html
<div>

</div>
<p>
<span></span>
<span></span>
<span></span>
<span></span>
</p>	
<div>
<span class = 'a'></span>
<span class = 'b'></span>
<span class = 'b'></span>
<span ></span>
</div>

from demo
window.onload = function(){
	change
	$().getId('box').css('color','red');
	to
	$('#box').css('color','red');
}
*/


//$('p .a') or $('#box p .a')






var $ = function(args){
	return new Base(args);
}

// $('#box')
function Base(args){
	// creat a array
	this.elements = [];
	if (typeof args == 'string'){
		//like css style
		if (args.indexOf(' ') != -1) {
			var elements = args.split(' ');
			var childElements = [];
			var node = [];
			for (var i = 0; i < elements.length; i++) {
				if (node.length == 0) {
					node.push(document);
				}
				switch(elements[i].charAt(0)){
				case '#':
					childElements = [];
					//this.getId(args.substring(1));
					childElements.push(this.getId(elements[i].substring(1)));
					node = childElements;
					break;
				case '.':
					childElements = [];
					for (var j = 0; j < node.length; j++){
						var temps = this.getClass(elements[i].substring(1),node[j]);
						for (var k = 0; k < temps.length; k++) {
							childElements.push(temps[k]);
						}
					}
					node = childElements;
					break;
				default:
					childElements = [];
					for (var j = 0; j < node.length; j++){
						var temps = this.getTagName(elements[i],node[j]);
						for (var k = 0; k < temps.length; k++) {
							childElements.push(temps[k]);
						}
					}
					node = childElements;
				}
			}
			this.elements = childElements;
			
		}else { // for find()
			switch(args.charAt(0)){
			case '#':
				//this.getId(args.substring(1));
				this.elements.push(this.getId(args.substring(1)));
				break;
			case '.':
				this.elements = this.getClass(args.substring(1));
				break;
			default:
				this.elements = this.getTagName(args);
			}
		}
				
	}else if (typeof args == 'object'){
		if (args != undefined){
			this.elements[0] = args;
		}
	}
	
}

Base.prototype.getId = function(id){
	//this.elements.push(document.getElementById(id));
	//return this;
	return document.getElementById(id);
}

Base.prototype.getClass = function(className,parentNode){
	var node = null;
	var temps = [];
	//if (arguments.length == 2){
	
	if (parentNode != undefined){
		//node = document.getElementById(idName);
		node = parentNode;
	}else {
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for (var i = 0; i < all.length; i++){
		if (all[i].className == className){
			//this.elements.push(all[i]);
			temps.push(all[i]);
		}
	}
	return temps;
}

Base.prototype.getTagName = function(tag,parentNode){
	/*
	var tags = document.getElementsByTagName(tag);
	for (var i = 0; i < tags.length; i++){
		this.elements.push(tags[i]);
	}
	return this;*/
	var node = null;
	var temps = [];
	if (parentNode != undefined){
		//node = document.getElementById(idName);
		node = parentNode;
	}else {
		node = document;
	}
	var tags = node.getElementsByTagName(tag);
	for (var i = 0; i < tags.length; i++){
		temps.push(tags[i]);
	}
	return temps;
	
}


//$(p).find(span)

Base.prototype.find = function(str){
	var childElements = [];
	for (var i = 0; i < this.elements.length; i++){
		switch(str.charAt(0)){
			case '#':
				childElements.push(document.getElementById(str.substring(1)));
				//unnecessary for DOM search
				//this.getId(args.substring(1));
				break;
			case '.':
			/*
				var all = this.elements[i].getElementsByTagName('*');
				for (var j = 0; j < all.length; j++){
					if (all[j].className == str.substring(1)){
						childElements.push(all[j]);
					}
				}
				//this.getClass(args.substring(1));*/
				var temps = this.getClass(str.substring(1),this.elements[i]);
				for (var j = 0; j < temps.length; j++) {
					childElements.push(temps[j]);
				}
				break;
			default:
				//this.getTagName(args);
				/*var tags = this.elements[i].getElementsByTagName(str);
				for (var j = 0; j < tags.length; j++){
					childElements.push(tags[j]);
				}*/
				var temps = this.getTagName(str,this.elements[i]);
				for (var j = 0; j < temps.length; j++) {
					childElements.push(temps[j]);
				}
		}
	}
	this.elements = childElements;
	return this;
}

Base.prototype.css = function(attr,value){
	for (var i = 0; i < this.elements.length; i++){
		if (arguments.length == 1) {
			getStyle(elements[i],attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}















