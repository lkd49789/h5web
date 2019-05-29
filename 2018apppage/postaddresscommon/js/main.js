(function(data) {
    var interUrl = ""
    //web端测试（用户信息）
    var webUserInfo = {
        //"appid":"87333",                                //用户ID
        "apptoken":"",                          //验证Token
        //"uname":"嘟嘟宝",                                 //用户昵称
        //"avata":"https://source2.48.cn/mediasource/avatar/87333.jpg",                                    //头像地址
        //"dev_cd":"6ABD1571-807E-4699-B045-6DA85D7C262E"                        //设备号
    }
    
    //口袋用户信息
    if(checkFromApp()){
        var appUserInfo = {
            //"appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            //"uname":window.web.getLoginUserNickName(),       //用户昵称
            //"avata":window.web.getLoginUserPic(),            //头像地址
            //"dev_cd":window.web.getPhoneIMEI()               //设备号
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

    //是否已经提交
    data.ifSubmit = function(succ){
        $.ajax({
            url:  "https://pother.48.cn/othersystem/api/address/v1/personal/defaultAddress",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data: JSON.stringify({
               
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }

    //添加收货地址
    data.addRess = function(_addressId,_security,_provinceNum,_cityNum,_countyNum,_specificAddress,_contactName,_contactPhone,succ){
        $.ajax({
            url:  "https://pother.48.cn/othersystem/api/address/v1/edit",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data: JSON.stringify({
                addressId:_addressId,
                security:_security,
                provinceNum:_provinceNum,
                cityNum:_cityNum,
                countyNum:_countyNum,
                specificAddress:_specificAddress,
                contactName:_contactName,
                contactPhone:_contactPhone,
                postalCode:null,
                defaultFlag:null
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }

    
    
    // 无头像添加域名
    data.formatAvata = function(avatar){
        if(avatar.indexOf("http://")>=0 ||avatar.indexOf("https://")>=0){
            return avatar
        }else{
            return picUrl+avatar;
        }
    }

    //跳转
    data.hrefTo = function(_url){
        if(checkFromApp()){
            window.web.gotoDetail("https://h5.48.cn/2018apppage/dreamStudio48/"+_url);
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
        /*var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);*/
        mui.alert(name, '', function() {
            
        });
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




function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}