/*function $(id){
	return document.getElementById(id);	
}
*/

/*
var Base = {
	getId :function(id){
		return document.getElementById(id);
	},
	getName : function(name){
		return document.getElementsByName(name);
	},
	getTag : function(tag){
		return document.getElementsByTagName(tag);
	}
}
*/

var $ = function(_this){
	return new Base(_this);
}

function Base(_this){
	// creat a array
	this.elements = [];
	if (_this != undefined){
		this.elements[0] = _this;
	}
}



Base.prototype.getId = function(id){
	this.elements.push(document.getElementById(id));
	return this;
};

Base.prototype.getName = function(name){
	var names = document.getElementsByName(name);
	for (var i = 0; i < tags.length; i++){
		this.elements.push(names[i]);
	}
	return this;
}

Base.prototype.getTag = function(tag){
	var tags = document.getElementsByTagName(tag);
	for (var i = 0; i < tags.length; i++){
		this.elements.push(tags[i]);
	}
	return this;
}

Base.prototype.getClass = function(className,idName){
	var node = null;
	if (arguments.length == 2){
		node = document.getElementById(idName);
	}else {
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for (var i = 0; i < all.length; i++){
		if (all[i].className == className){
			this.elements.push(all[i]);
		}
	}
	return this;
}

Base.prototype.getElement = function(num){
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
}

Base.prototype.css = function(attr,value){
	for (var i = 0; i < this.elements.length; i++){
		if (arguments.length == 1) {
			if (typeof window.getComputedStyle != 'undefined') {//W3C
				return window.getComputedStyle(this.elements[i],null)[attr];
			}else if (typeof this.elements[i].currentStyle != 'undefined'){//IE
				return this.elements[i].currentStyle[attr];
			}
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}

Base.prototype.addClass = function(className){
	for (var i = 0; i < this.elements.length; i++){
		if (!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|^)'))){
			this.elements[i].className += ' '+ className;
		}
	}
	return this;
}

Base.prototype.removeClass = function(className){
	for (var i = 0; i < this.elements.length; i++){
		if (this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|^)'))){
			this.elements[i].className = this.elements[i].className.replace (new RegExp('(\\s|^)'+className+'(\\s|^)'),' ');
		}
	}
	return this;
}

Base.prototype.addRule = function(num,selectorText,cssText,position){
	var sheet = document.styleSheets[num];
	if (typeof sheet.insertRule != 'undefined') {//W3C
		sheet.insertRule(selectorText + "{" + cssText + "}",position);
	}else if (typeof sheet.addRule != 'undefined'){//IE
		sheet.addRule(selectorText,cssText,position);
	}
	return this;
}

Base.prototype.removeRule = function(num,index){
	var sheet = document.styleSheets[num];
	if (typeof sheet.deleteRule != 'undefined') {//W3C
		sheet.deleteRule(index);
	}else if (typeof sheet.removeRule != 'undefined'){//IE
		sheet.removeRule(index);
	}
	return this;
}

Base.prototype.html = function(str) {
	for (var i = 0; i < this.elements.length; i++){
		if (arguments.length == 0) {
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
}

Base.prototype.click = function(fn){
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i].onclick = fn;
	}
	return this;
}

Base.prototype.hover = function(over,out){
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
	}
	return this;
}
Base.prototype.show = function(){
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = 'block';
	}
	return this;
}
Base.prototype.hide = function(){
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = 'none';
	}
	return this;
}
Base.prototype.center = function(width,height){
	var top = (document.documentElement.clientHeight - width) / 2;
	var left = (document.documentElement.clientWidth - height) / 2;
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i].style.top = top + 'px';
		this.elements[i].style.left = left + 'px';	
	}
	return this;
}
Base.prototype.resize = function(fn){
	window.onresize = fn;	
	return this;
}


