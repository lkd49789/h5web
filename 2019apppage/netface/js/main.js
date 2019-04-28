(function(data) {
    //vip/detail 跳转vip短链接
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"1MpIrMMAjhiqkOaAoNMrHr7xJr5/1m2tWGSg2LeCUAMotCjkZsOPFg==",                //验证Token
        "uname":"nicker",                                 //用户昵称
        "avata":"avata",                                    //头像地址
        "dev_cd":"dev_cd"                        //设备号
    }
    
    
    //口袋用户信息
    if(checkFromApp()){
        var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
        var appUserInfo = {
            "appid":u_info.userInfo.userId,             //用户ID
            "apptoken":u_info.token,                                             //验证Token
            "uname":u_info.userInfo.nickname,             //用户昵称
            "avata":u_info.userInfo.avatar,             //头像地址
            "dev_cd":u_info.IMEI                                                //设备号
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
            url:  CONFIG.getLink()+"api/activity/v1/aid/index",
            type: "POST", 
            dataType: "json",
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
    

    
}(window.main = {}));



