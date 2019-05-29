(function(data) {
    var userId,nickName,avatar;////用户信息

    //获取服务器下发token
    data.getToken = function(){
        if(checkFromApp()){
            return window.web.getAccessToken()
        }else{
            
            console.log(localStorage.getItem("sports48_login"))
            return JSON.parse(localStorage.getItem("sports48_login")).content.token; 
        }
        
    }
    //用户登录
    data.logIn = function(_uname,_upass,succ){
        $.ajax({
            url: CONFIG.getUsersystemUrl()+"api/user/v1/web/login/phone",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                account:_uname,
                password:_upass
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            },
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };
    //检查是否登录
    data.checkLogin = function(){
        var u_info = JSON.parse(localStorage.getItem("sports48_login"));
        if(u_info == null || u_info == undefined || u_info==""){//
            return false;
        }else{
            return true;
        }
    }
    //获取登录用户信息
    data.getLoginUserInfo = function(){
        var u_info = JSON.parse(localStorage.getItem("POCKET48_USER_INFO"));
        if(u_info == null || u_info == undefined){//
            main.hrefTo("login.html");
        }else{
            return u_info.content.userInfo;
        }
    }

    //检查用户是否已经投票
    data.ifvote = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/vote/check",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            data: JSON.stringify({

            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    };
    //返回
    data.backTo = function(_url){
        if(checkFromApp()){
            window.web.backHome();
        }else{
            window.history.back(-1);
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


    data.getJson = function (url,succ) {
        $.ajax({
            type:"get",
            async:true,
            contentType: "application/json; charset=utf-8",
            url:url,
            dataType: "json",
            success: function(data){
                succ(data)
            }
        })  
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
    

}(window.main = {}));




