
var _eventId = null;//场次列表
if(GetQueryString('eventId')){
	_eventId = GetQueryString('eventId');
}else{
	_eventId = 0;
}
var wxToken = GetQueryString('wxtoken');
var appToken = null;
if(GetQueryString('apptoken')){
	appToken = GetQueryString('apptoken'); 
}else{
	appToken = "";
}

var myAvatar = GetQueryString('avatar');
var myNikename = decodeURI(decodeURI(GetQueryString('nickname')));
var _this;
//alert(wxToken+'------'+appToken+'-------'+myAvatar+'------'+myNikename);

if(GetQueryString('wxtoken') != null)
{
	//alert(GetQueryString('wxtoken'))
	localStorage.setItem('wxToken',wxToken);
	localStorage.setItem('appToken',appToken);
	localStorage.setItem('myAvatar',myAvatar);
	localStorage.setItem('myNikename',myNikename);
}
//main.refreshUserInfo();

//alert('$$$$$$$$'+wxToken+'------'+appToken+'-------'+myAvatar+'------'+myNikename);
var praisenum = null;//点赞权数量
var flag = true;

$(function(){
	init();
})

function init(){

	getMerLists(function(){
		countPriset()
	});

	addListeners();
}

function addListeners(){

	//跳转个人成员主页
	$('.listbox1').on('click','.avata',function(){
		var sid = $(this).attr('sid');
		//alert('++++++'+sid)
		var url = "https://h5.48.cn/memberPage/index.html";
		wx.miniProgram.navigateTo({url:'/pages/memberpage/memberpage?mid='+sid+"&url="+url});
		//alert("bbb");
	})

	//往期回顾
	$('.tab1').click(function(){
		main.hrefTo('reviewList.html');
	});

	//介绍
	$('.tab2').click(function(){
		main.hrefTo('rule.html');
	})

	//所有成员
	$('.tab3').click(function(){
		main.hrefTo('allmember.html');
	})

	//跳转成员点赞排行
	$('.mersrank').click(function(){
		main.hrefTo('list.html?eventId='+_eventId+'&type=0');
	})
	//跳转粉丝点赞排行
	$('.usersrank').click(function(){
		main.hrefTo('list.html?eventId='+_eventId+'&type=1');
	})
	//跳转实时点赞排行
	$('.realrank').click(function(){
		main.hrefTo('list.html?eventId='+_eventId+'&type=2');
	})

	//跳转评论
	$('.listbox1').on('click','.icon_msg',function(){
		localStorage.setItem('memberName',$(this).attr('membername'));
		var infoId = $(this).parent().attr('infoid');
		main.hrefTo('comment.html?infoId='+infoId);
	})

	//投稿
	$('.listbox1').on('click','.icon_tougao',function(){
		var _memberId = $(this).attr('memberid');
		var url = encodeURIComponent("https://h5.48.cn/memberPage/support.html?memberId="+_memberId+"&game=xm")
		wx.miniProgram.navigateTo({url:'/pages/tgpage/tgpage?url='+url});
		//main.hrefTo('');
	})

	//点赞
	$('.listbox1').on('click','.icon_zan',function(){
		_this = $(this);
		if($('.praisenum').html()>0){
			$('.btnsright').attr('inid',$(_this).parent().attr('infoid'));
			$('.maskbox').show();
		}else{
			main.alert('点赞权不足，请下载口袋48app获取更多点赞权！');
		}	
	})

	//取消
	$('.btnsback').click(function(){
		$('.maskbox').hide();
	})

	//确认点赞
	$('.btnsright').click(function(){

		$('.maskbox').hide();

		var infoId = $(this).attr('inid');
		if(!flag){
			return false;
		}
		
		flag = false;
		main.savePraise(_eventId,infoId,function(dt){
			flag = true;
			if(dt.status==200){
				 $(_this).children('img').attr('src','img/icon_zan_right.png');
				 praisenum = 0;
				 $('.praisenum').html(praisenum);
				 localStorage.setItem('praisenum',praisenum);
				 main.alert('点赞成功');
			}else{
				main.alert(dt.message);
			}
		})

	})

	//投票(跳转小程序总选投票页面)
	$('.listbox1').on('click','.icon_vote',function(){
		var sid = $(this).attr('sid');
		wx.miniProgram.navigateTo({url:'/pages/webview/webview?sid='+sid});
	})

	//详细内容
	$('.listbox1').on('click','.iconmany',function(){
		var memberId = $(this).attr('memberid');
		/*var infoId = $(this).parent().attr('infoid');*/
		main.hrefTo('detail.html?memberId='+memberId);
	})


	//播放视频
	//点击播放视频
	$('.listbox1').on('click','.qu',function(){
  		$(this).hide();
  		$(this).parents('.vidbox').find('video').trigger('play');
  		$(this).parents('li').siblings().find('video').trigger('pause');
  		$(this).parents('.vidbox').find('video').removeClass('pause');
  		$(this).parents('.vidbox').find('video').addClass('play');
	});

	$('.listbox1').on('click','video',function(){
		if ($(this).hasClass('pause')) {
	  		$(this).trigger('play');
	  		$(this).parents('li').siblings().find('video').trigger('pause');
	  		$(this).removeClass('pause');
	  		$(this).addClass('play');
  		}else{
  			$(this).trigger('pause');
  			$(this).removeClass('play');
  			$(this).addClass('pause');
  		}
	})

}


//首页成员信息列表
function getMerLists(succ){

	main.getMerLists(wxToken,_eventId,function(dt){
		console.log(dt);
		if(dt.status==200){
			_eventId = dt.content.eventId;
			localStorage.setItem('eventId',_eventId);
			var html = [];
			$.each(dt.content.showInfoList,function(index,data){
				html.push('<li>');
				html.push('<div class="avatabox">');
				html.push('<span class="avata" sid='+data.memberInfo.sid+' style="background-image:url('+main.formatAvata(data.memberInfo.avatar)+')"></span>');
				html.push('<p class="mername">'+data.memberInfo.memberName+'<img src='+main.formatAvata(data.memberInfo.teamPic)+' class="team" /></p>');
				html.push('</div>')
				html.push('<div class="vidbox">');
				html.push('<div class="video">');
				html.push('<video class="bofang" src='+data.videoUrl+' webkit-playsinline controls></video>');
				html.push('</div>');
				html.push('<div class="qu" style="background-image:url('+data.picUrl+')">');
				html.push('<img src="img/play.png" class="play">');
				html.push('</div>');
				html.push('</div>');
				html.push('<ol class="iconsbtn" infoid='+data.infoId+'>');
				html.push('<li class="icon_msg" membername='+data.memberInfo.memberName+'><img src="img/icon_msg.png"></li>');
				html.push('<li class="icon_tougao" memberid='+data.memberInfo.memberId+'><img src="img/icon_tougao.png"></li>');
				if(data.praiseStatus==1 || data.praiseStatus=="1"){//已点赞
					html.push('<li class="icon_zan"><img src="img/icon_zan_right.png"></li>');
				}else{//未点赞
					html.push('<li class="icon_zan"><img src="img/icon_zan.png"></li>');
				}
				html.push('<li class="icon_vote" sid='+data.memberInfo.sid+'><img src="img/icon_vote.png"></li>');
				html.push('<li class="iconmany" memberid='+data.memberInfo.memberId+'><img src="img/icon_many.png">详细内容</li>');
				html.push('</ol>');
				html.push('<span class="rank">'+data.rank+'</span>');
				html.push('</li>');
			});
			$('.listbox1').append(html.join(""));

			if(dt.content.rankStatus==1 || dt.content.rankStatus=="1"){
				$('.listbox1 .rank').show();
			}else{
				$('.listbox1 .rank').hide();
			}

			succ();

		}else{
			main.alert(dt.message);
		}
	})

}

function countPriset(){
	main.countPriset(appToken,wxToken,_eventId,function(dt){
		if(dt.status==200){
			praisenum = dt.content.praise
			$('.praisenum').html(praisenum);
			localStorage.setItem('praisenum',praisenum);//点赞权数量缓存
		}else{
			main.alert(dt.message);
		}
	})
}