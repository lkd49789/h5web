
var nowTime = new Date().getTime();//当前时间戳
var listid ;//列表id
var mid;  //成员列表id
var flag = true;
var code;//验证码
var guessId;//竞猜期数id
if(GetQueryString('guessId')){
	guessId = GetQueryString('guessId');
}else{
	guessId=null;//竞猜期数id
}
var memberIds=[];//成员id数组
var merInfo ;//原始列表数据
var mymerInfo = [];//用户已提交后的列表数据
var mySelected;//用户猜的排名
var myguessInfo = [];//用户猜好的数据
var rankingAll;//最终排名
var rankingInfo = [];//最终排名数据内容
var myrinkId = [];

$(function(){
	/*console.log(nowTime);*/
	init();
})

function init(){

	getMerLists()
	addListeners();
}

function addListeners(){

	//点击选择一位成员
	$('.rankList .mername').click(function(){
		listid = parseInt($(this).attr("val"))-1;
		//console.log("listid---"+listid)

		$('.merMask').show();
		$('.sec1').hide();
	})



	//进入成员列表选择选择
	$('.memberList').on('click','.spanbtn',function(){
		mid = $(this).attr("mid")
		//console.log("mid----"+mid)
		if($(this).hasClass('choosebgyes')){//已选择

			return false;
		}
		//改变已选成员状态
		var prev_m_id1 = $('.rankList .mername').eq(listid).attr("mid")
		if(prev_m_id1 != null && prev_m_id1 != ""){
			$('.rankList .mername').eq(listid).html("")
			$(".spanbtn").eq(prev_m_id1).removeClass('choosebgyes').addClass('choosebgno').attr("listid","")
		}

		//判断当前列表是否已选成员
		var curchoose = $('.mername').eq(listid).attr("mid");
		if(curchoose != null && curchoose!= ""){//已选择成员
			$('.rankList .mername').eq(listid).attr("mid","")
			$('.rankList .mername').eq(listid).html("")
		}
		$(this).removeClass('choosebgno').addClass('choosebgyes');
		$(this).attr("listid",listid)
		$('.rankList .mername').eq(listid).attr("mid",mid)
		$('.rankList .mername').eq(listid).html($(this).parents('li').attr('name')+'<br/>'+$(this).parents('li').attr('team'));
		$('.rankList .mername').eq(listid).siblings().children('.avatar').css('background-image','url('+$(this).parents('li').attr('merhead')+')');
		$('.rankList .mername').eq(listid).attr('merkey',$(this).parents('li').attr('merkey'));
		$('.merMask').hide();
		$('.sec1').show();
		
	})

	//重新选择
	$('.againbtn').click(function(){
		$('.avatar').css('background-image','url(img/headeg.png)');
		$('.mername').html('选一位成员').removeAttr('mid');
		$('.mername').removeAttr('merkey');
		$('.spanbtn').removeClass('choosebgyes').addClass('choosebgno');
		$('.spanbtn').removeAttr();
	})

	//提交当期预测
	$('.curbtn').click(function(){
		
		$.each($('.rankList').find('li'),function(index,dt){
			if($(dt).find('.mername').html()=="选一位成员"){
                $('.mask_inbox,.mask2').show();
                return false;
            }else{
            	$('.mask_inbox,.mask1').show();
            }
		})
        
	})


	//关闭mask2
	$('.know').click(function(){
		$('.mask_inbox').hide();
		$(this).parent('.mask2').hide();
	})

	$('.btnsback').click(function(){
		$('.mask_inbox,.mask1').hide();
	})

	//完成
	$('.finish').click(function(){

		$('.mask_inbox').hide();
		$(this).parent('.mask4').hide();

		//console.log(merInfo);
		//console.log("mymerInfo---"+mymerInfo)
		$.each($(".rankList .mername"),function(index,dt){
			var merkey = $(dt).attr("merkey")
			mymerInfo.push(merInfo[merkey])
		})
		$('.sec1').hide();
		var j = 1
		var arr = [];
		$.each(mymerInfo,function(index,dl){
			//console.log(dl);
			arr.push('<li>');
			arr.push('<div class="rankLeft">');
			arr.push('<span class="rank">'+j+'</span>');
			arr.push('<span class="avatar" style="background-image:url('+main.formatAvata(dl.avatar)+')"></span>');
			arr.push('</div>');
			arr.push('<button class="mername">'+dl.memberName+'<br/>'+dl.teamName+'</button>');
			arr.push('</li>');
			j+=1
		})
		$('.rankList1').append(arr.join(""));
		$('.sec2').show();
		
	})
	
	//确认然后获取验证码
	$('.btnsright').click(function(){
		if(!flag){
			return false;
		}
		flag = false;
		main.getCode(function(dt){
			flag = true;
			if(dt.status == 200){
				$('.mask_inbox,.mask3').show();
				code = dt.content.code;
				$('.code').html(code);
			}else{
				main.alert(dt.message);
			}
		})
	})

	//提交
	$('.subbtn').click(function(){
		memberIds = [];
		$.each($('.rankList .mername'),function(index,dd){
			memberIds.push($(dd).attr('merkey'));
		})
		
		var _code = $('.codeinput').val();

		if($('.codeinput').val()==""){
			showTip("请输入验证码");
			return false;
		}

		if(_code.toLocaleLowerCase() != code.toLocaleLowerCase()){
			showTip("验证码有误，请重新输入");
			return false;
		}

		main.submitInfo(guessId,code,memberIds,function(dt){
			if(dt.status==200){//提交成功
				$('.mask_inbox,.mask3').hide();
				$('.mask_inbox,.mask4').show();
			}else{
				main.alert(dt.message);
			}
		})

	})


	//跳转往期
	$('.pastbtn').click(function(){
		main.hrefTo("periods.html");
	})

	//跳转规则
	$(".rulebtn").click(function(){
		main.hrefTo("rule.html");
	})

	//跳转获奖名单
	$('.winnerbtn').click(function(){
		main.hrefTo("awardList.html");
	})

}



//获取每期正在进行的成员列表
function getMerLists(){
	var i=0
	main.getMerLists(guessId,function(dt){
		//console.log(dt.content.ranking.length)
		guessId = dt.content.guessId;
		$('.tit,.tit2').html(dt.content.guessName);
		var html = [];
		if(dt.status==200){
			$.each(dt.content.members,function(index,dl){
				html.push('<li merkey='+index+' name='+dl.memberName+' team="'+dl.teamName+'" merhead='+main.formatAvata(dl.avatar)+'>');
				html.push('<span class="merhead '+division(dl.teamName)+'-bd" style="background-image:url('+main.formatAvata(dl.avatar)+')"></span>');
				html.push('<p class="mer_name">'+dl.memberName+'<em class="'+division(dl.teamName)+'-bg">'+division(dl.teamName)+'</em></p>');
				html.push('<p class="choosebtn "><span mid= "'+i+'" class="spanbtn choosebgno" val="">选她</span></p>');
				html.push('</li>')
				i+= 1
			})
			$('.memberList').append(html.join(""));
			merInfo = dt.content.members;//原始数据
			mySelected = dt.content.selected;//用户猜的排名顺序
			rankingAll = dt.content.ranking;//最终排名顺序

			if(dt.content.endTime<nowTime){//竞猜已结束
				if(dt.content.ranking.length==0 || dt.content.ranking==''){//未公布
					if(dt.content.selected.length==0 || dt.content.selected==''){//未参加竞猜
						$('.banner,.againbtn,.curbtn').hide();
						$('.bannerimg').attr("src","img/undeclared.png").show();
						$('.tit').html('你的预测');
						$('.sec1 .rankList').html('<img src="img/uncomm.png" class="uncomm" />');
						$('.sec1').show();

					}else{//已参加竞猜
						getGuessInfo("img/undeclared.png");
					}
				}else{//结果已公布
					if(dt.content.selected.length==0 || dt.content.selected==''){//未参加竞猜

						noAttendInfo();

					}else{//已参加竞猜
						if(dt.content.guessResult==true){//预测成功
							getGuessInfo("img/success.png");
						}else{//未成功
							getFailInfo();
						}
					}
					
				}
			}else{//未结束
				if(dt.content.selected.length==0 || dt.content.selected==''){//未参加竞猜
					$('.sec1').show();
				}else{//已参加竞猜
					getGuessInfo("img/undeclared.png");
				}
			}

		}else{
			main.alert(dt.message)
		}
	})
}


//获取用户猜好但结果还未公布
function getGuessInfo(print){//print="img/success.png"是预测成功  print="img/undeclared.png"是预测结果还未公布
	$('.sec1').hide();
	$('.sec2 .banner,.underbtns1').hide();
	$('.topimg').attr('src',print);
	$('.topimg').show();
	if(GetQueryString('guessId')){
		$('.sec2 .underbtns').hide();
	}else{
		$('.sec2 .underbtns').show();
	}
	$('.tit2').html('你的预测');
	$.each(mySelected,function(index,value){
		myguessInfo.push(merInfo[value]);
	})
	var arr = [];
	$.each(myguessInfo,function(index,dl){
		var index = index+1;
		arr.push('<li>');
		arr.push('<div class="rankLeft">');
		arr.push('<span class="rank">'+index+'</span>');
		arr.push('<span class="avatar" style="background-image:url('+main.formatAvata(dl.avatar)+')"></span>');
		arr.push('</div>');
		arr.push('<button class="mername">'+dl.memberName+'<br/>'+dl.teamName+'</button>');
		arr.push('</li>');
	})
	$('.rankList1').append(arr.join(""));
	$('.sec2').show();
}



//未参加公布结果
function noAttendInfo(){
	$('.sec1').hide();
	$('.sec2 .banner,.underbtns1').hide();
	if(GetQueryString('guessId')){
		$('.sec2 .underbtns').hide();
	}else{
		$('.sec2 .underbtns').show();
	}
	$('.tit2').html('本期排名');

	$.each(rankingAll,function(index,value){
		rankingInfo.push(merInfo[value]);
	})

	var arr = [];
	$.each(rankingInfo,function(index,dl){
		var index=index+1
		arr.push('<li>');
		arr.push('<div class="rankLeft">');
		arr.push('<span class="rank">'+index+'</span>');
		arr.push('<span class="avatar" style="background-image:url('+main.formatAvata(dl.avatar)+')"></span>');
		arr.push('</div>');
		arr.push('<button class="mername">'+dl.memberName+'<br/>'+dl.teamName+'</button>');
		arr.push('</li>');
		
	})
	$('.rankList1').append(arr.join(""));
	$('.sec2').show();
}

//结果公布未猜中
function getFailInfo(){
	$('.sec1').hide();
	$('.sec2 .banner,.underbtns1').hide();
	if(GetQueryString('guessId')){
		$('.sec2 .underbtns').hide();
	}else{
		$('.sec2 .underbtns').show();
	}
	$('.topimg').attr('src','img/fail.png').show();
	$('.tit2').html('你的预测');

	$.each(rankingAll,function(index,value){
		rankingInfo.push(merInfo[value]);
	})

	var arr = [];
	$.each(rankingInfo,function(index,dl){
		arr.push('<li>');
		arr.push('<div class="rankLeft">');
		arr.push('<span class="rank">'+findIndex(rankingAll[index])+'</span>');
		arr.push('<span class="avatar" style="background-image:url('+main.formatAvata(dl.avatar)+')"></span>');
		arr.push('</div>');
		arr.push('<button class="mername">'+dl.memberName+'<br/>'+dl.teamName+'</button>');
		arr.push('</li>');
		
	})
	$('.rankList1').append(arr.join(""));
	$('.sec2').show();
}
function findIndex(_index){//自己所选成员正确排名
	var _myindex = mySelected.indexOf(_index)+1;
	return _myindex
}

//分割队标
function division(_teamName){
	var	_teamName = _teamName.split(' ')[1];
	return _teamName;
}	

//提示语
function showTip(str){
	$(".tip").html(str);
	$(".tip").addClass('tipColor');
}

