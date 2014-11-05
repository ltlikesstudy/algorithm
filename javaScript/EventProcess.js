/*window.onload = function(){
	alert('a');
	alert('b');
	alert('c');	
};*/

/*addEvent(window,'load',function(){
	alert('a');
});
addEvent(window,'load',function(){
	alert('a');
});
addEvent(window,'load',function(){
	alert('a');
});

window.onload = function(){
	var oButton = document.getElementById(('btn');
	addEvent(oButton,'click',fn);
	removeEvent(oButton,'click',fn);	
	//addEvent(oButton,'click',fn);
	//addEvent(oButton,'click',fn);
};

function fn(){
	aler('button');
}*/

/*
window.onload = function(){
	var oButton = document.getElementById(('btn');
	addEvent(oButton,'click',fn);
	//removeEvent(oButton,'click',fn);	
};
function fn(e){
	//aler(e.clientX);
	alert(this.value);
	
}
function addEvent(obj,type,fn){
	if (typeof obj.addEventListener != 'undefined'){//W3C
		obj.addEventListener(type,fn,false);
	}else if (typeof obj.attchEvent != 'undefined'){//IE
		obj.attachEvent('on' + type,function(){
			fn.call(obj,window.event);
		});
	}
}

function removeEvent(obj,type,fn){
	if (typeof obj.removeEventListener != 'undefined'){//W3C
		obj.removeEventListener(type,fn,false);
	}else if (typeof obj.detachEvent != 'undefined'){//IE
		obj.detachEvent('on' + type,fn);
	}
}


*/



//全局变量
// var id = 1;
//属性
addEvent.ID = 1;

function addEvent(obj,type,fn){
	if (typeof obj.addEventListener != 'undefined'){//W3C
		obj.addEventListener(type,fn,false);
	}else{//IE
		addEvent.ID++;
		if (!obj.events){
			obj.events = {};
		}
		if (!obj.events[type]){
			obj.events[type] = [];
			if (obj['on'+type]){
				obj.events[type][0] = fn;
			}else{
				if(addEvent.equal(obj.events[type],fn)){
					return false;
				}
			}
		}
		obj.events[type][addEvent.ID++] = fn;
		obj['on'+type] = addEvent.exec;	
	}
}

addEvent.exec = function(event){
	var e = event||addEvent.fixEvent(window.event);
	for(var i in this.events[e.type]){
		this.events[e.type][i].call(this,e);
	}
}

addEvent.equal = function(es,fn){
	for(var i in es){
		if(es[i] == fn){
			return true;
		}
	}
	return false;
}

//ie event match W3C

addEvent.fixEvent = function(event){
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropogation;
	return event;
}
addEvent.fixEvent.preventDefault = function(){
	this.returnValue = false;
}
addEvent.fixEvent.stopPropogation = function(){
	this.returnValue = true;;
}

function removeEvent(obj,type,fn){
	if (typeof obj.removeEventListener != 'undefined'){//W3C
		obj.removeEventListener(type,fn,false);
	}else {//IE
		for(var i in obj.events[type]){
			if (obj.events[type][i] == fn){
				delete obj.events[type][i];
			}
		}	
	}
}


window.onload = function(){
	/*var oButton = document.getElementById(('btn');
	addEvent(oButton,'click',fn1);
	//removeEvent(oButton,'click',fn1);	
	addEvent(oButton,'click',fn2);
	//removeEvent(oButton,'click',fn2);	
	addEvent(oButton,'click',fn3);
	//removeEvent(oButton,'click',fn3);	*/
	var a = document.getElementById(('a');
	addEvent(a,'click',function(e){
		e.preventDefault();
		//preDef(e);
	});
	
	addEvent(oButton,'click',function(e){
		e.stopPropogation();
		//....do what you want
	});
	addEvent(document,'click',function(){
		//..do what you want
	});

	
};
function fn1(e){
	alert('1' + this.value + e.clientX);
}
function fn2(e){
	alert('2');
}

function fn3(e){
	alert('3');
}


