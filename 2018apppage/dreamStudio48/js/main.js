(function(data) {
    //var interUrl = "http://192.168.0.18:8080/fans/";//测试
    var interUrl = "https://snhwxapi.48.cn/fans/";//正式
    var picUrl = "https://source.48.cn";
    //web端测试（用户信息）
    var webUserInfo = {
        "wxtoken":localStorage.getItem('wxToken'),
        "apptoken":localStorage.getItem('appToken'),                          //验证Token
        "uname":localStorage.getItem('myNikename'),                                 //用户昵称
        "avata":localStorage.getItem('myAvatar')
    }
    //alert("111111111111111111------"+localStorage.getItem('wxToken'))
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
            return webUserInfo
        }
        
    }


    //获取首页参与成员信息列表页
    data.getMerLists = function(_wxtoken,_eventId,succ){
        //alert('wxtoken$$$$$'+_wxtoken);
        $.ajax({
            url:  interUrl+"api/48studio/dreamShow/v1/getJoinMemberInfo",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
           /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
            data: JSON.stringify({
                token:_wxtoken,
                eventId:_eventId
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

    //转移点赞权（将口袋ID的点赞权总数转移到对应的微信ID下）
    data.countPriset = function(_apptoken,_wxtoken,_eventId,succ){
        //alert('count_apptoken$$$$$'+_apptoken);
        //alert('count_wxtoken$$$$$'+_wxtoken);
        $.ajax({
            url:  interUrl+"api/currency/v1/countWeight",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
           /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
            data: JSON.stringify({
                appToken:_apptoken,
                wxToken:_wxtoken,
                eventId:_eventId
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

    //往期回顾
    data.pastReview = function(succ){
        $.ajax({
            url:  interUrl+"api/48studio/dreamShow/v1/pastEvent",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
           /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
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

    //所有成员
    data.allMember = function(succ){
        $.ajax({
            url:  interUrl+"api/currency /v1/generalMemberInfoUrl",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
           /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
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
    //请求所有成员的json
    data.getMemberLists = function(_url,succ){
        $.ajax({
            type:"get",
            async:true,
            contentType: "application/json; charset=utf-8",
            url:_url,
            dataType: "json",
            success: function(data){
                succ(data)
            }
        })
    }

    //获取当前评论列表
    data.commentList = function(_infoId,_ctime,_limit,succ){
         $.ajax({
            url:  interUrl+"api/currency/v1/getComment",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                infoId:_infoId,
                ctime:_ctime,
                limit:_limit,
                token:main.getAppUserInfo().wxtoken
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
            url:  interUrl+"api/currency/v1/commentReport",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                commentId:_commentId,
                token:main.getAppUserInfo().wxtoken,
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

    //发表评论
    data.sendComment = function(_infoId,_comment,succ){
        //alert("sendComment------------"+main.getAppUserInfo().uname)
        $.ajax({
            url:  interUrl+"api/currency/v1/saveComment",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                infoId:_infoId,
                comment:_comment,
                token:main.getAppUserInfo().wxtoken,
                nick:main.getAppUserInfo().uname,
                avatar:main.getAppUserInfo().avata
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
    data.savePraise = function(_eventId,_infoId,succ){
        $.ajax({
            url:  interUrl+"api/currency/v1/savePraise",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                eventId:_eventId,
                infoId:_infoId,
                token:main.getAppUserInfo().wxtoken,
                appToken:main.getAppUserInfo().apptoken
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

    //详细内容
    data.getDetails = function(_memberId,_ctime,_limit,succ){
        //alert("getDetails----"+main.getAppUserInfo().wxtoken);
        $.ajax({
            url:  interUrl+"api/48studio/dreamShow/v1/memberDetail",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:main.getAppUserInfo().wxtoken,
                memberId:_memberId,
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

    //获取点赞权和积分余额
    data.getBalance = function(succ){
        $.ajax({
            url:  interUrl+"api/48studio/dreamShow/v1/queryPraise",
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

    //兑换点赞权
    data.changeZannum = function(_eventId,succ){
        $.ajax({
            url:  interUrl+"api/48studio/dreamShow/v1/exchangePraise",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
            data: JSON.stringify({
                token:main.getAppUserInfo().apptoken,
                eventId:_eventId
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

    //领取点赞权
    data.receivePraise = function(_eventId,succ){
        $.ajax({
            url:  interUrl+"api/48studio/dreamShow/v1/receivePraise",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
            data: JSON.stringify({
                token:main.getAppUserInfo().apptoken,
                eventId:_eventId
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
    

    //等级领取
    data.receiveDengji = function(_eventId,succ){
        $.ajax({
            url:  interUrl+"api/48studio/dreamShow/v1/receivePraiseByLevel",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
            data: JSON.stringify({
                token:main.getAppUserInfo().apptoken,
                eventId:_eventId
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


    //实时排行
    data.likeRanking = function(_eventId,_type,succ){
        $.ajax({
            url:  interUrl+"api/48studio/dreamShow/v1/getRank",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            /* beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },*/
            data: JSON.stringify({
                eventId:_eventId,
                type:_type
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