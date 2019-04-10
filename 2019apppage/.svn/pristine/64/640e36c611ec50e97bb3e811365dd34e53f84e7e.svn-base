var vm = new Vue({
	el:'.wrapper',
	data:{
		showpop:0, //提示框 0 不显示 1 显示
		vip:true   //是否vip
	},
	filters:{
		img:function(_img){
			return ''
		}
	},
	methods: {
		gotoRoom:function(){//跳到直播间
			if(vm.vip){
	    		_openNativeModule("live/playdetail?id=xxx");//活动开始后需要id
			}else{
				vm.showpop = 1;
			}
	    	
	    },
	    gotoVip:function(){//成为vip
	    	vm.showpop = 0;
	    	_openNativeModule("vip/detail");
	    },
	    closePop:function(){//关闭
	    	vm.showpop = 0;
	    }
	}

})

if(checkFromApp()){
	var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
	if(u_info.userInfo.vip == "0"){
		vm.vip = false
	}else{
		vm.vip = true
	}
}else{
	vm.vip = false
}

