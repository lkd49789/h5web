(function(data) {
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"1",                          //验证Token
        "uname":"测试",                                 //用户昵称
        "avata":"https://wx.qlogo.cn/mmopen/vi_32/YOGtTgic3zLev1kN6T2e5LCMWER0BxopGLHQibM6JNyZNZuzoqunMC9A55oCZCvicic5Y8OiaibdRlTgQr0xIBQeia52g/132",                                    //头像地址
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


    //获取服务器下发token
    data.getToken = function(){
        if(checkFromApp()){
            return window.web.getAccessToken()
        }else{
            return ""
        }
        
    }
    //
    data.getAllMembers = function(succ){
        $.ajax({
            url: 'json/member.json',
            type: "GET", 
            dataType:"json",
            success: function (data) { 
                console.log(data)
                succ(data)
                
            }
        });
       
    };
    //获取鸡腿数
    data.getMoney = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/swimsuit/v1/money",
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
    //实时排名
    data.getRanking = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/swimsuit/v1/ranking",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            // beforeSend: function (request) {
            //      request.setRequestHeader("token", main.getToken());
            // },
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
    //实时排名
    data.sendMoney = function(memberId,money,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/swimsuit/v1/sendMoney",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            data: JSON.stringify({
                "memberId": memberId,
                "money": money,
                "avatar": main.getAppUserInfo().avata,
                "nicker": main.getAppUserInfo().uname
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
    if ((isFromMobile() && isExitsFunction("window.web.backHome"))) {
        
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
function getDFormat(time1){
	var yearStr = time1.getFullYear().toString();
	var monStr=(time1.getMonth()+1).toString();
	var dayStr=time1.getDate().toString();
	var hhStr =time1.getHours().toString();
	var mmStr=time1.getMinutes().toString();
	var ssStr=time1.getSeconds().toString();
	return yearStr+"-"+monStr+"-"+dayStr+" "+hhStr+":"+mmStr+":"+ssStr;
}