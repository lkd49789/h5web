

var wxToken = GetQueryString('wxtoken');
var li_my = '<li>'+
				'<div class="headbox">'+
					'<span class="headimg" style="background-image: url({{avatar}});"></span>'+
					'<div>'+
						'<p class="p1"><span>{{nicker}}</span><img src="{{teamUrl}}"></img></p>'+
						'<p class="p2">{{ctime}}</p>'+
					'</div>'+
				'</div>'+
				'<div class="votebox">'+
					'<span>{{praises}}</span>'+
					'<img src="../img/icon_zan.png">'+
				'</div>'+
			'</li>'

init();

function init(){

	main.getMyList(wxToken,function(dt){
		if(dt.status==200){
			getMyList(dt.content)
		}else{
			main.alert(dt.message);
		}
	});


	$('.icon_backbtn').click(function(){
		main.backTo();
	})
	
}


//首页成员信息列表
function getMyList(dt){
	var html = "";
	$.each(dt,function(index,data){
		var _li = li_my;
		_li = _li.replace("{{avatar}}",data.avatar)
		_li = _li.replace("{{ctime}}",data.ctime)
		_li = _li.replace("{{nicker}}",data.nicker)
		_li = _li.replace("{{praises}}",data.praises)
		_li = _li.replace("{{teamUrl}}",main.formatAvata(data.teamUrl))
		html += _li
	})
	console.log(html)
	$(".seasonList").html(html)
}

// function countPriset(){
// 	main.countPriset(appToken,wxToken,_eventId,function(dt){
// 		if(dt.status==200){
// 			praisenum = dt.content.praise
// 			$('.praisenum').html(praisenum);
// 			localStorage.setItem('praisenum',praisenum);//点赞权数量缓存
// 		}else{
// 			main.alert(dt.message);
// 		}
// 	})
// }