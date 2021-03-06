(function(data) {
    
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        //"apptoken":"H8lZx7nquH/xL0/hYqLyJcDsV/2F5D6S7m/9ethfrbMPq8SxRlk8wi2ULVmpizOWd2+3r8fciBuOxcHnHIePHQ==",
        "apptoken":"vPj9Sn65FCaU0kxyUvSzO0HwU0B7A20egMVJd4wZFzvoqTGbulptbSx1kfeyBTM1Y10T5CKgm5HSpAKm/DpJ2uVrQHA5E58Z7ucvEDBlybsC5Lq4iZ6IwNLUzxn3xk8Z",                          //验证Token
        "uname":"uname",                                 //用户昵称
        "avata":"avata",                                    //头像地址
        "dev_cd":"",                        //设备号
        "bindInfo":""
    }
    
   

    //口袋用户信息
    if(checkFromApp()){
        var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
        var appUserInfo = {
            "appid":u_info.userInfo.userId,             //用户ID
            "apptoken":u_info.token,                                             //验证Token
            "uname":u_info.userInfo.nickname,             //用户昵称
            "avata":u_info.userInfo.avatar,             //头像地址
            "dev_cd":u_info.IMEI                                               //设备号
        }
        if(appUserInfo.uname == null || appUserInfo.uname == undefined){
          appUserInfo.uname = u_info.userInfo.nickName;             //安卓字段大写
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

    //获取当天所有的演出场次
    data.getAllEvents = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/mvp/fans/events",
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

    //根据公演ID获取公演参与成员ID集合
    data.memberList = function(_infoId,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/mvp/fans/joiner",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data: JSON.stringify({
                infoId:_infoId
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

    //确认投票
    data.saveVote = function(_infoId,_memberId,_code,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/mvp/fans/saveVote",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data: JSON.stringify({
                "code": _code,
                "infoId": _infoId,
                "memberId": _memberId,
                "userAvatar": main.getAppUserInfo().avata,
                "userNick": main.getAppUserInfo().uname
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