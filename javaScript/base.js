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
	/*var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
	return this.elements[num];
}

Base.prototype.css = function(attr,value){
	for (var i = 0; i < this.elements.length; i++){
		if (arguments.length == 1) {
			getStyle(elements[i],attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}*/

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
	}else if (typeof args == 'function') {
		//addDomLoaded(args);
		this.ready(args);
	}
	
}

Bae.prototype.ready = function (fn){
	addDomLoaded(fn);
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

//获取某个节点返回对象
Base.prototype.ge = function(num){
	return this.elements[num];
}

//获取某一个节点返回base对象
Base.prototype.eq = function(num){
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
}

Bae.prototype.first = function(){
	return this.elements[0];
}
Base.prototype.last = function(){
	return this.elements[this.elements.length - 1];
}

Base.prototype.addClass = function(className){
	for (var i = 0; i < this.elements.length; i++){
		if (!hasClass(elements[i],className)){
			this.elements[i].className += ' '+ className;
		}
	}
	return this;
}

Base.prototype.removeClass = function(className){
	for (var i = 0; i < this.elements.length; i++){
		if (hasClass(elements[i],className)){
			this.elements[i].className = this.elements[i].className.replace (new RegExp('(\\s|^)'+className+'(\\s|^)'),' ');
		}
	}
	return this;
}

Base.prototype.addRule = function(num,selectorText,cssText,position){
	var sheet = document.styleSheets[num];
	insertRule(sheet,selectorText,cssText,position);
	return this;
}

Base.prototype.removeRule = function(num,index){
	var sheet = document.styleSheets[num];
	removeRule(sheet,index);
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
		//this.elements[i].onmouseover = over;
		//this.elements[i].onmouseout = out;
		addEvent(this.elements[i], 'mouseover',over);
		addEvent(this.elements[i], 'mouseout',out);
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
	var top = (getInner().height - 250) / 2;
	var left = (getInner().width - 350) / 2;
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i].style.top = top + 'px';
		this.elements[i].style.left = left + 'px';	
	}
	return this;
}
Base.prototype.resize = function(fn){
	for (var i = 0; i < this.elements.length; i++){
		var element = this.elements[i];
		/*window.onresize = function(){
			fn();
			if (element.offsetLeft > getInner().width - element.offsetWidth){
				element.style.left = getInner().width - element.offsetWidth + 'px';
			}
			if (element.offsetTop > getInner().height - element.offsetHeight){
				element.style.top = getInner().height - element.offsetHeight + 'px';
			}
			
		};*/
		addEvent(window,'resize',function(){
			fn();
			if (element.offsetLeft > getInner().width - element.offsetWidth){
				element.style.left = getInner().width - element.offsetWidth + 'px';
			}
			if (element.offsetTop > getInner().height - element.offsetHeight){
				element.style.top = getInner().height - element.offsetHeight + 'px';
			}
		})
	}
		
	return this;
}

Base.prototype.lock = function(){
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i].style.width = getInner().width + 'px';
		this.elements[i].style.height = getInner().height + 'px';
		this.elements[i].style.display = 'block';
		document.documentElement.style.overflow = 'hide';	
		/*addEvent(this.elements[i],'mousedown',function(e){
			e.preventDefault();
			addEvent(document,'mousemove',function(e){
				e.preventDefault();
			});
		});*/
		/*window.onscroll = fucntion(){
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}*/
		addEvent(window,'scroll',scrollTop());
	}
	return this;
}
Base.prototype.unlock = function(){
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = 'none';
		document.documentElement.style.overflow = 'auto';
		removeEvent(window,'scroll',scrollTop());
	}
	return this;
}


/*$().extend(name,function(){
	//
});

Base.prototype.drag = function(){
	
}
*/
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
}



