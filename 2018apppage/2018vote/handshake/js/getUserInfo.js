//获取用户信息   首页除外

(function(data) {
    var localInterval;

    data.getUserInfo = function(succ){
        var uinfo = main.getUserInfo(function(dt){
            if(dt.errcode == "119" || dt.errcode == "114" || dt.errcode == "101"){//登录已失效，请重新登录
                main.logInApp(function(dt1){
                    userInfo.setUserInfo(dt1)
                    //succ(dt1)
                })
            }else{
                userInfo.setUserInfo(dt)
                
            }
            succ()
        })
    }
    //进行操作后  动态刷新最新用户信息
    data.refreshUserInfo = function(succ){
        //alert("refreshUserInfo")
        var uinfo = main.getUserInfo(function(dt){
            if(dt.errcode == "119" || dt.errcode == "114" || dt.errcode == "101"){//登录已失效，请重新登录
                main.logInApp(function(dt1){
                    userInfo.setUserInfo(dt1)
                })
            }else if(dt.errcode == "0"){
                userInfo.setUserInfo(dt)
            }else{
                main.alert(dt.errmsg)
            }
            
        })
        succ()
    }
    //获取用户信息后  更新到页面
    data.setUserInfo = function(dt){
        console.log(">>>setUserInfo")
        //其他页面用户信息更新
        $(".vote-name").html(dt.uname);
        $(".vote-num span:first-child").html(dt.tp_rest);
        $(".votenum").html(dt.tp_rest);
        //$(".vote-avatar img").attr("src",dt.avata)
        $(".vote-avatar").css({"background":"#fff url("+dt.avata+") no-repeat","background-position-x":"50%","background-size":"100%"})

        /*首页更新用户信息
        */
        $(".vote-left .vote-num").html("("+dt.tp_rest+")");
        $(".vote-used .vote-num").html("("+(Number(dt.tp_total)*10-Number(dt.tp_rest)*10)/10+")");
        //$(".user-name").html(dt.uname);
        $(".user-name").html(main.getAppUserInfo().uname);
        //if(dt.avata != null && dt.avata != undefined){
            //$(".user-hd").css({"background":"#fff url("+dt.avata+") no-repeat","background-position-x":"50%","background-size":"100%"})
        $(".user-hd").css({"background":"#fff url("+main.getAppUserInfo().avata+") no-repeat","background-position-x":"50%","background-size":"100%"})
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
            $(".vote-left .vote-num").html("("+USER_INFO.tp_rest+")");
            $(".vote-used .vote-num").html("("+(Number(USER_INFO.tp_total)*10-Number(USER_INFO.tp_rest)*10)/10+")");
            $(".vote_num").html("("+USER_INFO.tp_rest+")")
            
        },1000)
        
    }

    data.setAppUserInfo = function(){
        $(".u-hd img").attr("src",)
    }

}(window.userInfo = {}));


