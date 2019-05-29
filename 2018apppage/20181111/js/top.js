var flag=false;

var history_li = '<li>'+
'					<p><span class="nickname">{{nickname}}</span><span class="time">{{ctime}}</span></p>'+
'					<p><span class="c1">{{gettype}}</span><span class="j{{rewardType}}">{{rewardname}}</span></p>'+
'				</li>'

var page = 0;//页码
var self

getBigPrizeList()

//content   padding-top的值
var paddT = $('.content').innerHeight() - $('.content').height();
$('.listbox').height($('body').height()-$('.tab').height()-paddT-2);

//抽奖记录
function getBigPrizeList(){
	console.log("page>>"+page)
	main.getBigPrizeList(page*30,function(dt){
		var html = ''
		if(dt.status==200){
			
			$.each(dt.content,function(index,dl){
				var _li = history_li;
				
				_li = _li.replace("{{nickname}}",dl.userName);
				_li = _li.replace("{{ctime}}",getDateFormat(dl.ctime));
				_li = _li.replace("{{gettype}}",gettype(dl.rewardType));
				_li = _li.replace("{{rewardType}}",dl.rewardType);
				_li = _li.replace("{{rewardname}}",getRewardType(dl.rewardType));
				html += _li
			})
			$('.musicList').append(html);
			page += 1;
			if(dt.content.length  == 30){
				
			}else{
				flag = true;
			}
			
		}else{
			
		}
	})
}
function gettype(_type){
	if(_type == 1){
    	return '集齐了'
	  }else{
	    return '抽中了'
	  }
}
function getRewardType(_type){
	switch(_type){
		case 1:
			return "5张SNH48 Group团卡";
			break;
		case 2:
			return "锦鲤五折卡";
			break;
		case 3:
			return "锦鲤袋王卡";
			break;
		
	}
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
						getBigPrizeList()
						setTimeout(function() {
							self.endPullUpToRefresh(flag);
						}, 1500);
					}
				}
			});
		})
	});
})(mui);
