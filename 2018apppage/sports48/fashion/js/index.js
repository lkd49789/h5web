
var flag=true;
var getMembersList = main.getJson('members.json',function(data){//读取json写入缓存
	
	localStorage.setItem("members",JSON.stringify(data))	

})

var memberHtml = '<section class="memberList addsec">'
					+'<div class="dark-shadow"></div>'
					+'<div class="memSelBox">'
						+'<div class="close">'
							+'<p class="choose"></p>'
							+'<span class="closePop"></span>'
						+'</div>'
						+'<div class="clear"></div>'
						+'<div class="mem_con" id="option_list"></div>'
						+'<div class="mem_cbtn">确定</div>'
					+'</div>'
				+'</section>';


$('.mask_inbox').after(memberHtml);//加载成员列表dom

init();

function init(){
	
	ifvote();//检查用户是否已投票并获取账户信息

	addListeners();//事件

}


//生成成员列表
function createMemberList(){
	var html = "";
	var htmlteam = "";
	$(".mem_con,.mem_cbtn").show();
	// 取得全部成员
	var members = JSON.parse(localStorage.getItem("members")); 
	
	$.each(members,function(i,teams) {
		//console.log(teams.members);
		html += "<div class='team "+teams.teamName+"_color'>" +teams.teamName + "</div>";
		$.each(teams.members,function(j,member){
			//console.log(member);
			html += "<div class='mem_ciSingle'>" + member.real_name + "<input type='hidden' m_id='"+member.member_id+"' m_name='"+member.real_name+"' m_team='"+teams.teamName+"' m_bg='"+member.avatar+"'/></div>";
		})
	})
	$("#option_list").html(html);
}



//检查用户是否已投票
function ifvote(){
	main.ifvote(function(dt){
		if(dt.status==200){
			console.log(dt.content);
			if(dt.content.hasVoted==false){//未投票
				$('.btnsbox div').removeClass('nohave');
				getBalance_no();
			}else if(dt.content.hasVoted==true){//已投票
				$('.btnsbox div').addClass('nohave');
				$('.loaded').show().html("您已经为成员"+dt.content.winerName+"投过票~");
				$('.title,.namebox em').hide();
				$('.namebox').show();
				$('.avatar').css('background-image','url('+dt.content.winerAvatar+')');
				$('.namebox span').html(dt.content.winerName);
				getBalance_yes();
			}else{}
		}else{
			main.alert(dt.message)
		}

		
	})
}

//获取用户账户信息
function getBalance_yes(){//已投票检测账户信息
	main.getBalance(function(dt){
		if(dt.status==200){
			$('.mymoney').html(dt.content.money);
			$('.myintegral').html(dt.content.integral);
			$('.myassets').attr({'jifen':dt.content.integral,'jitui':dt.content.money});
			
		}else{
			main.alert(dt.message);
		}
	})
}

function getBalance_no(){//未投票检测账户信息
	main.getBalance(function(dt){
		if(dt.status==200){
			if(dt.content.money<50){//鸡腿少于50个
				$('.chickenbox').addClass('nohave');
				$('.goload').show().html("鸡腿不足，去充值");
			}else if(dt.content.integral<50){//积分少于50分
				$('.integralbtn').addClass('nohave');
				$('.goload').show().html("积分不足");
			}
			$('.mymoney').html(dt.content.money);
			$('.myintegral').html(dt.content.integral);
			$('.myassets').attr({'jifen':dt.content.integral,'jitui':dt.content.money});
		}else{
			main.alert(dt.message);
		}
	})
}

function addListeners(){//事件

	//点击使用鸡腿还是积分投票
	$('.btnsbox div').click(function(){
		if($(this).hasClass('nohave')==false){
			if($('.namebox span').html()==""){
				$('.mask_inbox,.prompt').show();
			}else{
				$('.btnsbox').attr('iftype',$(this).attr('box'));
				$('.btnsbox,.loaded,.goload').hide();
				$('.votebox').show();
				if($(this).attr('box')=="0"){
					$('.myassets').html("我的积分：<em>"+$('.myassets').attr('jifen')+"</em>");
					$('.iftype').html("积分");
				}else if($(this).attr('box')=="1"){
					$('.myassets').html("我的鸡腿：<em>"+$('.myassets').attr('jitui')+"</em>");
					$('.iftype').html("鸡腿");
				}else{}
			}
		}
	})



	//关闭弹框去选择成员
	$('.prompt .know').click(function(){
		$('.mask_inbox,.prompt').hide();
	})

	//关闭鸡腿或积分不足弹框
	$('.chickbox .know').click(function(){
		$('.mask_inbox,.chickbox').hide();
	})

	//选中成员
	$(".memberList").on("click",".mem_ciSingle",function(){
		$(this).addClass("mem_ciSingleSel");
		$(this).siblings('.mem_ciSingle').removeClass("mem_ciSingleSel");
		$(this).parents('.memberList').attr({'m_id':$(this).find('input').attr('m_id'),'m_name':$(this).find('input').attr('m_name'),'m_team':$(this).find('input').attr('m_team'),'m_bg':$(this).find('input').attr('m_bg')});
	});

	//关闭成员列表弹窗
	$('.close').on('click','.closePop',function(){
		$(this).parents('.addsec').hide();	
		$(".choose").html("");
	})

	//选择成员
	$('.avatar').click(function(){
		$('.addsec').show();
		//生成成员列表
		createMemberList();
	})

	//关闭是否确认投票框
	$('.mask .btnsback').click(function(){
		$('.mask_inbox,.mask').hide();
	})

	//关闭投票成功弹窗
	$('.successbox .know').click(function(){
		$('.mask_inbox,.successbox,.votebox').hide();
		$('.btnsbox').show();
		$('.btnsbox div').addClass('nohave');
		$('.loaded').show().html("您已经为成员投过票~");
		main.hrefTo("https://h5.48.cn/2018apppage/sports48/fashion/field.html");
	})


	//确定你选择的成员
	$('.mem_cbtn').click(function(){
		var bg = $(".addsec").attr('m_bg');
		$('.addsec,.title').hide();
		$('.namebox').show();
		$('.namebox span').html($('.addsec').attr('m_name'));
		$('.namebox em').removeClass().addClass($('.addsec').attr('m_team')+'_bg');
		$('.namebox em').html($('.addsec').attr('m_team'));
		$('.avatar').css('background-image','url('+bg+')');
	})


	//输入要投的票数
	$('#input').bind('input propertychange', function() {
		//console.log(parseInt($('.myassets em').html()-$('#input').val()*50))
		$('.totalnum').html(parseInt($('#input').val()*50));
	});


	//点击确认投票按钮
	$('.vote_confirm').click(function(){
		var iftype = $('.btnsbox').attr('iftype');
		if($('#input').val()==""){
			main.alert("票数不能为空哦~");
			return false;
		}else if(parseInt($('#input').val())<=0){
			main.alert("票数不能少于1票哦~");
			return false;
		}else if(isInteger($('#input').val())==false){
			main.alert("请输入整数哦~");
			return false;
		}else if(parseInt($('.totalnum').html())<0){
			$('.mask_inbox,.chickbox').show();
			if(iftype=="0"){
				$('.chickbox p').html("积分不足");
			}else if(iftype=="1"){
				$('.chickbox p').html("鸡腿不足");
			}else{}
			return false;
		}else{
			$('.mask_inbox,.mask').show();
			$('.mask h4').html('是否使用'+$('.totalnum').html()+$('.iftype').html());
			$('.mask p').html('为'+$('.namebox span').html()+'投票？');
		}
	})


	//点击确认是否为某某某投票
	$('.mask .btnsright').click(function(){
		var memberId = $('.addsec').attr('m_id');//被投票成员ID
		var voteNum = $('#input').val();//投票数
		var buyType = $('.btnsbox').attr('iftype');//是积分还是鸡腿投票
		var memberName = $('.addsec').attr('m_name');//被投票成员姓名
		var memberAvatar = $('.addsec').attr('m_bg');//被投票成员头像
		if(flag==true){
			flag=false;
			main.sureVoting(memberId,voteNum,buyType,memberName,memberAvatar,function(dt){
				flag=true;
				if(dt.status==200){
					$('.mask_inbox,.successbox').show();
					$(".mymoney").html(parseInt($(".mymoney").html()) - 50);//
				}else{
					main.alert(dt.message);
				}
			})
		}
	})
}

//判断是否为整数
function isInteger(obj) {
	return obj%1 === 0
}





