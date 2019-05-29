var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //15位或者18位
var regName =/^[\u4e00-\u9fa5]{2,4}$/;//姓名 2-4位汉字
var re = /^1\d{10}$/
 
$('.package li').click(function(){
	$(this).addClass('active');
	$(this).siblings().removeClass('active');
})

$(".applybtn").click(function(){
	
})

//资费说明及条款
$(".look a").click(function(){
	hrefTo("https://h5.48.cn/2018apppage/xwcardbuy/postage_18.html");
})

    $('.applybtn').click(function(){
        window.location.href="https://m.10010.com/queen/sibaCard/new-fill.html?product=0";
    })


$(".submit").click(function(){

})


//跳转
    function hrefTo(_url){
        if(checkFromApp()){
            window.web.gotoDetail(_url);
        }else{
            window.location.href=_url;
        }
    }