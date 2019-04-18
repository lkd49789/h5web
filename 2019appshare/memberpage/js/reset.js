(function(data) {
	var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
	var randomText;
	data.init = function(){
		INDEX.addListeners()
	}
	//添加事件
	data.addListeners = function(){
		//获取验证码 开始倒计时
		$(".count").click(function(){
			if($(".count").hasClass("token_value_enabled")){
				return false;
			}
			//手机号
			if($(".phonenum").val() == ''){
				INDEX.showTip("请输入手机号码")
				return false;
			}
			//手机号
			// if(!phonereg.test($(".phonenum").val())){
			// 	INDEX.showTip("请输入正确的手机号码")
			// 	return false;
			// }
			if($(".phonenum").val().length < 5 || $(".phonenum").val().length > 20){
				INDEX.showTip("请输入正确的手机号码")
				return false;
			}
			//请求接口
			main.getCode($(".region").attr("code"),$(".phonenum").val(),function(dt){
				if(dt.status == 200){
					//加载成功 倒计时开始 60 秒
					$(".count").addClass("token_value_enabled");
					var total = 60;
					$(".count").html(total+"秒")
					var time = setInterval(function(){
						total -= 1
						$(".count").html(total+"秒")
						if(total<0){
							$(".count").removeClass("token_value_enabled");
							$(".count").html("获取验证码")
							clearInterval(time)
						}
					},1000)
				}else{
					INDEX.showTip(dt.message);
				}
			})
			
		})
		//显示国家选择
		// $(".region").click(function(){
		// 	COUNTRY.show(function(code,name){
		// 		console.log(code+"--"+name)
		// 		$(".region").attr("area",code);
		// 		$(".region").html(name+"(+"+code+")");
		// 	})
		// })
		//手机号
		$(".phonenum").focus(function(){
			$(".phone_box").find("p").hide();
		})
		//下一步
		$(".nextbtn").click(function(){
			//手机号
			if($(".phonenum").val() == ''){
				INDEX.showTip("请输入11位手机号码")
				return false;
			}
			//手机号
			if(!phonereg.test($(".phonenum").val())){
				INDEX.showTip("请输入正确的手机号码")
				return false;
			}
			//验证码
			if($(".code").val() == ''){
				INDEX.showTip2("请输入验证码")
				return false;
			}
			//验证手机验证码
			main.checkCode($(".code").val(),$(".phonenum").val(),false,function(dt){
				if(dt.status == 200){
					$(".login_box").hide();//隐藏 验证验证码
					$(".password_box").show();

					randomText = dt.content.randomText;//后台返回随机字符 
				}else{
					INDEX.showTip2(dt.message)
				}
			})
		})
		//
		$(".password").focus(function(){
			$(".tip3").hide();
		})
		//设置密码
		$(".successbtn").click(function(){
			//密码
			if($(".password").val() == ''){
				INDEX.showTip3("请输入密码")
				return false;
			}
			if($(".password").val().length <6){
				INDEX.showTip3("密码太短!")
				return false;
			}
			//重置密码完成
			main.resetPassword($(".phonenum").val(),$(".password").val(),randomText,function(dt){
				if(dt.status == 200){
					if(GetQueryString('from') == 'usercenter'){//是否从用户个人中心来
						main.hrefTo("userCenter.html");
					}else{
						$(".success_box").show();
						$(".password_box").hide();
					}
					localStorage.setItem("POCKET48_USER_INFO",JSON.stringify(dt));
				}else{
					INDEX.showTip3(dt.message);
				}
			})
		})
		//注册成功 返回登录页面
		$(".btn-login").click(function(){
			main.hrefTo("login.html")
		})
	}
	//显示提示信息
	data.showTip = function(str){
		$(".phone_box").find("p").show().html(str);
	}
	//显示提示信息  --  下一步
	data.showTip2 = function(str){
		$(".code_box").find("p").show().html(str);
	}
	data.showTip3 = function(str){
		$(".tip3").show().html(str);
	}
	
}(window.INDEX = {}));

INDEX.init()