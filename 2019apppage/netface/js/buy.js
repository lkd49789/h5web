var vm = new Vue({
	el:'.wrapper',
	data:{
		showpop:0, //0 关闭  1.购买方式 2提示语弹框
		totalPrice:0,   //总价
		total:'',    //个数
		tips:'',
		btnstr:"知道了" //浮层按钮文字
	},
	filters:{
		time:function(_time){
			return ''
		}
	},
	computed:{
		getTotal:function(){
			return {totalPrice:this.total*78,totalVote:this.total*30};
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
	    buy: function (_type) {
	      if(_type == 'ali'){
	      	snhAliWebPay()
	      }else if('wechat'){
	      	snhWeChatWebPay()
	      }
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


function snhAliWebPay() {
	alert("snhAliWebPay")
    var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
    $.ajax({
            //url:"https://www.pocket48.com/pay/api/v1/ali/order/create",
            url:"https://pocketapi.48.cn/pay/api/v1/ali/order/create",
            type: "POST", 
            dataType: "json",
            contentType: 'application/json',
            beforeSend: function (request) {
                 request.setRequestHeader("token", u_info.token);
            },
            data:JSON.stringify({
              "appType": "POCKET48",
              "customPrice": 0,
              "isCustom": false,
              "productId": 1
            }),
            success: function (data) { 
            	alert("snhAliWebPay"+data.status)
                if(data.status == 200){
                    alert("请求成功")
                    var dt = data.content
                        dsBridge.call("snhAliWebPay",dt, function(block){
                        alert(block);
                  });
                }
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
             //alert("eee");
            } 
        });
}

function snhWeChatWebPay() {
    var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
    $.ajax({
            url:"https://pocketapi.48.cn/pay/api/v1/wx/order/create",
            type: "POST", 
            dataType: "json",
            contentType: 'application/json',
            beforeSend: function (request) {
                 request.setRequestHeader("token", u_info.token);
            },
            data:JSON.stringify({
              "appType": "POCKET48",
              "customPrice": 0,
              "isCustom": false,
              "productId": 1
            }),
            success: function (data) { 
                if(data.status == 200){
                    alert("请求成功")
                    var dt = data.content
                        dsBridge.call("snhWeChatWebPay",dt, function(block){
                        alert(block);
                  });
                }
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
             //alert("eee");
            } 
        });
}