(function(data) {
	//web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"",                          //验证Token
        "uname":"",                                 //用户昵称
        "avata":"",                                    //头像地址
        "dev_cd":"",                        //设备号
        "bindInfo":""
    }
    
    
    //口袋用户信息
	if(checkFromApp()){
        var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
        var appUserInfo = {
            "appid":u_info.userInfo.bigSmallInfo.bigUserInfo.userId,             //用户ID
            "apptoken":u_info.token,                                             //验证Token
            "uname":u_info.userInfo.bigSmallInfo.bigUserInfo.nickname,             //用户昵称
            "avata":u_info.userInfo.bigSmallInfo.bigUserInfo.avatar,             //头像地址
            "dev_cd":u_info.IMEI,                                                //设备号
            "bindInfo":u_info.userInfo.bindInfo                                 //绑定信息
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
    data.getToken = function(){
        if(checkFromApp()){
            return main.getAppUserInfo().apptoken;
        }else{
            return "KarZXCY9pBevw721C3wNaZ0m0x2ECbX4pvVTsyZ8WE0SuRfv1e0y9w==";
        }
    }

    /*---------------------------------------------------------------------------------------------------------*/
    //获取列表
    data.getList = function(succ){
        $.ajax({
            url: CONFIG.getFormal()+"api/welfare/v1/list",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            data: JSON.stringify({
                
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    };


    //判断是否为星沃卡
    data.checkXingKa = function(succ){
        $.ajax({
            url: CONFIG.getFormalxk()+"api/starwo/v1/checkphone",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            data: JSON.stringify({
                
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
               // alert("eee");
            } 
        });
    }

    //星沃卡领取
    data.getGiftXk = function(succ){
        $.ajax({
            url: CONFIG.getFormalxk()+"api/starwo/v1/valid",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            data: JSON.stringify({
                
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }

    //获取充值进度
    
    data.getProgress = function(succ){
        $.ajax({
            url: "https://ppay.48.cn/paysystem/api/hwnewyear/v1/info",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            data: JSON.stringify({
                
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }


    //检测是否是乐享卡用户是否可激活可领取
    data.ifSure = function(succ){
        $.ajax({
            url: "https://pswc.48.cn/swcsystem/api/starwo/v1/check/activate",
            type: "POST", 
            dataType: "json",
            data:{
               userId:main.getAppUserInfo().appid
            },
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }


    //检测是否是乐享卡用户是否可激活可领取
    data.getifSure = function(_type,succ){
        $.ajax({
            url: "https://pswc.48.cn/swcsystem/api/starwo/v1/fr/month/check",
            type: "POST", 
            dataType: "json",
            data:{
               userId:main.getAppUserInfo().appid,
               type:_type
            },
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }


    //激活乐享卡
    data.activated = function(succ){
        $.ajax({
            url: "https://pswc.48.cn/swcsystem/api/starwo/v1/valid",
            type: "POST", 
            dataType: "json",
            data:{
               userId:main.getAppUserInfo().appid,
               token:main.getToken()
            },
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }

    //首次充值满领
    data.firstReceive = function(succ){
        $.ajax({
            url: "https://pswc.48.cn/swcsystem/api/starwo/v1/fr/award/give",
            type: "POST", 
            dataType: "json",
            data:{
               userId:main.getAppUserInfo().appid,
               token:main.getToken()
            },
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }

    //每月鸡腿返还领取
    data.monthlyReceive = function(succ){
        $.ajax({
            url: "https://pswc.48.cn/swcsystem/api/starwo/v1/money/month/give",
            type: "POST", 
            dataType: "json",
            data:{
               userId:main.getAppUserInfo().appid,
               token:main.getToken()
            },
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }


    //沃钱包福利领取列表
    data.getWoPayList = function(succ){
        $.ajax({
            url: "https://wowallet.48.cn/wowallet/api/capsule/v1/ReceiveList",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            data:{
               
            },
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }
    //沃钱包领取鸡腿
    data.getWoPayJT = function(succ){
        $.ajax({
            url: "https://wowallet.48.cn/wowallet/api/capsule/v1/receiveJitui",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            data:{
               
            },
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }
    /*---------------------------------------------------------------------------------------------------------*/
    //弹框
    data.alert = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }
    //时间格式化
    data.formatDate = function(time) { 
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
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
    }
}(window.main = {}));