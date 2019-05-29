(function(data) {
	
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
/*-------------------------------------------------------------------------------------------------------------------------------------------------------*/
    //发送验证码
    data.getCode = function(_mobile,succ){
        $.ajax({
            url:"https://pscan.48.cn/qrscansystem/api/ft/v1/verification/code",
            type: "POST", 
            data: {
                mobile:_mobile
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

    //预约
    data.subscribeInfo = function(_mobile,_code,succ){
        $.ajax({
            url:"https://pscan.48.cn/qrscansystem/api/ft/v1/subscribe",
            type: "POST", 
            data:{
                token:main.getAppUserInfo().apptoken,
                mobile:_mobile,
                vCode:_code,
                userId:main.getAppUserInfo().appid,
                type:"SMOX"
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


    //获取成员列表
    data.getMemberList = function(succ){
        $.ajax({
            url:"https://pscan.48.cn/qrscansystem/api/ft/v1/ranking/list",
            type: "POST", 
            data:{
              type:"SMOX"
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


    //投票
    data.voteDone = function(_memberId,succ){
        $.ajax({
            url:"https://pscan.48.cn/qrscansystem/api/ft/v1/vote",
            type: "POST", 
            data: {
                token:main.getAppUserInfo().apptoken,
                memberId:_memberId,
                type:"SMOX"
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
    

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
    //跳转
    data.hrefTo = function(_url){
        if(checkFromApp()){
            window.web.gotoDetail("https://h5.48.cn/2018apppage/premiereFTidol/"+_url);
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
}(window.main = {}));