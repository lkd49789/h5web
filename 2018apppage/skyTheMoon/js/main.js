(function(data) {
    var interUrl = ""
    //web端测试（用户信息）
    var webUserInfo = {
        //"appid":"87333",                                //用户ID
        "apptoken":"",                          //验证Token
        "uname":"嘟嘟宝",                                 //用户昵称
        "avatar":"https://source2.48.cn/mediasource/avatar/87333.jpg",                                    //头像地址
        //"dev_cd":"6ABD1571-807E-4699-B045-6DA85D7C262E"                        //设备号
    }
    
    //口袋用户信息
    if(checkFromApp()){
        var appUserInfo = {
            //"appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avatar":window.web.getLoginUserPic(),            //头像地址
            //"dev_cd":window.web.getPhoneIMEI()               //设备号
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

    //获取全国排名
    data.getAllList = function(succ){
        
        $.ajax({
            url:  CONFIG.getUerlink()+"/api/moonFestival/v1/index",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
               "token": main.getAppUserInfo().apptoken
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
    //获取分省列表
    data.getProvinceList = function(_provinceNum,succ){
        $.ajax({
            url:  CONFIG.getUerlink()+"/api/moonFestival/v1/provinceRank",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
               "provinceNum":_provinceNum
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

    //获取地区列表
    data.getAllProvince = function(succ){
        $.ajax({
            url:  CONFIG.getUerlink()+"/api/moonFestival/v1/allProvince",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
               
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
    //提交祝福
    data.sendBless = function(_provinceNum,_bless,succ){
        $.ajax({
            url:  CONFIG.getUerlink()+"/api/moonFestival/v1/sendBless",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "avatar": main.getAppUserInfo().avatar,
                "bless": _bless,
                "nicker": main.getAppUserInfo().uname,
                "provinceNum": _provinceNum,
                "token": main.getAppUserInfo().apptoken
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
    //用户拥有的次数
    data.getCutNum = function(succ){
        $.ajax({
            url:  CONFIG.getUerlink()+"/api/moonFestival/v1/queryCutNum",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "token": main.getAppUserInfo().apptoken
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
    //提交次数
    data.submitCutNum = function(_num,succ){
        $.ajax({
            url:  CONFIG.getUerlink()+"/api/moonFestival/v1/cutCake",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "cakeNum":_num,
                "token": main.getAppUserInfo().apptoken
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
    //打开小程序
    data.openWX = function(id){
        window.web.launchWechatMiniProgram(main.launchParams(id));
    }
    //跳转详情页
    data.launchParams = function(id) {
        var param = {"defaultDetailsParam": {"infoId": id}}
        var para = encodeURIComponent(JSON.stringify(param));
        return JSON.stringify({
            id: "gh_dc1ce10e9cd3",
            path: "pages/detail/detail?para="+para+"&apptoken="+main.getAppUserInfo().apptoken,
            type: 'release',  //test（开发版），trial（体验版），release（正式版）
            callback: "launchCallback"
        })
    }
    // 无头像添加域名
    data.formatAvata = function(avatar){
        if(avatar.indexOf("http://")>=0 ||avatar.indexOf("https://")>=0){
            return avatar
        }else{
            return picUrl+avatar;
        }
    }

    //跳转
    data.hrefTo = function(_url){
        if(checkFromApp()){
            window.web.gotoDetail(CONFIG.getJumplink()+_url);
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




function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}