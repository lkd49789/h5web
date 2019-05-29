var flag=false;
var list_li = '<li>'+
'					<div class="headbox">'+
'						<img src="images/icon-{{type}}.png">'+
'						<div>'+
'							<p class="p1">来源 {{ctime}} {{rewardType}}</p>'+
'							<p class="p2 {{rtime1}}">领取时间 {{rtime}}</p>'+
'						</div>'+
'					</div>'+
'					<span id="{{id}}" class="votebtn {{receive1}}">{{receive}}</span>'+
'				</li>'
var history_li = '<li>'+
'					<div class="cards">'+
'						{{cards}}'+
'					</div>'+
'					<p>{{ctime}}</p>'+
'				</li>'

var page = 0;//页码
var self

getList()

//tab切换
$('.tab li').click(function(){
	var point = $(this).attr('point');
	$(this).addClass('active');
	$(this).siblings().removeClass('active');
	$('.'+point).show();
	$('.'+point).siblings().hide();
});

//content   padding-top的值
var paddT = $('.content').innerHeight() - $('.content').height();
$('.listbox').height($('body').height()-$('.tab').height()-paddT-2);


//去充值
$('.btn-recharge').click(function(){
	if(checkFromApp()){
		window.web.gotoPage("recharge/detail");
	}else{
		window.location.href = "http://h5.snh48.com/snh48/user_v3/"
	}
})

//跳转规则
$('.rulebtn').click(function(){
	main.hrefTo(CONFIG.getJumpUrl()+'rule.html');
})

//领取奖励
$(".seasonList").on("click",".votebtn",function(){
	var _that = $(this)
	if($(this).hasClass("active-get")){//已领取
		return false;
	}
	var id = $(this).attr("id");
	console.log("id>"+id)
	if(!$(this).hasClass("ing")){
		$(this).addClass("ing");
		main.receive(id,function(dt){
			if(dt.status == 200){
				$(_that).html("已领");
				$(_that).attr("class","votebtn active-get");
			}else{
				main.alert(dt.message)
			}
		})
	}
})

//奖励列表
function getList(){
	main.getList(function(dt){
		var html = ''
		if(dt.status==200){
			getHistoryList()
			if(dt.content.length == 0){
				$('.seasonList').html("<p>暂无数据</p>");
				$('.seasonList').next().hide()
				return false;
			}
			$.each(dt.content,function(index,dl){
				var _li = list_li;
				_li = _li.replace("{{id}}",dl.id);
				if(dl.rewardType == 1 || dl.rewardType == 2){
					_li = _li.replace("{{type}}","5per");
				}else if(dl.rewardType == 3){
					_li = _li.replace("{{type}}","1w");
				}
				_li = _li.replace("{{ctime}}",getDFormat(dl.ctime));//
				_li = _li.replace("{{rewardType}}",getRewardType(dl.rewardType));//
				if(dl.rtime > 0){
					_li = _li.replace("{{rtime}}",getDateFormat(dl.rtime));
				}else{
					_li = _li.replace("{{rtime1}}","hide");
				}

				if(dl.isReceive == 1){
					_li = _li.replace("{{receive1}}","active-get");
					_li = _li.replace("{{receive}}","已领");
				}else{
					_li = _li.replace("{{receive}}","领取");
				}
				html += _li
			})
			$('.seasonList').html(html);
		}else{
			
		}
		
	})
}

function getRewardType(_type){
	switch(_type){
		case 1:
			return "集齐五张卡";
			break;
		case 2:
			return "锦鲤五折卡";
			break;
		case 3:
			return "锦鲤袋王卡";
			break;
		
	}
}


//抽奖记录
function getHistoryList(){
	console.log("page>>"+page)
	main.getHistoryList(page*10,function(dt){
		var html = ''
		if(dt.status==200){
			if(page ==0 && dt.content.length == 0){
				$('.musicList').html("<p>暂无数据</p>");
				$('.musicList').next().hide()
				return false;
			}
			$.each(dt.content,function(index,dl){
				var _li = history_li;
				
				_li = _li.replace("{{ctime}}",getDateFormat(dl.ctime));//
				_li = _li.replace("{{cards}}",getImgList(dl.drawResult));//
				
				html += _li
			})
			$('.musicList').append(html);
			page += 1;
			if(dt.content.length  == 10){
				
			}else{
				flag = true;
			}
			
		}else{
			
		}
	})
}

function getImgList(dt){
    
    var html = ""
    var _dt = JSON.parse(dt);

    $.each(_dt,function(i,card){
        html += '<img src="images/card'+card+'.png">'
    })
    return html
}
/*******************************************************上拉加载********************************************************************/

//上拉加载

mui.init();
(function($) {
	//阻尼系数
	var deceleration = mui.os.ios?0.003:0.0009;
	$('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration:deceleration
	});
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				up: {
					callback: function() {
						self = this;
						if(index == 0){

						}else if(index == 1){
							getHistoryList()
						}
						setTimeout(function() {
							self.endPullUpToRefresh(flag);
						}, 1500);
					}
				}
			});
		})
	});
})(mui);
