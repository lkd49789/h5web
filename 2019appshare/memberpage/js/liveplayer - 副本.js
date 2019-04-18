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


var lrcUrl = "js/5a9bd14f0cf2bc50772d77dba.lrc";





        $.ajax({
            async: true, 
            url: CONFIG.getLiveUrl()+"/api/live/v1/h5/memberLiveShare",
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
					    thumbLink = main.formatAvata(data.content[0].memberAvatar);
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
	            			'background-image':'url('+main.formatAvata(data.content[0].memberAvatar)+')',
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

	            		$('.top-attend-layer .avatarM a').css("background",'#fff url('+ main.formatAvata(data.content[0].memberAvatar) +') no-repeat 0 0');//设置头像
						$('.user-box .avatarM').css('background','url('+ main.formatAvata(data.content[0].memberAvatar) +') no-repeat 0 0');
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
											"<span class='avatar' style='background:url("+ main.formatAvata(item.memberAvatar) +") no-repeat 0 0;'></span>"+
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
		//$('#video').css('width',(cH-65)*9/16)
		$('#video').css('width',"100%")

		var w = (cH-65)*9/16;
		//$('#video').css('margin-left',-w/2)
		$('#video').css('margin-left',"0")
		
		//返回
		$(".btn-back-prev").click(function(){
		    window.history.back()
		})
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
		            controls: 2,
		            rtmp: {
		                reconnecttime: 5,
		                bufferlength: 1
		            },

		            ak: '696fb0120f224050b94339100dd5205f' // 公有云平台注册即可获得accessKey
		        });
    			
 				player.onSeek(function(event){ 
				    $("#barrage-box").empty();
				});


    			console.log(filePath)

			}
			
				
		}
		


	



var lyricContainer, 
			video, 
			fragment, 
			lyric,
			playbtn,
			pausebtn,
			stopy,
			vy,
			per,
			defx,
			timer,
			currentTime;
			
		
		function parseLyric(text) {
			//console.log("------"+text)

			var lines = text.split('\n');

			var	result = [];

			var prevSec = "";
			var curArr = [];//相同秒数内大数组
			var curTxt = [];//弹幕数组

			$.each(lines,function(index,txt){

				var h,m,s,ms,total_s=0;
				var tep_txt = txt.split("]");
				var tep_time  = tep_txt[0].replace("[","");// 时间
				var txt_info= tep_txt[1].split("	");//弹幕内容

				tep_time = tep_time.split(":");
				h = tep_time[0];
				m = tep_time[1];
				var s_tep = tep_time[2].split(".");

				s = s_tep[0];
				//ms = Math.floor(parseInt(s_tep[1])/10);
				ms = s_tep[1];
				

				total_s += parseInt(h)*3600;
				total_s += parseInt(m)*60;
				total_s += parseInt(s);
				
				total_s = "s"+total_s;

				// console.log(curSec);

				var nickname= txt_info[0];
				var info = txt_info[1];
				
				//console.log("total_s----------"+total_s+"-----------"+nickname+"----"+info);
				//var arr  = {};
				//arr[total_s+"_"+ms] = txt_info;
				if(prevSec == ""){
					prevSec = total_s
				}
				if(prevSec == total_s){
					curTxt.push(txt_info);
					//console.log("--"+txt_info)
				}else{
					curArr.push(curTxt);
					//console.log(prevSec+"--"+curArr.toString())
					result[prevSec] = curArr;
					curTxt = [];
					curArr = [];
					prevSec = total_s;
					curTxt.push(txt_info);
				}
				if(index == lines.length-1){
					curArr.push(curTxt);
					result[prevSec] = curArr;
				}

				//console.log(curArr);
				
			})
			console.log(result)

			var curread = "";//当前读到的弹幕

			currentTime = "s"+parseInt(video.currentTime)
			//console.log(result.s11[0])
			video.addEventListener("timeupdate", function()
				{

					currentTime = "s"+parseInt(this.currentTime)

					//console.log(result[currentTime]);

					if(result[currentTime]){
						if(curread != result[currentTime]){//当前未读此弹幕
							var content1 = result[currentTime][0][0];
							var content2 = result[currentTime][0][1];
							if(content2==undefined || content2=='undefined'){
								$("#barrage-box").append('<li><p class="u-nickname">'+content1[0]+'</p><p class="barrage-info">'+content1[1]+'</p></li>');
							}else{
								$("#barrage-box").append('<li><p class="u-nickname">'+content1[0]+'</p><p class="barrage-info">'+content1[1]+'</p></li>'+
									'<li><p class="u-nickname">'+content2[0]+'</p><p class="barrage-info">'+content2[1]+'</p></li>');
								
							}
							/*console.log(result[currentTime][0][0]+"-----"+result[currentTime])
							console.log(result[currentTime][0][1]+"-----"+result[currentTime])*/
							$('#barrage-box').scrollTop($('#barrage-box')[0].scrollHeight);
							if($('#barrage-box').children().length>10){
								$("#barrage-box li:first").remove();
							}
							curread = result[currentTime];
						}else{

						}
					}
					
				});
			
		}

		function resetNum(num)
		{
			if(num < 10){
				return "0"+num;
			}else{
				return num;
			}
		}

		window.onload = function() {

			lyricContainer = document.getElementById('barrage-box');
			video = document.getElementById('video');
			
			stopy = lyricContainer.style.top
			vy = lyricContainer.style.top

			var request = new XMLHttpRequest();

				request.open('GET', lrcUrl, true);
				request.responseType = 'text';
				request.onload = function() {
					
					fragment = document.createDocumentFragment();
					lyric = parseLyric(request.response);
				};
				request.onerror = request.onabort = function(e) {
					console.log("failed")
					lyricContainer.textContent = '!failed to load the lyric';
				}
       			request.send();	
			
		}