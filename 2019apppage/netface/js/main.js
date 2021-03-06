(function(data) {
    //vip/detail 跳转vip短链接
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"uVpe+EUuQTcPZHCW6R++OXmZoW5TmQ6QXWYFVprbtsjrUa5MROvff+jkeF1pIktoThHcAWBhAclMNupaSB3bZbMy+cLS2CwFQEN8OCKVg87NKTASIdFI4ojGDT+sqM1T",                //验证Token
        "uname":"nicker",                                 //用户昵称
        "avata":"avata",                                    //头像地址
        "dev_cd":"dev_cd"                        //设备号
    }
    
    
    //口袋用户信息
    if(checkFromApp()){
        var app_info = JSON.parse(dsBridge.call("snhAppInfo"))
        
        var dev_cd;
        if(app_info.phoneSystemVersion){
            dev_cd = app_info.phoneSystemVersion+";"+app_info.phoneName+";"+app_info.version + ";"+app_info.build
        }else{
            dev_cd = app_info.osType+";"+app_info.osVersion+";"+app_info.deviceName+";"+app_info.appVersion +";"+app_info.appBuild
        }
        var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
        var nickname = u_info.userInfo.nickname
        if(nickname == null || nickname == undefined){
            nickname = u_info.userInfo.nickName
        }
        var appUserInfo = {
            "appid":u_info.userInfo.userId,             //用户ID
            "apptoken":u_info.token,                                             //验证Token
            "uname":nickname,             //用户昵称
            "avata":u_info.userInfo.avatar,             //头像地址
            "dev_cd":dev_cd                                                //设备号
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
    //应援计划首页（截止后页面）
    data.getList = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/user/tp/log",
            type: "POST", 
            dataType: "json",
            contentType: 'application/json',
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({}),
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    //购买
    data.buy = function(_address,_buyNum,_cdType,_payType,succ){
        $.ajax({
            url:CONFIG.getLink()+"api/v1/user/tp/buy",
            type: "POST", 
            dataType: "json",
            contentType: 'application/json',
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({
              "address": _address,
              "appInfo": main.getAppUserInfo().dev_cd,
              "buyNum": _buyNum,
              "cdType": _cdType,
              "payType": _payType
            }),
            success: function (data) { 
                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
             //alert("eee");
            } 
        });
    }
    //申诉列表
    data.getAppealList = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/appeal/get/event",
            type: "POST", 
            dataType: "json",
            contentType: 'application/json',
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({}),
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    //提交申诉
    data.submit = function(_dt,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/appeal/setappeal",
            type: "POST", 
            dataType: "json",
            contentType: 'application/json',
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:_dt,
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    
}(window.main = {}));


function formatTime(str,time) { 
    if(time == 0){
        return ""
    }else{
        var date = new Date();
        date.setTime(time);
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
        second = second < 10 ? ('0' + second) : second;   
        return str+h+':'+minute+':'+second;   
    }
}
