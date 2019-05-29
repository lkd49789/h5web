(function(data) {
    //var interUrl = "http://192.168.0.18:8080/fans/";//测试
    var interUrl = "https://48game.48.cn/fans/";//正式
    var picUrl = "https://source.48.cn/";
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"87333",                                //用户ID
        "apptoken":"Fs9MTz1h3BK8SRRL/7gUUTEA24bkfrQv/PzrET59y2LkMrNJTh0mY26w7AJ/x9GD",                          //验证Token
        "uname":"嘟嘟宝",                                 //用户昵称
        "avata":"https://source2.48.cn/mediasource/avatar/87333.jpg",                                    //头像地址
        "dev_cd":"6ABD1571-807E-4699-B045-6DA85D7C262E"    
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


    //获取首页图片列表
    data.getPicList = function(succ){
        $.ajax({
            url:  interUrl+"api/v1/bej420vote/enterReview",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data: JSON.stringify({
                userId:main.getAppUserInfo().appid
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

    //获取当前id对应的内页视频列表
    data.getVidList = function(_groupName,succ){
        $.ajax({
            url:  interUrl+"api/v1/bej420vote/getPraiseInfo",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data: JSON.stringify({
                openId:main.getAppUserInfo().appid,
                groupName:_groupName
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

    //点赞
    data.savePraise = function(_songId,_dzTeam,succ){
        $.ajax({
            url:  interUrl+"api/v1/bej420vote/savePraise",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data: JSON.stringify({
                openId:main.getAppUserInfo().appid,
                songId:_songId,
                dzTeam:_dzTeam,
                source:1
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

    //获取评论列表
    data.getCommentList = function(_songId,_ctime,_limit,succ){
        $.ajax({
            url:  interUrl+"api/v1/bej420vote/getCommentInfo",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data: JSON.stringify({
                openId:main.getAppUserInfo().appid,
                songId:_songId,
                ctime:_ctime,
                limit:_limit
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

    //发表评论
    data.sendComment = function(_songId,_comment,succ){
        $.ajax({
            url:  interUrl+"api/v1/bej420vote/saveComment",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data: JSON.stringify({
                openId:main.getAppUserInfo().appid,
                nickname:main.getAppUserInfo().uname,
                avatar:main.getAppUserInfo().avata,
                songId:_songId,
                comment:_comment,
                source:1
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

    //评论举报
    data.getReport = function(_commentId,_comment,succ){
        $.ajax({
            url:  interUrl+"api/v1/bej420vote/commentReport",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data: JSON.stringify({
                openId:main.getAppUserInfo().appid,
                commentId:_commentId,
                comment:_comment
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
    data.formatAvata = function(avata){
        if(avata.indexOf("http://")>=0 ||avata.indexOf("https://")>=0){
            return avata
        }else{
            return picUrl+avata;
        }
    }

    //过滤表情输入
    data.filteremoji = function(content){  
        var ranges = [  
            '\ud83c[\udf00-\udfff]',  
            '\ud83d[\udc00-\ude4f]',  
            '\ud83d[\ude80-\udeff]'  
        ];  
        emojireg = content .replace(new RegExp(ranges.join('|'), 'g'), '');  
        return emojireg;  
    } 

    //跳转
    data.hrefTo = function(_url){
        if(checkFromApp()){
            window.web.gotoDetail("https://h5.48.cn/2018apppage/BJreview/"+_url);
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




function add0(m){return m<10?'0'+m:m };  
function getDate(shijianchuo) {  
  //shijianchuo是整数，否则要parseInt转换  
  var time = new Date(shijianchuo);  
  var y = time.getFullYear();  
  var m = time.getMonth()+1;  
  var d = time.getDate();  
  var h = time.getHours();  
  var mm = time.getMinutes();  
  var s = time.getSeconds();  
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);  
};   


function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}