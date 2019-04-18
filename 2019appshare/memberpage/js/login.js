(function(data) {
	var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
	data.init = function(){
		INDEX.addListeners()
	}
	//添加事件
	data.addListeners = function(){
		//登录提交
		$(".submit").click(function(){
			INDEX.logIn()
		})

		//去注册
		$(".btn-register").click(function(){
			main.hrefTo("register.html");
		})

		//重置密码
		$(".btn-reset").click(function(){
			main.hrefTo("reset.html");
		})
	}
	//登录验证
	data.logIn =function(){
		$(".phone_box,.password_box").find("p").hide();
		if($(".phonenum").val() == ""){
			INDEX.showTip("请输入手机号！")
			return false;
		}
		//手机号
		if($(".phonenum").val().length < 5 || $(".phonenum").val().length > 20){
			INDEX.showTip("请输入正确的手机号码")
			return false;
		}
		if($(".password").val() == ""){
			INDEX.showTip2("请输入密码！")
			return false;
		}
		INDEX.submitUser($(".phonenum").val(),$(".password").val());
	}
	//登录提交
	data.submitUser = function(uname,upass,token){
		main.logIn(uname,upass,function(dt){
			if(dt.status  == 200){
				localStorage.setItem("POCKET48_USER_INFO",JSON.stringify(dt));
				main.hrefTo("index.html?mid="+localStorage.getItem("CUR_MEMBER_ID"))
				//window.history.back();
			}else{
				INDEX.showTip2(dt.message);
			}
		})
	}
	//显示提示信息
	data.showTip = function(str){
		$(".phone_box").find("p").show().html(str);
	}
	//显示提示信息  --  下一步
	data.showTip2 = function(str){
		$(".password_box").find("p").show().html(str);
	}
}(window.INDEX = {}));

INDEX.addListeners()