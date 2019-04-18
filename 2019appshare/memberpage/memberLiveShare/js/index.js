		var cH = document.documentElement.clientHeight;
		var cW = document.documentElement.clientWidth;
		var videoPath = "";
		var shareTitlestr = "";//分享标题
		var shareDesc = "";//分享标题
		var shareLink = "";//分享链接
		var thumbLink = "";//分享图片
		var shareTitle="";
		var filePath = "";
	
		 var imgPath = "https://source.48.cn";

		

        $.ajax({
            async: true, 
            url: CONFIG.getLiveUrl()+"api/live/v1/h5/memberLiveShare",
            type: "POST", 
            dataType: 'json',
            data:JSON.stringify({
            	id:GetQueryString("id")
            }),
            timeout: 5000, 
            contentType: "application/json; charset=utf-8", 
            success: function (dt){
            	//var data = eval("("+dt+")");
            	var data = JSON.parse(dt)
            	console.log(data);
            	if(data.status ==200){ 
            		

            			//分享全局变量
					    shareTitlestr = data.content[0].title;
					    shareDesc = data.content[0].subTitle;
					    shareLink = "https://h5.48.cn/share/memberLiveShare/?id="+data.content[0].id;
					    thumbLink = imgPath+data.content[0].memberAvatar;
					    shareTitle = "memberLiveShare";
				    
				   	 	wxshare();


            			$('.play').show();
            			if(!data.content[0].isStarted){//回放
	            			//alert("直播还未开始")            			
	            			//window.location.href="http://app.snh48.com";
	            			videoPath = data.content[0].rtmpStreamPath;
            			}else{//直播
	            			videoPath = data.content[0].hlsStreamPath;
						}
	            		$('.play').css({
	            			'background-image':'url('+imgPath+data.content[0].memberAvatar+')',
	            			'background-size':'cover',
	            			'background-position-x': '50%'
	            		})
	            		
	            		if(isFromAndroid()||isFromIphone()){
	            			// alert(data.content[0].hlsStreamPath)
							$('#video').attr({

		            			'src':videoPath
		            		});

	
	            		}else{

							$('#playerContainer').show();

	            			$('video').hide();

	            			filePath = videoPath

	            			$('#video').before("<div id='playercontainer' style='margin: 0 auto;'></div>");

	            		}

	            		$('.top-attend-layer .avatarM a').css("background",'#fff url('+ imgPath+data.content[0].memberAvatar +') no-repeat 0 0');//设置头像
						$('.user-box .avatarM').css('background','url('+ imgPath+data.content[0].memberAvatar +') no-repeat 0 0');
	            		$('.user-box .item a').html(data.content[0].memberName);
	            		$('.user-box .item span').html(data.content[0].title);

	            		var videoUrl = videoPath;

	            		if(data.content[0].liveStatus=="1"){
	            			$(".top-attend-layer .item").html("回放中")
	            		}else{
	            			$(".top-attend-layer .item").html("直播中")
	            		}

	            		
	            		var html = [];
	            		html.push("<li>"+
								"<em class='bg-sp-new ico-x' id='to-top2' onclick='tip();'></em><p id='praise-q' class='c-y'>"+ data.content[0].shareCount +"</p>"+
							"</li>"+
							"<li>"+
								"<em class='bg-sp-share ico-x' id='to-top3'  onclick='tip();'></em><p id='comment-q' class='c-y'>"+ data.content[0].quoteCount +"</p>"+
							"</li>"+
							"<li>"+
								"<em class='bg-sp-msg ico-x' id='to-top3'  onclick='tip();'></em><p id='comment-q' class='c-y'>"+ data.content[0].commentCount +"</p>"+
							"</li>"+
							"<li>"+
								"<em class='bg-sp-love ico-x' id='to-top3'  onclick='tip();'></em><p id='comment-q' class='c-y'>"+ data.content[0].praiseCount +"</p>"+
							"</li>");
						$('.opt-box').append(html.join(''));
	            		
	            		
	            		$.each(data.content, function(i,item) {
	            			
	            			if(i>0){
	            				var htmlV = [];
		            			htmlV.push("<li>"+
									"<div class='in'>"+
										"<div class='imgbox'><img src='"+ imgPath+(item.picPath).split(",")[0] +"' alt='"+item.id+"' class='hrefTo'></div>"+
										"<div class='bom flexbox'>"+
											"<span class='avatar' style='background:url("+ imgPath+item.memberAvatar +") no-repeat 0 0;'></span>"+
											"<p>"+
												"<a href='javascipt:;'>"+ item.memberName +"</a>"+
												"<span class='fs24 c-g disb'>"+ item.title +"</span>"+
											"</p>"+
										"</div>"+
									"</div>"+
								"</li>");
								$('.vod-list').append(htmlV.join(''));
	            			}
	            		});

	            		$('.vod-list .disb').css('width', cW-268.453); 	
            		//}	
            			
            	}else{
            		alert(data.content)
            	}
            	
            	$('.vod-list li').click(function(){
					var path = $(this).find('.hrefTo').attr('alt');
					console.log("path>>>"+path)
					window.location.href="https://h5.48.cn/share/memberLiveShare/?id="+path;
				})
            },
            error:function(e){
            	console.log("err")
            }
        });

		$('#video-box,#vidoe').css('height',cH-65);
		$('#video').css('width',(cH-65)*9/16)

		var w = (cH-65)*9/16;
		$('#video').css('margin-left',-w/2)

		function tip(){
			$('#school_browser').show();
			fadeIN()
		}
		
		function fadeIN(){
			$('#school_browser').click(function(){
				$(this).hide();
			})
		}
		
		var flag = false;
		
		function videoPlay(){
			$('.play').hide();
			if(isFromAndroid()||isFromIphone()){
				document.querySelector("#video").currentTime=0;
				document.querySelector("#video").play();

			}else{
 				var player = cyberplayer("playercontainer").setup({
		            width: 421,
		            height:750,
		            stretching: "uniform",
		            file:filePath,
		            autostart: true,
		            repeat: false,
		            volume: 100,
		            controls: true,
		            rtmp: {
		                reconnecttime: 5,
		                bufferlength: 1
		            },
		            ak: '696fb0120f224050b94339100dd5205f' // 公有云平台注册即可获得accessKey
		        });
    			
    			console.log(filePath)

			}
			
				
		}
		


	
