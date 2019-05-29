var assisNum = "";
/*var timerend = setInterval("exChangeEnd()",1000);*/

$(function(){
	init();
})

function init(){
	getinit();
	addListeners();
}

function addListeners(){

	//关闭弹窗
	$('.knowbtn').click(function(){
		$('.mask').hide();
		$(this).parent().hide();
	})

	//跳转top66成员名单
	$('.namelist').click(function(){
		main.hrefTo('signlist.html');
	})

	//非top66成员报名助力帮
	$('.helplist').click(function(){
		main.hrefTo('list.html');
	})
	

	//跳转规则
	$('.rule').click(function(){
		main.hrefTo('rule.html');
	})

	//领取助力权
	$('.receive').click(function(){
		getReceive();
	})
	
}

//领取助力权
function getReceive(){
	main.getReceive(function(dt){
		if(dt.status==200){
			if(dt.content.cardType==1 || dt.content.cardType=="1"){//丝芭卡
				$('.mask,.mask_have1').show();
			}else if(dt.content.cardType==2 || dt.content.cardType=="2"){//星沃卡
				$('.mask,.mask_have2').show();
			}else{
				main.alert("您不是丝芭星沃卡用户哦~");
			}
		}else{
			main.alert(dt.message);
		}
	})
}

function getinit(){
	main.getinit(function(dt){
		if(dt.status==200){
			assisNum = dt.content.assisNum;
		}else{
			main.alert(dt.message);
		}
	})
}


function exChangeEnd(){
	var EndTime= new Date('2018/05/01 10:00:00');
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
 		$('.helplist').removeClass('timeActive');
  		clearInterval(timerend);
  		if($('.helplist').hasClass('timeActive')){

		}else{
			$('.helplist').click(function(){
				main.hrefTo('list.html');
			})
		}
  	}
}