(function(data) {

	//初始化
	data.init = function(){
		INDEX.shareList();
		INDEX.addListeners()
	}
	//事件
	data.addListeners = function(){
		//切换
		$('.tab li').click(function(){
			var tval = $(this).attr('val');
			$(this).addClass('active');
			$('.contentbox'+tval).show();
			$(this).siblings().removeClass('active');
			$('.contentbox'+tval).siblings().hide();
		})

		//去MATE48安利
		$('.amwaybtn').click(function(){
			window.web.launchWechatMiniProgram(launchParams2());
		})
	}

	//日榜列表
	data.shareList = function(){
		main.getMyrank(function(dt){
			console.log(dt);
			//助力值
			$('.helpval').html(dt.content.suports);
			//排名
			$('.ranking').html(dt.content.rank);
			if(dt.content.dayRankList.length==0 || dt.content.dayRankList==""){
				$('.contentbox2').html('<img src="../../common/images/tip.png" class="tip" style="width:40%;margin-left:30%;padding-top:40%;">')
				$('.contentbox2').css('backgroundColor','transparent')
			}else{
				var html = [];
				$.each(dt.content.dayRankList,function(index,info){
					html.push('<p class="date">'+info.date+'</p>');
					html.push('<ul class="daylist">');
					$.each(info.rankInfos,function(item,dt){
						//console.log(dt)
						html.push('<li>');
						html.push('<div class="leftbox">');
						html.push('<span class="rank">'+dt.rank+'</span>');
						html.push('<span class="avatar" style="background-image: url('+dt.avatar+');"></span>');
						html.push('<em>'+dt.nicker+'</em>');
						html.push('</div>');
						html.push('<div class="rightbox">助力值：<em>'+dt.suports+'</em></div>');
						html.push('</li>');
					})
					html.push('</ul>');
				})
				$('.daybox').append(html.join(""));
			}
		})
	}

}(window.INDEX = {}));

INDEX.init()


function launchParams2() {//跳转详情页
	var param = {"defaultDetailsParam": {"infoId": 314}}
	var para = encodeURIComponent(JSON.stringify(param));
	return JSON.stringify({
		id: "gh_dc1ce10e9cd3",
		path: "pages/detail/detail?para="+para+"&apptoken="+window.web.getAccessToken(),
		type: 'release',
		callback: "launchCallback"
	})
}