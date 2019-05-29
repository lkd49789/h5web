
init();

function init(){

	
	addListeners();
	rankList();
}




function addListeners(){
	//我的点赞记录
	$('.myzanbtn').click(function(){
		main.hrefToEnd("myList.html?wxtoken="+GetQueryString('wxtoken'));
	})

	//点击总票数
	$('.daylist').on('click','li',function(){
		var id = $(this).attr("id");
		main.hrefToEnd("mermsg.html?id="+id);
	})
}


//排名

function rankList(){
	main.rankList(function(dt){
		var html = [];
		if(dt.status == 200){
			$.each(dt.content,function(index,info){
				html.push('<li id='+index+'>');
				html.push('<div class="leftbox">');
				html.push('<span class="rank">'+info.totalRank+'</span>');
				html.push('<span class="avatar" style="background-image: url('+info.avatar+');"></span>');
				html.push('<em>'+info.nicker+'<img src="'+info.teamUrl+'"></em>');
				html.push('</div>');
				html.push('<div class="rightbox"><em class="votenum">'+info.totle+'</em><span>票</span></div>');
				html.push('</li>');
				localStorage.setItem("dreamEnd"+index,JSON.stringify(info))
			})
			$('.daylist').append(html.join(""));
		}
	})
}