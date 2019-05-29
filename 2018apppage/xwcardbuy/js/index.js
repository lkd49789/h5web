var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //15位或者18位
var regName =/^[\u4e00-\u9fa5]{2,4}$/;//姓名 2-4位汉字
var re = /^1\d{10}$/
 

$('.cards img').click(function(){
	var cardval= $(this).attr('val');
	$(this).removeClass('cardActive')
	$(this).siblings().addClass('cardActive');
	$('.applybtn').attr('val',cardval);
})

$(".applybtn").click(function(){
	main.hrefTo("news.html")
})

//资费说明及条款
$(".btn-intro").click(function(){
	main.hrefTo("postage.html")
})

$(".submit").click(function(){

})


$('.applybtn').click(function(){
	var cardtype = $(this).attr('val');
	if(cardtype==18 || cardtype=="18"){
		window.location.href="https://m.10010.com/queen/sibaCard/new-fill.html?product=0";
	}else{
		window.location.href="news-fill.html";
	}
	
})