var curMember = JSON.parse(localStorage.getItem("curMember_msg"))
var ctime = 0;
var canload = true;//是否可加载
var canclick = true;//是否可点赞

var vm = new Vue({
	el:'#wrapper',
	data:{
		curMember:curMember,
		listA:[]
	},
	filters:{
		likeimg:function(status){
			if(status == true){
				return 'img/like-active.png'
				
			}else{
				return 'img/like.png'
			}
		}
	},
	methods: {
	    //点赞
		like:function(id){//点赞
			if(canclick){
				canclick = false;
			}else{
				return false;
			}
			console.log("id>>"+vm.listA[id].status)
			if(vm.listA[id].status){
				return false;
			}
			main.like(vm.listA[id].commentId,function(dt){
				if(dt.status == 200){
					vm.listA[id].status = true;
					vm.listA[id].praise += 1;
				}else{
					main.alert(dt.message)
				}
				canclick = true;
			})
			
		},
		//跳转到发布消息页
		gotoSendMsg:function(){
			localStorage.setItem("IDFTMessage_curMember",JSON.stringify(curMember))
			main.hrefTo("sendmsg.html")
		}
	}

})
//获取当前成员留言
memberComment();

function memberComment(){
	if(!canload){
		return false;
	}else{
		canload = false;
	}
	main.memberComment(ctime,20,curMember.memberId,function(dt){
		if(dt.status == 200){
			//
			if(!dt.content.commentResults ||  dt.content.commentResults.length == 0 ){
				$(".mui-pull-bottom-tips").hide()
			}
			//
			if(dt.content.commentResults && dt.content.commentResults.length > 0){
				vm.listA = vm.listA.concat(dt.content.commentResults);
				ctime = dt.content.commentResults[dt.content.commentResults.length-1].ctime;
				if(dt.content.commentResults.length < 20){
					flag = true
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
							memberComment();
							self.endPullUpToRefresh(flag);
						}, 1000);
					}
				}
			});
		})
	});
})(mui);