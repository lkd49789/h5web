(function(data) {
	//设置用户信息
	var uData = {};

	data.setUserInfo = function(){
		var USER_INFO = JSON.parse(localStorage.getItem("INFO_2017MEET_SONG")) || {}; 
		if(USER_INFO.area){
			if(USER_INFO.area.length >1){
				$(".btn-choose-ct").attr("code",USER_INFO.area)
				$(".btn-choose-ct").html(COUNTRY.getCountry(USER_INFO.area))
			}
		}
		console.log("--"+USER_INFO.phone)
		$(".u-phone").val(USER_INFO.phone)
		$(".u-relname").val(USER_INFO.realname)
		$(".u-id").val(USER_INFO.identity)

		//临时用户可以提交信息，非临时用户不可修改信息
		if(USER_INFO.is_valid == 1){
			//$(".btn-submit").hide()
		}
	}
	//添加事件
    data.addListeners = function(){
    	
    	//国家选择
    	$(".btn-choose-ct").click(function(){
    		COUNTRY.show(function(code,name){
				console.log(code+"--"+name)
				
				$(".btn-choose-ct").attr("code",code)
				//$(".btn-choose-ct span").html(name+"("+code+")")
				$(".btn-choose-ct").html(name+'<i class="mui-icon mui-icon-arrowdown"></i>')
			})
    	})
    	//tip消失
    	$("input").focus(function(){
    		$(".tip").css("opacity",0)
    	})
    	//获取验证码
		$(".btn-code").click(function(){
			if($(".btn-code").hasClass("btn-code-time")){
				return false;
			}
			if($(".u-phone").val().length < 5){
				user.showTip("请输入正确的手机号码！")
				return false;
			}

			main.sendSMS($(".btn-choose-ct").attr("code"), $(".u-phone").val(),function(dt){
				if(dt.errcode == 0){
					user.setTimeInter()
				}else{
					main.alert(dt.errmsg)
				}
			})
			
		})

		//个人信息提交
		$(".btn-submit").click(function(){
			console.log("click")
			var u_area,u_phone,u_code,u_relname,u_id;
			u_area = $(".btn-choose-ct").attr("code")
			u_phone = $(".u-phone").val();
			u_code = $(".u-code").val();
			u_relname = $(".u-relname").val();
			u_id = $(".u-id").val();
			console.log(u_id)
			if(u_phone.length<5){
				user.showTip("请输入正确的手机号码！")
				return false;
			}
			if(u_code.length<1){
				user.showTip("请输入验证码！")
				return false;
			}
			if(u_relname.length<1){
				user.showTip("请输入姓名！")
				return false;
			}
			if(u_id.length<5){
				user.showTip("请输入正确的证件号码！")
				return false;
			}
			$('.btn-submit').attr({
				'value':'提交中...',
				'disabled':true
			})
			main.submitInfo(u_area,u_phone,u_code,u_relname,u_id,function(dt){
				$('.btn-submit').attr({
					'value':'确认',
					'disabled':false
				})
				if(dt.errcode == 0){
					
					// uData.area = u_area
					// uData.phone = u_phone
					// uData.realname = u_relname
					// uData.identity = u_id
					// uData.is_valid = 1

					// localStorage.setItem("INFO_2017MEET_SONG",JSON.stringify(uData));//缓存app用户信息
					main.logInApp(function(dt){

					})
					main.alert("用户资料提交成功！")
				}else{
					main.alert(dt.errmsg)
				}
			})
		})
		//设置用户信息
    	user.setUserInfo()
    }
    //获取验证码倒计时
    data.setTimeInter = function(){
    	$(".btn-code").addClass("btn-code-time");
		var total = 60;
		$(".btn-code").html("剩余"+total+"秒")
		var time = setInterval(function(){
			total -= 1;
			$(".btn-code").html("剩余"+total+"秒");
			if(total<0){
				$(".btn-code").removeClass("btn-code-time");
				$(".btn-code").html("获取验证码")
				clearInterval(time)
			}
		},1000)
    }
    //显示提示语
    data.showTip = function(_tip){
    	$(".tip").css("opacity",1).html(_tip)
    }

}(window.user = {}));


user.addListeners()