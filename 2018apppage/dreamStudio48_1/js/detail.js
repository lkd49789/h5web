var flag = false;
var _memberId = GetQueryString('memberId');
var _infoId = null;
var _ctime = 0;
var _limit = 10;

$(function(){
  init();
})

function init(){
	$('.praisenum').html(localStorage.getItem('praisenum'));
	getDetails();
  	addListeners();

}


function addListeners(){

	//发送评论
	$('.submit').click(function(){
		if($(".textinput").val().length <1){
			main.alert("评论不能为空")
			return false;
		}
		var _comment = main.filteremoji($.trim($(".textinput").val()));
		main.sendComment(_infoId,_comment,function(dt){
			if(dt.status==200){
				/*$(".lists").prepend('<li>'+
					'<div class="avatabox"><span class="avata" style="background-image:url('+main.formatAvata(main.getAppUserInfo().avata)+')"></span>'+
					'<div class="avatext">'+
					'<p class="name">'+main.getAppUserInfo().uname+'</p>'+
					'<p class="time">刚刚</p>'+
					'</div>'+
					'</div>'+
					'<div class="content">'+
					'<p class="texts">'+_comment+'</p>'+
					'</div>'+
					'</li>');*/
				/*$('.lists').html("");*/
				_ctime = 0;
				$('.lists').html("");
				getDetails();
				$(".textinput").val("");
			}else{
				main.alert(dt.message);
			}
		})

	})


	//评论举报
	$('.lists').on('click','.report',function(){
		var _this = $(this);
		var _commentId = _this.attr('dataid');
		var _comment = _this.attr('comment');
		if(_this.hasClass('reActive')){//已举报

		}else{
			main.getReport(_commentId,_comment,function(dt){//未举报
				if(dt.status==200){
					_this.addClass('reActive');
					_this.html('已举报');
				}else{
					main.alert(dt.message);
				}
			})
		}
		
	})

	//跳转成员个人主页
	$('.avatat').click(function(){
		var sid = $(this).parent('avatatbox').siblings('.iconsbtn').find('.icon_vote').attr('sid');
		var url = "https://h5.48.cn/memberPage/index.html";
		wx.miniProgram.navigateTo({url:'/pages/memberpage/memberpage?mid='+sid+"&url="+url});
	})

	//投稿
	$('.iconsbtn').on('click','.icon_tougao',function(){
		var url = encodeURIComponent("https://h5.48.cn/memberPage/support.html?memberId="+_memberId+"&game=xm");
		wx.miniProgram.navigateTo({url:'/pages/tgpage/tgpage?url='+url});
	})


	//点赞
	/*$('.iconsbtn').on('click','.icon_zan',function(){
		var _this = $(this);
		if($('.praisenum').html()>0){
			//if(_this.children('img').attr('src')=='img/icon_zan.png'){
				main.savePraise(localStorage.getItem('eventId'),_infoId,function(dt){
					if(dt.status==200){
						 _this.children('img').attr('src','img/icon_zan_right.png');
						 $('.praisenum').html(0);
						 localStorage.setItem('praisenum',0);
						 main.alert('点赞成功');
					}else{
						main.alert(dt.message);
					}
				})
			//}
		}else{
			main.alert('点赞权不足，请下载口袋48app获取更多点赞权！');
		}
	})*/


	//点赞
	$('.iconsbtn').on('click','.icon_zan',function(){
		_this = $(this);
		if($('.praisenum').html()>0){
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

		main.savePraise(localStorage.getItem('eventId'),_infoId,function(dt){
			if(dt.status==200){
				 $(_this).children('img').attr('src','img/icon_zan_right.png');
				 $('.praisenum').html(0);
				 localStorage.setItem('praisenum',0);
				 main.alert('点赞成功');
			}else{
				main.alert(dt.message);
			}
		})

	})

	//投票(跳转小程序总选投票页面)
	$('.iconsbtn').on('click','.icon_vote',function(){
		var sid = $(this).attr('sid');
		wx.miniProgram.navigateTo({url:'/pages/webview/webview?sid='+sid});
	})


	//点击播放视频
	$("video").addClass('pause');//for check pause or play add a class
	$('.vidbox').on('click','.qu',function(){
		$(this).hide();
		$(this).parents('.vidbox').find('video').trigger('play');
		$(this).parents('.vidbox').siblings().find('video').trigger('pause');
		$(this).parents('.vidbox').find('video').removeClass('pause');
		$(this).parents('.vidbox').find('video').addClass('play');
	});
	//视频播放和暂停
	$('.vidbox').on('click','video',function() {
		if ($(this).hasClass('pause')) {
			$("video").trigger("play");
			$(this).removeClass('pause');
			$(this).addClass('play');
		} else {
			$("video").trigger("pause");
			$(this).removeClass('play');
			$(this).addClass('pause');
		}
	})

}

// 获取评论列表
function getDetails(){
	main.getDetails(_memberId,_ctime,_limit,function(dt){
		console.log(dt);
		if(dt.status==200){
			_infoId = dt.content.infoId;
			//成员信息
			$('.avatat').css('background-image','url('+main.formatAvata(dt.content.memberInfo.avatar)+')');
			$('.mername').html(dt.content.memberInfo.memberName+'<img src='+main.formatAvata(dt.content.memberInfo.teamPic)+' class="team"/>');
			$('.bofang').attr('src',dt.content.videoUrl);
			$('.qu').css('background-image','url('+dt.content.picUrl+')');

			//该成员是否具有点赞功能并是否点过赞
			ifHavelike(dt,dt.content.type,dt.content.status);

			if(dt.content.commentUserInfoList.length==0 || dt.content.commentUserInfoList==""){
				flag = true;
				if($('.lists li').length ==0){
					$('.lists').html('<p class="nohave">暂时还没有数据</p>');
					$('.mui-pull-bottom-tips').hide();
				}
			}else{
				flag = false;
				var html=[];
				$.each(dt.content.commentUserInfoList,function(index,dl){
					html.push('<li>');
					html.push('<div class="avatabox">');
					html.push('<span class="avata" style="background-image:url('+main.formatAvata(dl.userAvatar)+')"></span>');
					html.push('<div class="avatext">');
					html.push('<p class="name">'+dl.userNick+'</p>');
					html.push('<p class="time">'+getDate(dl.ctime)+'</p>');
					html.push('</div>');
					if(dl.status==0 || dl.status=="0"){
						html.push('<span class="report" dataid='+dl.dataId+' comment='+dl.comment+'>举报</span>');
					}else{
						html.push('<span class="report reActive" dataid='+dl.dataId+' comment='+dl.comment+'>已举报</span>');
					}
					html.push('</div>');
					html.push('<div class="content">');
					html.push('<p class="texts">'+dl.comment+'</p>');
					html.push('</div>');
					html.push('</li>');
					_ctime = dl.ctime;
				})
				$('.lists').append(html.join(""));
			}
		}else{
			main.alert(dt.message);
		}
	})

}




//该成员是否具有点赞功能
function ifHavelike(dt,type,status){
	if(type==1 || type=="1"){//具有点赞功能
		var html ='';
		html+='<li class="icon_tougao"><img src="img/icon_tougao.png"></li>'+
				iflikeing(status)+
				'<li class="icon_vote" sid='+dt.content.memberInfo.sid+'><img src="img/icon_vote.png"></li>';
		$('.iconsbtn').html(html);
		$('.iconsbtn li').css('width','33%');

	}else{
		var html ='';
		html+='<li class="icon_tougao><img src="img/icon_tougao.png"></li>'+
				'<li class="icon_vote" sid='+dt.content.memberInfo.sid+'><img src="img/icon_vote.png"></li>';
		$('.iconsbtn').html(html);
		$('.iconsbtn li').css('width','50%');
	}
}


function iflikeing(status){
	var html = '';
	if(status==1 || status=="1"){//已点赞
		html+='<li class="icon_zan"><img src="img/icon_zan_right.png"></li>';
		return html;
	}else{//未点赞
		html+='<li class="icon_zan"><img src="img/icon_zan.png"></li>';
		return html;
	}
}






/*******************************************************上拉加载********************************************************************/

//上拉加载
mui.init();
(function($) {
	//阻尼系数
	var deceleration = mui.os.ios?0.003:0.0009;
	$('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration:deceleration
	});
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							getDetails();
							self.endPullUpToRefresh(flag);
						}, 1000);
					}
				}
			});
		})
	});
})(mui);