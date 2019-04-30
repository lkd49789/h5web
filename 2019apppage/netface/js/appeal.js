var vm = new Vue({
	el:'.wrapper',
	data:{
		showpop:0, //0 关闭  1.购买方式 2提示语弹框
		words:''
	},
	mounted: function () {
    console.log("mounted")
    
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
     //跳转申诉页
     gotoPage:function(type){
        var url = _url
        if(url.indexOf("http://")>=0 ||url.indexOf("https://")>=0){
        }else{
            url = CONFIG.geturl()+url
        }
        snhOpenWebUrl("feedback.html?type="+type)
     },
	    showPop:function(_str,id,_btnstr){//弹框
	    	this.tips = _str;
	    	this.showpop = id;
	    	this.btnstr = _btnstr;
	    },
	    closePop:function(){
	    	vm.showpop = 0;
	    }
	}

})
