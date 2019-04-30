var vm = new Vue({
	el:'.wrapper',
	data:{
		showpop:0, //0 关闭  1.显示
		verification:0   //用户是否已实名认证  0未认证  1已认证
	},
	mounted: function () {
		this.getUserInfo()
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
          dsBridge.call("snhAuthrealname",function(result){
          	alert("result---"+JSON.stringify(result))
          	if(result == "YES"){
          		vm.getUserInfo()
          	}else{

          	}
          })
        },
	    closePop:function(){
	    	vm.showpop = 0;
	    },
	    getUserInfo:function(){//获取用户信息
	    	var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
			this.verification = u_info.userInfo.verification;
	    }
	}

})

