var vm = new Vue({
	el:'.wrapper',
	data:{
		mInfo:[],//成员信息
		showpop:0, //0 关闭  1.显示弹框   2确认框
    	tips:'',//弹框提示语
    	backhome:0  //是否返回上一页  0 NO  1yes
	},
  mounted: function () {
    main.getMemInfo(function(dt){
    	if(dt.status == 200){
    		vm.mInfo = dt.content
    	}else{
    		vm.showPop(dt.message)
    		//vm.backhome = 1;
    	}
    })
    //this.qtype = GetQueryString("type");
  },
	watch:{
		// words:function(neww){
  //     console.log(neww)
		// 	this.totalwords = neww.length;
		// }
	},
	methods: {
    //跳转提交页面
		gotoSubmitPage:function(){
			 snhOpenNewWebview(CONFIG.geturl()+"submit.html")
		},
	    //放弃代役资格
	    giveup:function(){
	    	var _this = this;
	       main.submit("0",function(dt){
	          if(dt.status == 200){
	              _this.showPop("已放弃！")
	              _this.backhome = 1;
	          }else{
	              _this.showPop(dt.message)
	          }
	       })
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


