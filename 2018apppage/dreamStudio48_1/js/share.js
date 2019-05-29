var flag = false;
var _memberId = GetQueryString('memberId');
var _infoId = GetQueryString('infoId');
var _ctime = 0;
var _limit = 10;

$(function(){
  init();
})

function init(){

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

}

// 获取评论列表
function getDetails(){
	main.getDetails(_memberId,_ctime,_limit,function(dt){
		console.log(dt);
		if(dt.status==200){
			//成员信息
			$('.avatat').css('background-image','url('+main.formatAvata(dt.content.memberInfo.avatar)+')');
			$('.mername').html(dt.content.memberInfo.memberName+'<img src='+main.formatAvata(dt.content.memberInfo.teamPic)+' class="team"/>');
			$('.bofang').attr('src',dt.content.videoUrl);
			$('.qu').css('background-image','url('+dt.content.picUrl+')');

			//该成员是否具有点赞功能并是否点过赞
			ifHavelike(dt.content.type,dt.content.status);

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
function ifHavelike(type,status){
	if(type==1 || type=="1"){//具有点赞功能
		var html ='';
		html+='<li class="icon_share"><img src="img/icon_share.png"></li>'+
				'<li class="icon_tougao"><img src="img/icon_tougao.png"></li>'+
				iflikeing(status)+
				'<li class="icon_vote"><img src="img/icon_vote.png"></li>';
		$('.iconsbtn').html(html);
		$('.iconsbtn li').css('width','25%');

	}else{
		var html ='';
		html+='<li class="icon_share"><img src="img/icon_share.png"></li>'+
				'<li class="icon_tougao><img src="img/icon_tougao.png"></li>'+
				'<li class="icon_vote"><img src="img/icon_vote.png"></li>';
		$('.iconsbtn').html(html);
		$('.iconsbtn li').css('width','33%');
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