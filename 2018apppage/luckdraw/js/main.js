(function(data) {


//--------------------------------------------------------------------------------------------------------------------
    //正式
    //var appUserInfo
    if(checkFromApp()){
        var appUserInfo = {
            "appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avatar":window.web.getLoginUserPic(),            //头像地址
            "dev_cd":(window.web.getPhoneIMEI().length <3) ? window.web.getLoginUserId() :  window.web.getPhoneIMEI(),   //设备号
            "device":window.web.phoneSystemVersion()+window.web.phoneName()
        }
        
    }
    
//--------------------------------------------------------------------------------------------------------------------
   
    
     data.getAppUserInfo = function(){
        console.log("checkFromApp>>"+checkFromApp())
        if(checkFromApp()){
            return appUserInfo;
        }
        
    }

    //判断是否可下载电子EP
    data.ifDownload = function(succ){
        $.ajax({
            url:  "https://voteapi.48.cn/5thvote/api/v1/order/check/ep",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            /*beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },*/
            data: JSON.stringify({
                appId:main.getAppUserInfo().appid
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    };

    //抽奖剩余次数
    data.surplusNum = function(succ){
        $.ajax({
            url: "https://h5.48.cn/siba/de/surveys/index.php?r=votes/hits",
            type: "POST", 
            async:true,
            data: { 
                appid:main.getAppUserInfo().appid,                          //用户ID（WEB场合：丝瓜账号，APP场合：APPID）
                token:main.getAppUserInfo().apptoken,
                dev_cd:main.getAppUserInfo().dev_cd
            },
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
               //alert("eee");
                //error()
            } 
        });
    }

    //抽奖
    data.luckDraw = function(succ){
        $.ajax({
            url: "https://h5.48.cn/siba/de/surveys/index.php?r=votes/play",
            type: "POST", 
            async:true,
            data: { 
                appid:main.getAppUserInfo().appid,                          //用户ID（WEB场合：丝瓜账号，APP场合：APPID）
                token:main.getAppUserInfo().apptoken,
                dev_cd:main.getAppUserInfo().dev_cd
            },
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
               //alert("eee");
               // error()
            } 
        });
    }

    //显示错误信息
    data.showTip = function(info){
        $('.tip').css('opacity',1);
        $('.tip').html(info);
    }

    //跳转
    data.hrefTo = function(_url){
        if(checkFromApp()){
            if(_url.indexOf("https") >=0 || _url.indexOf("http")>=0 ){
                window.web.gotoDetail(_url);
            }else{
                window.web.gotoDetail(CONFIG.getURL()+_url);
            }
            
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
    if ((isFromMobile() && isExitsFunction("window.web.backHome"))) {
        
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

//-----------------------------------------------------------------------------------------------------获取url 参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
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