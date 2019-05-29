var flag=true;
var timerend = setInterval("exChangeEnd()",1000);
userInfo();//用户状态
seasonList();//场次列表
//tab切换
$('.tab li').click(function(){
	var point = $(this).attr('point');
	$(this).addClass('active');
	$(this).siblings().removeClass('active');
	$('.'+point).show();
	$('.'+point).siblings().hide();
	/*$('.votebox span').addClass('votebtn_no').removeClass('votebtn');*/
});
//content   padding-top的值
var paddT = $('.content').innerHeight() - $('.content').height();
$('.listbox').height($('body').height()-$('.tab').height()-paddT-2);


//确认兑换
$('.changebox .done').click(function(){
	if(flag==true){
		flag=false;
		main.exchangeDone(1,function(dt){
			flag=true;
			if(dt.status==200){
				main.alert('兑换成功！');
				$('.exchange_mask').hide();
				$('.exnum').html(parseInt($('.exnum').html())+1);
				$('.exchangebtn').unbind();
				$('.exchange img').attr('src','img/exchange_no.png');
				$('.exchange').removeClass('exchangebtn');
			}else{
				$('.exchange_mask').hide();
				if(dt.message.indexOf("用户金钱不足")>=0){
					$(".recharge_mask").show();
				}else{
					main.alert(dt.message);
				}
			}
		})
	}
})

//关闭兑换弹窗
$('.c_btns .cancel').click(function(){
	$('.exchange_mask').hide();
})


//场次投票
mui('body').on('tap','.seasonList .votebtn',function(){
	$('.mask,.s_texts').show();
	$('.m_texts').hide();
	$('.s_texts h4').html($(this).attr("oname"));
	$('.s_texts .time').html($(this).attr("otime"));
	$('.balance em').html($('.exnum').html());
	localStorage.setItem("_oid", $(this).attr("oid"));
	localStorage.setItem("_mid", 0);
	$(this).siblings().find('.num_tp').addClass('tp_no');
})

//歌曲投票
mui('body').on('tap','.musicList .votebtn',function(){
	$('.mask,.m_texts').show();
	$('.s_texts').hide();
	$('.m_texts h4').html($(this).attr("mmusic"));
	$('.m_texts .nikename').html($(this).attr("mname"));
	$('.balance em').html($('.exnum').html());
	localStorage.setItem("_oid", $(this).attr("oid"));
	localStorage.setItem("_mid", $(this).attr("mid"));
	$(this).siblings().find('.num_tp').addClass('tp_no');
})

//投票确认
$('.mask .done').click(function(){
	if(mui('.mui-numbox1').numbox().getValue() > $('.balance em').html() || $('.balance em').html()==0 || mui('.mui-numbox1').numbox().getValue()==0){
		$('.notice').show();
		return false;
	}
	var tp_no = mui('.mui-numbox1').numbox().getValue();
	if(flag==true){
		flag=false;
		main.voteDone(localStorage.getItem("_oid"),localStorage.getItem("_mid"),tp_no,function(dt){
			flag=true;
			if(dt.status==200){
				$('.tp_no').html(parseInt($('.tp_no').html())+parseInt(mui('.mui-numbox1').numbox().getValue()));
				main.alert('投票成功！');
				$('.mask').hide();
				$('.notice').hide();
				$('.num_tp').removeClass('tp_no');
				$('.exnum').html(parseInt($('.exnum').html())-parseInt(mui('.mui-numbox1').numbox().getValue()));
			}else{
				
				main.alert(dt.message);
				
			}
		})
	}
})

//取消按钮关闭弹窗
$('.s_btns .cancel').click(function(){
	$('.mask').hide();
	$('.notice').hide();
	$('.num_tp').removeClass('tp_no');
})
//去充值
$('.recharge').click(function(){
	$('.recharge_mask').hide();
	window.web.gotoPage("recharge/detail");
})
//取消按钮关闭弹窗
$('.recharge_mask .cancel').click(function(){
	$('.mask').hide();
	$('.recharge_mask').hide();
})
//跳转规则
$('.rulebtn').click(function(){
	main.hrefTo(CONFIG.getJumpUrl()+'rule.html');
})

//用户状态
function userInfo(){
	main.getUserInfo(function(dt){
		// console.log(dt);
		if(dt.status==200){
			$('.exnum').html(dt.content.rest_no);
			if(dt.content.is_recharge==0){//不可以兑换话筒
				$('.exchangebtn').unbind();
				$('.exchange img').attr('src','img/exchange_no.png');
				$('.exchange').removeClass('exchangebtn');
			}else{//可兑换话筒
				$('.exchange img').attr('src','img/exchange.png');
				$('.exchange').addClass('exchangebtn');
				$(".exchangebtn").bind("click",function(){
				  	$('.exchange_mask').show();
				});
			}	
		}else{
			main.alert(dt.message);
		}
	})
}

//获取场次列表
function seasonList(){
	main.getSeasonList(function(dt){
		// console.log(dt);
		var html = [];
		if(dt.status==200){
			$.each(dt.content.rows,function(index,dl){
				var index=index+1;
				html.push('<li>');
				if(index==1||index==2||index==3){
					html.push('<span class="runknum the">'+index+'</span>');
				}else{
					html.push('<span class="runknum">'+index+'</span>');
				}
				html.push('<div class="headbox">');
				html.push('<span class="headimg '+(dl.team).split(" ")[1]+'-bd" style="background-image:url('+dl.memberAvata+')"></span>');
				html.push('<div>');
				html.push('<p class="p1">'+dl.member+'</p>');
				html.push('<p class="p2">'+dl.otime+'</p>');
				html.push('</div></div>');
				html.push('<div class="votebox">');
				html.push('<span class="votebtn" oid="'+dl.oid+'" oname="'+dl.member+'" otime="'+dl.otime+'">投票</span>');
				html.push('<p><em class="num_tp">'+dl.tp_no+'</em>个话筒</p>');
				html.push('</div></li>');
			})
			$('.seasonList').append(html.join(""));
		}else{
			main.alert(dt.message);
		}
	})
	setTimeout(function(){
		musicList();//歌曲列表
	},1000)
}

//获取歌曲列表
function musicList(){
	main.getMusicList(function(dt){
		// console.log(dt)
		var html = [];
		if(dt.status==200){
			$.each(dt.content.rows,function(index,dl){
				var index = index+1;
				html.push('<li>');
				if(index==1||index==2||index==3){
					html.push('<span class="runknum the">'+index+'</span>');
				}else{
					html.push('<span class="runknum">'+index+'</span>');
				}
				html.push('<div class="headbox">');
				html.push('<span class="headimg NII-bd" style="background-image:url('+dl.memberAvata+')"></span>');
				html.push('<div>');
				html.push('<p class="p1">'+dl.music_name+'</p>');
				html.push('<p class="p2">'+dl.member+'</p>');
				html.push('</div></div>');
				html.push('<div class="votebox">');
				html.push('<span class="votebtn" oid="'+dl.oid+'" mid="'+dl.mid+'" mmusic="'+dl.music_name+'" mname="'+dl.member+'">投票</span>');
				html.push('<p><em class="num_tp">'+dl.tp_no+'</em>个话筒</p>');
				html.push('</div></li>');
			})
			$('.musicList').append(html.join(""));
		}else{
			main.alert(dt.message);
		}
	})
}



function exChangeEnd(){
	var EndTime= new Date('2018/06/30 24:00:00');
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
  	$('.toptext').html("距离投票结束还剩"+d+"天"+h+"时"+m+"分");
  	if(d==0&&h==0&&m==0&&s==0){
  		$('.toptext').html("投票已截止");
  		$('.votebox span').addClass('votebtn_no').removeClass('votebtn');
  		clearInterval(timerend);
  	}else if(m==0){
  		$('.toptext').html("距离投票结束还剩"+d+"天"+h+"时"+m+"分"+s+"秒");
  	}else{}
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
	/*$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-scroll2'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {

							self.endPullUpToRefresh(flag);
						}, 1000);
					}
				}
			});
		})
	});*/
})(mui);