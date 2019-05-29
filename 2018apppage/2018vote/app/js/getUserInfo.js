//获取用户信息   首页除外
 var token = localStorage.getItem('token');
(function(data) {
   
    var localInterval;

    data.getUserInfo = function(succ){
        var uinfo = main.getUserInfo(token,function(dt){
            if(dt.status == 401){//登录已失效，请重新登录
                main.logInApp(function(dt1){
                    userInfo.setUserInfo(dt1)
                    //succ(dt1)
                })
            }else if(dt.status == 200){
                userInfo.setUserInfo(dt.content)
            }else{
                main.alert(dt.message)
            }
            succ()
        })
    }
    //进行操作后  动态刷新最新用户信息
    data.refreshUserInfo = function(succ){
        //alert("refreshUserInfo")
        var uinfo = main.getUserInfo(token,function(dt){
            if(dt.status == 401){//登录已失效，请重新登录
                main.logInApp(function(dt1){
                    userInfo.setUserInfo(dt1)
                })
            }else if(dt.status == 200){
                userInfo.setUserInfo(dt.content)
            }else{
                main.alert(dt.message)
            }
            
        })
        succ()
    }



    //获取用户信息后  更新到页面
    data.setUserInfo = function(dt){
        console.log(">>>setUserInfo")
        //其他页面用户信息更新
        $(".vote-name").html(dt.nickName);
        $(".vote-num span:first-child").html(dt.tpRest);
        $(".votenum").html(dt.tpRest);
        //$(".vote-avatar img").attr("src",dt.avata)
        $(".vote-avatar").css({"background":"#fff url("+dt.avatar+") no-repeat","background-position-x":"50%","background-size":"100%"})

        /*首页更新用户信息
        */
        var voted = Math.ceil((parseInt(dt.tpTotal*100)-parseInt(dt.tpRest*100))/100)
        $(".vote-left .vote-num").html("("+dt.tpRest+")");
        $(".vote-used .vote-num").html("("+voted+")");
        //$(".user-name").html(dt.uname);
        $(".user-name").html(main.getAppUserInfo().nickName);
        //if(dt.avata != null && dt.avata != undefined){
            //$(".user-hd").css({"background":"#fff url("+dt.avata+") no-repeat","background-position-x":"50%","background-size":"100%"})
        $(".user-hd").css({"background":"#fff url("+main.getAppUserInfo().avatar+") no-repeat","background-position-x":"50%","background-size":"100%"})
        //}


        localStorage.setItem("APP_USER_INFO",JSON.stringify(main.getAppUserInfo()));//缓存app用户信息
        localStorage.setItem("USER_INFO",JSON.stringify(dt))
    }
    //首页监听动态用户信息
    data.setLocalUserInfo = function(){  
        if(localInterval != null){
            clearInterval(localInterval)
        }
        localInterval = setInterval(function(){
            var USER_INFO = JSON.parse(localStorage.getItem("USER_INFO")) || {}; 
            $(".vote-left .vote-num").html("("+USER_INFO.tpRest+")");
            var voted = Math.ceil((parseInt(USER_INFO.tpTotal*100)-parseInt(USER_INFO.tpRest*100))/100)
            $(".vote-used .vote-num").html("("+voted+")");
            $(".vote_num").html("("+USER_INFO.tpRest+")")
            console.log("setLocalUserInfo>"+USER_INFO.tpTotal+"||"+USER_INFO.tpTotal)
        },1000)
        
    }

}(window.userInfo = {}));


