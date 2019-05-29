(function(data){
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"",                //验证Token
        "uname":"nicker",                                 //用户昵称
        "avata":"avata",                                    //头像地址
        "dev_cd":"dev_cd",                        //设备号
        "bindInfo":"bindInfo"
    }

    //口袋用户信息
    if(checkFromNew()){
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
            "avatar":u_info.userInfo.avatar,             //头像地址
            "device":dev_cd                                                //设备号
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
    /*成员 */
     //我的信息
     data.getIdolMy = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/idft/v1/myInfo",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert("我的信息",jqXHR);
            } 
        });
    };

    //积分榜
    data.getIdolIntegral = function(type,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/idft/v1/integralRank",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({"type":type}),
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
              alert("积分榜",jqXHR);
            } 
        });
    };
    //公演MVP
    data.getIdolMVP = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/idft/v1/mvpEvents",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert("公演MVP",jqXHR);
            } 
        });
    };
    //公演MVP榜-场次排名详情
    data.getIdolMVPDetail = function(infoId,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/idft/v1/mvpEventDetail",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({"infoId":infoId}),
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert("公演MVP",jqXHR);
            } 
        });
    };
    //获取作品
    data.getProduction = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/idft/v1/platform",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert("获取作品",jqXHR);
            } 
        });
    };
    //保存作品
    data.setProduction = function(arr,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/idft/v1/savePlatform",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify(arr),
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert("获取作品",jqXHR);
            } 
        });
    };
     /*成员end */


     /*粉丝 *
        首页 */
    data.homePage = function(succ){
        $.ajax({
            url:  CONFIG.getLink2()+"api/v1/melee/rank/idftMeleeRank",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert("粉丝首页",jqXHR);
            } 
        });
    };

    /*周详情 */
    data.getMeleeWeekRank= function(rankId,succ){
        $.ajax({
            url:  CONFIG.getLink2()+"api/v1/melee/rank/getMeleeWeekRank",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({"limit": 500, "nextId": 0,"rankId": rankId}),
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert("重新认识下",jqXHR);
            } 
        });
    };
    /*重新认识下 */
    data.getReunderstanding = function(ctime,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/idft/v1/replyKnow",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({"limit": 0, "nextId": 0,"rankId": 0,"limit":8,"ctime":ctime}),
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert("重新认识下",jqXHR);
            } 
        });
    };


     /*粉丝end */

    
}(window.main = {}))