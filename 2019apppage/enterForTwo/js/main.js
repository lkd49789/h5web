(function(data) {
 //vip/detail 跳转vip短链接
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",     
        "apptoken":"",
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
    /*报名 */
    data.getApply = function(num,succ){
        $.ajax({
            url:CONFIG.getLink() +"api/activity/v1/theatreCanvass",
            type: "POST",
            dataType: "json",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data: JSON.stringify({ "type": num}),
            contentType: 'application/json',
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert("eee");
            }
        })
    }

    
}(window.main = {}));