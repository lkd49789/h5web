(function(data) {
	//活动id  固定值
	var actionId = "591d738ad5a7778da880737c"

	//web端测试（用户信息）
    var webUserInfo = {
        "appid":"1",                                //用户ID
        "apptoken":"1",                          //验证Token
        "uname":"1",                                 //用户昵称
        "avata":"1",                                    //头像地址
        "dev_cd":"1"                        //设备号
    }
    
    //口袋用户信息
	if(checkFromApp()){
        var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
        var appUserInfo = {
            "appid":u_info.userInfo.bigSmallInfo.bigUserInfo.userId,             //用户ID
            "apptoken":u_info.token,                                             //验证Token
            "uname":u_info.userInfo.bigSmallInfo.bigUserInfo.nickname,             //用户昵称
            "avata":u_info.userInfo.bigSmallInfo.bigUserInfo.avatar,             //头像地址
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------*/
    //获取用户状态
    data.getUserInfo = function(succ){
        $.ajax({
            url:CONFIG.geturl()+"api/minilive/user_state",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                appId:main.getAppUserInfo().appid,
                token:main.getAppUserInfo().apptoken
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

    //获取场次列表
    data.getSeasonList = function(succ){
        $.ajax({
            url:CONFIG.geturl()+"api/minilive/scene_list",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
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


    //获取歌曲列表
    data.getMusicList = function(succ){
        $.ajax({
            url:CONFIG.geturl()+"api/minilive/music_list",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
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

    //确认兑换
    data.exchangeDone = function(_recharge_no,succ){
        $.ajax({
            url:CONFIG.geturl()+"api/minilive/exchange",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                appId:main.getAppUserInfo().appid,
                appToken:main.getAppUserInfo().apptoken,
                dev_cd:main.getAppUserInfo().dev_cd,
                recharge_no:_recharge_no
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

    //投票
    data.voteDone = function(_oid,_mid,_tp_no,succ){
        $.ajax({
            url:CONFIG.geturl()+"api/minilive/vote",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                appId:main.getAppUserInfo().appid,
                token:main.getAppUserInfo().apptoken,
                dev_cd:main.getAppUserInfo().dev_cd,
                nickName:main.getAppUserInfo().uname,
                avata:main.getAppUserInfo().avata,
                oid:_oid,
                mid:_mid,
                tp_no:_tp_no
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
    

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
    //弹框
    data.alert = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }
}(window.main = {}));