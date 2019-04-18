var mcValue = localStorage.getItem("CUR_TEAM") || "{}";
var showTip = localStorage.getItem("TIP");
if(showTip != "isshow") $(".tip").show();

var thisMc = JSON.parse(mcValue);
var allMc = []  //过往话题
//本周话题
var topiclistVM = new Vue({
  el: '#vue-topiclist',
  data: {
    topics : []
  },
  methods: {
    // 设置当前消息并打开消息详细页面
    setLike: function (topic) {
      if(topic.hasUnlocked == 1){
        mcTopic.muiAlert("你已经解锁过一次了")
        return false;
      }
      var topicLike = mcTopic.topicLike(topic.topicId, function(status){
        if (status.status == "200") {
          topic.parseCount++;
          topic.hasUnlocked = 1;
          //localStorage.setItem(topic.id, "1");
        }else{
            mcTopic.muiAlert(status.message)
        }
        
      }, function(msg){
        mcTopic.muiAlert(msg)
       
      });
    }
  }
});
//以往话题
var HistoryTopiclistVM = new Vue({
	el: '#refreshContainer',
	data: {
	   mcHistroyTopic : []
	}
});
//-----------------------------------------------------------------------------

mui.init({
 	pullRefresh : {
		container:"#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
		up : {
		  contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
		  contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
		  callback :pullfresh_function //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	}
});


$(function () {
	//菜单切换
  	$(".menu li").click(function(){
       var index = $(this).index();
       $(".menu li").removeClass("active");
       $(this).addClass("active");
       $(".content").hide().eq(index).show()
       
  	})
  	//return false
   	
    var topiclist = mcTopic.getTopicList(thisMc.teamId, function(topiclist){
	    //console.log(JSON.stringify(topiclist));
	    topiclistVM.topics = topiclist;
	    if(topiclist.length == 0)  $(".tip-warning").show()

	    //继续加载以往话题
		pullfresh_function()
    }, function(msg){
    	//pullfresh_function()
      	alert(msg);
    });
});



//获取过往话题
function pullfresh_function(){
	console.log("pullfresh_function")
	
	var lsttime = $(".lastime:last").val() == undefined ? "0" :$(".lastime:last").val();
	console.log("---"+lsttime)
	var topiclist = mcTopic.topListAll(thisMc.teamId, lsttime, function(list){
	    //console.log(JSON.stringify(list));
	    allMc = allMc.concat(list)
	    //console.log(allMc)
	    HistoryTopiclistVM.mcHistroyTopic = allMc;
	    
	    resize()
    }, function(msg){
      	alert(msg);
    });

    
    //this.endPullupToRefresh(false);
    mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
}
//---------------------------------------------------------------------------------------------
function resize(){
	setTimeout(function(){
		var _width = $(window).width()*.12 +"px";

		console.log("----"+$(".user-tx img").width())
		$(".user-tx").css({"width":_width,"height":_width})
	},100)
}

// Vue.filter('resize', function (img) {
//   return "http://source.snh48.com"+img;
// });

$(".tip").click(function(){
    $(".tip").hide();
    localStorage.setItem("TIP", "isshow");
})

