	var canPlay = true;
	var sourceBase = "https://source.48.cn";
	var mp4Base = "https://mp4.48.cn";

	function test(){	
		$.ajax({ 
			async: false, 
			url: CONFIG.getPocketBase()+"api/sharePage/nightWords", 
			// url:"http://192.168.10.46:8083/media/sharePage/nightWords",
			type: "GET", 
			dataType: 'jsonp',
            data:{
            	id:GetQueryString("id")
            },
            jsonp:'jsoncallback', 
			timeout: 5000, 
			success: function (data) {				
				create(data);				
			},
			error: function (jqXHR, textStatus, errorThrown) { 
				//alert("error"); 
			} 
		});
	}

	test();
	
	function create(json){
		// console.log(json);
		if(!json.data.canPlay){
			alert("还未开始哟！");
			canPlay = false;
		}
		$("#title").text(json.data.title);
		$("#subTitle").text(json.data.content);
		$("#audio").attr("src",mp4Base + json.data.talkPath );
		$(".imginfo").css("background-image","url(" + sourceBase  + json.data.previewPath + ")");
		$('.look_num').html(json.data.watchNum);
		$('.hot_num').html(json.data.hotNum);
		$('.zan_num').html(json.data.praiseNum);
		$('.share_num').html(json.data.shareNum);
		if(json.data.tag==""||json.data.tag==null||json.data.tag==undefined){
			$('.vid_content').hide();
		}else{
			var dataTag = json.data.tag; 
			var strs = new Array;
			strs = dataTag.split(',');
			for (i=0;i<strs.length;i++ ){ 
				var trr ="";
				trr+='<span>'+strs[i]+'</span>';
				$('.label').append(trr);
			} 
		}

		if(json.comment==""||json.comment==null||json.comment==undefined){
			$('.comments').hide();
		}else{
			$.each(json.comment,function(index,dl){
				var html = [];
				html.push('<li class="mui-table-view-cell mui-media">');
				html.push('<img class="mui-media-object mui-pull-left" src="'+sourceBase+dl.avatar+'">');
				html.push('<div class="mui-media-body">');
				html.push('<p><span class="mui-tit">'+dl.nickName+'</span><span class="mui-date">'+getDate(dl.ctime)+'</span><p>')
				html.push('<p class="mui-ellipsis">'+dl.content+'</p>');
				html.push('</div>');
				html.push('</li>');
				$('.contentlist').append(html.join(""))
			})
		}					
	}
	
	function getDate(ns) {   //转换时间戳格式
		var test = new Date(parseInt(ns));  
	    var $_year = test.getFullYear();  
	    var $_month = parseInt(test.getMonth())+1;  
	    var $_day = test.getDate();
	    var $_hours = test.getHours();
	    
	    if(test.getMinutes()<10 ){
	    	var $_minutes = "0"+test.getMinutes();
	    }else{
	    	 var $_minutes = test.getMinutes();
	    }
	    
	   	if( test.getSeconds()<10 ){
	    	var $_seconds = "0"+ test.getSeconds();
	    }else{
	    	var $_seconds = test.getSeconds();
	    }

	    return  $_year +"-"+$_month+"-"+$_day+" "+$_hours+":"+$_minutes+":"+$_seconds;  
	}



	
	$(document).on("click",".redict",function(){
		window.location.href = pocketBase;
	})






// //播放音频


	var audio,
	playbtn,
	pausebtn,
	time,
	per,
	timebar,
	play=false;

	function e(id) {
	    return document.getElementById(id);
	}
	function resetNum(num)
	{
		if(num < 10){
			return "0"+num;
		}else{
			return num;
		}
	}
	window.onload = function()
	{
		audio = e('audio');
		playbtn = e("btn-play");
		pausebtn = e("btn-pause");
		timebar = e("time-bar")

		e("control-box").addEventListener("click", function()
		{
			if(play){
				audio.pause();
				pausebtn.style.display='none';
				playbtn.style.display='block';
			}else{
				if(!canPlay){
					alert("还没开始哦！");
				}
				audio.play();
				playbtn.style.display='none';
				pausebtn.style.display='block';
			}
			play = !play;
	  	});
	  	
 		audio.addEventListener("timeupdate", function()
		{
			per = audio.currentTime/audio.duration*100;
			timebar.style.width = per + "%";
			
		})
	}