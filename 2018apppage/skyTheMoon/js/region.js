var li_team = '<li>'+
'						<div class="row">'+
'							<div class="col-xs-1 photo">'+
'								<img src="{{avatar}}" />'+
'							</div>'+
'							<div class="col-xs-3 id">{{nicker}}</div>'+
'							<img class="col-xs-1 {{moonKing}}" src="img/moonKing.png" />'+
'							<div class="col-xs-2 col-xs-offset-1 mooncoke">'+
'								<img src="img/moonCake.png">'+
'							</div>'+
'							<div class="col-xs-3 knife">切到{{num}}块</div>'+
'						</div>'+
'					</li>'

var province = GetQueryString("province");

main.getProvinceList(province,function(dt){
	if(dt.status == 200){
		$(".provincial").html(dt.content.prinviceName);
		$(".qie span").html(dt.content.amount);
		
		var html = "";
		$.each(dt.content.moonUserRankResultList,function(index,info){
			var _li = li_team;
			if(index == 0){//
				_li = _li.replace("{{moonKing}}","moonKing");
			}else{
				_li = _li.replace("{{moonKing}}","display");
			}
			_li = _li.replace("{{avatar}}",info.avatar);
			_li = _li.replace("{{nicker}}",info.nicker);
			_li = _li.replace("{{num}}",info.num);
			html += _li
		})
		$("main .list-unstyled").html(html)
	}
})

