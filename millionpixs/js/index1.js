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
		main.getQrCode(function(dt){
			if(dt.status == 200){
				var arr = dt.content.split(",");
				code = arr[0];
				$(".qrcode").attr("src","https://source.48.cn" + arr[1]);
				INDEX.checkIsLogin();
			}else{
				if(dt.status == 40001){
					$(".tip").html("请重新生成二维码")
				}
			}
		})
	}

	//是否登录
	data.checkIsLogin = function(){
		//超过30秒没有登录 让用户刷新页面
		if(count > 30){
			return false;
		}

		main.checkIsLoginNew(code,function(dt){
			if(dt.status == 200){//登录成功
				localStorage.setItem("USER_millionpixs",JSON.stringify(dt.content));
				//localStorage.setItem("USER_UUID",uuid);
				localStorage.setItem("USER_millionpixs_TIME",new Date().getTime());//存储时间
				window.location.href = CONFIG.getWebUrl()+"edit.html";
			}else{
				if(dt.status == 40001){//二维码过期
					//$(".tip").html(dt.message+"，")
					$(".tip").html("二维码已过期，请刷新页面！")
				}else if(dt.status == 40002){
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