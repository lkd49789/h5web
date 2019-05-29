(function(data) {
	var interUrl = "https://snhwxapi.48.cn/fans/";
    //var interUrl = "http://192.168.0.43:8082/fans/";
    var pageUrl = "https://h5.48.cn/2018apppage/dreamGuess/";
	//web端测试（用户信息）
    var webUserInfo = {

    }
    
    //口袋用户信息
	if(checkFromApp()){
        var appUserInfo = {
            "appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avata":window.web.getLoginUserPic(),            //头像地址
            "dev_cd":window.web.getPhoneIMEI()               //设备号
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
    //每一期竞猜成员列表

    data.getMerLists = function(_guessId,succ){
        $.ajax({
            url:interUrl+"api/v1/xm/guess/page",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
           /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
            data: JSON.stringify({
                guessId:_guessId,
                token: main.getAppUserInfo().apptoken
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }

    //获取验证码
    data.getCode = function(succ){
        $.ajax({
            url:interUrl+"api/v1/xm/guess/code",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
           /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
            data: JSON.stringify({
                /*guessId:_guessId,*/
                token: main.getAppUserInfo().apptoken
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }


    //每一期竞猜提交
    data.submitInfo = function(_guessId,_code,_memberIds,succ){
        $.ajax({
            url:interUrl+"api/v1/xm/guess/save",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
           /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
            data: JSON.stringify({
                guessId:_guessId,
                token: main.getAppUserInfo().apptoken,
                code:_code,
                nickname:main.getAppUserInfo().uname,
                avatar:main.getAppUserInfo().avata,
                memberIds:_memberIds
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }


    //往期
    data.getPastList = function(succ){
        $.ajax({
            url:interUrl+"api/v1/xm/guess/all",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
           /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
            data: JSON.stringify({
                token: main.getAppUserInfo().apptoken
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }

    //获奖期数列表
    data.getNumawardList = function(succ){
        $.ajax({
            url:interUrl+"api/v1/xm/guess/awards/user/list",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
           /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
            data: JSON.stringify({
                token: main.getAppUserInfo().apptoken
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }

    //获奖名单
    data.getWinnerList = function(_guessId,succ){
        $.ajax({
            url:interUrl+"api/v1/xm/guess/awards",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
           /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
            data: JSON.stringify({
                guessId:_guessId
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }






/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
    //跳转
    data.hrefTo = function(_url){
        if(checkFromApp()){
            window.web.gotoDetail(pageUrl+_url);
        }else{
            window.location.href=_url;
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

    // 无头像添加域名
    data.formatAvata = function(avatar){
        if(avatar.indexOf("http://")>=0 ||avatar.indexOf("https://")>=0){
            return avatar
        }else{
            return picUrl+avatar;
        }
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