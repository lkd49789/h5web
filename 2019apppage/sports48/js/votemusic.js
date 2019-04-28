var vm = new Vue({
	el:'.wrapper',
	data:{
		mainData:[],//曲目投票数据
		status:null,//true-可以投票 false-截止投票
		team:'',//所选队伍id 10-SNH  11-BEJ  12-GNZ
		teamindex:null,//队伍索引
		paytype:0,//参与投票类型 1-鸡腿 2-积分
		showpop:0, //提示框 0 不显示 1 没选择歌曲 2 支付提示框 3 积分/鸡腿不足
		champion:'', //冠军
		endtime:"",//倒计时
		//video:[2753,2754,2755],//视频
		money_jt:0,
		money_jf:0,
		tips:''//弹框提示语
	},
	filters:{
		groupname:function(id){//分团名称
			if(id == 10){
				return "SNH"
			}else if(id == 11){
				return "BEJ"
			}else{
				return "GNZ"
			}
		},
		img:function(_img){
			return 'img-music/team-'+_img+'.png'
		},
		time:function(_time){
			return ''
		},
		money:function(_type){
			if(_type == 2){
				return "积分"
			}else{
				return "鸡腿"
			}
		}
	},
	methods: {
		chooseTeam: function (_index) {//选择队伍索引
			if(vm.status)
			{
				vm.teamindex = _index
				vm.team = vm.mainData.aidGorups[_index].groupId;
			}
	    },
	    playVideo:function(gid){//播放原生视频
	    	var vid 
	    	if(gid == 10){
	    		vid = 2753
	    	}else if(gid == 11){
	    		vid = 2754
	    	}else{
	    		vid = 2755
	    	}
	    	console.log(vid)
	    	if(checkFromNew()){
	    		_openNativeModule('video/detail?id=' + vid)
	    	}else{
	    		window.web.gotoPage('video/detail?id=' + vid);
	    	}
	    },
		gotoPay: function (_type) {//去支付
			console.log(_type)
			if(vm.team != ''){
				vm.paytype = _type
				if(vm.paytype == 2){//积分
					if(vm.mainData.userAccount.integral < 50){
						vm.showpop = 3;
					}else{
						vm.showpop = 2;
					}
				}else if(vm.paytype == 1){//鸡腿
					if(vm.mainData.userAccount.money < 50){
						vm.showpop = 3;
					}else{
						vm.showpop = 2;
					}
				}
				
			}else{
				showPop("你还没有选择应援的曲目哦")
			}
	    },
	    submit: function () {//提交竞猜
	    	main.vote(vm.team,vm.paytype,function(dt){
            	if(dt.status == 200){
            		vm.team = '';
            		vm.showpop = 0;//关闭浮层
            		if(vm.paytype == 2){//积分
            			vm.money_jf -= 50
            		}else{
            			vm.money_jt -= 50
            		}
            		vm.mainData.aidGorups[vm.teamindex].voteNum += 1;
            		showPop("投票成功")
            	}else{
            		showPop(dt.message)
            	}
            })
	    },
	    recharge:function(){//充值
	    	if(checkFromNew()){
	    		_openNativeModule("recharge/recharge")
	    	}else{
	    		window.web.gotoPage("recharge/detail");
	    	}
	    },
	    closePop:function(){//关闭
	    	vm.showpop = 0;
	    }
	}

})

getList()
function getList(){
	main.getList(function(dt){
		if(dt.status == 200){
			vm.mainData = dt.content;
			vm.status = dt.content.status;
			//vm.status = false;
			vm.champion = dt.content.aidGorups[0].groupId
			vm.money_jf = dt.content.userAccount.integral;
			vm.money_jt = dt.content.userAccount.money;
		}else{
			showPop(dt.message)
		}
	})
}
//弹框
function showPop(msg){
	vm.tips = msg;
	vm.showpop = 1;
}

timeDown("2019-04-13 19:00:00");

function timeDown(endDateStr) {
      //结束时间
      var endDate = new Date(endDateStr.replace(/-/g, "/"));
      //当前时间
      var nowDate = new Date();
      var totalSeconds = parseInt((endDate.getTime() - nowDate.getTime())/1000);
     // console.log(totalSeconds)
      //相差的总秒数
      //var totalSeconds = parseInt((endDate - nowDate) / 1000);
     // alert(endDate)
      //alert(nowDate)
      //alert(totalSeconds)
      //天数
      var days = Math.floor(totalSeconds / (60 * 60 * 24));
      //取模（余数）
      var modulo = totalSeconds % (60 * 60 * 24);
      //小时数
      var hours = Math.floor(modulo / (60 * 60));
      modulo = modulo % (60 * 60);
      //分钟
      var minutes = Math.floor(modulo / 60);
      //秒
      var seconds = modulo % 60;
      //输出到页面
      if(totalSeconds>0){
      	vm.endtime = "离截止时间还剩"+ PrefixInteger(days,2) +"天" + PrefixInteger(hours,2)+"时" +PrefixInteger(minutes,2)+"分"+PrefixInteger(seconds,2)+"秒"
      	//延迟一秒执行自己
	      setTimeout(function () {
	        timeDown(endDateStr);
	      }, 1000)
      }else{
      	vm.endtime = "投票时间截止";
      	
      }
      
}

function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}