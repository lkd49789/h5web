
//选择号码归属地
$(".phonecome").on("tap", function(){
	var city_picker = new mui.PopPicker({layer:2});
	city_picker.setData(init_city_picker);
	setTimeout(function(){
		city_picker.show(function(items){
			$(".phonecome").html((items[0] || {}).text + " " + (items[1] || {}).text + " ");
		});
	},200);
});
//选择所在地区
$(".fromcome").on("tap", function(){
	var city_picker = new mui.PopPicker({layer:3});
	city_picker.setData(init_city_picker);
	setTimeout(function(){
		city_picker.show(function(items){
			$(".fromcome").html((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
		});
	},200);
});




$('#protocol').click(function(){
	if($('.btn').hasClass('disable')){
		$(this).addClass('agree');
		$('.btn').removeClass('disable').addClass('submit');
	}else{
		$(this).removeClass('agree');
		$('.btn').addClass('disable').removeClass('submit');
	}
})

$('.btn-box').on('click','.submit',function(){
	
})
