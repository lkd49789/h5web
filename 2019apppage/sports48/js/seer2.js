var flag = true;//可提交
var resultarr = []
//花式投篮预测
var vm = new Vue({
	el:'.wrapper',
	data:{
		input_1_1:'',
		input_1_2:'',
		input_1_3:'',
		input_2_1:'',
		input_2_2:'',
		input_2_3:'',
		input_3_1:'',
		input_3_2:'',
		input_3_3:'',
		showpop:0, //显示弹框
		tips:'',   //提示语
		money:0,//鸡腿数
		needmoney:50, //需要鸡腿数
		guessInfo:[],//预测数据
		
		timeover:null,//预测是否结束
		result:null,//是否出预测结果
		issubmit:null,  //是否参与投票
		prize:null //是否中奖
	},
	filters:{
		guess:function(item){
			if(item.first == vm.guessInfo.firstResult && item.second == vm.guessInfo.secondResult && item.third == vm.guessInfo.thirdResult){
				vm.prize = true;
				return "right"
			}else{
				vm.prize = false;
				return "wrong"
			}
		},
		img:function(index){
			return 'img-seer/game1-option'+(index+1)+'.png'
		},
		enabled:function(bol){
			if(bol){
				return "enabled btn-submit"
			}else{
				return "btn-submit"
			}
		}
		
	},
	methods: {
	    closePop:function(){//关闭弹框
	    	vm.showpop = 0;
	    },
	    check:function(){
	    	if(vm.timeover){//时间截止
	    		return false;
	    	}
	    	var result1 = result2 = result3 ='';
	    	resultarr = []
	    	vm.needmoney = 50;
	    	//选项1
    		if(vm.input_1_1 == "" || vm.input_1_2 =="" || vm.input_1_3 == ""){
    			showPop("填写不完整！")
    			return false;
    		}else{
    			result1 = vm.input_1_1+","+vm.input_1_2+","+vm.input_1_3;
    		}
    		//选项2
    		if(vm.input_2_1 != ""){
	    		if(vm.input_2_2 =="" || vm.input_2_3 == ""){
	    			showPop("填写不完整！")
	    			return false;
	    		}else{
	    			result2 = vm.input_2_1+","+vm.input_2_2+","+vm.input_2_3;
	    			vm.needmoney += 50;
	    		}
    		}
    		//选项3
    		if(vm.input_3_1 != ""){
	    		if(vm.input_3_2 =="" || vm.input_3_3 == ""){
	    			showPop("填写不完整！")
	    			return false;
	    		}else{
	    			result3 = vm.input_3_1+","+vm.input_3_2+","+vm.input_3_3;
	    			vm.needmoney += 50;
	    		}
    		}
	    	
	    	//相同选项
	    	if(result1 == result2 || result1 == result3){
	    		showPop("不能提交相同的预测选项!")
	    		return false;
	    	}
	    	resultarr.push({"fables":result1});
	    	if(result2 != ''){
	    		resultarr.push({"fables":result2});
	    	}
	    	if(result3 != ''){
	    		resultarr.push({"fables":result3});
	    	}
	    	if(!checkMoney()){
	    		return false;
	    	}else{
	    		vm.showpop = 2
	    	}
	    	
	    },
	    submit:function(){//提交
	    	submit()
	    },
	    recharge:function(){//充值
	    	if(checkFromNew()){
	    		_openNativeModule("recharge/recharge")
	    	}else{
	    		window.web.gotoPage("recharge/detail");
	    	}
	    },
	}
})

getGuess()
function getGuess(){
	main.getGuess(GetQueryString("id"),function(dt){
		if(dt.status == 200){
			vm.guessInfo = dt.content;
			vm.money = dt.content.userAccount.money;
			
			vm.timeover = dt.content.deadlineStatus;
			vm.result = dt.content.fableResultStatus;
			vm.issubmit = dt.content.fableStatus;
			//vm.result = true;
		}else{
			showPop(dt.message)
		}
	})
}
//提交预测结果
function submit(){
	//提交预测结果
	if(!flag){
		return false;
	}else{
		flag = false;
	}
	main.submitSeer(resultarr,GetQueryString("id"),function(dt){
		flag = true;
		if(dt.status == 200){
			vm.showpop = 0;
			getGuess()
		}else{
			showPop(dt.message)
		}
	})
}
//浮层
function showPop(msg){
	vm.showpop = 1;
	vm.tips = msg
}

//检查鸡腿是否足够
function checkMoney(){
	if(vm.needmoney > vm.money){
		vm.showpop = 3;
		return false
	}else{
		return true;
	}
}