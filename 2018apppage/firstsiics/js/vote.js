voteList();

function voteList(){
	main.getMemberList(function(data){
		// console.log(dt);
		var html = [];
		if(data.status==200){
			var dt=data.content.list;
			$.each(dt.sort(down),function(index,dl){
				var index=index+1;
				html.push('<li>');
				html.push('<span class="runknum">'+index+'</span>');
				html.push('<div class="headbox">');
				html.push('<span class="headimg" style="background-image:url('+dl.avatar+')"></span>');
				html.push('<div class="namebox">');
				html.push('<p>'+dl.memberName+'</p>');
				html.push('</div></div>');
				html.push('<div class="votebox">');
				if(data.content.voteEnd==false){
					html.push('<span class="votebtn votesart" memberId='+dl.memberId+'>投票</span>');
				}else{
					html.push('<span class="votebtn voteend">'+dl.voteNum+'票</span>');
				}
				html.push('</div></li>');
			})
			$('.voteList').append(html.join(""));
		}else{
			main.alert(dt.message);
		}
	})
}



$('.voteList').on('click','.votesart',function(){
	var memberId = $(this).attr('memberId');
	if(checkFromApp()){
		main.voteDone(memberId,function(dt){
			if(dt.status==200){
				main.alert("投票成功");
			}else{
				main.alert(dt.message);
			}
		})
	}else{
		downLoadPocketApp();
	}
})


function down(a,b){
   	return b.voteNum-a.voteNum;
}
