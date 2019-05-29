(function(data) {

    var token = "";//登录后返回的token

    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"fK8qjHmomz+8SRRL/7gUUQsov/PtjHlRVAUuyL34pFS9chgOYlQqziqR1VgFQcEQ",                          //验证Token
        // "apptoken":"",
        "uname":"GavinG",                                 //用户昵称
        "avata":"https://source2.48.cn/mediasource/avatar/27422.jpg",                                    //头像地址
        "dev_cd":"861868034214187"                        //设备号
    }

//--------------------------------------------------------------------------------------------------------------------
    //正式
    //var appUserInfo
    if(checkFromApp()){

        var appUserInfo = {
            "appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avata":window.web.getLoginUserPic(),            //头像地址
            "dev_cd":(window.web.getPhoneIMEI().length <3) ? window.web.getLoginUserId() :  window.web.getPhoneIMEI()   //设备号
        }
        
    }
    
//--------------------------------------------------------------------------------------------------------------------
    //获取口袋用户信息
    data.getAppUserInfo = function(){
        //console.log("checkFromApp>>"+checkFromApp())
        if(checkFromApp()){
            return appUserInfo;
        }else{
            return webUserInfo;
        }
        
    }
    //获取系统类型  ios   安卓
    data.getSysType = function(){
        if(checkFromApp()){
            if(isFromIphone()){
                return "1";
            }else{
                return "2";
            }
        }else{
            return "1";//测试 默认iOS 
        }
    }
    //获取token
    data.getAccessToken = function(){
        //return localStorage.getItem("2017MEET_TOKEN");
        var UINFO = JSON.parse(localStorage.getItem("INFO_2017MEET_SONG")) || {};//获取缓存用户信息

        return UINFO.token;
        // if(checkFromApp()){
        //     return window.web.getAccessToken()
        // }else{
        //     return "xffXYbhmKjdVtzJTaXqLYPj6UAXHThJMIZZ8uoMVZp4OeLpVD8cWiXDnbOHqNOk6g8ineQQZllw57w7k7SBO3iBsFOonIWO6"
        // }
    }
    //获取is_valid
    data.getValid = function(){
        var UINFO = JSON.parse(localStorage.getItem("INFO_2017MEET_SONG")) || {};//获取缓存用户信息
        return UINFO.is_valid;
    }
    //登录
    data.logInApp = function(succ){
        $.ajax({
            url: CONFIG.getJK()+"api_login.php",
            type: "GET", 
            async:true,
            data: {appid:main.getAppUserInfo().appid,apptoken:main.getAppUserInfo().apptoken,uname:main.getAppUserInfo().uname,avata:main.getAppUserInfo().avata,dev_cd:main.getAppUserInfo().dev_cd},
            timeout: 5000, 
            dataType: 'jsonp',
            success: function (data) { 
                //alert("登录>"+data.errcode)
                if(data.errcode == "0"){
                    localStorage.setItem("INFO_2017MEET_SONG",JSON.stringify(data))                      //记录当前投票用户信息
                    succ(data);
                }else if(data.errcode == "1201" || data.errcode == "120"){//APPToken验证失败 跳转故障申告
                    mui.alert(data.errmsg, '', function() {
                        window.web.backHome();
                    });
                    
                }else{//
                    mui.alert(data.errmsg, '', function() {
                        window.web.backHome();
                    });
                    
                }
                
                //succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };
    //设置用户信息
    data.setUserInfo = function(){
        var UINFO = JSON.parse(localStorage.getItem("INFO_2017MEET_SONG"));//获取缓存用户信息
        $(".u-hd img").attr("src",main.getAppUserInfo().avata);
        $(".u-realname").html(UINFO.realname)
        $(".u-phone").html("联系电话："+UINFO.phone)
        $(".u-identity").html("证件号码："+UINFO.identity)
    }
	//获取成员信息
	data.getAllMembers = function(succ){
        $.ajax({
            url: '../resource/json/vote_member.json',
            type: "GET", 
            dataType:"json",
            success: function (data) { 

                succ(data.rows)
                
            }
        });
       
    };
    //获取用户资料
    data.getUserInfo = function(succ){
        //alert("fun-getUserInfo")
        $.ajax({
            url: CONFIG.getJK()+"api_user_info.php",
            type: "GET", 
            async:true,
            data: {},
            timeout: 5000, 
            dataType: 'jsonp',
            success: function (data) { 
                
                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };
    //短信请求验证码
    data.sendSMS = function(_area,_phone,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api_send_sms.php",
            type: "GET", 
            async:true,
            data: {area:_area,phone:_phone,token:main.getAccessToken(),dev_cd:main.getAppUserInfo().dev_cd},
            timeout: 5000, 
            dataType: 'jsonp',
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };
    //提交个人信息
    data.submitInfo = function(_area,_phone,_sms_code,_realname,_identity,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api_user_info.php",
            type: "GET", 
            async:true,
            data: {area:_area,phone:_phone,sms_code:_sms_code,realname:_realname,identity:_identity,token:main.getAccessToken(),dev_cd:main.getAppUserInfo().dev_cd},
            timeout: 5000, 
            dataType: 'jsonp',
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };
    //可预约成员及场次
    data.getMeetInfo = function(succ){
        $.ajax({
            url:  CONFIG.getJK()+"api_meet_info.php",
            type: "GET", 
            async:true,
            data: {token:main.getAccessToken(),dev_cd:main.getAppUserInfo().dev_cd},
            timeout: 5000, 
            dataType: 'jsonp',
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    }
    //提交预约
    data.submitMeetInfo = function(_sid,_tid,_period,_cd_nm,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api_user_meet.php",
            type: "GET", 
            async:true,
            data: {sid:_sid,tid:_tid,period:_period,cd_nm:_cd_nm,token:main.getAccessToken(),dev_cd:main.getAppUserInfo().dev_cd},
            timeout: 5000, 
            dataType: 'jsonp',
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    }
    //可预约成员及场次
    data.getMeetLog = function(succ){
        $.ajax({
            url:  CONFIG.getJK()+"api_meet_log.php",
            type: "GET", 
            async:true,
            data: {token:main.getAccessToken(),dev_cd:main.getAppUserInfo().dev_cd},
            timeout: 5000, 
            dataType: 'jsonp',
            success: function (data) { 
                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    }
    //取消预约
    data.cancelMeet = function(_logid,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api_cancel_meet.php",
            type: "GET", 
            async:true,
            data: {logid:_logid,token:main.getAccessToken(),dev_cd:main.getAppUserInfo().dev_cd},
            timeout: 5000, 
            dataType: 'jsonp',
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    }
    //故障申告
    data.bugReport = function(phone,pic,submit_info,succ,error){
        $.ajax({
            url: CONFIG.getJK()+"api_feedback.php",
            type: "GET", 
            async:true,
            data: { appid:main.getAppUserInfo().appid,                         //用户ID（WEB场合：丝瓜账号，APP场合：APPID）
                    uname:main.getAppUserInfo().uname,                         //用户昵称
                    phone:phone,                                               //联系电话
                    pic_url:pic,                                               //故障截图
                    browser:"APP",                                             //浏览器（APP，WX，官网）
                    submit_info:submit_info,                                     //故障内容
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
            url: CONFIG.getJK()+"api_feedback_log.php",
            type: "GET", 
            async:true,
            data: { appid:main.getAppUserInfo().appid,                          //用户ID（WEB场合：丝瓜账号，APP场合：APPID）
                    offset:offset,
                    limit:_limit                            //记录条数
                 
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