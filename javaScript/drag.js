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



Base.prototype.drag = function(){
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i].onmousedown = function(e){
			preDef(e);
			var e = getEvent(e);
			var _this = this;
			var diffX = e.clientX - _this.offsetLeft;
			var diffY = e.clientY - _this.offsetTop;
			
			if (typeof _this.setCapture != 'undefined'){
				_this.setCapture();
			}
			document.onmousemove = function(e){
				var e = getEvent(e);
				//e.ClientX e.ClientY
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
			}
			document.onmouseup = function(){
				this.onmousemove = null;
				this.onmouseup = null;
				if (_this.releaseCapture){
					_this.releaseCapture();
				}
			}
		};
	}
	return this;
}

function getInner(){
	if (typeof window.innerWidth != 'undefined'){
		return{
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
}