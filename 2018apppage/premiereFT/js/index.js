if(localStorage.getItem("phone")){
	$('.readright').show();
	$('.succ').hide();
	$('.readright .tp1').html(localStorage.getItem("phone")+" 手机号码已经预约");
}else{
	$('.remindbox,.succ').show();
}

var timerend = setInterval("exChangeEnd()",1000);//预约结束时间

var premierend = setInterval("endChangeTime()",1000);//公演结束时间

var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 

var flag = true;

$('.remindbox').click(function(){
	$('.mask_box,.phonebox').fadeIn();
})

$('.cancel').click(function(){
	$('.mask_box,.phonebox').fadeOut();
})


//获取验证码 开始倒计时
$(".count").click(function(){
	if($(".count").hasClass("token_value_enabled")){
		return false;
	}
	//手机号
	if($(".phonenum").val() == ''){
		showTip("请输入手机号码")
		return false;
	}
	//手机号
	// if(!phonereg.test($(".phonenum").val())){
	// 	INDEX.showTip("请输入正确的手机号码")
	// 	return false;
	// }
	if($(".phonenum").val().length < 5 || $(".phonenum").val().length > 20){
		showTip("请输入正确的手机号码")
		return false;
	}
	//请求接口
	if(flag==true){
		flag=false;
		main.getCode($(".phonenum").val(),function(dt){
			flag=true;
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
						$(".count").html("重发");
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
$(".phonenum").focus(function(){
	$(".help-block").hide();
})
$(".code").focus(function(){
	$(".help-block").hide();
})
//确认预约
$(".right").click(function(){
	$(".help-block").hide();
	//手机号
	if($(".phonenum").val() == ''){
		showTip("请输入11位手机号码")
		return false;
	}
	//手机号
	if(!phonereg.test($(".phonenum").val())){
		showTip("请输入正确的手机号码")
		return false;
	}
	//验证码
	if($(".code").val() == ''){
		showTip("请输入验证码")
		return false;
	}
//验证手机验证码
	if(flag==true){
		flag=false;
		main.subscribeInfo($(".phonenum").val(),$(".code").val(),function(dt){
			flag=true;
			if(dt.status == 200){
				$(".phonebox,.succ,.remindbox").hide();//隐藏 验证验证码
				$(".successbox,.readright").show();
				$('.tp1').html($(".phonenum").val()+" 手机号码已经预约");
				$('.tp2').html("23点公演结束可以参加该场MVP投票");
				localStorage.setItem("phone",$(".phonenum").val());
			}else{
				showTip(dt.message)
			}
		})
	}
})

//预约成功后关闭弹框
$('.succRight').click(function(){
	$('.succ').hide();
	$('.mask_box,.successbox').fadeOut();
})


//进入投票页



//提示语
function showTip(str){
	$(".help-block").show();
	$(".help-block").html(str);
}


//剩余多少时间停止预约
function exChangeEnd(){
	var EndTime= new Date('2018/03/23 19:30:00');
    var NowTime = new Date();
    var t =EndTime.getTime() - NowTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    if(t>=0){
      d=Math.floor(t/1000/60/60/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    }
  	$('.time').html(h+"时"+m+"分"+s+"秒");
	if(d==0&&h==0&&m==0&&s==0){
  		clearInterval(timerend);
  		$('.timebox,.remindbox').hide();
  		$('.timestarbox,.readright').show();
  		if(localStorage.getItem("phone")){

  		}else{
  			$('.readright .tp1').html("预约已经结束");
  		}
  		$('.timestarbox').click(function(){
  			if(checkFromApp()){
  				liveUrl("5aa8e5080cf2a0da4ea32716");
  			}else{
  				window.location.href="http://h5.snh48.com/snh48/live/";
  			}
  		})
  	}
}


//公演结束时间
function endChangeTime(){
	var EndTime= new Date('2018/03/23 23:00:01');
    var NowTime = new Date();
    var t =EndTime.getTime() - NowTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    if(t>=0){
      d=Math.floor(t/1000/60/60/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    }
	if(d==0&&h==0&&m==0&&s==0){
  		clearInterval(premierend);
  		$('.remindbox,.readright,.succ').hide();
  		$('.waitbox').show();
  		$('.waitbox').click(function(){
			main.hrefTo('https://h5.48.cn/2018apppage/premiereFT/vote.html');
		})
  	}
}

function liveUrl(num){
	window.web.gotoPage('publiclive/detail?id='+num);
}