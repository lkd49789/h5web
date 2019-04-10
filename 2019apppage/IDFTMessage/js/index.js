var vm = new Vue({
	el:'#wrapper',
	data:{
		newMsg4:[],//最新4条留言
		top4Member:[],//留言最多的4名成员
		top4tg:[],//最新4条投稿
	},
	filters:{
		ctime:function(id){
			console.log(id)
			return 'img/top/'+id+'.png'
		}
	},
	methods: {
		gotosendmsg:function(id){//成员留言页
	      var curMember = vm.top4Member[id]
	      localStorage.setItem("IDFTMessage_curMember",JSON.stringify(curMember))
	      main.hrefTo("sendmsg.html")
		},
		gotomemberlist:function(){//挑选成员
			main.hrefTo("memberlist.html")
		},

		gotorule:function(){//消息规则 //投稿规则
			main.hrefTo("rule.html")
		},
		gotomsglist:function(){//消息列表
			main.hrefTo("msglist.html")
		},

		gototougao:function(){//投稿指南页
			main.hrefTo("guide.html")
		},

		
		gototougaolist:function(){//投稿列表
			main.hrefTo("tglist.html")
		},
	    sendmsg: function (id) {//提交消息
	      console.log(id)
	      var curMember
	      if(vm.page == 0){
	      	curMember = vm.listA[id]
	      }else{
	      	curMember = vm.listB[id]
	      }
	      localStorage.setItem("curMember",JSON.stringify(curMember))

	      main.hrefTo("pay.html")
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

//scrollList()

commentInfo()

function scrollList(){
	var offset=0;
   	var dis = $('.scroll-wrapper ul').height();
    var speed=50;
    $('.scroll-wrapper ul').clone().appendTo($('.scroll-box') )
    setInterval(function(){
    	if(offset >= dis) {
			offset = 0;
    	}
    	offset ++;
		$('.scroll-wrapper .scroll-box').css("margin-top", offset*-1+ "px")
    },speed);
}
//最新4条留言
function commentInfo(){
	main.commentInfo(0,4,1,function(dt){
		if(dt.status == 200){
			vm.newMsg4 = dt.content;
			if(vm.newMsg4.length >2){
				setTimeout(function(){
					scrollList()
				},1000)
			}
		}
		memberRank()
	})
}

//获取留言最多的4名成员
function memberRank(){
	main.memberRank(1,function(dt){
		if(dt.status == 200){
			vm.top4Member = dt.content.slice(0,4);
			
		}
	})
	materialInfo()
}

//最新4个投稿
function materialInfo(){
	main.materialInfo(0,4,1,function(dt){
		if(dt.status == 200){
			var teparr = dt.content
			$.each(teparr,function(index,dt){
				teparr[index].materialInfo.tag = JSON.parse(dt.materialInfo.tag)
				teparr[index].materialInfo.ctime = formatMsgTime(dt.materialInfo.ctime)
				
			})
			vm.top4tg = teparr;
			
		}
	})
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