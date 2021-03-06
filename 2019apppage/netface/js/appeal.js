var vm = new Vue({
	el:'.wrapper',
	data:{
		empty:null,  //0无场次  1有场次
		listData:[],  //申诉列表
		showpop:0, //0 关闭  1.购买方式 2提示语弹框
		words:''
	},
	mounted: function () {
    	main.getAppealList(function(dt){
    		if(dt.status == 200){
    			vm.listData = dt.content;
    			vm.empty = dt.content.length;
    		}
    	})

    },
    filters:{
		avatar:function(img){
			return 'https://source.48.cn'+img;
		},
	    time:function(time,str){
	      return formatTime(str,time)
	    }
	},
	methods: {
		 showBuyPanel:function(){
			if(this.total == '' || this.total<=0){
				this.showPop("请输入购买数量！",2,"知道了");
	    		return false;
	    	}else{
	    		this.showPop("",1,"");
	    	}
		 },
	     //跳转页面
	     gotoPage:function(type,id){
	        var url = _url
	        if(url.indexOf("http://")>=0 ||url.indexOf("https://")>=0){
	        }else{
	            url = CONFIG.geturl()+url
	        }
	        var minfo = JSON.stringify(this.listData[id]);
	        localStorage.setItem("FEEDBACK_INFO",minfo)
	        snhOpenWebUrl("feedback.html?type="+type)
	     },
	    showPop:function(_str,id,_btnstr){//显示弹框
	    	this.tips = _str;
	    	this.showpop = id;
	    	this.btnstr = _btnstr;
	    },
	    closePop:function(){
	    	vm.showpop = 0;
	    }
	}

})
