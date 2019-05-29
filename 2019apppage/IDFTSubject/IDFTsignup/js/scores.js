var vm = new Vue({
	el:'.wrapper',
	data:{
		scoreList:[],  //分数列表
		showpop:0, //0 关闭  1.显示弹框   2确认框
		backhome:0,  //是否返回上一页  0 NO  1yes
    	tips:'你还未满足代役条件，无法报名代役。',//弹框提示语
    	showtip:'',
    	showbtn:0 //是否显示按钮 0不显示  1显示
	},
	mounted: function () {
	    //this.qtype = GetQueryString("type");
	    main.getScores(function(dt){
	    	if(dt.status == 200){
	    		vm.scoreList = dt.content;
	    		vm.showbtn = vm.scoreList.isShow;
	    		//vm.scoreList.isShow = 4
	    		if(vm.scoreList.isShow == 2){
	    			vm.showtip = "你没有代役资格"
	    		}else if(vm.scoreList.isShow == 3){
	    			vm.showtip = "报名成功"
	    		}else if(vm.scoreList.isShow == 4){
	    			vm.showtip = "你已放弃报名"
	    		}
	    		
	    	}else{
	    		vm.showPop(dt.message)
	    		vm.backhome = 1;
	    	}
	    })
	},
	methods: {
		gotoPage:function(){
			if(this.scoreList.integrals >= 100000){
				snhOpenNewWebview(CONFIG.geturl()+"signup.html")
			}else{
				this.showPop("你没有代役资格")
			}
		},
	    //显示弹框
		  showPop:function(msg){
		    	this.tips = msg;
		    	vm.showpop = 1;
		  },
	    //关闭弹框
		  closePop:function(){
		  	if(this.backhome == 1){
	            snhGoBack()
	        }
		    vm.showpop = 0;
		  }
	}

})


