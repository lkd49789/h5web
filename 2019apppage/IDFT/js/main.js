(function(data){
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"/SV7Ugtmu4Z5guu5cvq4gU7vsflc3NDuUsd/TPS44h3MnwXEeZbAIg==",                //验证Token
        "uname":"nicker",                                 //用户昵称
        "avata":"avata",                                    //头像地址
        "dev_cd":"dev_cd",                        //设备号
        "bindInfo":"bindInfo"
    }

    //口袋用户信息
    if(checkFromNew()){
        var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
        var appUserInfo = {
            "appid":u_info.userInfo.userId,             //用户ID
            "apptoken":u_info.token,                                             //验证Token
            "uname":u_info.userInfo.nickname,             //用户昵称
            "avata": u_info.userInfo.avatar,             //头像地址
            "dev_cd":u_info.IMEI,                                                //设备号
            "bindInfo":u_info.userInfo.bindInfo                                 //绑定信息
        }
        if(appUserInfo.uname == null || appUserInfo.uname == undefined){
            appUserInfo.uname = u_info.userInfo.nickName
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

    
}(window.main = {}))