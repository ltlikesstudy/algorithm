/*
	window.onload = function(){

	var login = $().getId('login');
	login.drag();
}
*/
/*
	Base.prototype.resize = function(fn){
	for (var i = 0; i < this.elements.length; i++){
		var element = this.elements[i];
		window.onresize = function(){
			fn();
			if (element.offsetLeft > getInner().width - element.offsetWidth){
				element.style.left = getInner().width - element.offsetWidth + 'px';
			}
			if (element.offsetTop > getInner().height - element.offsetHeight){
				element.style.top = getInner().height - element.offsetHeight + 'px';
			}
			
		};
	}
		
	return this;
}
	
*/



/*
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
} from base.js

var login = $().getId('login')
login.drag  //from demo

login.drag([$().getTagName('h2').getElemets(0),$().getTagName('span').getElement(0)]);
	
*/


$().extend(drag,function(tags){
	for (var i = 0; i < this.elements.length; i++){
		//this.elements[i].onmousedown = function(e){
		addEvent(this.elements[i],'mousedown',function(e){
			//preDef(e);
			//
			if (trim(this.innerHTML).length == 0){
				e.preventDefault();
			}
			//var e = getEvent(e);
			var _this = this;
			var diffX = e.clientX - _this.offsetLeft;
			var diffY = e.clientY - _this.offsetTop;
			
			//e.target; //W3C
			//e.srcElement; //IE
			var flag = false;
			
			//tags.length = 2;
			for (var i = 0; i < tags.length; i++){
				if(e.target == tags[i]){
					flag = true;
					break;
				}
			}
			
			
			//if (e.target.tagName == 'H2'){
			if(flag){
				addEvent(document,'mousemove',move);
				addEvent(document,'mouseup',up);	
			}else{
				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);
			}
			
			function move(e){
				var left = e.clientX - diffX;
				var top = e.clientY - diffY;
				var totalleft = getInner().width;
				var totaltop = getInner().height;
				
				if (left < 0) {
					left = 0;
				}else if (left > totalleft - _this.offsetLeft){
					left = totalleft - _this.offsetLeft;
				}
				if (top < 0) {
					top = 0;
				}else if (top > totaltop - _this.offsetTop){
					left = totaltop - _this.offsetTop;
				}
				_this.style.left = left + 'px';
				_this.style.top = top + 'px';
				if (typeof _this.setCapture != 'undefined'){
					_this.setCapture();
				}

			}
			//document.onmousemove = function(e){
				//var e = getEvent(e);
				//e.ClientX e.ClientY
			
			function up(){
				remove(document,'mousemove',move);
					//this.onmousemove = null;
				this.onmouseup = null;
				if (_this.releaseCapture){
					_this.releaseCapture();
				}
			}
		});
	}
	return this;
	//
});