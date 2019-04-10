var vm = new Vue({
	el:'.container',
	data:{
		info:[]
	},
	filters:{
		
	},
	methods: {
		gotoVideo:function(id){
			if(checkFromNew()){
		        _openNativeModule('video/detail?id='+id)
		    }else if(checkFromOld()){
				window.web.gotoPage('video/detail?id=' + id);
		    }
		},
		gotoPage:function(){
			snhOpenWebUrl("http://m.iqiyi.com/m/share/album/217773814?platform=12&social_platform=link&p1=2_22_221")
		}
	}
})
