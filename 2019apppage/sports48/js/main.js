(function(data) {
    //vip/detail 跳转vip短链接
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"1MpIrMMAjhiqkOaAoNMrHr7xJr5/1m2tWGSg2LeCUAMotCjkZsOPFg==",                //验证Token
        "uname":"nicker",                                 //用户昵称
        "avata":"avata",                                    //头像地址
        "dev_cd":"dev_cd",                        //设备号
        "bindInfo":"bindInfo"
    }
    
    
    //口袋用户信息
    if(checkFromNew()){
        var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
        var appUserInfo = {
            "appid":u_info.userInfo.bigSmallInfo.bigUserInfo.userId,             //用户ID
            "apptoken":u_info.token,                                             //验证Token
            "uname":u_info.userInfo.bigSmallInfo.bigUserInfo.nickname,             //用户昵称
            "avata":u_info.userInfo.bigSmallInfo.bigUserInfo.avatar,             //头像地址
            "dev_cd":u_info.IMEI,                                                //设备号
            "bindInfo":u_info.userInfo.bindInfo                                 //绑定信息
        }
    }else if(checkFromOld()){
        var appUserInfo = {
            "appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avata":window.web.getLoginUserPic(),            //头像地址
            "dev_cd":(window.web.getPhoneIMEI().length <3) ? window.web.getLoginUserId() :  window.web.getPhoneIMEI()   //设备号
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
    //应援计划首页（截止后页面）
    data.getList = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/aid/index",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({}),
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    //应援计划投票
    data.vote = function(_groupid,_type,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/aid/vote",
            type: "POST", 
            dataType: "json",
            contentType: 'application/json',
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({
              "aidAvatar": main.getAppUserInfo().avata,
              "aidName": main.getAppUserInfo().uname,
              "groupId": _groupid,
              "type": _type
            }),
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }

    //冠军竞猜首页
    data.getChampionList = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/champion/index",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({}),
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    //提交竞猜结果
    data.submitGuess = function(_list,_type,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/champion/guess",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({
                  "aidAvatar": main.getAppUserInfo().avata,
                  "aidName": main.getAppUserInfo().uname,
                  "sportGuessList": _list,
                  "type": _type//参与竞猜花费类型 1-鸡腿 2-积分
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
    //获取猜中人员
    data.getWinner = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/champion/success",
            type: "POST", 
            dataType: "json",
            // beforeSend: function (request) {
            //      request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            // },
            data:JSON.stringify({}),
            contentType: 'application/json',
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    //预言首页
    data.getGuess = function(_proId,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/fable/show",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({
                "proId":_proId
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
    //提交预言结果
    data.submitSeer = function(_fables,_proId,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/fable/submit",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({
                    "guesserAvatar": main.getAppUserInfo().avata,
                    "guesserName": main.getAppUserInfo().uname,
                    "fableList": _fables,  //竞猜结果
                    "proId": _proId  //运动项目ID
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


    //获取参与成员
    //运动项目ID 0-表示参与本次运动会的全体成员

    data.soleTagsPeople=function(proId,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/sport/memberInfo",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({
                "proId": proId
            }),
            contentType: 'application/json',
            success: function (data) { 
                // console.log(data)
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    /*查看竞价次数 */
    data.getBiddingNum=function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/customStickers",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            contentType: 'application/json',
            success: function (data) { 
                // console.log(data)
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    //提交全场唯一贴纸竞价
    data.submitBidding=function(params){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/biddenStickers",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({
                "avatar": params.avatar,
                "content": params.content,
                "memberId": params.memberId,
                "moneyNum": params.moneyNum,
                "nicker": main.getAppUserInfo().uname
              }),
            contentType: 'application/json',
            success: function (data) { 
                // console.log(params.succ)
                (params.secc)(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
                // params.succ(jqXHR)
            } 
        });
    }
    /*获取个性化贴纸  项目ID
        查看项目成员贴纸 1-个人页面贴纸 2-实时榜贴纸
        */
    data.getSoleTags=function(type,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/sport/showStickers",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({
                "type": type
            }),
            contentType: 'application/json',
            success: function (data) { 
                // console.log(data)
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    /*获取项目所需的全部贴纸 */
    data.getAllTags=function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/sport/stickersInfonfo",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            contentType: 'application/json',
            success: function (data) { 
                // console.log(data)
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }
    /*提交个性化贴纸 */
    data.submitTags=function(ids,memberId,proId,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/activity/v1/sport/submitStickers",
            type: "POST", 
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            data:JSON.stringify({
                "ids": ids,
                "memberId":memberId,
                "proId":proId
            }),
            contentType: 'application/json',
            success: function (data) { 
                // console.log(data)
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    }

    
}(window.main = {}));



