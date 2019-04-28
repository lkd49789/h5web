(function(data) {
 //vip/detail 跳转vip短链接
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        // "apptoken":"gAPn7Cywqux5guu5cvq4geMtH182EehR8RL9CWtoviVa+V9THsw/hg==",                //验证Token
        // "apptoken":"/SV7Ugtmu4Z5guu5cvq4gU7vsflc3NDuUsd/TPS44h3MnwXEeZbAIg==",   //验证Token
        // "apptoken":"UG0+fia6/A/W90Q3DS4fGH7cIMgRONx3cUbhs4Td6QOW1wDGOQFZgw==",   //验证Token
        "apptoken":"6p4v/9hX6iRRTPhdNvwwA3rJR54VPmH4tCJdrtbVl9Ae6TVZYHTlmJo1O9XkjIeyFmq3zwIMIuQ49AtvSGgZvEv2IdemW9YtK7g8E7VAjNqKC5htxUpLWwMAdAOuQeo7",   //验证Token
        "uname":"nicker",                                 //用户昵称
        "avata":"avata",                                    //头像地址
        "dev_cd":"dev_cd"                        //设备号
    }
    
    //口袋用户信息
    if(checkFromNew()){
        var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
        var nickname = ''
        if(isFromAndroid()){
            nickname = u_info.userInfo.nickName
        }else{
            nickname = u_info.userInfo.nickname
        }
        var appUserInfo = {
            "appid":u_info.userInfo.userId,             //用户ID
            "apptoken":u_info.token,                                             //验证Token
            "uname":nickname,                         //用户昵称
            "avata":u_info.userInfo.avatar,             //头像地址
            "dev_cd":u_info.IMEI                                                //设备号
        }
    }else if(checkFromOld()){
        var appUserInfo = {
            "appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avata":window.web.getLoginUserPic(),            //头像地址
            "dev_cd":(window.web.getPhoneIMEI().length <3) ? window.web.getLoginUserId() :  window.web.getPhoneIMEI()   //设备号
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
    //获取时间
    data.getList = function (succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/activity/v1/dateList",
            type: "POST",
            dataType: "json",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert("eee");
            }
        });
    }
    //预约 
    data.upEnterFor = function (date,succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/activity/v1/reservation",
            type: "POST",
            dataType: "json",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data: JSON.stringify({ "date": date}),
            contentType: 'application/json',
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert("eee");
            }
        });
    }

    
}(window.main = {}));