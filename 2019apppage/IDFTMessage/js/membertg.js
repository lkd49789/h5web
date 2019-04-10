var curMember = JSON.parse(localStorage.getItem("curMember_tg"))
var ctime = 0;
var canload = true;//是否可加载

var vm = new Vue({
	el:'#wrapper',
	data:{
		curMember:curMember,
		listA:[]
	},
	filters:{
		
	},
	methods: {
	    
		//跳转到投稿引导页
		gotoguide:function(){
			
			main.hrefTo("guide.html")
		},
	    gototginfo:function(mtype,mid){//投稿详情 0新闻  1艺术  2声音   3视频 
	    	if(mtype == 0){
	    		window.web.gotoPage("news/detail?id="+mid)
	    	}else if(mtype == 1){
	    		window.web.gotoPage("art/detail?id="+mid)
	    	}else if(mtype == 2){
	    		window.web.gotoPage("voice/detail?id="+mid)
	    	}else if(mtype == 3){
	    		window.web.gotoPage("thing/detail?id="+mid)
	    	}
	    }
	}

})

//获取当前成员投稿
memberTg();
function memberTg(){
	if(!canload){
		return false;
	}else{
		canload = false;
	}
	main.membertg(ctime,20,curMember.memberId,function(dt){
		if(dt.status == 200){
			if(!dt.content.materialInfo || dt.content.materialInfo.length == 0){
				$(".mui-pull-bottom-tips").hide()
			}
			if(dt.content && dt.content.materialInfo.length > 0){
				ctime = dt.content.materialInfo[dt.content.materialInfo.length-1].ctime;
				var teparr = dt.content.materialInfo;
				$.each(teparr,function(index,dt){
					teparr[index].tag = JSON.parse(dt.tag);
					teparr[index].ctime = formatMsgTime(dt.ctime);
				})
				vm.listA = vm.listA.concat(teparr);
				if(dt.content.materialInfo.length < 20){
					flag = true;
				}
			}else{
				flag = true;
			}
		}
		canload = true;
	})
}


/*******************************************************上拉加载********************************************************************/
var flag = false;
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
						var self = this;
						setTimeout(function() {
							memberTg();
							self.endPullUpToRefresh(flag);
						}, 1000);
					}
				}
			});
		})
	});
})(mui);


function formatMsgTime(timespan) {
  var dateTime = new Date(timespan);
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now);  //typescript转换写法

  var milliseconds = 0;
  var timeSpanStr;

  milliseconds = now_new - timespan;

  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚';
  }
  else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
  }
  else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  }
  else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  }
  else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
  } else {
    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  }
  return timeSpanStr;
};