var vm = new Vue({
	el:'.wrapper',
	data:{
		showpop:0, //0 关闭  1.显示
		verification:0   //用户是否已实名认证
	},
	mounted: function () {
		//var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
		//this.verification = u_info.userInfo.verification;

	},
	
	methods: {
	    agree:function(){//同意协议
	    	if(this.verification == 0){
	    		this.showpop = 1;
	    	}else{
	    		dsBridge.call("snhAgreeProtocol", "NETFACE");
	    		dsBridge.call("snhClosePage",'');
	    	}
	    	
	    },
        authrealname:function(){//实名认证
          _openNativeModule("mine/authrealname");
        },
	    closePop:function(){
	    	vm.showpop = 0;
	    }
	}

})

