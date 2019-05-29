
var flag=true;
var _fromType,_voteType,_groupId,_voteNum;//领取的投票类型//投票使用的类型//属于哪个队伍//输入的票数
$("body").hide();
function showresult(){
	receiveRight();
}


$(function(){
	if(checkFromApp()){
		$("body").show();
		init();
	}else{
		main.hrefTo('code.html');
	}
	
})


function init(){

	getFreeVote();

	addListeners()

}


//获取用户免费票信息
function getFreeVote(){
	main.getFreeVote(function(dt){
		//console.log(dt)
		if(dt.status==200){
			if(dt.content.defaultFree==false){//口袋用户
				$('.icon_0').attr('src','img/icon_0_y.png');//已领取
			}else{
				$('.icon_0').attr('src','img/icon_0.png');//未领取
			}
			if(dt.content.swcCard == true){//是丝芭卡
				if(dt.content.swcFree==false){//丝芭用户
					$('.icon_1').attr('src','img/icon_1_y.png');
				}else{
					$('.icon_1').attr('src','img/icon_1.png');
				}
			}else{//不是丝芭卡
				$('.icon_1').attr('src','img/icon_1_no.png');
			}
			if(dt.content.scanFree==false){//扫码用户
				$('.icon_2').attr('src','img/icon_2_y.png');
			}else{
				$('.icon_2').attr('src','img/icon_2.png');

				//直接领取
				if(window.location.href.indexOf("from=code") >= 0){
					_fromType = "2";//无需扫描 直接领取
					receiveRight()
				}
				
			}
			$('.votenumbox b').html(dt.content.ticketNum);
		}else{
			main.alert(dt.message);
		}
	})
}

//领取投票权
function receiveRight(){
	if(flag==true){
		flag=false;
		main.receiveRight(_fromType,function(dt){
			flag=true;
			if(dt.status==200){
				$('.icon_'+_fromType).attr('src','img/icon_'+_fromType+'_y.png');
				//getFreeVote()
				var total = parseInt($('.votenumbox b').html())+1
				$('.votenumbox b').html(total);
			}else{
				main.alert(dt.message);
			}
		})
	}
}

//余额信息
function getBalance(){
	main.getBalance(function(dt){
		if(dt.status==200){
			$('.money em').html(dt.content.money);//鸡腿
			$('.integral em').html(dt.content.integral);//积分
			$('.free em').html(dt.content.free);//免费
			$('.votenumbox b').html(dt.content.free);
		}else{
			main.alert(dt.message);
		}
	})
}

//投票
function voteIng(){
	/*console.log(_voteType);
	console.log(_groupId);
	console.log(_voteNum);*/
	if(flag==true){
		flag=false;
		main.voteIng(_voteType,_groupId,_voteNum,function(dt){
			flag=true;
			if(dt.status==200){
				$('.mask,.mask2').show();
			}else{
				main.alert(dt.message)
			}
		})
	}
}


function addListeners(){

	//跳转规则页
	$('.lookrule').click(function(){
		main.hrefTo("rule.html");
	});

	//跳转视频列表页
	$('.vidbox').click(function(){
		main.hrefTo("vidlist.html");
	})

	//点击领取投票权
	$('.recbtns img').click(function(){
		_fromType = $(this).attr('val');
		var _src = $(this).attr("src");
		if(_src.indexOf("_y") >= 0 || _src.indexOf("_no") >= 0){
			return false;
		}
		if(flag==true){
			if(_fromType==2 || _fromType=="2"){
				window.web.scanCode();
			}else{
				receiveRight();
			}
		}
		
	})

	//点击进入投票页面
	$('.votebtnbox button').click(function(){
		_groupId = $(this).attr('groupId');
		$('.page1').css({'opacity':0,'z-index':-1,'overflow':'hidden'});
		$('.page2').show();
		$('.porttit').attr('src','img/port_'+_groupId+'.png');
		getBalance();
	})

	//选择投票的类型
	$('.ty-tabs li').click(function(){
		_voteType = $(this).attr('val');
		if(_voteType==1 || _voteType=="1"){
			$('.neednum').css('opacity','1');
			$('.neednum span').html("积分");
		}else if(_voteType==2 || _voteType=="2"){
			$('.neednum').css('opacity','1');
			$('.neednum span').html("鸡腿");
		}else{
			$('.neednum').css('opacity','0');
		}
		$(this).addClass('tyActive');
		$(this).siblings().removeClass('tyActive');
		$('.confirm').addClass('confActive');
		$('.page2 .votenumbox').show();
	})

	//输入要投的票数
	$('.votenum').bind('input propertychange', function() {
		$('.neednum em').html(parseInt($('.votenum').val()*30));
	});

	//确认投票
	$('.confirm').click(function(){
		if($(this).hasClass('confActive')){
			_voteNum = $('.votenum').val();
			if(_voteNum ==""){
				main.alert("票数不能为空哦~");
				return false;
			}
			if(parseInt(_voteNum)<=0){
				main.alert("票数不能少于1票哦~");
				return false;
			}
			if(isInteger(_voteNum)==false){
				main.alert("请输入有效数字哦~");
				return false;
			}
			if(_voteType==1 || _voteType=="1"){
				if(parseInt($('.integral em').html()-$('.neednum em').html())<0){
					main.alert("积分不足");
					return false;
				}
			}
			if(_voteType==2 || _voteType=="2"){
				if(parseInt($('.money em').html()-$('.neednum em').html())<0){
					main.alert("鸡腿不足");
					return false;
				}
			}
			if(_voteType==0 || _voteType=="0"){
				if(parseInt($('.free em').html()-_voteNum)<0){
					main.alert("没有足够的免费票");
					return false;
				}
			}
			voteIng();
		}else{}
	})

	//返回首页
	$('.comeback').click(function(){
		backinit()
	})


	//关闭投票成功弹窗
	//返回
	$('.btnsback').click(function(){
		backinit();
		getBalance();
	});
	//继续应援
	$('.btnsagain').click(function(){
		$('.mask,.mask2').hide();
		$('.votenum').val("");
		$('.neednum em').html("0");
		getBalance();
	});

	//关闭单行弹出框
	$('.backbtn').click(function(){
		$('.mask,.mask1').hide();
	})
}


//返回初始
function backinit(){
	$(".mask").hide();
	$('.page2').hide();
	$('.page1').css({'opacity':1,'z-index':0,'overflow':'auto'});
	$('.votenum').val("");
	$('.neednum em').html(0);
	$('.ty-tabs li').removeClass('tyActive');
	$('.confirm').removeClass('confActive');
}


//判断是否为整数
function isInteger(obj) {
	return obj%1 === 0
}


//单行弹窗
function infomask(str){
	$('.mask,.mask1').show();
	$('.upbox p').html(str);
}




