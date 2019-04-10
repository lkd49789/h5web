var flag=true;
var _infoId = localStorage.getItem('_infoId');//公演ID
var _code = localStorage.getItem('_code');//公演验证码
var _memberId = "";

init();

function init(){

	memberList();

	addListeners()
}


function memberList(){
	main.memberList(_infoId,function(dt){
		//console.log(dt);
		if(dt.content.openStatus==0){//演出开始可以投票
			if(dt.content.status==0){//未投票
				var html = [];
				if(dt.content.memberInfoList.length==0){
					$('.secList').html('<img src="img/icon_novote.png" style="display:block;width:20%;margin-left:40%;padding-top:30%;"><p style="width:100%;text-align:center;margin-top:6%;">投票尚未开始，暂无成员信息！<br/>下午场公演投票时间为18点至第二天凌晨3点<br/>晚场公演投票时间为23点至第二天凌晨3点</p>');
					return false;
				}
				$.each(dt.content.memberInfoList,function(index,dl){
					html.push('<li>');
					if(dl.teamName){
						if(dl.teamName=="预备生"){
							html.push('<span class="avatar YUBEI-bd" style="background-image:url('+dl.picture+')"></span>');
							html.push('<p class="mer_name">'+dl.realName+'<em class="YUBEI-bg">'+dl.teamName+'</em></p>');	
						}else{
							html.push('<span class="avatar '+dl.teamName.split(' ')[1]+'-bd" style="background-image:url('+dl.picture+')"></span>');
							html.push('<p class="mer_name">'+dl.realName+'<em class="'+dl.teamName.split(' ')[1]+'-bg">'+dl.teamName.split(' ')[1]+'</em></p>');	
						}
					}else{
						html.push('<span class="avatar" style="background-image:url('+dl.picture+');border:1px solid #fff"></span>');
						html.push('<p class="mer_name">'+dl.realName+'<em></em></p>');
					}
					html.push('<p class="givebtn"><span memberId='+dl.memberId+' mimage='+dl.picture+' mname='+dl.realName+'>为她投票</span></p>');
					html.push('</li>');
				})
				$('.memberList').append(html.join(""));
				//计算成员头像box的高度
				$('.avatar').height($('.avatar').width());
			}else if(dt.content.status==1){//已投过票
				$('.secList,.mask').remove();
				$('.secbox').show();
				$('.headimg').css('background-image','url('+dt.content.memberInfoList[0].picture+')');
				$('.headname').html(dt.content.memberInfoList[0].realName);
				$('.sectitle').html(getDate(dt.content.startTime)+' '+dt.content.teamName+' '+dt.content.title);
			}else{}
		}else if(dt.content.openStatus==1){//演出未开始,没有成员信息
			$('.secList').html('<img src="img/icon_novote.png" style="display:block;width:20%;margin-left:40%;padding-top:30%;"><p style="width:100%;text-align:center;margin-top:6%;">投票尚未开始，暂无成员信息！<br/>下午场公演投票时间为18点至第二天凌晨3点<br/>晚场公演投票时间为23点至第二天凌晨3点</p>');
		}else{}
	})
}


function addListeners(){

	$('.memberList').on('click','.givebtn span',function(){
		_memberId = $(this).attr('memberId');
		mimage = $(this).attr('mimage');
		mname = $(this).attr('mname');
		$('.mask').show();
		$('.gphead').css('background-image','url('+mimage+')');
		$('.gpname').html(mname);
	});

	$('.cancel').click(function(){
		$('.mask').hide();
	});

	$('.right').click(function(){
		if(flag==true){
			flag=false;
			main.saveVote(_infoId,_memberId,_code,function(dt){
				flag=true;
				if(dt.status == 200){
					memberList();
				}else{
					main.alert(dt.message);
				}
			})
		}
	})

}