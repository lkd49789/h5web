$('.rankList').css({'min-height':$('body').height()-$('.upbox').height()});
	getBalance(succ);
	 //应援排行
 	function getBalance(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/aid/rank",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            /*beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },*/
            data: JSON.stringify({

            }),
            timeout: 15000, 
            dataType:"json",
            success: function (dt) { 
                succ(dt);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
				//alert("eee");
            } 
        });
    }


    function succ(dt){
    	var html = [];
    	if(dt.status==200){
    		if(dt.content.length==0){
    			$('.rankList ul').html("<p>暂无数据！</p>");
    		}else{
	    		//第一名
	    		var firstContent = dt.content[0];
	    		$('.avatar').css('background-image','url('+formatAvata(firstContent.aidAvatar)+')');
	    		$('.topnikename').html(firstContent.voterName);
	    		// $('.toptime').html(firstContent.voteTime);
	    		$('.topnum span').html(firstContent.aidName+firstContent.voteCount+'票');

	    		//其他名次
	    		$.each(dt.content,function(index,dl){
	    			index = index+1;
					if(index>1){
						html.push('<li>');
						if(index==2){
							html.push('<span class="silver">'+index+'</span>');
						}else if(index==3){
							html.push('<span class="copper">'+index+'</span>');
						}else{
							html.push('<span class="ranknum">'+index+'</span>');
						}
						
						html.push('<div class="newsmsg">');
						html.push('<p class="nikename">'+dl.aidName+'</p>');
						// html.push('<p class="time">'+dl.voteTime+'</p>');
						html.push('</div>');
						if(index==2){
							html.push('<span class="num the2">'+getGroup(dl.aidGroup)+dl.voteCount+'票</span>');
						}else if(index==3){
							html.push('<span class="num the3">'+getGroup(dl.aidGroup)+dl.voteCount+'票</span>');
						}else{
							html.push('<span class="num the">'+getGroup(dl.aidGroup)+dl.voteCount+'票</span>');
						}
						html.push('</li>');
					}
				})

				$('.rankList ul').append(html.join(""));
				$('.rankList').css({'min-height':$('body').height()-$('.upbox').height()});
			}
    	}else{
    		mainAlert(dt.message);
    	}
    }
    function getGroup(id){
        return id+"48 "
    	// if(id == "10"){
    	// 	return "SNH48 "
    	// }else if(id == "11"){
    	// 	return "BEJ48 "
    	// }else if(id == "12"){
    	// 	return "GNZ48 "
    	// }
    }

       //弹框
    function mainAlert(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }

    //无域名头像添加域名
    function formatAvata(avata){
        if(avata.indexOf("http://")>=0 ||avata.indexOf("https://")>=0){
            return avata
        }else{
            return CONFIG.getSource()+avata;
        }
    }