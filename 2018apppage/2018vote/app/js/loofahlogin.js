var isbind = false;

/*var user_info = main.getUserInfo(function(data){
    //main.alert("获取用户信息>"+data.errcode)
    if(data.status==401){//登录已失效，请重新登录
        //main.alert("data.errcode>"+data.errcode)
        main.logInApp(function(dt){
            //main.alert("logInApp>"+dt.errcode)
            userInfo.setUserInfo(dt)
            userInfo.setLocalUserInfo()
            $(".bind-wrapper").show()
            $(".bind-info").hide()
        })
    }else if(data.status == 200){

        if(data.webid == "0"){//还未绑定
        	
        	main.bindPocket(function(dt){//判断口袋是否已经绑定丝瓜账号
	    		if(data.errcode == "0"){
	    			if(dt.result == "0"){//口袋未绑定
	    				$(".bind-wrapper").show()
	    			}else{//口袋已绑定
	    				$(".bind-wrapper").show()
	    				$(".u-name").val(dt.web_name)
	    			}
	    		}else{
	    			main.alert(dt.errmsg)
	    		}
	    	})

        }else{//总选已绑定丝瓜账号 不可解绑或更改
        	
        	$(".bind-wrapper").hide()
        	if(data.web_name == ""){
        		$(".bind-info").html("您已绑定丝瓜账号，投票期间绑定成功后不能解绑或者更换！")
        	}else{
        		$(".bind-info").html("您已绑定丝瓜账号："+data.web_name+"，投票期间绑定成功后不能解绑或者更换！")
        	}
        }
    }else{
        main.alert(data.message)
    }
    
    localStorage.setItem("WX_USER_INFO",JSON.stringify(main.getAppUserInfo()));//缓存app用户信息
    
})*/


main.ifPocket(token,function(dt){
	if(dt.status==200){
		if(dt.content.bind==true){//已绑定
			$(".bind-wrapper").hide()
        	if(dt.content.nickName == ""){
        		$(".bind-info").html("您已绑定丝瓜账号，投票期间绑定成功后不能解绑或者更换！")
        	}else{
        		$(".bind-info").html("您已绑定丝瓜账号："+dt.content.nickName+"，投票期间绑定成功后不能解绑或者更换！");
        	}
		}else{//还未绑定
			$(".bind-wrapper").show();

		}
	}else{
		main.alert(dt.message);
	}
})




var sgInfor = new Vue({
	      	el: '#sgInfor',
	      	data: {
	      		user_name:'',
	         	password:''
	      	},
	      	methods: {
	       		submitTodo:function(){
	       			//console.log(sgInfor.user_name)
	       			if($(".u-name").val() == ""){
	       				main.alert("请输入用户名")
	       				return false;
	       			}
	       			if($("#psd").val() == ""){
	       				main.alert("请输入密码")
	       				return false;
	       			}

	       			//if(sgInfor.user_name && sgInfor.password){
	       				//alert("提交丝瓜账户信息")
	       				
	       				
	       				$("#bind").attr("disabled",true)
	       				main.bindWeb(token,$(".u-name").val(),$("#psd").val(),function(data){
	       					$("#bind").attr("disabled",false)
		       				 if(data.status == 200){
		       				 	main.alert("绑定成功")
		       				 	//清空输入数据
		       				 	//sgInfor.user_name = "";
		       				 	//sgInfor.password = "";
		       				 	

		       				 	$(".bind-wrapper").hide()
		       				 	$(".bind-info").show().html("您已绑定丝瓜账号："+$(".u-name").val()+"，投票期间绑定成功后不能解绑或者更换！")

		       				 	userInfo.getUserInfo(function(){})  //刷新用户信息数据

		       				 }else{
		       				 	main.alert(data.message)
		       				 }
		       				
		       			});
	       			// }else{

	       			// }
	       			
	       		}
	      	}
	    });


