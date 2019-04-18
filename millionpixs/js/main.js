(function(data) {

    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"",                          //验证Token
        "uname":"GavinG",                                 //用户昵称
        "avata":"https://source2.48.cn/mediasource/avatar/27422.jpg",                                    //头像地址
        "dev_cd":"123456789"                        //设备号
    }

//--------------------------------------------------------------------------------------------------------------------
    //正式
    //var appUserInfo
    if(checkFromApp()){
        var appUserInfo = {
            "appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avata":window.web.getLoginUserPic(),            //头像地址
            "dev_cd":(window.web.getPhoneIMEI().length <3) ? window.web.getLoginUserId() :  window.web.getPhoneIMEI()   //设备号
        }
        
    }
    
//--------------------------------------------------------------------------------------------------------------------
    //获取app用户信息
    data.getAppUserInfo = function(){
        console.log("checkFromApp>>"+checkFromApp())
        if(checkFromApp()){
            return appUserInfo;
        }else{
            return webUserInfo;
        }
    }
    //获取缓存用户信息
    data.getUserInfo = function(){
        return JSON.parse(localStorage.getItem("USER_millionpixs"));
    }
    //获取服务器下发token
    data.getToken = function(){
        return main.getUserInfo().token
    }
    //获取选区
    data.getData = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/48game/v1/query/index",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            // beforeSend: function (request) {
            //      request.setRequestHeader("token", main.getToken());
            // },
            data: JSON.stringify({
                "userId":main.getUserInfo().userInfo.userId
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

    //提交选区
    data.submitData = function(_data,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/48game/v1/buy/lattice",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            data: _data,
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
    
    //
    //获取uuid
    data.getUUid = function(succ){
        $.ajax({
            url:  CONFIG.getLoginLink()+"api/v1/qrcode/uuid/get",
            type: "GET", 
            async:true,
            // contentType: "application/json; charset=utf-8",
            data: {},
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    }

    //是否登录
    data.checkIsLogin = function(_uuid,succ){
        $.ajax({
            url:  CONFIG.getLoginLink()+"api/v1/qrcode/login",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({uuid:_uuid}),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    }
    //新版本2019 获取二维码
    main.getQrCode = function(succ){
        $.get("https://pocketapi.48.cn/user/api/v1/qrcode/img",function(data){
            succ(data)
        })
    }
    //新版本2019 检查是否登录
    data.checkIsLoginNew = function(_code,succ){
        $.get("https://pocketapi.48.cn/user/api/v1/login/qrcode/getuserinfo?code=" + _code,function(data){
            succ(data)
            // if(data.status == 200){
            //     console.log(data);
            // }else{
            //     if(data.status == 40001){
            //         alert("请重新生成二维码")
            //     }
            // }
        })
    }
    //跳转
    data.hrefTo = function(_url){
        if(checkFromApp()){
            window.web.gotoDetail(CONFIG.geturl()+_url);
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
//		$('body').append('<div class="mui-popup mui-popup-in" style="display: block;"><div class="mui-popup-inner"><div class="mui-popup-text">'+ name +'</div></div><div class="mui-popup-buttons"><span class="mui-popup-button mui-popup-button-bold">确定</span></div></div><div class="mui-popup-backdrop mui-active" style="display: block;"></div>')
// 		$('.mui-popup-buttons').click(function(){
// 			$('.mui-popup,.mui-popup-backdrop').remove()
// 		})
    }
}(window.main = {}));



//返回格式化的时间了符串	   
function getDateFormat(time1){
	var yearStr = time1.getFullYear().toString();
	var monStr=(time1.getMonth()+1).toString();
	var dayStr=time1.getDate().toString();
	var hhStr =time1.getHours().toString();
	var mmStr=time1.getMinutes().toString();
	var ssStr=time1.getSeconds().toString();
	var SSSStr=time1.getMilliseconds().toString();
	return yearStr+monStr+dayStr+hhStr+mmStr+ssStr+SSSStr;
}
	
//返回格式化的时间了符串	   
// function getDFormat(time1){
// 	var yearStr = time1.getFullYear().toString();
// 	var monStr=(time1.getMonth()+1).toString();
// 	var dayStr=time1.getDate().toString();
// 	var hhStr =time1.getHours().toString();
// 	var mmStr=time1.getMinutes().toString();
// 	var ssStr=time1.getSeconds().toString();
// 	return yearStr+"-"+monStr+"-"+dayStr+" "+hhStr+":"+mmStr+":"+ssStr;
// }

function getDFormat(time1){
    var timestamp4 = new Date(time1);

    return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)
}