var downloadPocketDom_up = 
'<div class="appdown-msk"></div>'+
'<div class="appdown">'+
'		<div class="appcover">'+
'			<img src="../images/icon-download.png">'+
'		</div>'+
'		<div class="intro">'+
'			<p  class="big">口袋48</p>'+
// '			<p>更多SNH48 Group精彩内容等你发掘</p>'+
'		</div>'+
'		<div class="appdown-btnbox"><a href="javascript:openAppPage()">打开APP</a></div>'+
'</div>'

var downloadPocketDom_down = 
'<div class="appdown">'+
'		<div class="appcover">'+
'			<img src="../images/icon-download.png">'+
'		</div>'+
'		<div class="intro">'+
'			<p  class="big">口袋48，不止有48个女孩哦</p>'+
// '			<p>更多SNH48 Group精彩内容等你发掘</p>'+
'		</div>'+
'		<div class="appdown-btnbox"><a href="javascript:downLoadPocketApp()">下载APP</a></div>'+
'</div>'

$(".download-up").append(downloadPocketDom_up);
$(".download-down").append(downloadPocketDom_down);

//downLoadPocketApp() 方法在https://h5.48.cn/common/js/common_v1.js中
//跳转下载页

//打开app内页
function openAppPage(){
	//localStorage.setItem("sharepage",getPath())
	//window.location.href = CONFIG.getWebUrl()+"download/index.html"
	openPocketApp(getPath())
}
//获取app路径
//memberpage  个人主页
//video        视频
//
function getPath(){
	var _url = window.location.href;

	var _id = GetQueryString("id");
	if(_url.indexOf("radio") > 0){//电台
		return "snh48://nighttalk/detail?id="+_id
	}else if(_url.indexOf("video") > 0){//视频
		return "snh48://video/detail?id="+_id
	}else if(_url.indexOf("music") > 0){//音乐
		return "snh48://music/detail?id="+_id
	}else if(_url.indexOf("memberpage") > 0){//主页
		return "snh48://person/detail?id="+_id
	}else if(_url.indexOf("memberLiveShare") > 0){//成员直播
		return "snh48://live/detail?id="+_id
	}else if(_url.indexOf("liveshare") > 0){//公演直播
		return "snh48://publiclive/detail?id="+_id
	}else if(_url.indexOf("dynamic") > 0){//帖子
		return "snh48://post/detail?id="+_id
	}else if(_url.indexOf("travelshare") > 0){//行程
		return "snh48://trip/detail?id="+_id
	}
}