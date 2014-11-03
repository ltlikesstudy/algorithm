/*window.onload = function(){
	alert(document.getElementById('box').innerHTML);
	alert(document.getElementsByName('sex')[0].value);
	alert(document.getElementsByTagName('p')[0].innerHTML);
};

window.onload = function(){
	//alert($('box').innerHTML);
	alert(Base.getId('box').innerHTML);
	alert(Base.getName('sex')[0].value);
	alert(Base.getTag('p')[0].innerHTML);
	//var base = new Base();
	/*base.getId('box').css('color','red').css('backgroundColor','black').html('pox').click(function(){
		alert('a');
	});
	//base.getTag('p').css('color','blue').css('backgroundColor','yellow');
	$().getId('box').css('color','red').css('backgroundColor','black').html('pox').click(function(){
		alert('a');
	});
	//$().getTag('p').css('color','blue').css('backgroundColor','yellow');
	$().getClass('a','aaa').css('color','pink');
	//$().addRule(0,'body','background:red',0);
}
*/


window.onload = function(){
	$().getClass('member').hover(function(){
		$().getTag('ul').show();
	},function(){
		$().getTag('ul').hide();
	});
}