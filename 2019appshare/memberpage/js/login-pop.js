(function(data) {
	var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
	var curpage = "";//homepage(主页)   jujuChat(聚聚房间)    dynamic(个人动态)
	var loginpop = '<div class="login-pop-msk"></div>'+
'	<div class="login-pop">'+
'		<img class="btn-close-pop" src="img/btn-close-2.png">'+
'		<div class="phone_box">'+
'			<input type="tel" name="phonenum" value="" placeholder="注册或绑定的手机号" class="phonenum">'+
'		</div>'+
'		<div class="password_box">'+
'			<input type="password" name="password" value="" placeholder="密码" class="password">'+
'		</div>'+
'		<p class="tip-pop">请输入正确的密码</p>'+
'		<p class="btn-login-pop">登录</p>'+
'		<div class="help_link">'+
'			<a class="btn-register">还没有账号？</a>'+
'			<a class="btn-reset">忘记密码？</a>'+
'		</div>'+
'	</div>'
	
	data.init = function(){
		
	}
	//显示登录浮层
	data.show = function(_page){
		curpage = _page;

		$("body").append(loginpop);
		LOGINPOP.addListeners()
	}
	//删除登录浮层
	data.remove = function(){
		$(".login-pop-msk,.login-pop").remove();
	}
	//添加事件
	data.addListeners = function(){
		//登录提交
		$(".btn-login-pop").click(function(){
			LOGINPOP.logIn()
		})

		//去注册
		$(".btn-register").click(function(){
			main.hrefTo("register.html");
		})

		//重置密码
		$(".btn-reset").click(function(){
			main.hrefTo("reset.html");
		})

		//关闭登录框
		$(".btn-close-pop").click(function(){
			LOGINPOP.remove();
		})
	}
	//登录验证
	data.logIn =function(){
		$(".phone_box,.password_box").find("p").hide();
		if($(".phonenum").val() == ""){
			LOGINPOP.showTip("请输入手机号！")
			return false;
		}
		//手机号
		if($(".phonenum").val().length < 5 || $(".phonenum").val().length > 20){
			LOGINPOP.showTip("请输入正确的手机号码")
			return false;
		}
		if($(".password").val() == ""){
			LOGINPOP.showTip("请输入密码！")
			return false;
		}
		LOGINPOP.submitUser($(".phonenum").val(),$(".password").val());
	}
	//登录提交
	data.submitUser = function(uname,upass,token){
		main.logIn(uname,upass,function(dt){
			if(dt.status  == 200){
				localStorage.setItem("POCKET48_USER_INFO",JSON.stringify(dt));
				//main.hrefTo("LOGINPOP.html?mid="+localStorage.getItem("CUR_MEMBER_ID"))
				//window.history.back();
				LOGINPOP.remove();
				LOGINPOP.refreshLogin()
			}else{
				LOGINPOP.showTip(dt.message);
			}
		})
	}
	//显示提示信息
	data.showTip = function(str){
		$(".tip-pop").css("opacity",1).html(str);
	}

	//登录后刷新主页状态
	data.refreshLogin = function(){
		$(".signbtn").hide();
		if(curpage == "homepage"){
			$(".user_avatar").fadeIn();
			$(".user_avatar").css({"background":"url("+CONFIG.getSource()+main.getLoginUserInfo().avatar+") no-repeat","background-position-x":"50%","background-size":"100%"})
		}else if(curpage == "jujuChat"){//登录成功后  进入聚聚房间
			main.hrefTo("jujuChat.html");
		}
		
	}
	
}(window.LOGINPOP = {}));

// LOGINPOP.addListeners()