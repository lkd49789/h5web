(function(data) {

    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"5fgAZwUouZBV6FzSVs/TxnYAltVYpdmEgGsmsgcK1HWQ5W5+Iw0i+ky0njxZOvHeDtf5jOWVPrE+snAnoVtvBg==",                          //验证Token
        "uname":"嘟嘟宝",                                 //用户昵称
        "avata":"https://source2.48.cn/mediasource/avatar/87333.jpg",                                    //头像地址
        "dev_cd":"test",                        //设备号
        "IMEI":"IMEI"
    }
    
//--------------------------------------------------------------------------------------------------------------------
    //正式
    //var appUserInfo
    if(checkFromApp()){
        var app_info = JSON.parse(dsBridge.call("snhAppInfo"))
        if(checkLoginApp()){
            var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
            var appUserInfo = {
                "appid":u_info.userInfo.bigSmallInfo.bigUserInfo.userId,                                       //用户ID
                "apptoken":u_info.token,                                                                       //验证Token
                "uname":u_info.userInfo.bigSmallInfo.bigUserInfo.nickname,                                      //用户昵称
                "avata":u_info.userInfo.bigSmallInfo.bigUserInfo.avatar,                                        //头像地址
                "dev_cd":app_info.phoneSystemVersion+";"+app_info.phoneName+";"+app_info.version                //设备信息
            }
        }else{
            var appUserInfo = {
                "IMEI":app_info.IMEI,                                                                        //头像地址
                "dev_cd":app_info.phoneSystemVersion+";"+app_info.phoneName+";"+app_info.version                //设备信息
            }
        }
    }
    
//--------------------------------------------------------------------------------------------------------------------
    data.getAppUserInfo = function(){
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
                return "IOS";
            }else{
                return "ANDROID";
            }
        }else{
            return "IOS";//测试 默认iOS 
        }
    }
    //获取列表
    data.getList = function(succ){
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/feedback/query/user",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:{},
            success: function (data) {
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    //获取列表
    data.getList1 = function(succ){
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/feedbackunlog/query/devicenumber",
            type: "POST", 
            dataType: "json",
            data:JSON.stringify({
                "deviceNumber":main.getAppUserInfo().IMEI
            }),
            contentType: 'application/json',
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    //获取详情
    data.getDetail = function(_id,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/feedback/query/id",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            contentType: 'application/json',
            data:JSON.stringify({
                "id":_id
            }),
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    //获取详情(未登录)
    data.getDetail1 = function(_id,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/feedbackunlog/query/id",
            type: "POST", 
            dataType: "json",
            contentType: 'application/json',
            data:JSON.stringify({
                "deviceNumber":main.getAppUserInfo().IMEI,
                "id":_id
            }),
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    //提交反馈
    data.submitReport = function(_pic,_info,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/feedback",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            contentType: 'application/json',
            data:JSON.stringify({
                "avatar": main.getAppUserInfo().avata,
                "deviceInfo": main.getAppUserInfo().dev_cd,
                "faultScreenshots": _pic,//故障截图
                "nickName": main.getAppUserInfo().uname,
                "phoneNumber": "",
                "questionContent": _info
            }),
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    //提交反馈(未登录)
    data.submitReport1 = function(_pic,_info,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/feedbackunlog",
            type: "POST", 
            dataType: "json",
            contentType: 'application/json',
            data:JSON.stringify({
                "deviceInfo": main.getAppUserInfo().dev_cd,
                "faultScreenshots": _pic,//故障截图
                "deviceNumber": main.getAppUserInfo().IMEI,
                "phoneNumber": "",
                "questionContent": _info
            }),
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }

    //显示错误信息
    data.showTip = function(info){
        $('.tip').css('opacity',1);
        $('.tip').html(info);
    }

    //弹框
    data.alert = function(name){
        // var iframe = document.createElement("IFRAME");
        // iframe.style.display="none";
        // iframe.setAttribute("src", 'data:text/plain,');
        // document.documentElement.appendChild(iframe);
        // window.frames[0].window.alert(name);
        // iframe.parentNode.removeChild(iframe);
        mui.alert(name, '', function() {
            
        });
    }


}(window.main = {}));

