var ctime = 0;
var canload = true;//是否可加载
var canclick = true;//是否可点赞

var vm = new Vue({
	el:'#wrapper',
	data:{
		listA:[],
		listB:[],
		listC:[],
		menu:1
	},
	filters:{
		menu1:function(menu){
			if(menu == 1){
				return 'img/btn1-active.png'
			}else{
				return 'img/btn1.png'
			}
			
		},
		menu2:function(menu){
			if(menu == 2){
				return 'img/btn2-active.png'
			}else{
				return 'img/btn2.png'
			}
		},
		menu3:function(menu){
			if(menu == 3){
				return 'img/btn3-active.png'
			}else{
				return 'img/btn3.png'
			}
		},
		likeimg:function(status){
			if(status == true){
				return 'img/like-active.png'
			}else{
				return 'img/like.png'
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
		//点赞
		like:function(id,list){//点赞
			if(canclick){
				canclick = false;
			}else{
				return false;
			}
			console.log(id + "--" + list)
			var commentId

			if(list == 1){
				commentId = vm.listA[id].commentResult.commentId
				console.log(list+"--"+vm.listA[id].commentResult.status)
				if(vm.listA[id].commentResult.status){
					return false;
				}
			}else{
				commentId = vm.listC[id].commentResult.commentId
				console.log(list+"--"+vm.listC[id].commentResult.status)
				if(vm.listC[id].commentResult.status){
					return false;
				}
			}
			
			main.like(commentId,function(dt){
				if(dt.status == 200){
					if(list == 1){
						vm.listA[id].commentResult.status = true;
						vm.listA[id].commentResult.praise += 1;
					}else{
						vm.listC[id].commentResult.status = true;
						vm.listC[id].commentResult.praise += 1;
					}
				}
				canclick = true;
			})
			console.log(id)
		},
		//进入成员信息列表
	    gotomsg: function (id) {
	      console.log("gotomsg>>"+id)
	      var curMember = vm.listB[id]
	      localStorage.setItem("curMember_msg",JSON.stringify(curMember))
	      main.hrefTo("membermsg.html")
	    },
	    //进入成员列表
	    gotomemberlist: function () {
	      main.hrefTo("memberlist.html")
	    }
	}

})

commentInfo()
//所有留言
function commentInfo(){
	if(!canload){
		return false;
	}else{
		canload = false;
	}
	main.commentInfo(ctime,20,1,function(dt){
		if(dt.status == 200){
			if(ctime == 0){
				memberRank()
				if(dt.content.length == 0){
					$(".mui-pull-bottom-tips").hide()
				}
			}
			if(dt.content && dt.content.length>0){
				vm.listA = vm.listA.concat(dt.content);
				if(dt.content.length < 20){
					flag = true;
				}
				ctime = dt.content[dt.content.length-1].commentResult.ctime;
			}
		}
		canload = true;
	})
}

//获取所有成员
function memberRank(){
	main.memberRank(1,function(dt){
		if(dt.status == 200){
			vm.listB = dt.content;
			
		}
	})
	getTopMsg()
}

//留言排行
function getTopMsg(){
	main.commentInfo(0,10,2,function(dt){
		if(dt.status == 200){
			vm.listC = dt.content;
		}
	})
}
/*******************************************************上拉加载********************************************************************/
var flag = false;
//上拉加载
//mui.init();
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
							commentInfo();
							self.endPullUpToRefresh(flag);
						}, 1000);
					}
				}
			});
		})
	});
})(mui);