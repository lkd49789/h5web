//使用common前 需先引入   http://h5.snh48.com/common/js/jquery.min.js

//------------------------------------------------------------------------全局变量
var user_id="12345";//用户id   
var user_name="nickname"; //昵称
var user_pic="user_pic"; //头像地址
var encryption="encryption";  //app里加密字符串  微信没有
var imei="imei"; //app里设备号  微信没有



//------------------------------------------------------------------------------------判断是否来自移动设备
function isFromMobile(){
    var sUserAgent = navigator.userAgent.toLowerCase();  
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";  
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";  
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";  
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";  
    var bIsAndroid = sUserAgent.match(/android/i) == "android";  
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";  
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";  
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){  
        return false;
    } else{
        return true;
    }
}

//------------------------------------------------------------------------------------------是否来自iphone
function isFromIphone(){
    var sUserAgent = navigator.userAgent.toLowerCase();  
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";  
    return bIsIphoneOs;
}
//--------------------------------------------------------------------------------------------是否来自安卓
function isFromAndroid(){
    var isAndroid = navigator.userAgent.match('Android');
    return isAndroid;
}

//--------------------------------------------------------------------------------------------是否来自口袋48
function checkFromApp(){
    if(isFromMobile() && isExitsFunction("window.web.backHome"))
    {
        return true;
    }else{
        return false;
    }
}
//----------------------------------------------------------------------------------------------是否来自微信
function checkFromWX(){
    var useragent = navigator.userAgent;
    if (useragent.match(/MicroMessenger/i) == 'MicroMessenger') {//微信打开
        return true;
    }else{
        return false;
    }
}
//-------------------------------------------------------------------------------------------------获取微信授权
function getOauth(siteUrl){
    var group = GetQueryString("group_id") || "SNH";
        var g_id = "";
        if(group == "SNH"){
            g_id = "10"
        }else if(group == "BEJ"){
            g_id = "20"
        }else if(group == "GNZ"){
            g_id = "30"
        }
        var open_id = GetQueryString("openid")
        if(open_id == "" || open_id == null || open_id == undefined){
            var url1=encodeURIComponent(siteUrl+"?group_id="+group); 
            window.location.href='http://wx.snh48.com/wx/core/auth/'+g_id+'?url='+url1+"&ran="+Math.random();
        }else{
            return true;
        }
    // var open_id = GetQueryString("openid")
    // if(open_id == "" || open_id == null || open_id == undefined){
    //     var url1=encodeURIComponent(siteUrl); 
    //     var wei_token='ceca73efe351'; 
    //     //window.location.href='http://mb.mtq.tvm.cn/oauth?redirect_uri='+url1+'&wx_token='+wei_token+"&ran="+Math.random();
    //     window.location.href="http://wx.snh48.com/wx/core/auth/"+ mpid + "?url=" + encodeURIComponent(siteUrl);
    // }else{
    //     return true;
    // }
}

//-----------------------------------------------------------------------------------------------------获取url 参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

//----------------------------------------------------------------------------------------------------------判断是否存在方法
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch(e) {}
    return false;
}
//-------------------------------------------------------------------------------------------------------打乱数组
function shuffle(arr){
    var tmparr = [];
    var num = arr.length;
    for(var i=0; i<num; i++){
        tmparr.push(arr.splice(Math.random()*arr.length,1).pop());
    }
    return tmparr;
}
//-----------------------------------------------------------------------------------------------------------获取用户信息
function getUserInfo(_callback){
    if(checkFromApp()){
        
        if(window.web.getLoginUserNickName() == "" || window.web.getLoginUserNickName() == null)
        {
            //未登陆
            
            window.web.showLoginPhoneAlert();
        }else{
            user_id = window.web.getLoginUserId()
            user_name = window.web.getLoginUserNickName()
            user_pic = window.web.getLoginUserPic();
            encryption = window.web.getEncryptionStr();
            imei = window.web.getPhoneIMEI();
            //callback.apply(this)
            _callback()
            //getUserInfoComplete();
        }
    }else if(checkFromWX()){
        var u_id = GetQueryString("openid")
        //var u_id = "o8I2Yjrn6TvCfYFRzr0F_dcxV5YM"
        $.get('http://h5.snh48.com/common/php/wx_userinfo.php',{openid:u_id},function(json){
            eval('var obj='+json)
            //var obj1=json
            //$.each(obj1, function(key, info){
                user_id = obj.uid;
                user_name = obj.nickname;
                user_pic= obj.avatar_url;
            //})
            //callback.apply(this)
            _callback()
        })
    }
}

//----------------------------------------------------------------------------------------加载所有图片
function loadAllImg(imgarr,loadcount,loadComplete){
    //console.log(imgarr)
    var loaded = 0;
    for( var i = 0; i < imgarr.length; i++ ) {
        var img = new Image();
        img.src = imgarr[i];
        
        img.onload = function() {
            loaded ++;
            loadcount(loaded/imgarr.length)
            if(loaded >= imgarr.length)
            {
                loadComplete();
            }
        };
    }
}

//---------------------------------------------------------------------------------------添加loading动画
function addLoading(obj){
    var svgLoading="<div class='svgSpiner'><svg viewBox='0 0 120 120' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>'<g id='circle' class='g-circles g-circles--v1'><circle id='12' transform='translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) ' cx='35' cy='16.6987298' r='10'></circle><circle id='11' transform='translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) ' cx='16.6987298' cy='35' r='10'></circle><circle id='10' transform='translate(10, 60) rotate(-90) translate(-10, -60) ' cx='10' cy='60' r='10'></circle><circle id='9' transform='translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) ' cx='16.6987298' cy='85' r='10'></circle><circle id='8' transform='translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) ' cx='35' cy='103.30127' r='10'></circle><circle id='7' cx='60' cy='110' r='10'></circle><circle id='6' transform='translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) ' cx='85' cy='103.30127' r='10'></circle><circle id='5' transform='translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) ' cx='103.30127' cy='85' r='10'></circle><circle id='4' transform='translate(110, 60) rotate(-90) translate(-110, -60) ' cx='110' cy='60' r='10'></circle><circle id='3' transform='translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) ' cx='103.30127' cy='35' r='10'></circle><circle id='2' transform='translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) ' cx='85' cy='16.6987298' r='10'></circle><circle id='1' cx='60' cy='10' r='10'></circle>'</g>'<use xlink:href='#circle' class='use'/></svg></div>";
    obj.append(svgLoading)
}
//----------------------------------------------------------------------------------------删除loading 动画
function removeLoading(){
    $(".svgSpiner").remove();
}

//----------------------------------------------------------------------------------------下载口袋48---
function downLoadPocketApp(){
    if(isFromAndroid()){
        //alert("isFromAndroid")
        var ifrSrc = 'pocket48://platformapi/startApp?versionName=1&versionCode=1';
        if(!ifrSrc){return;}
        var ifr=document.createElement("iframe");
        ifr.src=ifrSrc;
        ifr.style.display= "none";
        document.body.appendChild(ifr);
        setTimeout(function(){
            window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.pocket.snh48.activity"
            document.body.removeChild(ifr);
        },1000)
    }else{
        if(checkFromWX()){
            window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.pocket.snh48.activity"
        }else{
            window.location = "pocket48://platformapi/startApp?versionName=1&versionCode=1"
            setTimeout(function(){
                window.location = "http://h5.snh48.com/appweb/"
                document.body.removeChild(ifr1);
            },1000)
        }
        
    }
}
//-------------------------------------------------------------------------------------------------------------分享-----------------------
var _url = window.location.href;
var wcon = {    };

function wxshare(){
    $.get('http://h5.snh48.com/wxapi/wx_jsticket.php',{url:_url},function callback(dt){
            eval("var result="+dt)
            wcon.jsapiTicket = result.jsapiTicket;
            wcon.noncestr = result.noncestr;
            wcon.signature = result.signature;
            wcon.timestamp = parseInt(result.timestamp);
            wcon.toTime = parseInt(result.toTime);
            wcon.url = result.url;
            
            console.info(wcon);
            /**/
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: result.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
                timestamp: wcon.timestamp, // 必填，生成签名的时间戳
                nonceStr: wcon.noncestr, // 必填，生成签名的随机串
                signature: wcon.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline',"onMenuShareQQ","onMenuShareWeibo","chooseWXPay","scanQRCode"]
                 // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.error(function(res) {
                //alert(res)
            });
    })
    
    wx.ready(function(){
            wx.onMenuShareTimeline({
                title: shareTitlestr, // 分享标题
                desc: shareDesc,
                link: shareLink, // 分享链接
                imgUrl: thumbLink,// // 分享图标
                success: function () {
                    
                    countPv("pengyou")
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                title: shareTitlestr, // 分享标题
                desc: shareDesc,
                link: shareLink, // 分享链接
                imgUrl: thumbLink,// // 分享图标
                success: function () {
                    countPv("weixin")
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareQQ({
                title: shareTitlestr, // 分享标题
                desc: shareDesc,
                link: shareLink, // 分享链接
                imgUrl: thumbLink,// // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    // 分享的类别分为：'QQ','weixin','pengyou','weibo','app','other'等
                    // 分享时请对应此类别进行设置
                    countPv("QQ")
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareWeibo({
                title: shareTitlestr, // 分享标题
                desc: shareDesc,
                link: shareLink, // 分享链接
                imgUrl: thumbLink,// // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    // 分享的类别分为：'QQ','weixin','pengyou','weibo','app','other'等
                    // 分享时请对应此类别进行设置
                    countPv("weibo")
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

        });
    }
//--------------------------------------------------------------------------------------------统计访问量
function countPv(sns){
    $.get("http://h5.snh48.com/admin/sharecount.php",{title: shareTitle,type: sns},function(data){})
}

//新版微信授权
(function(data) {
    data.getOauth = function(siteUrl){
        var group = GetQueryString("group_id") || "SNH";
        var g_id = ""
        if(group == "SNH"){
            g_id = "10"
        }else if(group == "BEJ"){
            g_id = "20"
        }else if(group == "GNZ"){
            g_id = "30"
        }
        var open_id = GetQueryString("openid")
        if(open_id == "" || open_id == null || open_id == undefined){
            var url1=encodeURIComponent(siteUrl+"?group_id="+group); 
            window.location.href='http://wx.snh48.com/wx/core/auth/'+g_id+'?url='+url1+"&ran="+Math.random();
        }else{
            return true;
        }
    }
}(window.common = {}));