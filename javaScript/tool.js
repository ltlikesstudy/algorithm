function getInner(){
	if (type window.innerWidth != 'undefined'){
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
}

function getStyle(element,attr) {
	if (typeof window.getComputedStyle != 'undefined') {//W3C
				return window.getComputedStyle(element,null)[attr];
	}else if (typeof element.currentStyle != 'undefined'){//IE
		return this.elements[i].currentStyle[attr];
	}
}

function hasClass(element,className) {
	return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|^)'))
}

function insertRule(sheet,selectorText,cssText,position){
	if (typeof sheet.insertRule != 'undefined') {//W3C
		sheet.insertRule(selectorText + "{" + cssText + "}",position);
	}else if (typeof sheet.addRule != 'undefined'){//IE
		sheet.addRule(selectorText,cssText,position);
	}
}

function removeRule(sheet,index){
	if (typeof sheet.deleteRule != 'undefined') {//W3C
		sheet.deleteRule(index);
	}else if (typeof sheet.removeRule != 'undefined'){//IE
		sheet.removeRule(index);
	}
}