var time;//定时器
var cardType = 0;       // 1 星沃卡 2 丝芭乐享卡 3 丝芭畅想卡

//获取绑定信息
var bindPhoneInfo = dsBridge.call("snhGetBindPhone");

if(bindPhoneInfo==undefined || bindPhoneInfo=="" || bindPhoneInfo==null){//没有绑定
	$('.subbox').show();
	$('.box-success').hide();
}else{//已绑定
	$('.subbox').hide();
	$('.box-success').show();
	$('.sucediv .p1').html(JSON.parse(bindPhoneInfo).phone);
	
}

var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(16[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
var flag = true;

//点击解绑使用其他号码绑定
$('.otherbtn').click(function(){
	var params = {
        phone : bindPhoneInfo.phone,
        type: bindPhoneInfo.type,
        isBind: false//解绑
    }
    dsBridge.call("snhOnActionStarPhone", params, function(v) {
    	$('.subbox').show();
		$('.userphone,.token').val("");
		$(".tokenbtn").removeClass("token_value_enabled").html("发送验证码");
		$('.box-success').hide();
    });
	clearInterval(time);
})

//获取验证码
$(".tokenbtn").click(function(){
	if($(".tokenbtn").hasClass("token_value_enabled")){
		return false;
	}
	//手机号
	if($(".userphone").val() == ''){
		showTip("请输入手机号码")
		return false;
	}
	//手机号
	if($(".userphone").val().length < 5 || $(".userphone").val().length > 20){
		showTip("请输入正确的手机号码")
		return false;
	}
	//请求接口
	if(flag==true){
		flag=false;
		dsBridge.call("snhStartLoading")
		main.getPhoneType($(".userphone").val(),function(dt){
			//alert("getPhoneType>>"+JSON.stringify(dt))
			flag=true;
			dsBridge.call("snhStopLoading")
			if(dt.status == 200){
				//加载成功 倒计时开始 60 秒
				$(".tokenbtn").addClass("token_value_enabled");
				var total = 60;
				cardType = dt.content.cardType;
				$(".tokenbtn").html(total+"秒")
				time = setInterval(function(){
					total -= 1
					$(".tokenbtn").html(total+"秒")
					if(total<0){
						$(".tokenbtn").removeClass("token_value_enabled");
						$(".tokenbtn").html("重发");
						clearInterval(time)
					}
				},1000)
				$(".code").val("")
			}else{
				dsBridge.call("snhErrorLoading",dt.message)
				//showTip(dt.message);
			}
		})
	}
})


//手机号
$(".userphone").focus(function(){
	$(".notice").css('opacity','0');
})
//验证码
$(".token").focus(function(){
	$(".notice").css('opacity','0');
})



//激活
$(".activatedbtn").click(function(){
	$(".notice").css('opacity','0');
	//测试
	/*
	$('.subbox').hide();
				$('.box-success').show();
				$('.sucediv .p1').html("13262876819");
				
				var params = {
			        phone : '13262876819',
			        type: '1',
			        isBind: true//绑定
			    }
			    dsBridge.call("snhOnActionPhone", params, function(v) {
                 	bindPhoneInfo = dsBridge.call("snhGetBindPhone");
	                if(bindPhone==undefined || bindPhone=="" || bindPhone==null){//没有绑定
						$('.subbox').show();
						$('.box-success').hide();
					}else{//已绑定
						$('.subbox').hide();
						$('.box-success').show();
						$('.sucediv .p1').html(bindPhone);
					}
                });*/
	//手机号
	if($(".userphone").val() == ''){
		showTip("请输入11位手机号码")
		return false;
	}
	//手机号
	if(!phonereg.test($(".userphone").val())){
		showTip("请输入正确的手机号码")
		return false;
	}
	//验证码
	if($(".token").val() == ''){
		showTip("请输入验证码")
		return false;
	}
	
	if(flag==true){
		flag=false;
		dsBridge.call("snhStartLoading")
		main.doBind($(".userphone").val(),$(".token").val(),cardType,function(dt){
			//alert("activated>>"+dt)
			flag=true;
			dsBridge.call("snhStopLoading")
			if(dt.status == 200){//激活成功
				$('.subbox').hide();
				$('.box-success').show();
				$('.sucediv .p1').html(dt.content.mobile);
				
				var params = {
			        phone : dt.content.mobile,
			        type: cardType,
			        isBind: true//绑定
			    }
			    dsBridge.call("snhOnActionStarPhone", params, function(v) {
                 	bindPhoneInfo = dsBridge.call("snhGetBindPhone");
	                if(bindPhone==undefined || bindPhone=="" || bindPhone==null){//没有绑定
						$('.subbox').show();
						$('.box-success').hide();
					}else{//已绑定
						$('.subbox').hide();
						$('.box-success').show();
						$('.sucediv .p1').html(bindPhone);
					}
                });
			}else{
				dsBridge.call("snhErrorLoading",dt.message)
				//showTip(dt.message);
			}
		})
	}
})



//提示语
function showTip(str){
	$(".notice").css('opacity','1');
	$(".notice").html(str);
}
