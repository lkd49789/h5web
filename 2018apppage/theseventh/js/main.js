(function(data) {
    //web端测试（用户信息）
    var webUserInfo = {
        //"appid":"87333",                                //用户ID
        "apptoken":"appToken",                          //验证Token
        "uname":"嘟嘟宝",                                 //用户昵称
        //"avata":"https://source2.48.cn/mediasource/avatar/87333.jpg",                                    //头像地址
        //"dev_cd":"6ABD1571-807E-4699-B045-6DA85D7C262E"                        //设备号
    }
    
    //口袋用户信息
    if(checkFromApp()){
        var appUserInfo = {
            "appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avatar":window.web.getLoginUserPic(),            //头像地址
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
    //加载所有总选成员
    data.getAllMembers = function(succ){
         $.ajax({
             url: 'https://h5.48.cn/resource/jsonp/members.php?gid=00',
             //url: 'js/vote_member.json',
             type: "GET", 
             dataType:"json",
             success: function (data) { 

                 succ(data)
                 
             }
         });
    };

    //七夕告白墙/全部/个人
    data.getWall = function(_page,_sort,_type,succ){
        $.ajax({
            url:CONFIG.getUerlink()+"api/qixi/v1/confessionIndex",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            // beforeSend: function (request) {
            //     request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            // },
            data: JSON.stringify({
                "appToken":main.getAppUserInfo().apptoken,
                "page":_page,
                "limit":20,
                "sort":_sort,       //排序 0根据祝福值排序(默认) 1根据时间排序
                "type":_type    //区分查看内容 myself-查看我的表白内容 index-表白墙内容
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    };
    //发表告白
    data.submitBless = function(_content,_memberId,_memberNicker,succ){
        $.ajax({
            url:CONFIG.getUerlink()+"api/qixi/v1/saveConfession",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "appToken":main.getAppUserInfo().apptoken,
                "content":_content,
                "fansNicker":main.getAppUserInfo().uname,    //粉丝昵称
                "memberId":_memberId,        //成员ID
                "memberNicker":_memberNicker
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            }
        });
    };
    //查看告白成员回复内容
    data.getReply = function(_conId,succ){
        $.ajax({
            url:CONFIG.getUerlink()+"api/qixi/v1/queryReply",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "conId":_conId     //告白ID
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            }
        });
    };
    //告白助力 （小程序分享页用）
    data.sendHelp = function(_conId,_wxToken,succ){
        $.ajax({
            url:CONFIG.getUerlink()+"api/qixi/v1/SendBless",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "wxToken":_wxToken,   //微信token
                "conId":_conId   //告白ID
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    };
    //成员查看收到的告白(成员版)
    data.checkMyBless = function(_page,_sort,_type,succ){
        $.ajax({
            url:CONFIG.getUerlink()+"api/qixi/v1/queryConfession",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "token":main.getAppUserInfo().apptoken,
                "limit":20,
                "page":_page,
                "sort":_sort
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    };
    //回复告白(成员版)
    data.saveReply = function(_content,_conId,succ){
        $.ajax({
            url:CONFIG.getUerlink()+"api/qixi/v1/saveReply",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "content":_content,   //回复内容
                "conId":_conId,   //告白ID
                "token":main.getAppUserInfo().apptoken
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    };

    //根据id获取表白内容
    data.confessionInfo = function(_conId,succ){
        $.ajax({
            url:CONFIG.getUerlink()+"api/qixi/v1/confessionInfo",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "conId":_conId   //告白ID
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    };
/*-------------------------------------------------------------------------------------------------------------------------*/   


    //切割队伍   TEAM SII
    data.getTeam = function(team){
        return team.split(" ")[1]
    }
    //无域名头像添加域名
    data.formatAvata = function(avata){
        if(avata.indexOf("http://")>=0 ||avata.indexOf("https://")>=0){
            return avata
        }else{
            return CONFIG.getSource()+"/resize_100x100"+avata;
        }
    }
    data.formathttp = function(avata){
        if(avata.indexOf("http://")>=0 ||avata.indexOf("https://")>=0){
            return ""
        }else{
            return CONFIG.getSource();
        }
    }
    //封面图
    data.formatCover = function(img){
        if(img.indexOf("http://")>=0 ||img.indexOf("https://")>=0){
            return img
        }else{
            return CONFIG.getSource()+img;
        }
    }
    //封面大图
    data.formatCoverBig = function(img){
        if(img.indexOf("http://")>=0 ||img.indexOf("https://")>=0){
            return img
        }else{
            return CONFIG.getSource()+"/resize_400x400"+img;
        }
    }
    //视频地址 添加域名
    data.formatVideo = function(_video){
        if(_video.indexOf("http://")>=0 ||_video.indexOf("https://")>=0){
            return _video
        }else{
            return CONFIG.getGSVideo()+_video;
        }
    }
    //字符转化json
    data.getJson = function(msg){
        return JSON.parse(msg)
    }

    //跳转
    data.hrefTo = function(link){
        if(checkFromApp()){
            window.web.gotoDetail(CONFIG.getJumplink()+link);
        }else{
            console.log(link)
            window.location.href=link;
        }
    }

    //跳转
    data.hrefTolink = function(link){
        if(checkFromApp()){
            window.web.gotoDetail(link);
        }else{
            console.log(link)
            window.location.href=link;
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
    
    //打开新页面
    data.openUrl = function(_url){
        window.open(_url); 
    }
    //去除前后空格
    data.trim = function(str){
        return str.replace(/(^\s*)|(\s*$)/g, ""); 
    }
    //字符串转化为链接
    data.replaceToUrl = function(str){
        str = str.replace(/(^|[^"'(=])((http|https|ftp)\:\/\/[\.\-\_\/a-zA-Z0-9\~\?\%\#\=\@\:\&\;\*\+]+\b[\?\#\/\*]*)/g, '$1<a href="$2" target="_blank" class="btn-link">$2</a>');
        return str;
        //$('div').innerHTML.replace(/(^|[^"'(=])((http|https|ftp)\:\/\/[\.\-\_\/a-zA-Z0-9\~\?\%\#\=\@\:\&\;\*\+]+\b[\?\#\/\*]*)/g, '$1<a href="$2" target="_blank">$2</a>');
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

function checkFromWX(){
    var useragent = navigator.userAgent;
    if (useragent.match(/MicroMessenger/i) == 'MicroMessenger') {
        return true;
    }else{
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