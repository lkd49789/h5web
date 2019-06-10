(function(data) {
 //vip/detail 跳转vip短链接
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"QJIib2ZR6fOubciMC+0Ku1JgRS5PvF0LcvvYk26/NjzvtD6UpldHG5KMXZvhU+PKHcfvnw5WDA/LjGH8mfnympD75GME3LRr",   //验证Token
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
    //首页曲目获取列表
    data.getList = function (succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/activity/song/v1/songList",
            type: "POST",
            dataType: "json",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }
    //曲目详情
    data.listDetails = function (ctime,songId,succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/activity/song/v1/songDetail",
            type: "POST",
            dataType: "json",
            contentType:"application/json",
            data:JSON.stringify({"ctime": ctime,"limit": 5,"songId": songId}),
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }
    //曲目点赞
    data.setPraise=function(songId,succ){
        $.ajax({
            url: CONFIG.getLink() + "api/activity/song/v1/songPraise",
            type: "POST",
            dataType: "json",
            contentType:"application/json",
            data:JSON.stringify({"songId": songId}),
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }
    //帖子点赞
    data.setPraise2=function(sourceId,succ){
        $.ajax({
            url: CONFIG.getLink2() + "api/v1/praise/source",
            type: "POST",
            dataType: "json",
            contentType:"application/json",
            data:JSON.stringify({"sourceId": sourceId,"sourceType":"POST"}),
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }
    //获取评论
    data.getComment=function(succ){
        $.ajax({
            url: CONFIG.getLink() + "api/activity/song/v1/postDetail",
            type: "POST",
            dataType: "json",
            contentType:"application/json",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }
    
}(window.main = {}));