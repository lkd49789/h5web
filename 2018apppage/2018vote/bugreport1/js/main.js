(function(data) {

    //web端测试（用户信息）
    var webUserInfo = {
        "token_vote":"test",
        "appid":"87333",                                //用户ID
        "apptoken":"",                          //验证Token
        "uname":"嘟嘟宝",                                 //用户昵称
        "avatar":"https://source2.48.cn/mediasource/avatar/87333.jpg",                                    //头像地址
        "dev_cd":"test",                        //设备号
        "browser":"WEB"
    }

//--------------------------------------------------------------------------------------------------------------------
    //正式
    //var appUserInfo
    if(checkFromApp()){
        var appUserInfo = {
            //"appid":window.web.getLoginUserId(),            //用户ID
            "token_vote":GetQueryString("votetoken"),        //app token
            "appid":window.web.getAccessToken(),              //用户ID
            "apptoken":window.web.getAccessToken(),           //验证Token
            "uname":window.web.getLoginUserNickName(),        //用户昵称
            "avatar":window.web.getLoginUserPic(),            //头像地址
            "dev_cd":(window.web.getPhoneIMEI().length <3) ? window.web.getLoginUserId() :  window.web.getPhoneIMEI(),   //设备号
            "browser":"APP"
        }
        
    }
    
//--------------------------------------------------------------------------------------------------------------------
    data.getAppUserInfo = function(){
        console.log("checkFromApp>>"+checkFromApp())
        if(GetQueryString("from") == "wxapp"){
            var wxUserInfo = {
                "token_vote":"",
                "appid":GetQueryString("wxtoken"),                //用户ID
                "apptoken":"",                                    //验证Token
                "uname":decodeURI(decodeURI(GetQueryString("nickname"))),               //用户昵称
                "avatar":GetQueryString("avatar"),            //头像地址
                "dev_cd": GetQueryString("systemdata"),  //设备号
                "browser":"WX_APP"
            }
            return wxUserInfo;
        }else{
            if(checkFromApp()){
                return appUserInfo;
            }else{
                return webUserInfo;
            }
        }
        
        
    }
    //获取系统类型  ios   安卓
    data.getSysType = function(){
        if(checkFromApp()){
            if(isFromIphone()){
                return "IOS";
            }else{
                return "ANDROID";
            }
        }else{
            return "IOS";//测试 默认iOS 
        }
    }
    
    

    //故障申告
    data.bugReport = function(phone,pic,submit_info,succ,error){
        $.ajax({
            url:CONFIG.getPhpJK()+"api_feedback.php",
            type: "GET", 
            async:true,
            data: { appid:main.getAppUserInfo().appid,                          //用户ID（WEB场合：丝瓜账号，APP场合：APPID）
                    token_vote: main.getAppUserInfo().token_vote,                                //报告途径（1 WEB 2 APP 3 微信）
                    uname:main.getAppUserInfo().uname,                            //用户昵称
                    phone:phone,                            //联系电话
                    //type:type,                              //故障类型
                    pic_url:pic,                                //故障截图
                    browser:main.getAppUserInfo().browser,                          //浏览器（APP，WX，官网）
                    submit_info:submit_info,  
                    //devVer:'1.0',                                            //故障内容
                    dev_cd:main.getAppUserInfo().dev_cd                           //设备号
            },
            timeout: 5000, 
            dataType:"jsonp",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee>"+textStatus);
                error(data)
            } 
        });
       
    };
    
    //故障申告记录获得
    data.feedback = function(offset,_limit,succ,error){
        $.ajax({
            url: CONFIG.getPhpJK()+ "api_feedback_log.php",
            type: "GET", 
            async:true,
            data: { appid:main.getAppUserInfo().appid,                          //用户ID（WEB场合：丝瓜账号，APP场合：APPID）
                    uname:main.getAppUserInfo().uname,                            //用户昵称
                    token_vote: main.getAppUserInfo().token_vote,  
                    // order_from:"2",                 //报告途径（1 WEB 2 APP 3 微信）
                    offset:offset,
                    limit:_limit,                            //记录条数
                    browser:main.getAppUserInfo().browser 
                 
            },
            timeout: 5000, 
            dataType:"jsonp",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
                error()
            } 
        });
       
    };

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
            var para = window.location.search;
            if(para != null && para != undefined && para != ""){//微信小程序跳转 则带参数跳转
                window.location.href = _url+para;
            }else{
                window.location.href=_url;
            }
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
        // var iframe = document.createElement("IFRAME");
        // iframe.style.display="none";
        // iframe.setAttribute("src", 'data:text/plain,');
        // document.documentElement.appendChild(iframe);
        // window.frames[0].window.alert(name);
        // iframe.parentNode.removeChild(iframe);
        mui.alert(name, '', function() {
            
        });
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