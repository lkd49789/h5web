	var roomid = 7958505;//成员房间id 测试
	var appkey = "632feff1f4c838541ab75195d1ceb3fa";//
	var address = "";//聊天室服务器地址
	var chatroom;     //定义聊天室
	var uid = main.getLogInUserId();   //用户id
	var nim;    //云信
	var prev_time = 0;       //上一个时间 
	var isfirst = true;       //是否第一次加载
	var isroomfirst = true;

	//时间线
	var timeLine = '<span class="time">{{time}}</span>'
	//本人发的消息
	var li_self = '<li class="rightChat" time="{{time}}">'+
'						<div class="user_head">'+
'							<span class="head" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></span>'+
'							<span class="team">{{senderLevel}}</span>'+
'						</div>'+
'						<div class="dialogue_box">'+
'							<span class="member_name">{{senderName}}{{senderHonor}}</span>'+
'							<div class="dialogue"><span><span class="text-self">{{text}}</span></span></div>'+
'						</div>'+
'					</li>'
	//文本消息
	var msg_member_txt = '<li class="leftChat" time="{{time}}">'+
'						<div class="member_head">'+
'							<span class="head {{senderLevel1}}-bd" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></span>'+
'							<span class="team team-font-{{senderLevel2}}">{{senderLevel3}}</span>'+
'						</div>'+
'						<div class="dialogue_box">'+
'							<span class="member_name">{{senderName}}{{badge}}</span>'+
'							<div class="dialogue"><span>{{text}}</span></div>'+
'						</div>'+
'					</li>'
	//翻牌消息
	var msg_member_fanpai = '<li class="leftChat" time="{{time}}">'+
'						<div class="member_head">'+
'							<span class="head {{senderLevel1}}-bd" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></span>'+
'							<span class="team team-font-{{senderLevel2}}">{{senderLevel3}}</span>'+
'						</div>'+
'						<div class="dialogue_box">'+
'							<span class="member_name">{{senderName}}{{badge}}</span>'+
'							<div class="dialogue"><p class="fanpai_top">{{text}}</p><p  class="fanpai_bottom">{{faipaiContent}}</p></div>'+
'						</div>'+
'					</li>'
	//图片消息
	var msg_member_img = '<li class="leftChat" time="{{time}}">'+
'							<div class="member_head">'+
'								<span class="head {{senderLevel1}}-bd" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></span>'+
'								<span class="team team-font-{{senderLevel2}}">{{senderLevel3}}</span>'+
'							</div>'+
'							<div class="dialogue_box">'+
'								<span class="member_name">{{senderName}}{{badge}}</span>'+
'								<div class="dialogue"><img src="{{img}}" data-preview-src="" data-preview-group="1"></div>'+
'							</div>'+
'						</li>'
	//语音消息
	var msg_member_audio = '<li class="leftChat" time="{{time}}">'+
'								<div class="member_head">'+
'									<span class="head {{senderLevel1}}-bd" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></span>'+
'									<span class="team team-font-{{senderLevel2}}">{{senderLevel3}}</span>'+
'								</div>'+
'								<div class="dialogue_box">'+
'									<span class="member_name">{{senderName}}{{badge}}</span>'+
'									<div class="dialogue voice" src="{{mp3Url}}"><span><b><img src="img/p1_yy.png" class="zt"><img src="img/p1_yy_1.png" class="zt_1"><img src="img/p1_yy_2.png" class="zt_2"><b><em class="sec">{{dur}}</em></span></div>'+
'								</div>'+
'							</li>'
	//视频消息
	var msg_member_vidio = '<li class="leftChat" time="{{time}}">'+
'									<div class="member_head">'+
'										<span class="head {{senderLevel1}}-bd" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></span>'+
'										<span class="team team-font-{{senderLevel2}}">{{senderLevel3}}</span>'+
'									</div>'+
'									<div class="dialogue_box">'+
'										<span class="member_name">{{senderName}}{{badge}}</span>'+
'										<div class="dialogue video">'+
'											<video width="100%" height="auto" class="videoplay" poster="img/v-bg.png" src="{{videourl}}">'+
'											</video>'+
// '											<img src="img/icon_play.png" class="icon_playbtn">'+
// '                                           <em class="timelengtn">{{dur}}</em>'+
'										</div>'+
'									</div>'+
'								</li>'
	
	//直播消息
	var msg_member_live = '<li class="leftChat" time="{{time}}">'+
'							<div class="member_head">'+
'								<span class="head {{senderLevel1}}-bd" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></span>'+
'								<span class="team team-font-{{senderLevel2}}">{{senderLevel3}}</span>'+
'							</div>'+
'							<div class="dialogue_box">'+
'								<span class="member_name">{{senderName}}{{badge}}</span>'+
'								<div class="dialogue msg-live" liveid="{{liveid}}"><img src="{{img}}"><p><img src="img/live-video.png">{{referenceTitle}}</p></div>'+
'							</div>'+
'						</li>'

	//电台消息
	var msg_member_diantai = '<li class="leftChat" time="{{time}}">'+
'							<div class="member_head">'+
'								<span class="head {{senderLevel1}}-bd" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></span>'+
'								<span class="team team-font-{{senderLevel2}}">{{senderLevel3}}</span>'+
'							</div>'+
'							<div class="dialogue_box">'+
'								<span class="member_name">{{senderName}}{{badge}}</span>'+
'								<div class="dialogue msg-diantai" liveid="{{liveid}}"><img src="{{img}}"><p><img src="img/live-audio.png">{{referenceTitle}}</p></div>'+
'							</div>'+
'						</li>'
	//侧边消息
	var msg_fans = '<li>'+
'						<div class="headingbox">'+
'							<span class="user_heading" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></span>'+
'							<span class="team">{{senderLevel}}</span>'+
'						</div>'+
'						<div class="userbox">'+
'							<span class="nikename">{{senderName}}{{senderHonor}}<em class="user_time">{{time}}</em></span>'+
'							<div class="user_content">{{text}}</div>'+
'						</div>'+
'					</li>'
	//
initNIM()
initRoomInfo()
	//获取成员房间信息
	function initRoomInfo(){
		main.getRoomInfo(function(dt){
			if(dt.status == 200){
				$(".juju-title").html(dt.content.topic);
				$(".chatbox").css({"background-image":"url("+CONFIG.getSource()+dt.content.bgPath+")","background-size":"100% 100%"});
				roomid = dt.content.roomId;
			}
		})
	}
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
// getMemberHistory();
// 			addListeners();//
// 			getFansHistory();
		init();//初始化
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

//获取徽章 加载历史信息
function init(){
	main.saveUserBadge(function(dt){//获取用户徽章
		if(dt.status == 200){
			var str = "";
			$.each(dt.content.myBadgeData,function(index,info){
				if(info.isHave == 1){
					if(str != ""){
						str += ";";
					}
					str += info.smallPicPtah;
				}
			})
			localStorage.setItem("POCKET48_USER_BADGE",str);
			getMemberHistory();
			addListeners();
			getFansHistory();

		}else{

		}
	})
}
//处理消息
function appendChatMsg(msgs){
	var msg_custom;
	if(msgs.extInfo){//历史消息
		msg_custom= main.getJson(msgs.extInfo);
	}else if(msgs.custom){//实时消息
		msg_custom= main.getJson(msgs.custom);
	}
	//console.log(msgs.extInfo)
	switch(msg_custom.role){ // -1 游客(粉丝) 0 加入者 1 管理员 2 房主
		case -1://粉丝消息
			if(msg_custom.senderId == main.getLogInUserId()){//自己发的消息
				addMsgLeft(msgs)
			}else{
				addMsgRight(msgs)
			}
			break;
		default://其余主房间添加消息
			addMsgLeft(msgs)
			
			break;
	}
}
//主房间添加消息
function addMsgLeft(msgs){
	var msg_custom;
	if(msgs.extInfo){//历史消息
		msg_custom= main.getJson(msgs.extInfo);
	}else if(msgs.custom){//实时消息
		msg_custom= main.getJson(msgs.custom);
	}
	
	var html = "";
	if(msg_custom.senderId == main.getLogInUserId()){//本人发的消息
		if(msgs.userUpdateTime){
			html += addTimeLine(msgs.userUpdateTime);
		}else if(msgs.msgTime){
			html += addTimeLineH(msgs.msgTime);
		}
		html += getDomSelf(msgs)
	}else{
		console.log(msg_custom.messageObject);
		switch(msg_custom.messageObject){
			case "text"://文字消息
				if(msgs.userUpdateTime){
					html += addTimeLine(msgs.userUpdateTime);
					html += getTextMsg(msgs)
				}else if(msgs.msgTime){
					html += getTextMsg(msgs)
					html += addTimeLineH(msgs.msgTime);
				}
				break;
			case "faipaiText"://翻牌消息
				
				if(msgs.userUpdateTime){
					html += addTimeLine(msgs.userUpdateTime);
					html += getFanpaiMsg(msgs)
				}else if(msgs.msgTime){
					html += getFanpaiMsg(msgs)
					html += addTimeLineH(msgs.msgTime);
				}
				
				break;
			case "audio"://语音消息
				
				if(msgs.userUpdateTime){
					html += addTimeLine(msgs.userUpdateTime);
					html += getAudioMsg(msgs)
				}else if(msgs.msgTime){
					html += getAudioMsg(msgs)
					html += addTimeLineH(msgs.msgTime);
				}
				
				break;
			case "image"://图片消息
				
				if(msgs.userUpdateTime){
					html += addTimeLine(msgs.userUpdateTime);
					html += getImgMsg(msgs)
				}else if(msgs.msgTime){
					html += getImgMsg(msgs)
					console.log("----"+msgs.msgTime)
					html += addTimeLineH(msgs.msgTime);
				}
				break;
			case "videoRecord"://视频消息
				
				if(msgs.userUpdateTime){
					html += addTimeLine(msgs.userUpdateTime);
					html += getVidioMsg(msgs)
				}else if(msgs.msgTime){
					html += getVidioMsg(msgs)
					html += addTimeLineH(msgs.msgTime);
				}
				
				break;
			case "live"://直播消息
				
				if(msgs.userUpdateTime){
					html += addTimeLine(msgs.userUpdateTime);
					html += getLiveMsg(msgs)
				}else if(msgs.msgTime){
					html += getLiveMsg(msgs)
					html += addTimeLineH(msgs.msgTime);
				}
				
				break;
			case "diantai"://电台消息
				
				if(msgs.userUpdateTime){
					html += addTimeLine(msgs.userUpdateTime);
					html += getDianTaiMsg(msgs)
				}else if(msgs.msgTime){
					html += getDianTaiMsg(msgs)
					html += addTimeLineH(msgs.msgTime);
				}
				
				break;

			case "chatBackgroundColor"://背景消息更换
				//$(".chatbox").css({"background-image":"url("+CONFIG.getSource()+dt.content.bgPath+")","background-size":"100% 100%"});
				break;
				
		}

	}
	//判断头部还是尾部添加
	if(msgs.extInfo){//历史消息 头部
		$(".chatList").prepend(html)
		if(isroomfirst){//第一次加载
			setTimeout(function(){
				mui('.chatbox').scroll().reLayout();
				mui('.chatbox').scroll().scrollToBottom(100);
				isroomfirst = false;
			},500)
			
		}
	}else{
		$(".chatList").append(html)
		mui('.chatbox').scroll().reLayout();
		mui('.chatbox').scroll().scrollToBottom(100);
	}
	
}
//添加时间线-新消息
function addTimeLine(_time){
	var last_time;
	if($(".chatList > li").length >0){
		last_time = parseInt($(".chatList>li:last").attr("time"));
	}else{
		last_time = 0;
	}
	
	return getTimeLine(last_time,_time);
}
//历史消息
function addTimeLineH(_time){
	var last_time;
	if($(".chatList > li").length >0){
		last_time = $(".chatList > li").first().attr("time");
	}else{
		last_time = 0;
	}
	//console.log($(".chatList > li").length+"--------------------------"+last_time+"--------------------"+_time)
	return getTimeLine(_time,last_time);
}
//粉丝列表添加消息
function addMsgRight(msgs){
	//$(".weekList").append()
	var html = "";
	var msg_custom;
	if(msgs.extInfo){//历史消息
		msg_custom= main.getJson(msgs.extInfo);
	}else if(msgs.custom){//实时消息
		msg_custom= main.getJson(msgs.custom);
	}

	html += getFansMsg(msgs)

	//判断头部还是尾部添加
	if(msgs.extInfo){//历史消息 
		$(".weekList").append(html)
	}else{//头部  实时消息
		$(".weekList").prepend(html)
		showMsgTips(msg_custom);
	}
}
//显示粉丝消息提示

function showMsgTips(_msg_custom){
	
	if($(".tips").attr("canplay") == "true"){
		if(!mui('.mui-off-canvas-wrap').offCanvas().isShown('right')){//主房间时候才显示消息提醒
			$(".tips").attr("canplay","false");
			$(".tips").find(".user_heading").css({"background-image":"url("+main.formatAvata(_msg_custom.senderAvatar)+")","background-size":"100%"});
			$(".tips").find(".nikename").html(_msg_custom.senderName);
			$(".tips").find(".user_content").html(_msg_custom.text);
			$(".tips").show();
			$(".tips").animate({"right":"0"},500,function(){
				setTimeout(function(){
					$(".tips").animate({"right":"-50%"},function(){
						$(".tips").attr("canplay","true");
					});
				},1000)
			});
		}
	}
}
//粉丝主房间自己消息
function getDomSelf(msgs){
	var msg_custom;
	if(msgs.extInfo){//历史消息
		msg_custom= main.getJson(msgs.extInfo);
	}else if(msgs.custom){//实时消息
		msg_custom= main.getJson(msgs.custom);
	}
	
	var _li = li_self;
	if(msgs.userUpdateTime){//新消息时间
		_li = _li.replace("{{time}}",msgs.userUpdateTime);
	}else if(msgs.msgTime){//历史消息时间
		_li = _li.replace("{{time}}",msgs.msgTime);
	}
	_li = _li.replace("{{avata}}",main.formatAvata(msg_custom.senderAvatar));
	_li = _li.replace("{{senderLevel}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderName}}",msg_custom.senderName);
	_li = _li.replace("{{text}}",main.findEmotion(msg_custom.text));
	_li = _li.replace("{{senderHonor}}",getBadgeImg(msg_custom.senderHonor));
	return _li;
}
//成员文本消息
function getTextMsg(msgs){
	var msg_custom;
	if(msgs.extInfo){//历史消息
		msg_custom= main.getJson(msgs.extInfo);
	}else if(msgs.custom){//实时消息
		msg_custom= main.getJson(msgs.custom);
	}
	var _li = msg_member_txt;
	if(msgs.userUpdateTime){//新消息时间
		_li = _li.replace("{{time}}",msgs.userUpdateTime);
	}else if(msgs.msgTime){//历史消息时间
		_li = _li.replace("{{time}}",msgs.msgTime);
	}
	
	_li = _li.replace("{{senderLevel1}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel2}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel3}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{avata}}",main.formatAvata(msg_custom.senderAvatar));
	_li = _li.replace("{{senderName}}",msg_custom.senderName);
	_li = _li.replace("{{text}}",main.findEmotion(msg_custom.text));
	_li = _li.replace("{{badge}}",checkOwner(msg_custom.role));
	
	return _li;
}
//成员翻牌消息
function getFanpaiMsg(msgs){
	var msg_custom;
	if(msgs.extInfo){//历史消息
		msg_custom= main.getJson(msgs.extInfo);
	}else if(msgs.custom){//实时消息
		msg_custom= main.getJson(msgs.custom);
	}
	var _li = msg_member_fanpai;
	if(msgs.userUpdateTime){//新消息时间
		_li = _li.replace("{{time}}",msgs.userUpdateTime);
	}else if(msgs.msgTime){//历史消息时间
		_li = _li.replace("{{time}}",msgs.msgTime);
	}
	
	_li = _li.replace("{{senderLevel1}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel2}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel3}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{avata}}",main.formatAvata(msg_custom.senderAvatar));
	_li = _li.replace("{{senderName}}",msg_custom.senderName);
	_li = _li.replace("{{text}}",main.findEmotion(msg_custom.messageText));
	_li = _li.replace("{{faipaiContent}}",main.findEmotion(msg_custom.faipaiContent));
	_li = _li.replace("{{badge}}",checkOwner(msg_custom.role));
	
	return _li;
}
//成员图片消息
function getImgMsg(msgs){
	var msg_custom;
	if(msgs.extInfo){//历史消息
		msg_custom= main.getJson(msgs.extInfo);
	}else if(msgs.custom){//实时消息
		msg_custom= main.getJson(msgs.custom);
	}
	var _li = msg_member_img;
	if(msgs.userUpdateTime){//新消息时间
		_li = _li.replace("{{time}}",msgs.userUpdateTime);
	}else if(msgs.msgTime){//历史消息时间
		_li = _li.replace("{{time}}",msgs.msgTime);
	}
	_li = _li.replace("{{senderLevel1}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel2}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel3}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{avata}}",main.formatAvata(msg_custom.senderAvatar));
	_li = _li.replace("{{senderName}}",msg_custom.senderName);
	if(msgs.files){//实时消息
		_li = _li.replace("{{img}}",msgs.file.url);
	}else if(msgs.bodys){//历史消息
		_li = _li.replace("{{img}}",JSON.parse(msgs.bodys).url);
	}
	_li = _li.replace("{{badge}}",checkOwner(msg_custom.role));

	return _li;
}
//成员音频消息
function getAudioMsg(msgs){
	var msg_custom;
	if(msgs.extInfo){//历史消息
		msg_custom= main.getJson(msgs.extInfo);
	}else if(msgs.custom){//实时消息
		msg_custom= main.getJson(msgs.custom);
	}
	var _li = msg_member_audio;
	if(msgs.userUpdateTime){//新消息时间
		_li = _li.replace("{{time}}",msgs.userUpdateTime);
	}else if(msgs.msgTime){//历史消息时间
		_li = _li.replace("{{time}}",msgs.msgTime);
	}
	_li = _li.replace("{{senderLevel1}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel2}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel3}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{avata}}",main.formatAvata(msg_custom.senderAvatar));
	_li = _li.replace("{{senderName}}",msg_custom.senderName);
	//_li = _li.replace("{{mp3Url}}",msgs.file.mp3Url);
	if(msgs.file){//实时消息
		_li = _li.replace("{{mp3Url}}",msgs.file.mp3Url);
		_li = _li.replace("{{dur}}",parseInt(msgs.file.dur/1000)+"''");
	}else if(msgs.bodys){//历史消息
		//console.log("------------------"+JSON.parse(msgs.bodys).url)
		var mp3Url = chatroom.audioToMp3({
			url: JSON.parse(msgs.bodys).url
		});
		_li = _li.replace("{{mp3Url}}",mp3Url);
		_li = _li.replace("{{dur}}",parseInt(JSON.parse(msgs.bodys).dur/1000)+"''");
	}
	_li = _li.replace("{{badge}}",checkOwner(msg_custom.role));
	return _li;
}
//成员视频消息
function getVidioMsg(msgs){
	var msg_custom;
	if(msgs.extInfo){//历史消息
		msg_custom= main.getJson(msgs.extInfo);
	}else if(msgs.custom){//实时消息
		msg_custom= main.getJson(msgs.custom);
	}
	var _li = msg_member_vidio;
	if(msgs.userUpdateTime){//新消息时间
		_li = _li.replace("{{time}}",msgs.userUpdateTime);
	}else if(msgs.msgTime){//历史消息时间
		_li = _li.replace("{{time}}",msgs.msgTime);
	}
	_li = _li.replace("{{senderLevel1}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel2}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel3}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{avata}}",main.formatAvata(msg_custom.senderAvatar));
	_li = _li.replace("{{senderName}}",msg_custom.senderName);
	//_li = _li.replace("{{mp3Url}}",msgs.file.mp3Url);
	if(msgs.file){//实时消息
		_li = _li.replace("{{videourl}}",msgs.file.url);
		_li = _li.replace("{{dur}}",parseInt(msgs.file.dur/1000)+"''");
	}else if(msgs.bodys){//历史消息
		_li = _li.replace("{{videourl}}",JSON.parse(msgs.bodys).url);
		_li = _li.replace("{{dur}}",formatVideoTime(parseInt(JSON.parse(msgs.bodys).dur/1000)));
	}
	_li = _li.replace("{{badge}}",checkOwner(msg_custom.role));
	return _li;
}
function getVideoCover(_video){
	var video = document.getElementById("video");
	video.addEventListener('loadeddata',captureImage);
}
//成员视频直播消息
function getLiveMsg(msgs){
	var msg_custom;
	if(msgs.extInfo){//历史消息
		msg_custom= main.getJson(msgs.extInfo);
	}else if(msgs.custom){//实时消息
		msg_custom= main.getJson(msgs.custom);
	}
	var _li = msg_member_live;
	if(msgs.userUpdateTime){//新消息时间
		_li = _li.replace("{{time}}",msgs.userUpdateTime);
	}else if(msgs.msgTime){//历史消息时间
		_li = _li.replace("{{time}}",msgs.msgTime);
	}
	_li = _li.replace("{{senderLevel1}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel2}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel3}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{avata}}",main.formatAvata(msg_custom.senderAvatar));
	_li = _li.replace("{{senderName}}",msg_custom.senderName);
	_li = _li.replace("{{referenceTitle}}",msg_custom.referenceTitle);
	if(msgs.files){//实时消息
		_li = _li.replace("{{img}}",main.formatCover(msg_custom.referencecoverImage));
		_li = _li.replace("{{liveid}}",msg_custom.referenceObjectId);
	}else if(msgs.bodys){//历史消息
		_li = _li.replace("{{img}}",main.formatCover(msg_custom.referencecoverImage));
		_li = _li.replace("{{liveid}}",msg_custom.referenceObjectId);
	}
	_li = _li.replace("{{badge}}",checkOwner(msg_custom.role));

	return _li;
}
//成员电台直播消息
function getDianTaiMsg(msgs){
	var msg_custom;
	if(msgs.extInfo){//历史消息
		msg_custom= main.getJson(msgs.extInfo);
	}else if(msgs.custom){//实时消息
		msg_custom= main.getJson(msgs.custom);
	}
	var _li = msg_member_diantai;
	if(msgs.userUpdateTime){//新消息时间
		_li = _li.replace("{{time}}",msgs.userUpdateTime);
	}else if(msgs.msgTime){//历史消息时间
		_li = _li.replace("{{time}}",msgs.msgTime);
	}
	_li = _li.replace("{{senderLevel1}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel2}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{senderLevel3}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{avata}}",main.formatAvata(msg_custom.senderAvatar));
	_li = _li.replace("{{senderName}}",msg_custom.senderName);
	_li = _li.replace("{{referenceTitle}}",msg_custom.referenceTitle);
	if(msgs.files){//实时消息
		_li = _li.replace("{{img}}",main.formatCover(msg_custom.referencecoverImage));
		_li = _li.replace("{{liveid}}",msg_custom.referenceObjectId);
	}else if(msgs.bodys){//历史消息
		_li = _li.replace("{{img}}",main.formatCover(msg_custom.referencecoverImage));
		_li = _li.replace("{{liveid}}",msg_custom.referenceObjectId);
	}
	_li = _li.replace("{{badge}}",checkOwner(msg_custom.role));
	return _li;
}
//时间格式化
function getTimeLine(prev_time,time) {
 	var sec_5 = 5*60*1000;//5分钟以内消息无需时间线
 	var curDate = new Date();//当前日期
 	var cur_times=curDate.getTime();//当前时间戳
    var date = new Date();
    date.setTime(time);//评论时间
    var y = date.getFullYear();
    var m = date.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;    
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;
    //second = second < 10 ? ('0' + second) : second;  
    var time_dom = timeLine;
    if(curDate.getFullYear() == y && curDate.getMonth() == m && curDate.getDate() == d){//当天消息  无需前面的年 月 日  只要分 时
    	if((time - prev_time) <sec_5){//消息间隔小于5分钟 不再需要时间线
    		time_dom = ""
    	}else{
    		time_dom = time_dom.replace("{{time}}",h+':'+minute)
    	}
    }else if(Math.abs((time - prev_time)) < sec_5){//历史消息  消息间隔小于5分钟 不再需要时间线
    	//console.log(prev_time+"---------"+time+"--------"+Math.abs((time - prev_time)))
    	time_dom = "";
    }else if(time == 0){//第一条
    	time_dom = "";
    }else{//历史消息
    	//time_dom = time_dom.replace("{{time}}",y + '-' + m + '-' + d+' '+h+':'+minute)
    	time_dom = time_dom.replace("{{time}}", m + '-' + d+' '+h+':'+minute)
    }
    //console.log("----"+Math.abs((time - prev_time))+"-----"+sec_5);
    return time_dom;
}
//侧边消息时间格式化
function formatFansMsgTime(time){
	var curDate = new Date();//当前日期
 	var cur_times=curDate.getTime();//当前时间戳

	var date = new Date();
    date.setTime(time);//评论时间
    var y = date.getFullYear();
    var m = date.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;    
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;
    //console.log(curDate.getFullYear()+"__"+curDate.getMonth()+"___"+curDate.getDate())
    //console.log(y+"__"+m+"___"+curDate.getDate())
    if(curDate.getFullYear() == parseInt(y) && curDate.getMonth() == parseInt(m) && curDate.getDate() == parseInt(d)){//当天消息  无需前面的年 月 日  只要分 时
    	return "今天 "+h+':'+minute;
    }else{//历史消息
    	return   m + '-' + d+' '+h+':'+minute;
    }
}
//视频消息时间显示
function formatVideoTime(_time){
	var time = _time;
	var min = Math.floor(_time/10);
	var sec = _time%10;
	if(min<10){
		min = "0"+min;
	}
	if(sec<10){
		sec = "0"+sec;
	}
	return min+":"+sec;
}
//获取队伍  TEAM SII >>> SII   粉丝的话  返回级别1 >> 1
function formatTeam(_team){
	if(typeof(_team) == "string"){//
		var team = _team.toString().split(" ")
		return team[team.length-1];
	}else{
		return "LV"+_team;
	}
	
}
//检查是否房主
function checkOwner(role){
	if(role == 2){
		return "<img src='img/icon_owner.png'>";
	}else{
		return "";
	}
}
//
function refreshTimeLine(){
	var prev_time = 0;
	var sec_5 = 5*60*1000;//5分钟以内消息无需
	$.each($(".chatList > .time"),function(index,dt){
		var cur_time = Number($(dt).prev().attr("time"));
		if(Math.abs((cur_time - prev_time)) <sec_5){
			$(this).hide();
		}
		prev_time = cur_time;
	})
}
//----------------------------------------------------------------------------------------------------------------声音播放
function addListeners(){
	//退出聚聚房间
	mui('body').on('tap','.btn-back',function(){
		window.history.back();
	})
	//点击播放语音的动画
	mui('body').on('tap','.voice',function(){
		//var myVideo =document.getElementById("audio-player");
		console.log("click")
		if($(this).find(".zt_1").hasClass("yy_on1") || $(this).find(".zt_2").hasClass("yy_on2")){//播放中
	        $(this).find('.zt_1').removeClass('yy_on1');
			$(this).find('.zt_2').removeClass('yy_on2');
			myAudio.pause();
	    }else{//停止播放
	    	$('.zt_1').removeClass('yy_on1');
			$('.zt_2').removeClass('yy_on2');

	        $(this).find('.zt_1').addClass('yy_on1');
			$(this).find('.zt_2').addClass('yy_on2');
			//$("audio")[0].stop();
			//$("#audio-player").attr("src",$(this).attr("src"));
			//myVideo.play();
			$("#audio-player").attr("src",$(this).attr("src"));
			var myAudio = document.getElementById("audio-player");
            myAudio.play();

			// var sound = new Audio();  
			// console.log($(this).attr("src"));
			// sound.src = $(this).attr("src"); 
			// sound.onload = function(){
			// 	sound.play();  
			// }
			
	    }
	})
	//声音播放完毕 
	$("#audio-player").bind('ended', function(){
		console.log("ended")
		$('.zt_1').removeClass('yy_on1');
		$('.zt_2').removeClass('yy_on2');
	});


	
	//视频消息播放
	mui('body').on('tap','video',function(){
		$(this).get(0).play();
		$(this).siblings('.icon_playbtn').hide();
	})
	//直播消息跳转到直播页
	mui('body').on('tap','.msg-live',function(){
		var id = $(this).attr("liveid")
		main.hrefTo("liveplayer.html?id="+id);
	})
	//电台直播消息跳转到电台直播页
	mui('body').on('tap','.msg-diantai',function(){
		var id = $(this).attr("liveid")
		main.hrefTo("nightwords/index.html?id="+id);
	})
	//发送消息
	$(".sendbtn").click(function(){
		console.log("send")
		if($(".sendinput").val()){
			var msg = chatroom.sendText({
			    text: $(".sendinput").val(),
			    custom:getMsgJson(),
			    done: sendChatroomMsgDone
			});
		}
	})
	
	// $(".weektit").click(function(){
	// 	console.log("weektitweektit")
	// 	main.hrefTo("weeklist.html?room="+roomid);
	// })
	//显示表情面板
	mui('body').on('tap','.btn-emotion',function(){
		console.log("click")
		$("#swiper-container").show();
		$(".send_box").css("bottom","22%")
		$(".sendinput").blur();
		var t=$(".sendinput").val(); 
		$(".sendinput").val(t); 
	})
	//隐藏表情面板
	$(".sendinput").click(function(){
		$('#swiper-container').hide();
		$(".send_box").css("bottom","0");
		var t=$(".sendinput").val(); 
		$(".sendinput").val(t); 
		
	})
	//本周榜单
	mui('body').on('tap','.weektit',function(){
		main.hrefTo("weeklist.html?room="+roomid);
	})
	//添加表情
	mui('#swiper-container').on('tap','.emotion',function(){
		var this_emotion = $(this).attr("str");
		if(($(".sendinput").val() + this_emotion).length < 300){
			$(".sendinput").val($(".sendinput").val()+this_emotion);
			var t=$(".sendinput").val(); 
			$(".sendinput").val(t); 
			//$(".sendinput").focus();
			//setHeight($('#textarea'));
			// setTimeout(function(){
			// 	$(".sendinput").blur();
			// 	setHeight($('#textarea'));
			// },10);
		}

	})
	//删除输入框表情
	mui('#swiper-container').on('tap','.small_close',function(){
		var words = $(".sendinput").val();
		if(words.length == 0){
			return false;
		}
		var last_str = words.substr($(".sendinput").val().length-1);//最后一字符

		if(last_str == "]"){//表情
			$(".sendinput").val(words.substring(0, words.lastIndexOf('[')));
		}else{//一般字符
			$(".sendinput").val(words.substring(0, words.length -1));
		}
		
		//setHeight($('#textarea'));
		// setTimeout(function(){
		// 	$(".sendinput").blur();
		// 	setHeight($('#textarea'));
		// },100);
	})
}
//发送消息成功
function sendChatroomMsgDone(error, msg) {
    console.log('发送聊天室' + msg.type + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient, error, msg);
    $(".sendinput").val("");
    addMsgLeft(msg)
    //mui('.mui-scroll1').scroll().reLayout();
	//mui('.mui-scroll1').scroll().scrollToBottom(100);//毫秒，滚动到底部需要的时间，可自定义。
	//document.getElementById('offCanvasContentScroll').scrollTop = document.getElementById('offCanvasContentScroll').scrollHeight;
	mui('.chatbox').scroll().reLayout();
	mui('.chatbox').scroll().scrollToBottom(100);

	resetTextArea();//输入框初始化
}
//获取要发的文本消息json
function getMsgJson(){
	var obj = {
		"source": "juju",                                                  //固定值 `juju`
		"fromApp": 2,                                                      //固定值 2
		"senderAvatar":main.getLoginUserInfo().avatar,                     //成员头像
		"senderHonor": "",                                                 //徽章,没有不传
		"senderId": main.getLogInUserId(),                                 //发送人ID
		"version": "",                                                     //client版本号
		"senderName": main.getLoginUserInfo().nickName,                    //发送人昵称
		"senderRole": 0,                                                   //发送人在房间内的角色
		"build": 18000,                                                    //client build号
		"platform": "h5",                                                  //发送平台  ios android server
		"roomType": 1,                                                     //房间类型 0 群组 1 聊天室
		"sourceId": roomid,                                                //房间ID
		"contentType": 1,                                                  //消息类型 1 聊天消息
		"role": -1,                                                         //发送人角色 -1 游客
		"senderLevel": "LV"+main.getLoginUserInfo().level,                  //发送人等级 或 发送人所属队伍名
		"messageObject":"messageBoard",                                    //消息类型   messageBoard：留言板消息
		"text":$(".sendinput").val()                                       //消息
	}
	return JSON.stringify(obj);
}

//获取徽章HTML
function getHonor(honorstr){
	var _li = '<img src="{{url}}">';
	if(honorstr == ""){//无徽章
		return "";
	}
	var arr = honorstr

}
//---------------------------------------------------------------------------------------------------------------侧滑


	mui.previewImage();

	mui.init({
		swipeBack: false,
	});
	// showMsgTips("aaa")
	 //侧滑容器父节点
	var offCanvasWrapper = mui('#offCanvasWrapper');
	 //主界面容器
	var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
	 //菜单容器
	var offCanvasSide = document.getElementById("offCanvasSide");
	 //移动效果是否为整体移动
	var moveTogether = false;
	 //侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
	var classList = offCanvasWrapper[0].classList;
	 //变换侧滑动画移动效果；
	// mui('.mui-input-group').on('change', 'input', function() {
	// 	console.log("change")
	// 	if (this.checked) {
	// 		offCanvasSide.classList.remove('mui-transitioning');
	// 		offCanvasSide.setAttribute('style', '');
	// 		classList.remove('mui-slide-in');
	// 		classList.remove('mui-scalable');
	// 		switch (this.value) {
	// 			case 'main-move':
	// 				if (moveTogether) {
	// 					//仅主内容滑动时，侧滑菜单在off-canvas-wrap内，和主界面并列
	// 					offCanvasWrapper[0].insertBefore(offCanvasSide, offCanvasWrapper[0].firstElementChild);
	// 					moveTogether = false;
	// 				}
	// 				break;
	// 			case 'main-move-scalable':
	// 				if (moveTogether) {
	// 					//仅主内容滑动时，侧滑菜单在off-canvas-wrap内，和主界面并列
	// 					offCanvasWrapper[0].insertBefore(offCanvasSide, offCanvasWrapper[0].firstElementChild);
	// 				}
	// 				classList.add('mui-scalable');
	// 				break;
	// 			case 'menu-move':
	// 				classList.add('mui-slide-in');
	// 				break;
	// 			case 'all-move':
	// 				moveTogether = true;
	// 				//整体滑动时，侧滑菜单在inner-wrap内
	// 				offCanvasInner.insertBefore(offCanvasSide, offCanvasInner.firstElementChild);
	// 				break;
	// 		}
	// 		offCanvasWrapper.offCanvas().refresh();
	// 	}
	// });
	document.getElementById('offCanvasShow').addEventListener('tap', function() {
		offCanvasWrapper.offCanvas('show');
		$(".tips").hide();
	});
	//判断显示隐藏
	document.querySelector('.mui-off-canvas-wrap').addEventListener('shown',function (event) {
		$(".tips").hide();
	    //console.log(mui('.mui-off-canvas-wrap').offCanvas().isShown('left'))
	})
	/*document.getElementById('offCanvasHide').addEventListener('tap', function() {
		offCanvasWrapper.offCanvas('close');
	});*/
	 //主界面和侧滑菜单界面均支持区域滚动；
	mui('#offCanvasSideScroll').scroll();
	mui('#offCanvasContentScroll').scroll();
	 //实现ios平台的侧滑关闭页面；
	if (mui.os.plus && mui.os.ios) {
		offCanvasWrapper[0].addEventListener('shown', function(e) { //菜单显示完成事件
			plus.webview.currentWebview().setStyle({
				'popGesture': 'none'
			});
		});
		offCanvasWrapper[0].addEventListener('hidden', function(e) { //菜单关闭完成事件
			plus.webview.currentWebview().setStyle({
				'popGesture': 'close'
			});
		});
	}
//----------------------------------------------------------------------------------------------------------主房间下拉加载
var flag_member,flag_fans;
mui.init();

(function($) {

	//阻尼系数
	var deceleration = mui.os.ios?0.003:0.0009;
	$('.scroll_wai .mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration:deceleration
	});

	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-scroll1'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				down: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							getMemberHistory();
							self.endPullDownToRefresh(flag_member);
						}, 1500);
					}
				}
			});
		})

		$.each(document.querySelectorAll('.mui-scroll2'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							getFansHistory();
							self.endPullUpToRefresh(flag_fans);
						}, 1000);
					}
				}
			});
		})
		
	});
})(mui);



//成员历史聚聚消息
function getMemberHistory(){
	main.geMemberMsg(roomid,$(".chatbox").attr("lasttime"),function(dt){
		if(dt.status == 200){
			$.each(dt.content.data,function(index,msg){//
		    	if(msg.extInfo){//有自定义内容的话 历史消息;
		    		appendChatMsg(msg)
		    	}
		    })
		    $(".chatbox").attr("lasttime",dt.content.lastTime);//最后时间
		    if(dt.content.data.length <10){
		    	flag_member = true;
		    }
		    
		}else{

		}
	})
	
}

//粉丝历史聚聚消息
function getFansHistory(){
	main.geJujuMsg(roomid,$(".mui-scroll-fans").attr("lasttime"),isfirst,function(dt){
		if(dt.status == 200){

			var html = "";
			$.each(dt.content.data,function(index,dt){
				html += getFansMsg(dt);
			})
			$(".weekList").append(html);

			$(".mui-scroll-fans").attr("lasttime",dt.content.lastTime);
			if(isfirst){//第一次加载  显示top1
				if(dt.content.top1Data){
					$(".user_avatar,.right_devote").show();
					$(".mui-scroll-fans").css("padding-top","11rem");
					addTop1Info(dt.content.top1Data);
				}else{
					$(".user_avatar,.right_devote").hide();
					$(".mui-scroll-fans").css("padding-top","5.5rem");
				}
			}
			isfirst = false;
		}else{
			
		}
		if(dt.content.data.length <10){
	    	flag_fans = true;
	    }
	})
}
//贡献top1 
function addTop1Info(dt){
	var msg_custom = JSON.parse(dt.extInfo);//
	$(".user_avatar").find(".head").css({"background-image":"url("+main.formatAvata(msg_custom.senderAvatar)+")","background-size":"100%"});//头像
	$(".user_avatar").find(".grade").html(formatTeam(msg_custom.senderLevel));//粉丝级别
	$(".top1name").html(msg_custom.senderName);//发送者昵称
	$(".i_time").html(formatFansMsgTime(dt.msgTime));//发送时间
	$(".top1text").html(msg_custom.text);//消息内容
}
//留言板信息
function getFansMsg(msgs){
	var msg_custom;
	if(msgs.extInfo){//历史消息
		msg_custom= main.getJson(msgs.extInfo);
	}else if(msgs.custom){//实时消息
		msg_custom= main.getJson(msgs.custom);
	}
	var _li = msg_fans;
	if(msgs.userUpdateTime){//新消息时间
		_li = _li.replace("{{time}}",formatFansMsgTime(msgs.userUpdateTime));
	}else if(msgs.msgTime){//历史消息时间
		_li = _li.replace("{{time}}",formatFansMsgTime(msgs.msgTime));
	}
	
	_li = _li.replace("{{senderLevel}}",formatTeam(msg_custom.senderLevel));
	_li = _li.replace("{{avata}}",main.formatAvata(msg_custom.senderAvatar));
	_li = _li.replace("{{senderName}}",msg_custom.senderName);
	_li = _li.replace("{{senderHonor}}",getBadgeImg(msg_custom.senderHonor));
	if(msg_custom.messageObject == "jujuLive"){//礼物消息
		_li = _li.replace("{{text}}","送出了"+msg_custom.giftCount+"个"+msg_custom.giftName);
	}else if(msg_custom.messageObject == "messageBoard"){//文本消息
		_li = _li.replace("{{text}}",main.findEmotion(msg_custom.text));
	}
	
	
	return _li;
}

function getBadgeImg(str){
	if(str == ""){
		return "";
	}else{
		var html = "";
		var arr = str.split(";");
		//console.log(str+"----------------------"+arr.length)
		$.each(arr,function(index,img){
			if(img.length > 10){
				html += "<img src='"+CONFIG.getSource()+img+"'>";
			}
			
		})
		return html;
	}
}







//--------------------------------------------------------------------表情面板
createEmotionList()
//生成表情面板
function createEmotionList(){
	var i = 0;
	var html = '<div class="swiper-slide"><ul>';
	$.each(main.getEmotion(),function(j,info){
		if(parseInt(main.getEmotion()[j][1].split("_")[2]) > 106 ){//第二套表情
			html += "<li class='emotion' str='"+main.getEmotion()[j][0]+"'><img src='public/face/"+main.getEmotion()[j][1]+".imageset/"+main.getEmotion()[j][1]+".png'></li>"
		}else{
			html += "<li class='emotion' str='"+main.getEmotion()[j][0]+"'><img src='public/face/"+main.getEmotion()[j][1]+".imageset/"+main.getEmotion()[j][1]+"@2x.png'></li>"
		}
		i++;
		if(i == 23){//每页23个表情
			html += '<li class="small_close"><img src="img/small_close.png"></li>';//删除表情按钮
			html += '</ul></div>';
		    html += '<div class="swiper-slide"><ul>';
		    i = 0;
		}
	})

	html += '<li class="small_close"><img src="img/small_close.png"></li>';
	html += '</ul></div>';

	$(".swiper-wrapper").html(html);

	var mySwiper = new Swiper('.swiper-container',{
    	pagination: '.swiper-pagination',
		prevButton:'.swiper-button-prev',
		nextButton: '.swiper-button-next'
	})
	$(".swiper-container").hide()
}


/**
 * 文本框根据输入内容自适应高度
 * @param                {HTMLElement}        输入框元素
 * @param                {Number}                设置光标与输入框保持的距离(默认0)
 * @param                {Number}                设置最大高度(可选)
 */
 //var text = document.getElementById("textarea");
	//autoTextarea(text);// 调用

function autoTextarea(elem, extra, maxHeight) {
	//console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                addEvent = function (type, callback) {
                        elem.addEventListener ?
                                elem.addEventListener(type, callback, false) :
                                elem.attachEvent('on' + type, callback);
                },
                getStyle = elem.currentStyle ? function (name) {
                        var val = elem.currentStyle[name];
                        
                        if (name === 'height' && val.search(/px/i) !== 1) {
                                var rect = elem.getBoundingClientRect();
                                return rect.bottom - rect.top -
                                        parseFloat(getStyle('paddingTop')) -
                                        parseFloat(getStyle('paddingBottom')) + 'px';        
                        };
                        
                        return val;
                } : function (name) {
                                return getComputedStyle(elem, null)[name];
                },
                minHeight = parseFloat(getStyle('height'));
        
        
        elem.style.resize = 'none';
        
        var change = function () {
                var scrollTop, height,
                        padding = 0,
                        style = elem.style;
                
                if (elem._length === elem.value.length) return;
                elem._length = elem.value.length;
                
                if (!isFirefox && !isOpera) {
                        padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
                };
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                
                elem.style.height = minHeight + 'px';
                if (elem.scrollHeight > minHeight) {
                        if (maxHeight && elem.scrollHeight > maxHeight) {
                                height = maxHeight - padding;
                                style.overflowY = 'auto';
                        } else {
                                height = elem.scrollHeight - padding;
                                style.overflowY = 'hidden';
                        };
                        style.height = height + extra + 'px';
                        scrollTop += parseInt(style.height) - elem.currHeight;
                        document.body.scrollTop = scrollTop;
                        document.documentElement.scrollTop = scrollTop;
                        elem.currHeight = parseInt(style.height);
                };
        };
        
        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
};


function setHeight(element) {

	console.log(element.scrollHeight)
	if(element.scrollHeight < 140){
		$(".send_box").height(element.scrollHeight);
		setTimeout(function(){
			if(element.scrollHeight < 140){
				$(element).css({'height':'auto','overflow-y':'scroll'}).height(element.scrollHeight-4);
			}
			
		},50)
	  }
}
$('#textarea').each(function () {
  setHeight(this);
}).on('input', function () {
  setHeight(this);
});

function resetTextArea(){
	console.log("resetTextArea")
	$('#textarea').css({'height':'36px','overflow-y':'hidden'});
	$(".send_box").css('height','43px');
}