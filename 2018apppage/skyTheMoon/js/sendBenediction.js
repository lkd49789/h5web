//省
var li_option = "<option value='{{provinceNum}}'>{{provinceName}}</option>"

var provinceNum = "0";

main.getAllProvince(function(dt){
	if(dt.status == 200){
		var html = "<option id='0'>选择你的故乡</option>";
		$.each(dt.content,function(index,info){
			var _li = li_option;
			_li = _li.replace("{{provinceNum}}",info.provinceNum);
			_li = _li.replace("{{provinceName}}",info.provinceName);
			html += _li
		})
		$(".provincelist").html(html)
	}
})
$(".provincelist").change(function(){
	provinceNum = $(this).val();
	console.log($(this).val())
	var province_name = $(this).find("option:selected").text()
	$(".btn-primary span").html(province_name)
	console.log(province_name)
})
//选择地区
// $(".btn-primary").change(function(){
// 	//console.log()
// 	var province_name = $(this).find("option:selected").text()
	
// 	console.log("provinceNum--"+provinceNum)
// 	$(".btn-primary span").html(province_name)
// })
//提交祝福
$(".btn-default").click(function(){
	if(provinceNum == "0"){
		main.alert("请先选择您的故乡")
		return false;
	}
	if($("textarea").val() == ""){
		main.alert("请输入您的祝福语")
		return false;
	}
	$(this).attr("disabled","disabled")

	main.sendBless(provinceNum,$("textarea").val(),function(dt){
		if(dt.status == 200){
			localStorage.setItem("sendwish","1")
			var tep = localStorage.getItem("sendwish")
			console.log("sendwish>>"+tep)
			//main.alert(tep)
			main.hrefTo("teamList.html?infoId="+dt.content.infoId)
		}
		$(this).attr("disabled",false)
	})
})
