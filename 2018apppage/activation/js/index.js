var time;//定时器
var bindPhone = "";//绑定的号码
//alert(window.web.didBindStarPhoneNum())
//判断是否有号码绑定了
if(window.web.didBindStarPhoneNum()==undefined || window.web.didBindStarPhoneNum()=="" || window.web.didBindStarPhoneNum()==null){//没有绑定
	$('.subbox').show();
	$('.box-success').hide();
}else{//已绑定
	bindPhone = JSON.parse(window.web.didBindStarPhoneNum()).mobile;
	$('.subbox').hide();
	$('.box-success').show();
	$('.sucediv .p1').html(bindPhone);
}

var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(16[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 

var flag = true;

//点击解绑使用其他号码绑定
$('.otherbtn').click(function(){

	//此处不解绑 在正式提交手机号时解绑
	//alert("bind::"+window.web.didBindStarPhoneNum())
	clearInterval(time);
	$('.subbox').show();
	$('.userphone,.token').val("");
	$(".tokenbtn").removeClass("token_value_enabled").html("发送验证码");
	$('.box-success').hide();
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
	// if(!phonereg.test($(".phonenum").val())){
	// 	INDEX.showTip("请输入正确的手机号码")
	// 	return false;
	// }
	if($(".userphone").val().length < 5 || $(".userphone").val().length > 20){
		showTip("请输入正确的手机号码")
		return false;
	}
	//请求接口
	if(flag==true){
		flag=false;
		main.getCode($(".userphone").val(),function(dt){
			flag=true;
			if(dt.status == 200){
				//加载成功 倒计时开始 60 秒
				$(".tokenbtn").addClass("token_value_enabled");
				var total = 60;
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
				showTip(dt.message);
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
		window.web.unbindStarPhone("");
		flag=false;
		main.activated($(".userphone").val(),$(".token").val(),function(dt){
			flag=true;
			if(dt.status == 200){//激活成功
				$('.subbox').hide();
				$('.box-success').show();
				$('.sucediv .p1').html(dt.content.mobile);
				bindPhone = dt.content.mobile;

				window.web.bindStarPhone(JSON.stringify(dt.content));
			}else{
				main.alert(dt.message);
			}
		})
	}
})



//提示语
function showTip(str){
	$(".notice").css('opacity','1');
	$(".notice").html(str);
}
