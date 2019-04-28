(function(data) {
    //vip/detail 跳转vip短链接
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"0ml7QFQJj3++8fgw3lDvKSMqWJ/HppeCtlRA9jmI1E3xBstOmq43JaTkGkauvSPSGno2NISUMKu3lcOKSWCVjxTkr/unCCk0",                //验证Token
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
    //获取鸡腿数
    data.getJt = function(succ){
        
        $.ajax({
            url:  CONFIG.getLink()+"withdraw/api/v1/balance",
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
    
    //提现
    data.getRmb = function(_jt,succ){
        $.ajax({
            url:  CONFIG.getLink()+"withdraw/api/v1/withdraw",
            type: "POST", 
            dataType: "json",
            contentType: 'application/json',
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({
                "money":_jt
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




