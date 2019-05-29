var flag=true;
var assisNum = "";
var _assistances ="";
var _this = "";

$(function(){
	init();
})

function init(){
	getinit()
	newSign(function(){
		helpRank(function(){
			getMemberList()
		});
	});
	addListeners();
}

function addListeners(){
	//切换tab
	$('.tabs li').click(function(){
		var val = $(this).attr('val');
		$(this).children('span').addClass('tabActive');
		$(this).siblings().children('span').removeClass('tabActive');
		$('.allList'+val).show();
		$('.allList'+val).siblings().hide();
		$('.allList'+val).find('video').trigger('pause');
	})

	//点击为她助力
	$('.mui-table-view').on('click','.helpbtn',function(){
		_this = $(this).parents('li').find('.num');
		_assistances = _this.html();
		var memberId = $(this).attr('memberId');
		assisNum=$('.myright em').html();
		if(assisNum>0){
			helping(memberId);
		}else{
			main.alert("当前没有可用助力权");
		}
	});

	//点击所有报名成员
	$('.List3').on('click','span',function(){
		var memberId = $(this).attr('memberId');
		localStorage.setItem("avatar", $(this).attr('avatar'));
		localStorage.setItem("memberName", $(this).attr('memberName'));
		localStorage.setItem("teamName", $(this).attr('teamName'));
		localStorage.setItem("ctime", $(this).attr('ctime'));
		localStorage.setItem("rank", $(this).attr('rank'));
		localStorage.setItem("assistances", $(this).attr('assistances'));
		localStorage.setItem("addMessage", $(this).attr('addMessage'));
		localStorage.setItem("addMessagePic", $(this).attr('addmessagepic'));
		localStorage.setItem("addMessageVideo", $(this).attr('addmessagevideo'));
		localStorage.setItem("addMessageVideoPic", $(this).attr('addmessagevideopic'));
		main.hrefTo('personal.html?mid='+memberId);
	})

	//向下显示此队全部成员或向上收起
	$('.List3').on("click",".iconupdown",function(){
		if($(this).attr('src')=="img/icon_down.png"){
			$(this).parents('li').css({'overflow':'auto','height':'auto'});
			$(this).attr('src','img/icon_up.png');
		}else{
			$(this).parents('li').css({'overflow':'hidden','height':'6.8rem'});
			$(this).attr('src','img/icon_down.png');
		}
	})


	//点击播放视频
	$('.mui-table-view').on('click','.qu',function(){
  		$(this).hide();
  		$(this).parents('.vidbox').find('video').trigger('play');
  		$(this).parents('li').siblings().find('video').trigger('pause');
  		$(this).parents('.vidbox').find('video').removeClass('pause');
  		$(this).parents('.vidbox').find('video').addClass('play');
	});

	$('.mui-table-view').on('click','video',function(){
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

	//获取验证码
	$(".tokenbtn").click(function(){
		if($(".tokenbtn").hasClass("token_value_enabled")){
			return false;
		}
		//请求接口
		if(flag==true){
			flag=false;
			main.getCode($('.phone').html(),function(dt){
				flag=true;
				if(dt.status == 200){
					//加载成功 倒计时开始 60 秒
					$(".tokenbtn").addClass("token_value_enabled");
					var total = 60;
					$(".tokenbtn").html(total+"秒")
					time = setInterval(function(){
						total -= 1
						$(".tokenbtn").html(total+"秒")
						if(total<0){
							$(".tokenbtn").removeClass("token_value_enabled");
							$(".tokenbtn").html("重发");
							clearInterval(time)
						}
					},1000)
					$(".code").val("")
				}else{
					showTip(dt.message);
				}
			})
		}
	})


	//验证码
	$(".token").focus(function(){
		$(".notice").css('opacity','0');
	})

	//确定验证
	$(".btnsright").click(function(){
		$(".notice").css('opacity','0');

		//验证码
		if($(".token").val() == ''){
			showTip("请输入验证码")
			return false;
		}

		if(flag==true){
			flag=false;
			main.rightTest($('.phone').html(),$(".token").val(),function(dt){
				flag=true;
				if(dt.status == 200){//激活成功
					$('.maskbox,.mask2').hide();
					main.alert("验证成功");
				}else{
					main.alert(dt.message);
				}
			})
		}
	})

	//验证返回按钮
	$('.btnsback').click(function(){
		$('.maskbox,.mask2').hide();
	})

	//跳转个人主页
	$('.List1').on('click','.merlink',function(){
		var merid = $(this).attr('merid');
		window.web.gotoPage('member/detail?id='+merid);
	})
}

//最新报名列表
function newSign(succ){
	main.helpList(1,function(dt){
		//console.log(dt);
		if(dt.status==200){
			var html=[];
			$.each(dt.content.list, function(index,dl) {
				html.push('<li>');
				html.push('<div class="m_msg">');
				html.push('<span class="avatar avatar_new merlink" merid='+dl.memberId+' style="background-image:url('+main.formatAvata(dl.avatar)+')"></span>');
				html.push('<div class="r_msg merlink" merid='+dl.memberId+'>');
				if(dl.teamName=="预备生"){
					html.push('<p class="p1">'+dl.memberName+'<em class="team YUBEI-bg">'+dl.teamName+'</em></p>');
				}else if(dl.teamName=="TEAM FT"){
					html.push('<p class="p1">'+dl.memberName+'<em class="team FT-bg">'+dl.teamName+'</em></p>');
				}else if(dl.teamName=="无队伍"){
					html.push('<p class="p1">'+dl.memberName+'</p>');
				}else{
					html.push('<p class="p1">'+dl.memberName+'<em class="team '+dl.teamName.split(' ')[1]+'-bg">'+dl.teamName+'</em></p>');
				}
				if(dl.assistances){
					html.push('<p class="time rankno">'+getDate(dl.ctime)+'<span class="helpnum"><img src="img/icon_help.png"/><em class="num">'+dl.assistances+'</em></span></p>');
				}else{
					html.push('<p class="time">'+getDate(dl.ctime)+'<span class="helpnum"></span></p>');
				}
				html.push('</div></div>');
				if(dl.addMessage){
					html.push('<p class="text">'+dl.addMessage+'</p>');
				}
				if(dl.addMessageVideo){
					html.push('<div class="vidbox">');
					html.push('<div class="video">');
					html.push('<video class="bofang" src="'+dl.addMessageVideo+'" webkit-playsinline></video>');
					html.push('</div>');
					if(dl.addMessageVideoPic){
						html.push('<div class="qu" style="background-image:url('+dl.addMessageVideoPic+')">');
					}else{
						html.push('<div class="qu" style="background-image:url(img/v_default.png)">');
					}
					html.push('<img src="img/play.png" class="play">');
					html.push('</div>')
					html.push('</div>');
				}else if(dl.addMessagePic){
					html.push('<div class="vidbox">');
					html.push('<div class="pic" style="background-image:url('+dl.addMessagePic+')"></div>')
					html.push('</div>');
				}else{}
				html.push('<button class="helpbtn" memberId='+dl.memberId+'><img src="img/icon_help.png"/>为她助力</button>');
				html.push('</li>');
			})
			$('.List1').append(html.join(""));
			succ()
		}else{
			main.alert(dt.message);
		}
	})
}

//助力排行
function helpRank(succ){
	main.helpList(2,function(dt){
		//console.log(dt);
		if(dt.status==200){
			var html=[];
			$.each(dt.content.list, function(index,dl) {
				html.push('<li>');
				html.push('<div class="m_msg pmsg">');
				html.push('<span class="avatar avatar_new" style="background-image:url('+main.formatAvata(dl.avatar)+')"></span>');
				html.push('<div class="r_msg">');
				if(dl.teamName=="预备生"){
					html.push('<p class="p1">'+dl.memberName+'<em class="team YUBEI-bg">'+dl.teamName+'</em></p>');
				}else if(dl.teamName=="TEAM FT"){
					html.push('<p class="p1">'+dl.memberName+'<em class="team FT-bg">'+dl.teamName+'</em></p>');
				}else if(dl.teamName=="无队伍"){
					html.push('<p class="p1">'+dl.memberName+'</p>');
				}else{
					html.push('<p class="p1">'+dl.memberName+'<em class="team '+dl.teamName.split(' ')[1]+'-bg">'+dl.teamName+'</em></p>');
				}
				if(dl.assistances){
					html.push('<p class="time rankno"><span class="helpnum"><img src="img/icon_help.png"/><em class="num">'+dl.assistances+'</em></span></p>');
				}else{
					html.push('<p class="time"><span class="helpnum"></span></p>');
				}
				if(dl.rank){
					html.push('<span class="rank">'+dl.rank+'</span>')
				}else{

				}
				html.push('</div></div>');
				if(dl.addMessage){
					html.push('<p class="text">'+dl.addMessage+'</p>');
				}
				if(dl.addMessageVideo){
					html.push('<div class="vidbox">');
					html.push('<div class="video">');
					html.push('<video class="bofang" src="'+dl.addMessageVideo+'" webkit-playsinline></video>');
					html.push('</div>');
					if(dl.addMessageVideoPic){
						html.push('<div class="qu" style="background-image:url('+dl.addMessageVideoPic+')">');
					}else{
						html.push('<div class="qu" style="background-image:url(img/v_default.png)">');
					}
					html.push('<img src="img/play.png" class="play">');
					html.push('</div>')
					html.push('</div>');
				}else if(dl.addMessagePic){
					html.push('<div class="vidbox">');
					html.push('<div class="pic" style="background-image:url('+dl.addMessagePic+')"></div>')
					html.push('</div>');
				}else{}
				html.push('<button class="helpbtn" memberId='+dl.memberId+'><img src="img/icon_help.png"/>为她助力</button>');
				html.push('</li>');
			})
			$('.List2').append(html.join(""));
			console.log($('.time').hasClass('rankno'));
			if($('.time').hasClass('rankno')){
				
			}else{
				$('.List2').remove();
				$('.allList2').html('<img src="img/closebg.jpg" style="width:100%;">');
			}
			succ()
		}else{
			main.alert(dt.message);
		}
	})
}

//所有非top66报名成员
function getMemberList(){
	main.getMemberList(function(dt){
		//console.log(dt);
		if(dt.status==200){
			var html=[];
			$.each(dt.content.list, function(index,dl) {
				html.push('<li>');
				html.push('<p class="teamName">'+getTeamName(dl[0])+'<img src="img/icon_down.png" class="iconupdown"></p>');
				html.push(getMemberInfo(dl))
				html.push('</li>');
			})
			$('.List3').append(html.join(""));
		}else{
			main.alert(dt.message);
		}
	})
}
function getTeamName(_team){
	return _team.teamName;
}
function getMemberInfo(_list){
	var html = '<div class="nameList">';
	$.each(_list,function(index,item){

		html += '<span memberId="'+item.memberId+'" avatar="'+item.avatar+'" memberName="'+item.memberName+'" teamName="'+item.teamName+'" ctime="'+getDate(item.ctime)+'" rank="'+item.rank+'" assistances="'+item.assistances+'" addMessage="'+item.addMessage+'" addMessagePic="'+item.addMessagePic+'" addMessageVideo="'+item.addMessageVideo+'" addMessageVideoPic="'+item.addMessageVideoPic+'">';

		html += item.memberName;
		html += '</span>';
	})
	html += '</div>'
	return html;
}

//为她助力
function helping(memberId){
	if(flag==true){
		flag=false;
		main.helping(memberId,function(dt){
			flag=true;
			if(dt.status==200){
				main.alert("助力成功");
				_assistances=parseInt(_assistances)+1;
				_this.html(_assistances);
				getinit();
			}else if(dt.status==1008610 || dt.status=="1008610"){
				$('.maskbox,.mask2').show();
				$('.phone').html(dt.message);
			}else{
				main.alert(dt.message);
			}
		})
	}
}

//初始化获取助力
function getinit(){
	main.getinit(function(dt){
		//console.log(dt)
		if(dt.status==200){
			assisNum = dt.content.assisNum;
			$('.myright em').html(assisNum);
		}else{
			main.alert(dt.message);
		}
	})
}

//转换时间戳
function add0(m){return m<10?'0'+m:m };  
function getDate(shijianchuo) {  
  //shijianchuo是整数，否则要parseInt转换  
  var time = new Date(shijianchuo);  
  var y = time.getFullYear();  
  var m = time.getMonth()+1;  
  var d = time.getDate();  
  var h = time.getHours();  
  var mm = time.getMinutes();  
  var s = time.getSeconds();  
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);  
};   

//提示语
function showTip(str){
	$(".notice").css('opacity','1');
	$(".notice").html(str);
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
		$.each(document.querySelectorAll('.mui-scroll1'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							//commentList1();
							self.endPullUpToRefresh(flag);
						}, 1000);
					}
				}
			});
		})
		$.each(document.querySelectorAll('.mui-scroll2'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							// commentList2();
							self.endPullUpToRefresh(flag2);
						}, 1000);
					}
				}
			});
		})
	});*/
})(mui);