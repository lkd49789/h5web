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
    data.getAppUserInfo = function(){
        console.log("checkFromApp>>"+checkFromApp())
        if(checkFromApp()){
            return appUserInfo;
        }else{
            return webUserInfo;
        }
    }
    //获取系统类型  ios   安卓
    data.getFrom = function(){
        if(checkFromApp()){
            return 0;//app
        }else{
            return 1;//微信公众号
        }
    }
    //获取服务器下发token
    data.getToken = function(){
        if(checkFromApp()){
            return window.web.getAccessToken()
        }else{
            return localStorage.getItem("token_20181111")
        }
    }
    //首页
    data.logIn = function(_account,_password,succ,error){
        $.ajax({
            url: "https://puser.48.cn/usersystem/api/user/v1/web/login/phone",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "account":_account,              
                "password":_password          
            }),
            timeout: 5000, 
            dataType:"json",
            success: function (data) { 
                
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //error()
            } 
        });
    };
    //首页
    data.getUserInfo = function(succ,error){
        $.ajax({
            url: CONFIG.getLink()+"api/v1/draw/index",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getToken());
            },
            data: JSON.stringify({
                
            }),
            timeout: 5000, 
            dataType:"json",
            success: function (data) { 
                localStorage.setItem("double11_2018",JSON.stringify(data.content))
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //error()
            } 
        });
    };
    //抽奖
    data.draw = function(times,succ,error){
        $.ajax({
            url: CONFIG.getLink()+"api/v1/draw/start/"+times,
            type: "POST",
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getToken());
                request.setRequestHeader("sourceType", main.getFrom());
            },
            data: JSON.stringify({
                
            }),
            timeout: 5000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //error(data)
            } 
        });
    };
    //奖励列表
    data.getList = function(succ,error){
        $.ajax({
            url: CONFIG.getLink()+"api/v1/draw/reward/list",
            type: "POST",
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getToken());
            },
            data: JSON.stringify({
                
            }),
            timeout: 5000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
               // error(data)
            } 
        });
    };
    //领取奖励
    data.receive = function(_id,succ,error){
        $.ajax({
            url: CONFIG.getLink()+"api/v1/draw/reward/receive/"+_id,
            type: "POST",
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getToken());
            },
            
            data: JSON.stringify({
                
            }),
            timeout: 5000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
               // error(data)
            } 
        });
    };
    //抽奖记录
    data.getHistoryList = function(_start,succ,error){
        $.ajax({
            url: CONFIG.getLink()+"api/v1/draw/history/list",
            type: "POST",
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getToken());
            },
            data: JSON.stringify({
                "start":_start,                  //开始查询点
                "limit":10                  //一次查询多少个
            }),
            timeout: 5000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
               // error(data)
            } 
        });
    };
    //首页奖励列表
    data.getBigPrizeList = function(_start,succ,error){
        $.ajax({
            url: CONFIG.getLink()+"api/v1/draw/reward/repo",
            type: "POST",
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getToken());
            },
            data: JSON.stringify({
                "start":_start,                  //开始查询点
                "limit":30                  //一次查询多少个
            }),
            timeout: 5000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
               // error(data)
            } 
        });
    };
    //
    data.getJson = function (url,succ) {
		$.ajax({
		    type:"get",
		    async:true,
            contentType: "application/json; charset=utf-8",
		    url:CONFIG.getJsonUrl()+url,
		    dataType: "json",
		    success: function(data){
		    	succ(data)
		    }
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




//------------------------------------------------------------------------------------判断是否来自移动设备
function isFromMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        return false;
    } else {
        return true;
    }
}

//------------------------------------------------------------------------------------------是否来自iphone
function isFromIphone() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    return bIsIphoneOs;
}
//--------------------------------------------------------------------------------------------是否来自口袋48
function checkFromApp() {
    if ((isFromMobile() && isExitsFunction("window.web.getLoginUserId"))) {
        
        return true;
    } else {
        
        return false;
    }
}

//----------------------------------------------------------------------------------------------------------判断是否存在方法
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch (e) {
    }
    return false;
}

//返回格式化的时间了符串	   
function getDateFormat(time1){
    var date = new Date(time1)
    var yearStr = date.getFullYear().toString();
    var monStr=(date.getMonth()+1).toString();
    var dayStr=date.getDate().toString();
    var hhStr =date.getHours().toString();
    var mmStr=date.getMinutes().toString();
    var ssStr=date.getSeconds().toString();
    if(hhStr < 10){hhStr = "0"+hhStr};
    if(mmStr < 10){mmStr = "0"+mmStr};
    
    return monStr+"-"+dayStr+" "+hhStr+":"+mmStr//+":"+ssStr;
}
	
//返回格式化的时间了符串	   
function getDFormat(time1){
    var date = new Date(time1)
	var yearStr = date.getFullYear().toString();
	var monStr=(date.getMonth()+1).toString();
	var dayStr=date.getDate().toString();
	var hhStr =date.getHours().toString();
	var mmStr=date.getMinutes().toString();
	var ssStr=date.getSeconds().toString();
    return monStr+"-"+dayStr//+" "+hhStr+":"+mmStr//+":"+ssStr;
	//return yearStr+"-"+monStr+"-"+dayStr+" "+hhStr+":"+mmStr+":"+ssStr;
}

