(function(data) {

    //获取服务器下发token
    data.getToken = function(){
        if(checkFromApp()){
            return window.web.getAccessToken()
        }else{
            return "CC26is8pDjN6Kodv8RA3Ge8QeQeyun5jTBbpGIUYjJ/yCdphjfOMchJn1AnOz6XpMyZdBo6NonScE/4ky081HvFv55419Mat"
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
    //获取状态 用户是否提交信息
    data.getCustomId = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/NumberCenter/custom",
            type: "POST", 
            async:true,
            //contentType: "application/json; charset=utf-8",
            data: {

            },
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
    //获取手机卡号
    data.getNumList = function(_provinceCode,_cityCode,_searchValue,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/NumberCenter/qryNum",
            type: "POST", 
            async:true,
            //contentType: "application/json; charset=utf-8",
            data: {
                "provinceCode":_provinceCode,
                "cityCode":_cityCode,
                "searchValue":_searchValue
            },
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
    //手机卡号预占
    data.occupyNum = function(_provinceCode,_cityCode,_currSerialNumber,_prevSerialNumber,_cusId,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/NumberCenter/occupyNum",
            type: "POST", 
            async:true,
            //contentType: "application/json; charset=utf-8",
            data: {
                provinceCode:_provinceCode,
                cityCode:_cityCode,
                currSerialNumber:_currSerialNumber,
                prevSerialNumber:_prevSerialNumber,
                cusId:_cusId
            },
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
    //手机卡号下单
    data.buy = function(_data,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/v1/NumberCenter/buyNum",
            type: "POST", 
            async:true,
            //contentType: "application/json; charset=utf-8",
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