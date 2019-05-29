var li_team = '<li provinceNum="{{provinceNum}}">'+
'						<div class="row">'+
'							<div class="col-xs-4 provincial">{{provinceName}}</div>'+
'							<div class="col-xs-4 col-xs-offset-1 mooncoke">'+
'								<img src="img/moonCake.png" />'+
'							</div>'+
'							<div class="col-xs-4">切到{{amount}}块</div>'+
'						</div>'+
'					</li>'
var isBless = true;//是否发过祝福

main.getAllList(function(dt){
	if(dt.status == 200){
		var html = "";
		$.each(dt.content.moonProvinceInfoList,function(index,info){
			var _li = li_team;
			_li = _li.replace("{{provinceNum}}",info.provinceNum);
			_li = _li.replace("{{provinceName}}",info.provinceName);
			_li = _li.replace("{{amount}}",info.amount);
			html += _li
		})
		$(".list-unstyled").html(html)

		isBless = dt.content.isBless;
		if(isBless){
			$(".btn-block").html("继续切月饼")
		}
		addListeners()
	}
})
//
$(".list-unstyled").on("click","li",function(){
	var provinceNum = $(this).attr("provinceNum");
	main.hrefTo("region.html?province="+provinceNum)
})

function addListeners(){
	//发祝福
	$(".btn-block").click(function(){
		main.getAllList(function(dt){
			isBless = dt.content.isBless;
			if(isBless){
				$(".btn-block").html("继续切月饼")
			}
			
			console.log(isBless)
			if(isBless){//已发过祝福
				main.hrefTo("moonCutting.html")
			}else{//跳到发祝福页面
				main.hrefTo("sendBenediction.html")
			}
		})
		
	})
}
