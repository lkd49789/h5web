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
    data.getSysType = function(){
        if(checkFromApp()){
            if(isFromIphone()){
                return "1";
            }else{
                return "2";
            }
        }else{
            return "1";//测试 默认iOS 
        }
    }
    //获取token
    data.getAccessToken = function(){
        var USER_INFO = JSON.parse(localStorage.getItem("USER_INFO")) || {}; 
        return USER_INFO.content.token;
        //APP73b17dd834c16f981624f4b2d8119d03
    }
    //获取服务器下发token
    data.getToken = function(){
        if(checkFromApp()){
            return window.web.getAccessToken()
        }else{
            
        }
    }
    data.getSystem = function(){
        if(isFromIphone){
            return "IOS"
        }else{
            return "ANDROID"
        }
    }
    
    //获取成员列表
    data.getMemberList = function(total,succ){
        // $.ajax({
        //     url: "json/star_member.json",
        //     type: "GET", 
        //     contentType: "application/json; charset=utf-8",
        //     timeout: 5000, 
        //     dataType:"json",
        //     success: function (data) { 
        //         succ(data)
        //     }
        // })
        $.ajax({
            url: CONFIG.getLink()+"api/v1/fslive/star?num="+total,
            type: "GET", 
            async:true,
            contentType: "application/json; charset=utf-8",
            
            timeout: 5000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    };
        
    //用户投票
    data.userVote = function(_mid,_rsNum,_useType,succ,error){
        $.ajax({
            url: CONFIG.getLink()+"api/v1/fs/user/praise/inapp",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                appToken:main.getToken(),
                device:main.getAppUserInfo().dev_cd,
                mid:_mid,
                rsNum:_rsNum,
                useType:_useType
            }),
            timeout: 5000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
				 error(data)
            } 
        });
    };

    //根据app token 获取app用户在投票系统中的信息
    data.refreshUserInfo = function(succ){
        $.ajax({
            url: CONFIG.getLink()+"api/v1/fslive/userinfo",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                
                "token": main.getToken()  // 登陆用户APP token
            }),
            timeout: 5000, 
            dataType:"json",
            success: function (data) { 
                succ(data)               
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                 //alert("eee");
            } 
        });
       
    };
    
    //根据app token 获取app用户在投票系统中的信息
    data.checkBind = function(succ){
        $.ajax({
            url: CONFIG.getLink()+"api/v1/userinfo/appinvote",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "token": main.getToken()  // 登陆用户APP token
            }),
            timeout: 5000, 
            dataType:"json",
            success: function (data) { 
                succ(data)               
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                 //alert("eee");
            } 
        });
       
    };
   
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