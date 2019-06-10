(function(data) {
    //vip/detail 跳转vip短链接
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"8PjDbnEhlga0069YMkBERXt6hUBLUTDCma00V7D+cot9enS+h09f91V8m9AdpvQ26+Wxxl4jNtw=",                //验证Token
        //"apptoken":"dq4+d56rez35wLb3+X33imzoH99x4ykoNIkvMjqCUNnmhFrji/DQhhppYWQHWOKoNiJ2WyzCZXLbvFekSECJvw==",
        "uname":"nicker",                                 //用户昵称
        "avata":"avata",                                    //头像地址
        "dev_cd":"dev_cd"                        //设备号
    }
    
    
    //口袋用户信息
    if(checkFromApp()){
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
    //获取成员分数
    data.getScores = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/idft/v1/myIntegral",
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
    //获取成员信息
    data.getMemInfo = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/idft/v1/apply",
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
    //提交报名/放弃报名
    data.submit = function(_code,_info,succ){
        
        $.ajax({
            url:  CONFIG.getLink()+"api/idft/v1/submit",
            type: "POST", 
            dataType: "json",
            contentType: 'application/json',
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({
                code:_code,
                applyInfo:_info
            }),
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }

    
}(window.main = {}));



