(function(data) {

    //web端测试（用户信息）
    var webUserInfo = {
                                        //头像地址
    }
    
    //口袋用户信息
    if(checkFromApp()){
        var appUserInfo = {
            "appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avatar":window.web.getLoginUserPic(),            //头像地址
        }
    }
    //获取用户信息
    data.getAppUserInfo = function(){
        if(checkFromApp()){
            return appUserInfo;
        }else{
            return webUserInfo;
        }
        
    }
    
/*-------------------------------------------------------------------------------------------------------------------------*/   


    //切割队伍   TEAM SII
    data.getTeam = function(team){
        return team.split(" ")[1]
    }
    //无域名头像添加域名
    data.formatAvata = function(avata){
        if(avata.indexOf("http://")>=0 ||avata.indexOf("https://")>=0){
            return avata
        }else{
            return CONFIG.getSource()+"/resize_100x100"+avata;
        }
    }
    data.formathttp = function(avata){
        if(avata.indexOf("http://")>=0 ||avata.indexOf("https://")>=0){
            return ""
        }else{
            return CONFIG.getSource();
        }
    }
    //封面图
    data.formatCover = function(img){
        if(img.indexOf("http://")>=0 ||img.indexOf("https://")>=0){
            return img
        }else{
            return CONFIG.getSource()+img;
        }
    }
    //封面大图
    data.formatCoverBig = function(img){
        if(img.indexOf("http://")>=0 ||img.indexOf("https://")>=0){
            return img
        }else{
            return CONFIG.getSource()+"/resize_400x400"+img;
        }
    }
    //视频地址 添加域名
    data.formatVideo = function(_video){
        if(_video.indexOf("http://")>=0 ||_video.indexOf("https://")>=0){
            return _video
        }else{
            return CONFIG.getGSVideo()+_video;
        }
    }
    //字符转化json
    data.getJson = function(msg){
        return JSON.parse(msg)
    }

    //跳转
    data.hrefTo = function(link){
        if(checkFromApp()){
            window.web.gotoDetail(CONFIG.getJumplink()+link);
        }else{
            console.log(link)
            window.location.href=link;
        }
    }

    //跳转
    data.hrefTolink = function(link){
        if(checkFromApp()){
            window.web.gotoDetail(link);
        }else{
            console.log(link)
            window.location.href=link;
        }
    }

    //返回
    data.backTo = function(_url){
        if(checkFromApp()){
            window.web.backHome();
        }else{
            window.history.back(-1);
        }
    }
    
    //打开新页面
    data.openUrl = function(_url){
        window.open(_url); 
    }
    //去除前后空格
    data.trim = function(str){
        return str.replace(/(^\s*)|(\s*$)/g, ""); 
    }
    //字符串转化为链接
    data.replaceToUrl = function(str){
        str = str.replace(/(^|[^"'(=])((http|https|ftp)\:\/\/[\.\-\_\/a-zA-Z0-9\~\?\%\#\=\@\:\&\;\*\+]+\b[\?\#\/\*]*)/g, '$1<a href="$2" target="_blank" class="btn-link">$2</a>');
        return str;
        //$('div').innerHTML.replace(/(^|[^"'(=])((http|https|ftp)\:\/\/[\.\-\_\/a-zA-Z0-9\~\?\%\#\=\@\:\&\;\*\+]+\b[\?\#\/\*]*)/g, '$1<a href="$2" target="_blank">$2</a>');
    }
    //弹框
    data.alert = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }

}(window.main = {}));




//------------------------------------------------------------------------------------判断是否来自移动设备
function isFromMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        return false;
    } else {
        return true;
    }
}

//------------------------------------------------------------------------------------------是否来自iphone
function isFromIphone() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    return bIsIphoneOs;
}
//--------------------------------------------------------------------------------------------是否来自口袋48
function checkFromApp() {
    if ((isFromMobile() && isExitsFunction("window.web.getLoginUserId"))) {
        
        return true;
    } else {
        
        return false;
    }
}

function checkFromWX(){
    var useragent = navigator.userAgent;
    if (useragent.match(/MicroMessenger/i) == 'MicroMessenger') {
        return true;
    }else{
        return false;
    }
}

//----------------------------------------------------------------------------------------------------------判断是否存在方法
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch (e) {
    }
    return false;
}




function add0(m){return m<10?'0'+m:m };  
function getDate(shijianchuo) {  
  //shijianchuo是整数，否则要parseInt转换  
  var time = new Date(shijianchuo);  
  var y = time.getFullYear();  
  var m = time.getMonth()+1;  
  var d = time.getDate();  
  var h = time.getHours();  
  var mm = time.getMinutes();  
  var s = time.getSeconds();  
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);  
};   


function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}