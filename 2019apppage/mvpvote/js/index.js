
init();

function init(){

	getAllEvents();

	addListeners();

}

function getAllEvents(){
	main.getAllEvents(function(dt){
		var html = [];
		if(dt.status==200){
			$('.sec').show();
			// console.log(dt.content.length);
			if(dt.content.length==1){
				localStorage.setItem("_infoId",dt.content[0].infoId);
				localStorage.setItem("_code",dt.content[0].code);
				snhOpenWebUrl(CONFIG.getUrl()+'list.html');
			}else{
				$.each(dt.content,function(index,dl){
					html.push('<li infoId='+dl.infoId+' code='+dl.code+'>');
					html.push('<p class="ptit">'+dl.title+'</p>');
					html.push('<p class="ptime">'+dl.date+'</p>');	
					html.push('</li>');
				})
				$('.premiereList').append(html.join(""));
			}
		}else if(dt.status==30031){//没有可参与的投票公演
			$('.sec').remove();
			$('.noHavebox').show();
		}else if(dt.status==30030){//非丝芭卡用户
			$('.sec').remove();
			$('.nonUserbox').show();
		}else{
			main.alert(dt.message);
		}
	})

}


function addListeners(){

	$('.premiereList').on('click','li',function(){
		localStorage.setItem("_infoId",$(this).attr('infoId'));
		localStorage.setItem("_code",$(this).attr('code'));
		snhOpenWebUrl(CONFIG.getUrl()+'list.html');
	})

	$('.novotebtn').click(function(){
		snhOpenWebUrl("https://h5.48.cn/2019apppage/10010/?type=2");
	});

}