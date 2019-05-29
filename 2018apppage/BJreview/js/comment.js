var flag = false;
var _songId = GetQueryString('songId');
var _ctime = 0;
var _limit = 10;
var or = 0;//页数

$(function(){
  init();
})

function init(){

	$('.title').html(localStorage.getItem('songname'));
	getCommentList();
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
		main.sendComment(_songId,_comment,function(dt){
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
				getCommentList();
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
		if(_this.hasClass('reActive')){

		}else{
			main.getReport(_commentId,_comment,function(dt){
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
function getCommentList(){
	main.getCommentList(_songId,_ctime,_limit,function(dt){
		console.log(dt);
		if(dt.status==200){
			if(dt.content.length==0 || dt.content==""){
				flag = true;
				if($('.lists li').length ==0){
					/*$('.nodata').show();*/
					$('.lists').html('<p class="nohave">暂时还没有数据</p>');
					$('.mui-pull-bottom-tips').hide();
				}
			}else{
				flag = false;
				var html=[];
				$.each(dt.content,function(index,dl){
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
				or+=1;
				$('.lists').append(html.join(""));
			}
		}else{
			main.alert(dt.message);
		}
	})

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
							getCommentList();
							self.endPullUpToRefresh(flag);
						}, 1000);
					}
				}
			});
		})
	});
})(mui);