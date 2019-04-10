var vm = new Vue({
	el:'.wrapper',
	data:{
		gameId:0,//运动项目
		money_jf:0,//积分数
		money_jt:0,//鸡腿数
		isGuess:true,//是否竞猜过 true-没有竞猜过 false-已竞猜
		isOver:true, //竞猜是否结束 true 结束 false未结束
		isShow:false,//是否显示最终结果
		bonus:0,      //奖励
		paytype:0,//支付方式 1鸡腿 2积分
		showpop:0, //提示框 0 不显示 1 没选择歌曲 2 支付提示框 3 积分/鸡腿不足 4.选择成员 5.选择队伍 6.预测成功列表
		options:[],//项目信息
		teams:[],//队伍
		members:[],//成员
		optionindex:0,//选项索引
		joinerType:'',//选项类型 team/member
		winner:[],//猜对的粉丝列表
		tips:''//弹框提示语
	},
	filters:{
		
		teamcolor:function(_team){
			var str = _team.split(" ");
			return str[1]+"-bg";
		},
		img:function(_id){
			return 'img-champion/option'+_id+'.png'
		},
		time:function(_time){//时间格式化
			return formatDate(_time)
		},
		money:function(_type){
			if(_type == 1){
				return "鸡腿"
			}else{
				return "积分"
			}
		},
		avatar:function(_avatar){//头像
			return formatHttp(avatar)
		}
	},
	methods: {
		chooseJoiner: function (_index) {//选择运动项目
			//console.log(_index)
			if(vm.isGuess || vm.isOver){
				return false;
			}
			optionindex = _index
			vm.gameId = vm.options[optionindex].id
			//var joiner = vm.options[optionindex].joiner.split(",")
			var joiner = vm.options[optionindex].memberInfoList
			if(joiner[0].realName.indexOf("TEAM") >= 0){//团体
				vm.joinerType = 'team'
				vm.teams = joiner;
				vm.showpop = 5;
			}else{
				vm.joinerType = 'member'
				vm.members = joiner;
				vm.showpop = 4;
			}
	    },
		chooseTeam: function (_team) {//选择队伍
			vm.options[optionindex].selectWinner = _team
	      	vm.showpop = 0;
	    },
	    chooseMember: function (_member) {//选择成员
			vm.options[optionindex].selectWinner = _member
	      	vm.showpop = 0;
	    },
		showPopBox: function (_pop,_paytype) {//弹出框
			for(var i=0;i<vm.options.length;i++){
				if(vm.options[i].selectWinner == '选择团体' | vm.options[i].selectWinner == '选择个人'){//鸡腿 积分不足
					vm.showpop = 1;
					showPop("你还没有全部选择竞猜选项")
					return false;
				}
			}
			
			if(_pop == 'jf'){
				vm.paytype = 2;
				if(vm.money_jf < 50){//积分不够
					vm.showpop = 3;
				}else{
					vm.showpop = 2;
				}
			}else if(_pop == 'jt'){
				vm.paytype = 1;
				if(vm.money_jt < 50){//鸡腿不够
					vm.showpop = 3;
				}else{
					vm.showpop = 2;
				}
			}else{
				vm.showpop = _pop;
			}
			
	    },
	    submit: function () {//提交竞猜
	       //提交
            var list = []
            for(var i=0;i<vm.options.length;i++){
            	var option = {
		                      "proId": vm.options[i].id,
		                      "winner": vm.options[i].selectWinner
		                    }
		        list.push(option)
            }
            //console.log(JSON.stringify(list))
            main.submitGuess(list,vm.paytype,function(dt){
            	if(dt.status == 200){

            		getChampionList()
            		vm.showpop = 0;//关闭浮层
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
	    closePop:function(){//关闭弹框
	    	vm.showpop = 0;
	    }
	}

})

getChampionList()
function getChampionList(){
	main.getChampionList(function(dt){
		if(dt.status == 200){
			vm.options = dt.content.sportProList;
			vm.isGuess = dt.content.isGuess;
			vm.isOver = dt.content.isOver
			vm.isShow = dt.content.isShow
			vm.bonus = dt.content.bonus
			if(dt.content.userAccount){
				vm.money_jt = dt.content.userAccount.money;
				vm.money_jf = dt.content.userAccount.integral;
			}
			
		}else{
			showPop(dt.message)
		}
		if(vm.isShow){//显示获奖名单
			getWinner()
		}
		
	})
}
//弹框
function showPop(msg){
	vm.tips = msg;
	vm.showpop = 1;
}
//获取猜中人员
function getWinner(){
	console.log("getWinner")
	main.getWinner(function(dt){
		if(dt.status == 200){
			vm.winner = dt.content;
			
		}
	})
}

