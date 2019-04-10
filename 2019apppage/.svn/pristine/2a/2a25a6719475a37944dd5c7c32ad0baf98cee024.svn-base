var ctime = 0;
var canload = true;//是否可加载

var vm = new Vue({
	el:'#wrapper',
	data:{
		listA:[],
		listB:[],
		listC:[],
		menu:1
	},
	filters:{
		top:function(id){
			console.log(id)
			return 'img/top/'+id+'.png'
		},
		menu1:function(menu){
			if(menu == 1){
				return 'img/tg1-active.png'
			}else{
				return 'img/tg1.png'
			}
			
		},
		menu2:function(menu){
			if(menu == 2){
				return 'img/tg2-active.png'
			}else{
				return 'img/tg2.png'
			}
		},
		menu3:function(menu){
			if(menu == 3){
				return 'img/tg3-active.png'
			}else{
				return 'img/tg3.png'
			}
		},
		index:function(id){
			return "img/top/"+id+".png"
		}
	},
	methods: {
		//切换menu
		gotoMenu:function(id){
			vm.menu = id
		},
		//投稿引导页
		gotoguide:function(){//投稿列表
			main.hrefTo("guide.html")
		},
		//选择成员
	    gotomembertg: function (id) {//提交消息
	      console.log(id)
	      var curMember = vm.listB[id];
	      localStorage.setItem("curMember_tg",JSON.stringify(curMember));
	      main.hrefTo("membertg.html")
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

materialInfo()
//获取最新投稿
function materialInfo(){
	if(!canload){
		return false;
	}else{
		canload = false;
	}
	main.materialInfo(ctime,20,1,function(dt){
		if(dt.status == 200){
			//加载成员投稿列表
			if(ctime == 0){
				memberRank()
				if(!dt.content || dt.content.length == 0){
					$(".mui-pull-bottom-tips").hide()
				}
			}
			if(dt.content && dt.content.length > 0){
				
				ctime = dt.content[dt.content.length-1].materialInfo.ctime
				console.log("ctime>>"+ctime)
				var teparr = dt.content
				$.each(teparr,function(index,dt){
					teparr[index].materialInfo.tag = JSON.parse(dt.materialInfo.tag)
					teparr[index].materialInfo.ctime = formatMsgTime(dt.materialInfo.ctime)
				})
				vm.listA = vm.listA.concat(teparr);
				if(dt.content.length < 20){
					flag = true;
				}
			}
		}
		canload = true;
		
	})
}

//获取所有成员
function memberRank(){
	main.memberRank(2,function(dt){
		if(dt.status == 200){
			var teparr = dt.content;
			teparr.sort(up);
			vm.listB = dt.content;
		}
		getTopMsg()
	})
	
}

//投稿排行
function getTopMsg(){
	main.materialInfo(0,10,2,function(dt){
		if(dt.status == 200){
			var teparr = dt.content
			$.each(teparr,function(index,dt){
				teparr[index].materialInfo.tag = JSON.parse(dt.materialInfo.tag)
				teparr[index].materialInfo.ctime = formatMsgTime(dt.materialInfo.ctime)
			})
			vm.listC = teparr;
		}
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
							materialInfo();
							self.endPullUpToRefresh(flag);
						}, 1000);
					}
				}
			});
		})
	});
})(mui);

//按照升序排列
function up(x,y){
    return x.rank-y.rank
}


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