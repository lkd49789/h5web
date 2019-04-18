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
		var isplayback = false;//是否回放

		var roomid = "";//房间id
		var appkey = "632feff1f4c838541ab75195d1ceb3fa";// 
		var uid = main.getLogInUserId();   //用户id
		var nim;    //云信
		

		var from = GetQueryString("from");//来自小程序
	    if(from != "wxapp"){
	        from = ""
	    }

		//付费弹幕
		var li_pay = '<li style="top:{{top}};">'+
'            <img src="{{avatar}}">'+
'            <div>'+
'                <p class="u-nickname">{{nickname}}</p>'+
'                <p class="barrage-info">{{content}}</p>'+
'            </div>'+
'        </li>'
//addInterVal()
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
					    shareLink = "https://h5.48.cn/2017appshare/memberLiveShare/?id="+data.content[0].id;
					    thumbLink = main.formatAvata(data.content[0].memberAvatar);
					    shareTitle = "memberLiveShare";
				    
				   	 	wxshare();


            			$('.play').show();
            			if(!data.content[0].isStarted){//回放
	            			//alert("直播还未开始")            			
	            			//window.location.href="http://app.snh48.com";
	            			videoPath = data.content[0].rtmpStreamPath;
	            			isplayback = true;
            			}else{//直播
	            			videoPath = data.content[0].flvStreamPath;
	            			videoPath = videoPath.replace("flv","m3u8");//转化为m3u8 

	            			main.getLiveOne(GetQueryString("id"),function(livedt){
	            				roomid = livedt.content.roomId;
	            				if(!isFromAndroid()){//安卓不支持弹幕浮层在video上
	            					initNIM()//云信连接
	            					addInterVal()//付费弹幕侦听
	            				}
	            			})
						}
	            		$('.play').css({
	            			'background-image':'url('+main.formatAvata(data.content[0].memberAvatar)+')',
	            			'background-size':'cover',
	            			'background-position-x': '50%'
	            		})
	            		console.log("-----"+videoPath)
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
					window.location.href="https://h5.48.cn/2017appshare/memberLiveShare/?id="+path+"&from="+from;
				})
            },
            error:function(e){
            	console.log("err")
            }
        });
		//加关注 评论等 打开app 或 跳到下载页
		$(".user-box,.opt-box").click(function(){
			//wx.miniProgram.postMessage({ msg: "我是网页"})
			//window.location.href = "https://h5.48.cn/pocket48/";
			console.log("------------------"+from)
			if(from == "wxapp"){
				window.location.href = "https://h5.48.cn/memberPage/download.html";
			}else{
				downLoadPocketApp();
			}
			//window.location.href = "https://h5.48.cn/pocket48/";
		})
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
				if(!isFromAndroid()){//安卓没有弹幕
					loadLrc();
				}
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
		        //拖动时候清空ul
    			player.onSeek(function(event){ 
				    $("#barrage-box").empty();
				});

    			if(isplayback){//回放加载弹幕
					loadLrc()
				}
    			console.log(filePath)

			}
			
				
		}
		



		var lyricContainer, 
			video, 
			lyric,
			defx,
			timer,
			currentTime,
			lrcUrl;

		lrcUrl = CONFIG.getSource() + GetQueryString("lrc");
		//lrcUrl = "test1.lrc";
		
		function parseLyric(text) {
			//console.log("------"+text)

			var lines = text.split('\n');

			var	result = [];

			var prevSec = "";
			var curArr = [];//相同秒数内大数组
			var curTxt = [];//弹幕数组

			$.each(lines,function(index,txt){
				if(txt.length > 0 && txt.indexOf("]") > 0){
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
				}
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
						
						curread = result[currentTime];
					}else{

					}
				}

				if($('#barrage-box').children().length>10){
					$("#barrage-box li:first").remove();
				}
				
			});
		}
		

		function loadLrc() {
			lyricContainer = document.getElementById('barrage-box');
			video = document.getElementById('video');
			
			var request = new XMLHttpRequest();

				request.open('GET', lrcUrl, true);
				request.responseType = 'text';
				request.onload = function() {
					lyric = parseLyric(request.response);
					//console.log("-----------"+lyric)
					
				};
				request.onerror = request.onabort = function(e) {
					console.log("failed")
					//lyricContainer.textContent = '!failed to load the lyric';
				}
       			request.send();	
			
		}



//initNIM  直播 弹幕



	/*
	//
	//初始化连接
	//

	*/
	function initNIM(){
		nim = SDK.NIM.getInstance({
		    debug: true,
		    appKey: appkey,
		    account: uid,
		    token: uid,
		    onconnect: onConnect,
		    onwillreconnect: onWillReconnect,
		    ondisconnect: onDisconnect,
		    onerror: onError
		});
	}
	/*
	//
	//连接成功  获取聊天室服务器地址
	//
	*/

	function onConnect() {
	    console.log('连接成功');
	    //获取聊天室服务器地址
	    nim.getChatroomAddress({
		    chatroomId: roomid,
		    done: getChatroomAddressDone
		});
	}
	function getChatroomAddressDone(error, obj) {
	    console.log('获取聊天室地址' + (!error?'成功':'失败'), error, obj);
	    address = obj.address[0];
	    cheateChatroom();//
	}
	function onWillReconnect(obj) {
	    // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
	    console.log('即将重连');
	    console.log(obj.retryCount);
	    console.log(obj.duration);
	}
	function onDisconnect(error) {
	    // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
	    console.log('丢失连接');
	    console.log(error);
	    if (error) {
	        switch (error.code) {
	        // 账号或者密码错误, 请跳转到登录页面并提示错误
	        case 302:
	        	main.hrefTo("login.html");
	            break;
	        // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
	        case 417:
	        	main.hrefTo("login.html");
	            break;
	        // 被踢, 请提示错误后跳转到登录页面
	        case 'kicked':
	        	main.hrefTo("login.html");
	            break;
	        default:
	            break;
	        }
	    }
	}
	function onError(error) {
	    console.log(error);
	}
	/*
	//
	//连接成功  获取聊天室服务器地址
	//
	*/
	function cheateChatroom(){
		chatroom = new Chatroom({
		    appKey: appkey,
		    account: uid,
		    token: uid,
		    chatroomId: roomid,
		    chatroomAddresses: [
		        address,
		        address
		    ],
		    onconnect: onChatroomConnect,
		    onerror: onChatroomError,
		    onwillreconnect: onChatroomWillReconnect,
		    ondisconnect: onChatroomDisconnect,
		    // 消息
		    onmsgs: onChatroomMsgs
		});

		
	}
	function onChatroomConnect(chatroomInfo) {
	    console.log('进入聊天室', chatroomInfo);
	}
	function onChatroomWillReconnect(obj) {
	    // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
	    console.log('即将重连', obj);
	}
	function onChatroomDisconnect(error) {
	    // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
	    console.log('连接断开', error);
	    if (error) {
	        switch (error.code) {
	        // 账号或者密码错误, 请跳转到登录页面并提示错误
	        case 302:
	        	main.hrefTo("login.html");
	            break;
	        // 被踢, 请提示错误后跳转到登录页面
	        case 'kicked':
	        	main.hrefTo("login.html");
	            break;
	        default:
	            break;
	        }
	    }
	}
	function onChatroomError(error, obj) {
	    console.log('发生错误', error, obj);
	}
	function onChatroomMsgs(msgs) {
	    console.log('收到聊天室消息', msgs);
	    $.each(msgs,function(index,msg){
	    	if(msg.custom){//有自定义内容的话 属于发的消息;
	    		appendChatMsg(msg);
	    		
	    	}
	    })
	}

	function appendChatMsg(msgs){
		var msg_custom;
		if(msgs.custom){//实时消息
			msg_custom= main.getJson(msgs.custom);
		}
		if(msg_custom.contentType == 1){//普通评论
			$("#barrage-box").append('<li><p class="u-nickname">'+msg_custom.senderName+'</p><p class="barrage-info">'+msg_custom.content+'</p></li>');
			$('#barrage-box').scrollTop($('#barrage-box')[0].scrollHeight);

			if($('#barrage-box').children().length>15){
				$("#barrage-box li:first").remove();
			}
		}else if(msg_custom.contentType == 15){//付费弹幕
			var _li = li_pay;
			_li = _li.replace("{{top}}",getRandomTop());
			_li = _li.replace("{{nickname}}",msg_custom.senderName);
			_li = _li.replace("{{content}}",msg_custom.content);
			_li = _li.replace("{{avatar}}",CONFIG.getSource() + msg_custom.senderAvatar);

			$(".barrage-box-pay").append(_li)

			if($('.barrage-box-pay').children().length>5){
				$(".barrage-box-pay li:first").remove();
			}
		}
		
		
	}
	//高度
	function getRandomTop(){
		var init_top = 20;
		init_top += Math.random()*20;
		return init_top+"%";
	}
	//添加侦听
	function addInterVal(){
		setInterval(function(){
			$.each($(".barrage-box-pay > li"),function(index,_li){
				var _left = parseInt($(_li).css("left"))-1
				//console.log(_left+"px")
				$(_li).css("left",_left+"px")

				if(_left < -$("body").width()){
					$(_li).remove()
				}
			})
		},10)
	}