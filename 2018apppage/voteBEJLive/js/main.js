(function(data) {
	//web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"EO9jzra+5m44LMbAuzs+20S4HA56IjMV3p06RK93nWNtS0wHU5PLow==",                          //验证Token
        "uname":"GavinG",                                 //用户昵称
        "avata":"https://source2.48.cn/mediasource/avatar/27422.jpg",                                    //头像地址
        "dev_cd":"6ABD1571-807E-4699-B045-6DA85D7C262E"                        //设备号
    }
    
    
    //口袋用户信息
	if(checkFromApp()){
        var appUserInfo = {
            "appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avata":window.web.getLoginUserPic(),            //头像地址
            "dev_cd":window.web.getPhoneIMEI()               //设备号
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
        //alert("checkFromApp()>"+checkFromApp())
        if(checkFromApp()){
            return window.web.getAccessToken()
        }else{
            //return "EO9jzra+5m44LMbAuzs+20S4HA56IjMV3p06RK93nWNtS0wHU5PLow==";//5526
            return "rRrAdPgoMGCdRXr40hfjN74r06kWuPeqtRNvhYLjz9v4JlwUr1Y76o2HQmv6DR8m";//27422
        }
    }

    data.getLiveId = function(){
        var liveid = GetQueryString("liveId");
        if(liveid == null || liveid == undefined){
            return "5966f8a40cf28b8c5cce62ee";
        }else{
            return liveid;
        }
    }
    //-----------------------------------------------------------------------------------------------------首页--------------------
    //首页加载成员列表
    data.getMemberList = function(succ,fail){
        //alert(main.getToken())
        $.ajax({
            type:'POST',
            url:CONFIG.getInterfaceUrl()+"werewolf/kill/v1/getHomePage",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                "liveId":main.getLiveId(),
                "token":main.getToken()
            }),
            timeout: 5000, 
            success: function(data){
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
                fail();
            } 
        });
    }
    //-----------------------------------------------------------------------------------------------------第十三人--------------------
    //获得第十三人内容
    data.getThirteenPlayerInfo = function(_gameRound,succ){
        $.ajax({
            type:'POST',
            url:CONFIG.getInterfaceUrl()+"werewolf/kill/v1/getThirteenPlayerInfo",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                "liveId":main.getLiveId(),
                "gameRound":_gameRound,
                "token":main.getToken()
            }),
            timeout: 5000, 
            success: function(data){
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }
    //提交竞价
    data.thirteenPlayerCommit = function(_gameRound,_spendMoney,_content,succ){
        $.ajax({
            type:'POST',
            url:CONFIG.getInterfaceUrl()+"werewolf/kill/v1/thirteenPlayerCommit",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                "liveId":main.getLiveId(),
                "gameRound":_gameRound,
                "spendMoney":_spendMoney,
                "content":_content,
                "token":main.getToken()
            }),
            timeout: 5000, 
            success: function(data){
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }
    //---------------------------------------------------------------------------------------------------竞猜PK-----------------------------
    //获得竞猜PK内容
    data.getGuessInfo = function(_gameRound,succ){
        $.ajax({
            type:'POST',
            url:CONFIG.getInterfaceUrl()+"werewolf/kill/v1/getGuessInfo",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                "liveId":main.getLiveId(),
                "gameRound":_gameRound,
                "token":main.getToken()
            }),
            timeout: 5000, 
            success: function(data){
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }
    //竞猜PK内容提交
    data.guessInfoCommit = function(_gameRound,_spendMoney,_roleType,succ){
        $.ajax({
            type:'POST',
            url:CONFIG.getInterfaceUrl()+"werewolf/kill/v1/guessInfoCommit",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                "liveId":main.getLiveId(),
                "gameRound":_gameRound,
                "spendMoney":_spendMoney,
                "roleType":_roleType,
                "token":main.getToken()
            }),
            timeout: 5000, 
            success: function(data){
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }
    //---------------------------------------------------------------------------------------------------我的身份你做主--------------
    data.getCustomInfo = function(_gameRound,succ){
        $.ajax({
            type:'POST',
            url:CONFIG.getInterfaceUrl()+"werewolf/kill/v1/getCustomInfo",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                "liveId":main.getLiveId(),
                "gameRound":_gameRound,
                "token":main.getToken()
            }),
            timeout: 5000, 
            success: function(data){
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }
    //选择角色内容提交
    data.customInfoCommit = function(_gameRound,_memberId,_spendMoney,_roleId,succ){
        $.ajax({
            type:'POST',
            url:CONFIG.getInterfaceUrl()+"werewolf/kill/v1/customInfoCommit",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                "liveId":main.getLiveId(),
                "gameRound":_gameRound,
                "memberId":_memberId,
                "spendMoney":_spendMoney,
                "roleId":_roleId,
                "token":main.getToken()
            }),
            timeout: 5000, 
            success: function(data){
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }
    //无域名头像添加域名
    data.formatAvata = function(avata){
        if(avata.indexOf("http://")>=0 ||avata.indexOf("https://")>=0){
            return avata
        }else{
            return CONFIG.getAssetsUrl()+avata;
        }
    }
	//跳转
    data.hrefTo = function(_url){
        if(checkFromApp()){
            window.web.gotoDetail(_url);
        }else{
            window.location.href=_url;
        }
    }
    //返回
    data.backTo = function(_url){
        if(checkFromApp()){
            window.web.backHome();
        }else{
            window.history.back(-1);
        }
    }
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


function checkFromApp(){
    if(isFromMobile() && isExitsFunction("window.web.getLoginUserId"))
    {
        return true;
    }else{
        return false;
    }
}