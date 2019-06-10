
(function(data) {
	//初始化
	data.init = function(){
		home.getImgs(function(){//图片
			home.getvidList(function(){//视频列表
				home.getMusicList();//歌曲列表
			});//视频列表
		});
        
        home.addListeners();//事件
	}

	//点击事件
	data.addListeners = function(){
		//活动规则点击事件
		$('.rulebtn').click(function(){
			$('.ruleMask').show();
		});
		$('.closebtn').click(function(){
			$('.ruleMask').hide();
		});

		//进入官网
		$('.intobtn').click(function(){
			main.hrefTo("http://lrs.48.cn/html/m/");
		})

		//下载游戏
		$('.gamebtn').click(function(){
			main.hrefTo("http://event.9you.com/lrs/mkt/dld/download.php?c=2");
		})

		//首页tab切换内容
		$('.tabs .tab').click(function(){
			var ord = $(this).attr('ord');
			$('.listbox'+ord).show();
			$('.listbox'+ord).siblings().hide();
			if(ord == 2){
				//计算首页图片的高度
				$('.pic').height($('.pic').width()/1.96);
			}
		});

		//从榜单进入内页
		$('.musicList').on("click","li",function(){
			var _mid = $(this).attr('mid');
			localStorage.setItem("micname_"+main.getOid(), $(this).attr("micname"));//歌曲名
			localStorage.setItem("memo_"+main.getOid(), $(this).attr("memo"));//参演成员
			main.hrefTo(CONFIG.getJumpUrl()+'songReview.html?mid='+_mid+"&from=home");
		});

		//从视频进入内页打Call
		$('.vedio_box ul').on("click",".call-info",function(){
			var _mid = $(this).attr('mid');
			localStorage.setItem("micname_"+main.getOid(), $(this).attr("micname"));//歌曲名
			localStorage.setItem("memo_"+main.getOid(), $(this).attr("memo"));//参演成员
			main.hrefTo(CONFIG.getJumpUrl()+'songReview.html?mid='+_mid+"&from=home");
		});

		//点击播放视频
		$('.vedio_box ul').on('click','.qu',function(){
		  		$(this).hide();
		  		$(this).parents('.vidbox').find('video').trigger('play');
		  		$(this).parents('.vidbox').siblings().find('video').trigger('pause');
		  		$(this).parents('.vidbox').find('video').removeClass('pause');
		  		$(this).parents('.vidbox').find('video').addClass('play');
		});

		$('.vedio_box ul').on('click','video',function(){
			if ($(this).hasClass('pause')) {
		  		$(this).trigger('play');
		  		$(this).parents('.vidbox').siblings().find('video').trigger('pause');
		  		$(this).removeClass('pause');
		  		$(this).addClass('play');
	  		}else{
	  			$(this).trigger('pause');
	  			$(this).removeClass('play');
	  			$(this).addClass('pause');
	  		}
		})

	}
	data.down = function(a,b){
       	return b.mid-a.mid
    }

	data.getImgs = function(succ){
		$.getJSON("musicImg.json", function(dt) {//首页图片DOM
			var data=dt.content;
			data.sort(home.down);
			var htmlImg=[];
			$.each(data, function(index, dl) {
				var index = index+1;
				htmlImg.push('<li>');
				htmlImg.push('<div class="pic"><img src='+dl.img_url+'></div>');
				htmlImg.push('<p class="pic_title">'+dl.musicName+'</p>');
				htmlImg.push('</li>');
		   	})
		   	$('.pic_box ul').append(htmlImg.join(""));

		   	var htmlVid = []
		   	$.each(data, function(index, dl) {//首页视频DOM
				var index = index+1;
				htmlVid.push('<li class="vidbox">');
				htmlVid.push('<div class="video">');
				if(dl.vidUrl=="" || dl.vidUrl.length==0){
					htmlVid.push('<video class="bofang" src="" preload="load" webkit-playsinline></video>');
					htmlVid.push('</div>');
					htmlVid.push('<div class="no_qu" style="background-image:url('+dl.vid_img+')">');
				}else{
					htmlVid.push('<video class="bofang" src='+dl.vidUrl+' preload="load" webkit-playsinline></video>');
					htmlVid.push('</div>');
					htmlVid.push('<div class="qu" style="background-image:url('+dl.vid_img+')">');
				}
				htmlVid.push('<img src="img/play.png" class="play">');
				htmlVid.push('</div>');
				htmlVid.push('<div class="sing">');
				htmlVid.push('<p class="musicName"></p>');
				htmlVid.push('<p class="musicMer"></p>');
				htmlVid.push('<p>');
				htmlVid.push('<span class="span1"><img src="img/icon_likesm.png"><em class="praise-num"></em></span>');
				htmlVid.push('<span><img src="img/icon_commesm.png"><em class="comment-num"></em></span>');
				htmlVid.push('<a class="call-info" href="javascript:;">进入打CALL>></a>');
				htmlVid.push('</p></div></li>');
		   	})
		   	$('.vedio_box ul').append(htmlVid.join(""));
		   	
		   	succ()
		});
	}

	//视频列表
	data.getvidList = function(succ){
		main.getVideoList(main.getOid(),function(dt){
			/*console.log(dt)*/
			var html=[];
			if(dt.errcode==0){
				$.each(dt.rows, function(index,dl) {
					if(index>0){
						index -= 1;
						$(".musicName").eq(index).html(dl.music_name);
						if(dl.memo=="null" || dl.memo==null || dl.memo=="" || dl.memo== "undefined" || dl.memo== undefined){
							$(".musicMer").eq(index).html();
							$('.call-info').eq(index).attr({"mid":dl.mid,"micname":dl.music_name});
						}else{
							$(".musicMer").eq(index).html(dl.memo);
							$('.call-info').eq(index).attr({"mid":dl.mid,"memo":dl.memo,"micname":dl.music_name});
						}
						$('.praise-num').eq(index).html(dl.tp_no);
						$('.comment-num').eq(index).html(dl.dp_no);
					}
			   	})
			   	succ()
			}else{
				main.alert(dt.errmsg);
			}
		})
	}

	//获取首页歌曲排行列表
	data.getMusicList = function(){
		main.getMusicList(main.getOid(),function(dt){
			/*console.log(dt);*/
			var html = [];
			if(dt.errcode==0){
				$.each(dt.rows,function(index,dl){
					var index = index+1;
					html.push('<li mid="'+dl.mid+'" micname="'+dl.music_name+'" memo="'+dl.memo+'">');
					html.push('<div class="con_left">');
					if(index==1||index==2||index==3){
						html.push('<span class="ordinal the'+index+'">'+index+'</span>');
					}else{
						html.push('<span class="ordinal">'+index+'</span>');
					}
					html.push('<span class="songName">《'+dl.music_name+'》</span>');
					html.push('</div>');
					html.push('<div class="con_right">');
					html.push('<span class="span1"><img src="img/icon_like.png"><b>'+dl.tp_no+'</b></span>');
					html.push('<span><img src="img/icon_comme.png"><b>'+dl.dp_no+'</b></span>');
					html.push('</div></li>');
				})
				$('.musicList').append(html.join(""));
				
			}else{
				main.alert(dt.errmsg);
			}
		})
	}

}(window.home = {}));


/*---------------------------------------------------------------------------------------------------------------------------*/
$(function(){
   /* if(!checkFromApp()){
        $('#submit-comment').attr('disabled','disabled');
        $(".publish_btn").attr("disabled", true); 
    }*/
    home.init();
})


/*分享*/

if(checkFromApp()) {
	$('.share-btn').on('click',function(){
		window.web.share("ALL","https://h5.48.cn/2018apppage/publicVote_werwolf/img/thumb.jpg","https://h5.48.cn/2018apppage/publicVote_werwolf/index.html","《48狼人杀》精彩赛事","我在口袋48看300小姐姐如何相爱相杀","https://h5.48.cn/admin/sharecount.php?title=publicVote_werwolf",false);
	})
}else{
	$("#alltexts").attr('disabled','disabled');
	$(".likebtn").attr("disabled", true);
	
    var shareTitlestr="《48狼人杀》精彩赛事",
    	shareDesc="我在口袋48看300小姐姐如何相爱相杀",
    	shareLink="https://h5.48.cn/2018apppage/publicVote_werwolf/index.html",
    	thumbLink="https://h5.48.cn/2018apppage/publicVote_werwolf/img/thumb.jpg",
    	shareTitle="publicVote_werwolf";
    wxshare();
    windowcont(shareTitle,"wx")
}