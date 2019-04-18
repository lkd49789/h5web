(function(data) {
	var timer;
	var count = 0;//调用几次
	var uuid = "";

	//初始化
	data.init = function(){
		$(".btn-intro").click(function(){
			$(".pop-box").show()
		})
		$(".btn-close").click(function(){
			$(".pop-box").hide()
		})
		main.getUUid(function(dt){//获取uuid
			//$(".qrcode").attr("src",)
			if(dt.status == 200){
				uuid = dt.content.uuid;
				//设置二维码
				$(".qrcode").attr("src",CONFIG.getLoginLink()+"api/v1/qrcode/uuid/img?uuid="+uuid);
				//轮询是否已经登录成功
				INDEX.checkIsLogin();
			}else{
				//main.alert(dt.message)
			}
		})

	}

	//是否登录
	data.checkIsLogin = function(){
		//超过30秒没有登录 让用户刷新页面
		if(count > 30){
			return false;
		}
		main.checkIsLogin(uuid,function(dt){
			if(dt.status == 200){//登录成功
				localStorage.setItem("USER_millionpixs",JSON.stringify(dt.content));
				localStorage.setItem("USER_UUID",uuid);
				localStorage.setItem("USER_millionpixs_TIME",new Date().getTime());//存储时间
				window.location.href = CONFIG.getWebUrl()+"edit.html";
			}else{
				if(dt.status == 4001){//二维码过期
					//$(".tip").html(dt.message+"，")
					$(".tip").html("二维码已过期，请刷新页面！")
				}else if(dt.status == 4002){
					setTimeout(function(){
						INDEX.checkIsLogin();
					},4000)
					count += 1;
				}else{
					$(".tip").html(dt.message)
				}
				
			}
		})
	}
}(window.INDEX = {}));


INDEX.init()