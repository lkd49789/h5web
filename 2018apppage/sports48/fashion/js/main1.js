(function(data) {

    //获取服务器下发token
    data.getToken = function(){
        if(checkFromApp()){
            return window.web.getAccessToken()
        }else{
            
            console.log(localStorage.getItem("sports48_login"))
            return JSON.parse(localStorage.getItem("sports48_login")).content.token; 
        }
        
    }
    
    //获取最新区块链信息
    data.getNewInfo = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/chain/list/newest",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            // beforeSend: function (request) {
            //      request.setRequestHeader("token", main.getToken());
            // },
            data: JSON.stringify({
                "limit":6
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
    //登录用户获取相应投票区块列表信息
    data.getMyPosInfo = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/chain/list/my",
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
    //获取自己的投票ID
    data.getMyId = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/vote/myid",
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
                //fail()
            } 
        });
    };

    //根据投票ID获取相应区块列表信息
    data.getItemList = function(_voteid,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/chain/list/voteid",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            // beforeSend: function (request) {
            //      request.setRequestHeader("token", main.getToken());
            // },
            data: JSON.stringify({
                "voteId":_voteid
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

    //投票id对应块信息
    data.getItemInfo = function(_voteid,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/chain/proof",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            // beforeSend: function (request) {
            //      request.setRequestHeader("token", main.getToken());
            // },
            data: JSON.stringify({
                "voteId":_voteid
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
    //无域名头像添加域名
    data.formatAvata = function(avata){
        if(avata.indexOf("http://")>=0 ||avata.indexOf("https://")>=0){
            return avata
        }else{
            return CONFIG.getSource()+avata;
        }
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