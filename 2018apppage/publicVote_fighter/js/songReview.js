
$('.picbox div').height($('.picbox div').width()/1.96);//本曲目公演图片高度

var micname = localStorage.getItem("micname_"+main.getOid());//获取曲目歌名
var memo = localStorage.getItem("memo_"+main.getOid());//获取参演成员

$('.musicName').html(micname);//歌曲名称
if(memo=="null" || memo==null || memo=="" || memo== "undefined" || memo== undefined){//参与成员
	$('.musicMer').html("");
}else{
	$('.musicMer').html(memo);
}

//加载视频链接和图片
$.getJSON("musicImg.json", function(data) {
	$.each(data.content, function(index, dl) {
		index= index+1;
		if(GetQueryString("mid")==index){
			if(dl.vidUrl=="" || dl.vidUrl.length==0){
				$('.vidbox').unbind();
			}else{
				$('video').attr('src',dl.vidUrl);//视频链接地址
			}
			$(".qu").css("background-image","url(" + dl.vid_img + ")");//视频封面图
			$(".theImg img").attr("src", dl.img_url);
		}
   	})
});

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


//点击跳转更多图片
/*$('.manyimg-btn').click(function(){
	main.hrefTo(CONFIG.getJumpUrl()+'manyimg.html');
});*/


