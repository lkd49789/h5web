(function(data) {
    //------------------------------------------------------------------------------------------------------------------登录注册找回密码
    //登录
    data.logIn = function(_uname,_upass,succ){
        $.ajax({
            url: CONFIG.getUsersystemUrl()+"api/user/v1/web/login/phone",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                account:_uname,
                password:_upass
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
    //根据id获取用户信息 （新版）
    data.getUserInfo = function(uid,succ){
        $.ajax({
            url:  CONFIG.getUserUrl()+"/api/v1/user/info/home",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 
            },
            data: JSON.stringify({
                "needMuteInfo": false,
                "userId": uid
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                
                localStorage.setItem("CUR_USER_MAINPAGE_2019",JSON.stringify(data.content.baseUserInfo))
                succ(data.content)
            },
            error: function (jqXHR, textStatus, errorThrown) { 
            }
        });
    }
    //获取登录用户信息
    data.getLoginUserInfo = function(){
        var u_info = JSON.parse(localStorage.getItem("POCKET48_USER_INFO"));
        if(u_info == null || u_info == undefined){//
            main.hrefTo("login.html");
        }else{
            return u_info.content.userInfo;
        }
    }
    //检查是否登录
    data.checkLogin = function(){
        var u_info = JSON.parse(localStorage.getItem("POCKET48_USER_INFO"));
        if(u_info == null || u_info == undefined || u_info==""){//
            return false;
        }else{
            return true;
        }
    }
    //获取token
    data.getToken = function(){
        var u_info = JSON.parse(localStorage.getItem("POCKET48_USER_INFO"));
        if(u_info == null || u_info == undefined){//
            main.hrefTo("login.html");
        }else{
            return u_info.content.token;
        }
    }
    //登录用户id
    data.getLogInUserId = function(){
        var u_info = JSON.parse(localStorage.getItem("POCKET48_USER_INFO"));
        if(u_info == null || u_info == undefined){//
            return 0;
        }else{
            return u_info.content.userInfo.userId;
        }
    }
    //获取验证码
    data.getCode = function(_area,_phone,succ){
        $.ajax({
            url: CONFIG.getUsersystemUrl()+"api/user/v1/register/send/sms",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            // beforeSend: function (request) {
            //      request.setRequestHeader("imei", main.getuuid());
            //      request.setRequestHeader("token", "");
            //      request.setRequestHeader("os", "web");
            //      request.setRequestHeader("version", "");
            //      request.setRequestHeader("User-Agent", "Mobile_Pocket");
            //      request.setRequestHeader("location", "Mobile_Pocket");
            // },
            data: JSON.stringify({
                area:_area,
                phoneNumber:_phone
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
    //获取uuid
    data.getuuid = function(){
        var uuid = localStorage.getItem("CUR_MEMBER_ID");
        if(uuid == null || uuid == undefined){
            function S4() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }else{
            return uuid;
        }
    }
    //验证验证码
    data.checkCode = function(_code,_phone,_isRegister,succ){
        $.ajax({
            url: CONFIG.getUsersystemUrl()+"api/user/v1/register/valid/code",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                phoneNumber:_phone,
                code:_code,
                isRegister:_isRegister//是否注册 找回密码用true   
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
    //完成注册
    data.submitRegister = function(_phone,_password,_randomtext,succ){
        $.ajax({
            url: CONFIG.getUsersystemUrl()+"api/user/v1/register/phone",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("imei", main.getuuid());
                 
            },
            data: JSON.stringify({
                account:_phone,
                password:_password,
                randomText:_randomtext
                // longitude:"",
                // latitude:""
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
    //已登录用户重置手机密码
    data.resetPasswordLogin = function(_phone,_password,_randomtext,succ){
        $.ajax({
            url: CONFIG.getUsersystemUrl()+"api/user/v1/reset/loginuser/phone/password",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                phoneNumber:_phone,
                password:_password,
                randomText:_randomtext
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
    //未登录用户重置手机密码
    data.resetPassword = function(_phone,_password,_randomtext,succ){
        $.ajax({
            url: CONFIG.getUsersystemUrl()+"api/user/v1/reset/phone/password",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                phoneNumber:_phone,
                password:_password,
                randomText:_randomtext
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
    //获取当前成员信息
    data.getMemberNews = function(_mid,succ){
        $.ajax({
            type:'GET',
            url:"https://h5.48.cn/resource/jsonp/member.php?sid="+_mid,
            data:{},
            dataType: "jsonp",
            success:function(dt){
                succ(dt)
            },
            error:function(){
                //alert("请求超时");
            }
        });
    }
    //获取缓存用户徽章
    data.getUserBadge = function(succ){
        var u_badge = JSON.parse(localStorage.getItem("POCKET48_USER_BADGE"));
        if(u_info == null || u_info == undefined){//
            return ""
        }else{
            return u_badge;
        }
    }
    //缓存登录用户徽章
    data.saveUserBadge = function(succ){
        $.ajax({
            url: CONFIG.getUsersystemUrl()+"api/user/v1/show/myBadgeAchievementInfo/"+main.getMemberInfo().memberId,
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: {},
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            },
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            }
        });
    };

    //------------------------------------------------------------------------------------------------------------------编年史
    //获取成员编年史
    data.getArchives = function(_mid,_limit,succ){
        $.ajax({
            url:CONFIG.getUsersystemUrl()+"api/user/member/v1/history",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                memberId:_mid,
                limit:_limit,
                lastTime:0
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    }
    //------------------------------------------------------------------------------------------------------------------成员信息
    //获取口袋官网对应id
    data.getJsonId = function (_mid,succ) {
        $.ajax({
            type:"get",
            async:true,
            contentType: "application/json; charset=utf-8",
            url:"member_mapping.json",
            dataType: "json",
            success: function(data){
                console.log(data[_mid])
                localStorage.setItem("CUR_MEMBER_ID",_mid);
                localStorage.setItem("CUR_MEMBER_MAINPAGE",JSON.stringify(data[_mid]));
                succ(data);
                
                //分享
                main.setShareInfo()
            }
        })
    }
    //获取当前成员信息
    data.getMemberInfo = function(){
        var USER_INFO = JSON.parse(localStorage.getItem("CUR_USER_MAINPAGE_2019")) || {}; 
        return USER_INFO;
    }
    //获取队伍名
    data.getMemberTeam = function(){
        return main.getMemberInfo().teamName.split(" ")[1];
    }
    //获取当前成员所在分团网址
    data.getGroupUrl = function(succ){
        $.ajax({
              url: "../resource/json/groups.json",
              type: "GET", 
              async:true,
              data: {},
              timeout: 5000, 
              success: function (data) {          
                succ(data,main.getGroupId())
              }, 
              error: function (jqXHR, textStatus, errorThrown) { 
        //             alert("eee");
              } 
        }); 
    }
    //获取当前分团id  此处获取的是app内队伍id 需要换算为官网id  具体如下：
    data.getGroupId = function(){
        var gid = main.getMemberInfo().groupId;
        if(gid == 10){//上海
            return 10;
        }else if(gid == 11){//北京
            return 20;
        }else if(gid == 12){//广州
            return 30;
        }else if(gid == 13){//沈阳
            return 40;
        }else if(gid == 14){//重庆
            return 50;
        }else if(gid == 15){
            return 60;
        }else if(gid == 16){
            return 70;
        }else if(gid == 17){
            return 80;
        }

        return gid;
    }
    //------------------------------------------------------------------------------------------------------------------成员动态
    //获取成员帖子列表
    data.getDynamic = function(_uid,_nextId,succ){
        $.ajax({
            url: CONFIG.getDynamicUrl()+"api/v1/posts/timeline/home",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "limit": 10,
                "nextId": _nextId,
                "userId": _uid
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
    //获取成员视频帖子列表
    data.getVideoList = function(_uid,_nextId,succ){
        $.ajax({
            url: CONFIG.getDynamicUrl()+"api/v2/posts/video/list",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "limit": 10,
                "nextId": _nextId,
                "userId": _uid
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
    //获取成员回放列表
    data.getPlayBackList = function(_uid,_nextId,succ){
        $.ajax({
            url: CONFIG.getLiveUrl()+"api/v1/live/getLiveList",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "next": _nextId,
                "record": true,
                "userId":_uid
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
    //获取成员档案
    data.getInfoList = function(_uid,succ){
        $.ajax({
            url: CONFIG.getUserUrl()+"api/v1/user/star/archives",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "memberId":_uid
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
    //点赞
    data.praise = function(_resId,succ){
        $.ajax({
            url: CONFIG.getDynamicUrl()+"api/dynamic/v1/praise",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
                 request.setRequestHeader("imei", main.getuuid());
                 request.setRequestHeader("os", "web");
                 request.setRequestHeader("version", "");
                 // request.setRequestHeader("User-Agent", "Mobile_Pocket");
                 request.setRequestHeader("location", "ALL");
            },
            data: JSON.stringify({
                resId:_resId
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
    //回复动态评论
    data.reply = function(_commentId,_content,succ){
        $.ajax({
            url: CONFIG.getDynamicUrl()+"api/comment/v1/reply/"+_commentId,
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
                 request.setRequestHeader("imei", main.getuuid());
                 request.setRequestHeader("os", "web");
                 request.setRequestHeader("version", "");
                 // request.setRequestHeader("User-Agent", "Mobile_Pocket");
                 request.setRequestHeader("location", "ALL");
            },
            data: JSON.stringify({
                dynamicId:_commentId,
                content:_content,
                userNickName:main.getLoginUserInfo().nickName,
                userAvatar:main.getLoginUserInfo().avatar,
                userLevel:main.getLoginUserInfo().level
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
    //根据ID获取动态详情
    data.getDynamicInfo = function(_dynamicId,succ){
        $.ajax({
            url: CONFIG.getDynamicUrl()+"api/dynamic/v1/details/"+_dynamicId,
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                userId:main.getLogInUserId()
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
    //根据ID获取动态评论
    data.getCommentList = function(_dynamicId,_lastTime,succ){
        $.ajax({
            url: CONFIG.getDynamicUrl()+"api/comment/v1/list",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                dynamicId:_dynamicId,
                limit:20,
                lastTime:_lastTime
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
    //获取成员粉丝数量和聚聚房间信息
	data.getMemberFansAndRoom = function(succ){
        $.ajax({
            url: CONFIG.getUserUrl()+"api/user/member/v1/fans/room",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                memberId:main.getMemberInfo().memberId
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
    //------------------------------------------------------------------------------------------------------------------聚聚房间
    //获取服务器地址
    data.getServerAddr = function(_roomid,succ){
        $.ajax({
            type:'POST',
            url:"https://api.netease.im/nimserver/chatroom/requestAddr.action",
            dataType: "json",
            beforeSend: function (request) {
                 request.setRequestHeader("AppKey", "632feff1f4c838541ab75195d1ceb3fa");
                 request.setRequestHeader("Nonce", Math.random());
                 request.setRequestHeader("CurTime", Date.parse(new Date()));
                 request.setRequestHeader("CheckSum", "");
            },
            data:{
                "roomid":_roomid,
                "accid":main.getLoginUserInfo().userId,
                "clienttype":1   //1:weblink; 2:commonlink, 默认1
            },
            timeout: 5000, 
            success: function(data){
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }
    //根据成员ID获取成员房间
    data.getRoomInfo = function(succ){
        $.ajax({
            url: CONFIG.getJujuUrl()+"api/im/v1/member/room/info/memberId",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                //memberId:main.getMemberInfo().memberId
                memberId:main.getMemberInfo().memberId
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
    //成员房间-主屏消息列表
    data.geMemberMsg = function(_roomId,_lastTime,succ){
        $.ajax({
            url: CONFIG.getJujuUrl()+"api/im/v1/member/room/message/mainpage",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
                 request.setRequestHeader("imei", main.getuuid());
                 request.setRequestHeader("os", "web");
                 request.setRequestHeader("version", "");
                 // request.setRequestHeader("User-Agent", "Mobile_Pocket");
                 request.setRequestHeader("location", "ALL");
            },
            data: JSON.stringify({
                roomId:_roomId,
                lastTime:_lastTime,
                limit:20,
                chatType:0     //0代表 是用户获取主屏数据        1是代表 成员获取主屏数据
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
    //成员房间-侧屏消息列表
    data.geJujuMsg = function(_roomId,_lastTime,_first,succ){
        $.ajax({
            url: CONFIG.getJujuUrl()+"api/im/v1/member/room/message/boardpage",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
                 request.setRequestHeader("imei", main.getuuid());
                 request.setRequestHeader("os", "web");
                 request.setRequestHeader("version", "");
                 // request.setRequestHeader("User-Agent", "Mobile_Pocket");
                 request.setRequestHeader("location", "ALL");
            },
            data: JSON.stringify({
                roomId:_roomId,
                //roomId:5774514,
                lastTime:_lastTime,
                limit:20,
                isFirst:_first
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
    //本周榜单
    data.getGiftTop = function(_roomId,_lastTime,succ){
        $.ajax({
            url: CONFIG.getJujuUrl()+"api/im/v1/member/giftPopList",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            // beforeSend: function (request) {
            //      request.setRequestHeader("token", main.getToken());
            //      request.setRequestHeader("imei", main.getuuid());
            //      request.setRequestHeader("os", "web");
            //      request.setRequestHeader("version", "");
            //      // request.setRequestHeader("User-Agent", "Mobile_Pocket");
            //      request.setRequestHeader("location", "ALL");
            // },
            data: JSON.stringify({
                roomId:_roomId,
                //roomId:5774514,
                memberId:main.getMemberInfo().memberId,
                timestamp:_lastTime,
                rank:0,
                limit:10
            }),
            timeout: 15000, 
            success: function (data) {
                succ(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
//               alert("eee");
            }
        });
    };
    //---------------------------------------------------------------------------------------------------------视频列表（新版）
    //
    data.getLiveInfo= function(_nextId,succ){
        $.ajax({
            url: CONFIG.getDynamicUrl()+"api/v2/posts/video/list",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                // var sessionid = "SessionID";
                //  request.setRequestHeader("version", "6.0.0");
                //  request.setRequestHeader("os", "web");
            },
            data: JSON.stringify({
                "limit": 10,
                "nextId": _nextId,
                "userId": main.getMemberInfo().userId
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

    //根据ID获取直播信息 需登录
    data.getLiveOne= function(_liveid,succ){
        $.ajax({
            url: CONFIG.getLiveUrl()+"api/live/v1/getLiveOne",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                userId:main.getLogInUserId(), //用户ID
                liveId:_liveid, //直播ID
                type:1//0:公演直播 1:成员直播
                
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
    //------------------------------------------------------------------------------------------------------------------相册
    /*获取成员相册*/
    data.getAlbum = function(_uid,_nextId,succ){
        $.ajax({
            url: CONFIG.getDynamicUrl()+"api/v1/posts/img/list",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "limit": 20,
                "nextId": _nextId,
                "userId": _uid
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
    //------------------------------------------------------------------------------------------------------------------投稿相关
    //应援墙  推荐页
    data.getRecommend = function(_lastTime,succ){
        var cur_id = localStorage.getItem("CUR_MEMBER_ID");
        $.ajax({
            url: CONFIG.getCummuneUrl()+"api/commune/v2/material/category/h5/list",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                limit:20,
                memberId:cur_id,
                ctime:_lastTime
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
    //应援墙  发现-公社-具体分类
    //// 0：文章 1：图片 2：音乐 3：视频 5：成员
    data.getTypeList = function(_type,_lastTime,succ){
        var cur_id = localStorage.getItem("CUR_MEMBER_ID");
        $.ajax({
            url: CONFIG.getCummuneUrl()+"api/commune/v2/material/category/definite/h5/list",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "category":_type,
                limit:20,
                memberId:cur_id,
                ctime:_lastTime
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
    /*data.theDetails = function(_material_type,_material_id,succ){//公社单个详情
        $.ajax({
            type:'POST',
            url:"https://member.48.cn/communeCMSMyDev/de/theme_1708227548/index.php?r=rankWeekly/info",
            dataType: "json",
            data:{
                "material_type":_material_type,
                "material_id":_material_id
            },
            timeout: 5000, 
            success: function(data){
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }
*/
    data.getArticle = function(_dataId,succ){//公社图文详情
        $.ajax({
            url: CONFIG.getGSpbase()+"api/commune/v1/article/details",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                dataId:_dataId,
                visitorId:main.getLogInUserId()
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }

    data.getPicture = function(_dataId,succ){//公社图片详情
        $.ajax({
            url: CONFIG.getGSpbase()+"api/commune/v1/picture/details",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                dataId:_dataId,
                visitorId:main.getLogInUserId()
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }

    data.getMusic = function(_dataId,succ){//公社音乐详情
        $.ajax({
            url: CONFIG.getGSpbase()+"api/commune/v1/music/details",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                dataId:_dataId,
                visitorId:main.getLogInUserId()
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }

    data.getVideo = function(_dataId,succ){//公社视频详情
        $.ajax({
            url: CONFIG.getGSpbase()+"api/commune/v1/video/details",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                dataId:_dataId,
                visitorId:main.getLogInUserId()
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }


    data.getComments = function(_lastTime,_materialId,_type,succ){//公社评论列表
        $.ajax({
            url: CONFIG.getGSpbase()+"api/commune/v1/comment/list",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                lastTime:_lastTime,
                materialId:_materialId,
                type:_type
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }

    data.getPraise = function(source,_resId,succ){//公社点赞
        $.ajax({
            url: CONFIG.getGSpbase()+"api/commune/v1/praise/"+source,
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
                 request.setRequestHeader("imei", main.getuuid());
                 request.setRequestHeader("os", "web");
                 request.setRequestHeader("version", "");
                 // request.setRequestHeader("User-Agent", "Mobile_Pocket");
                 request.setRequestHeader("location", "ALL");
            },
            data: JSON.stringify({
                resId:_resId
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }

    /*data.communeShare = function(source,_resId){//公社分享
        $.ajax({
            url: CONFIG.getGSpbase()+"api/commune/v1/share/"+source,
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
                 request.setRequestHeader("imei", main.getuuid());
                 request.setRequestHeader("os", "web");
                 request.setRequestHeader("version", "");
                 // request.setRequestHeader("User-Agent", "Mobile_Pocket");
                 request.setRequestHeader("location", "ALL");
            },
            data: JSON.stringify({
                resId:_resId
            }),
            timeout: 5000, 
            success: function (data) { 
                if(data.status==200){

                }else{
                    main.alert(data.message);
                }
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                //alert("eee");
            } 
        });
    }*/


    //------------------------------------------------------------------------------------------------------------------

    //用户中心获取用户信息
     data.getUserMsg = function(userId,_needFriendsNum,_needChatInfo,_needRecommend,succ){
        $.ajax({
            url: CONFIG.getUsersystemUrl()+"api/user/v1/show/info/"+userId,
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "needFriendsNum":_needFriendsNum,
                "needChatInfo":_needChatInfo,
                'needRecommend':_needRecommend
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    };

/*-------------------------------------------------------------------------------------------------------------------------*/ 
    //用户中心修改昵称
     data.modifyNickname = function(_nickname,succ){
        $.ajax({
            url: CONFIG.getUsersystemUrl()+"api/user/v1/edit/nickname",
            type: "POST", 
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getToken());
                 request.setRequestHeader("imei", main.getuuid());
                 request.setRequestHeader("os", "web");
                 request.setRequestHeader("version", "");
                 // request.setRequestHeader("User-Agent", "Mobile_Pocket");
                 request.setRequestHeader("location", "ALL");
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "nickname":_nickname
            }),
            timeout: 5000, 
            success: function (data) { 
                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee");
            } 
        });
    };
    var emmotion = new Array(
        new   Array("[呲牙]","f_static_000"),     
        new   Array("[调皮]","f_static_001"),   
        new   Array("[流汗]","f_static_002"),     
        new   Array("[偷笑]","f_static_003"),  
        new   Array("[再见]","f_static_004"),
        new   Array("[敲打]","f_static_005"), 
        new   Array("[擦汗]","f_static_006"), 
        new   Array("[猪头]","f_static_007"), 
        new   Array("[玫瑰]","f_static_008"), 
        new   Array("[流泪]","f_static_009"), 
        new   Array("[大哭]","f_static_010"), 
        new   Array("[嘘]","f_static_011"), 
        new   Array("[酷]","f_static_012"), 
        new   Array("[抓狂]","f_static_013"), 
        new   Array("[委屈]","f_static_014"), 
        new   Array("[便便]","f_static_015"), 
        new   Array("[炸弹]","f_static_016"), 
        new   Array("[菜刀]","f_static_017"), 
        new   Array("[可爱]","f_static_018"), 
        new   Array("[色]","f_static_019"), 
        new   Array("[害羞]","f_static_020"), 
        new   Array("[得意]","f_static_021"),     
        new   Array("[吐]","f_static_022"), 
        new   Array("[微笑]","f_static_023"), 
        new   Array("[发怒]","f_static_024"), 
        new   Array("[尴尬]","f_static_025"), 
        new   Array("[惊恐]","f_static_026"), 
        new   Array("[冷汗]","f_static_027"),
        new   Array("[爱心]","f_static_028"), 
        new   Array("[示爱]","f_static_029"), 
        new   Array("[白眼]","f_static_030"), 
        new   Array("[傲慢]","f_static_031"), 
        new   Array("[难过]","f_static_032"), 
        new   Array("[惊讶]","f_static_033"), 
        new   Array("[疑问]","f_static_034"), 
        new   Array("[睡]","f_static_035"), 
        new   Array("[亲亲]","f_static_036"), 
        new   Array("[憨笑]","f_static_037"), 
        new   Array("[爱情]","f_static_038"), 
        new   Array("[衰]","f_static_039"), 
        new   Array("[撇嘴]","f_static_040"), 
        new   Array("[阴险]","f_static_041"), 
        new   Array("[奋斗]","f_static_042"), 
        new   Array("[发呆]","f_static_043"), 
        new   Array("[右哼哼]","f_static_044"), 
        new   Array("[拥抱]","f_static_045"), 
        new   Array("[坏笑]","f_static_046"), 
        new   Array("[飞吻]","f_static_047"), 
        new   Array("[鄙视]","f_static_048"), 
        new   Array("[晕]","f_static_049"), 
        new   Array("[大兵]","f_static_050"), 
        new   Array("[可怜]","f_static_051"), 
        new   Array("[强]","f_static_052"),
        new   Array("[弱]","f_static_053"), 
        new   Array("[握手]","f_static_054"), 
        new   Array("[胜利]","f_static_055"), 
        new   Array("[抱拳]","f_static_056"),
        new   Array("[凋谢]","f_static_057"), 
        new   Array("[饭]","f_static_058"),
        new   Array("[蛋糕]","f_static_059"), 
        new   Array("[西瓜]","f_static_060"), 
        new   Array("[啤酒]","f_static_061"), 
        new   Array("[飘虫]","f_static_062"), 
        new   Array("[勾引]","f_static_063"),
        new   Array("[OK]","f_static_064"), 
        new   Array("[爱你]","f_static_065"), 
        new   Array("[咖啡]","f_static_066"), 
        new   Array("[钱]","f_static_067"), 
        new   Array("[月亮]","f_static_068"), 
        new   Array("[美女]","f_static_069"),
        new   Array("[刀]","f_static_070"),  
        new   Array("[发抖]","f_static_071"), 
        new   Array("[差劲]","f_static_072"), 
        new   Array("[拳头]","f_static_073"),
        new   Array("[心碎]","f_static_074"), 
        new   Array("[太阳]","f_static_075"), 
        new   Array("[礼物]","f_static_076"), 
        new   Array("[足球]","f_static_077"), 
        new   Array("[骷髅]","f_static_078"), 
        new   Array("[挥手]","f_static_079"),
        new   Array("[闪电]","f_static_080"),     
        new   Array("[饥饿]","f_static_081"), 
        new   Array("[困]","f_static_082"), 
        new   Array("[咒骂]","f_static_083"),
        new   Array("[折磨]","f_static_084"), 
        new   Array("[抠鼻]","f_static_085"), 
        new   Array("[鼓掌]","f_static_086"), 
        new   Array("[糗大了]","f_static_087"), 
        new   Array("[左哼哼]","f_static_088"), 
        new   Array("[哈欠]","f_static_089"),
        new   Array("[快哭了]","f_static_090"),    
        new   Array("[吓]","f_static_091"), 
        new   Array("[篮球]","f_static_092"), 
        new   Array("[乒乓球]","f_static_093"),
        new   Array("[NO]","f_static_094"), 
        new   Array("[跳跳]","f_static_095"), 
        new   Array("[怄火]","f_static_096"), 
        new   Array("[转圈]","f_static_097"), 
        new   Array("[磕头]","f_static_098"), 
        new   Array("[回头]","f_static_099"),    
        new   Array("[跳绳]","f_static_100"),     
        new   Array("[激动]","f_static_101"), 
        new   Array("[街舞]","f_static_102"), 
        new   Array("[献吻]","f_static_103"),
        new   Array("[左太极]","f_static_104"), 
        new   Array("[右太极]","f_static_105"), 
        new   Array("[闭嘴]","f_static_106"),

        new   Array("[哈哈1]","f_static_107"),     
        new   Array("[哈哈2]","f_static_108"),   
        new   Array("[哈哈3]","f_static_109"),     
        new   Array("[哈哈4]","f_static_110"),  
        new   Array("[哈哈5]","f_static_111"),
        new   Array("[哈哈6]","f_static_112"), 
        new   Array("[哈哈7]","f_static_113"), 
        new   Array("[哈哈8]","f_static_114"), 
        new   Array("[哈哈9]","f_static_115"), 
        new   Array("[哈哈10]","f_static_116"), 
        new   Array("[哈哈11]","f_static_117"), 
        new   Array("[哈哈12]","f_static_118"), 
        new   Array("[哈哈13]","f_static_119"), 
        new   Array("[哈哈14]","f_static_120"), 
        new   Array("[哈哈15]","f_static_121"), 
        new   Array("[哈哈16]","f_static_122"), 
        new   Array("[哈哈17]","f_static_123"), 
        new   Array("[哈哈18]","f_static_124"), 
        new   Array("[哈哈19]","f_static_125"), 
        new   Array("[哈哈20]","f_static_126"), 
    
        new   Array("[哈哈21]","f_static_127"),
        new   Array("[哈哈22]","f_static_128"), 
        new   Array("[哈哈23]","f_static_129"), 
        new   Array("[哈哈24]","f_static_130"), 
        new   Array("[哈哈25]","f_static_131"), 
        new   Array("[哈哈26]","f_static_132"), 
        new   Array("[哈哈27]","f_static_133"), 
        new   Array("[哈哈28]","f_static_134"),
        new   Array("[哈哈29]","f_static_135"), 
        new   Array("[哈哈30]","f_static_136"), 
        new   Array("[哈哈31]","f_static_137"), 
        new   Array("[哈哈32]","f_static_138"), 
        new   Array("[哈哈33]","f_static_139"), 
        new   Array("[哈哈34]","f_static_140"), 
        new   Array("[哈哈35]","f_static_141"), 
        new   Array("[哈哈36]","f_static_142"), 
        new   Array("[哈哈37]","f_static_143"), 
        new   Array("[哈哈38]","f_static_144"), 
        new   Array("[哈哈39]","f_static_145"), 
        new   Array("[哈哈40]","f_static_146"), 
        new   Array("[哈哈41]","f_static_147")); 
    //发送表情 获取表情列表
    data.createEmotionList = function(){
        var html = "";
        $.each(emmotion,function(index,dt){

        })
    }
    //显示表情
    data.findEmotion = function(value){
        value = value.replace(/\[(.+?)\]/g,function(word){
            for(var j in emmotion){
                if(emmotion[j][0] == word)  {
                    if(parseInt(emmotion[j][1].split("_")[2]) > 106 ){//第二套表情
                        return ("<img height='22px' width='22px' src='public/face/"+emmotion[j][1]+".imageset/"+emmotion[j][1]+".png'>");   
                    }else{//第一套表情
                        return ("<img height='22px' width='22px' src='public/face/"+emmotion[j][1]+".imageset/"+emmotion[j][1]+"@2x.png'>");    
                    }
                    
                }
            }
        });
        return value;
    }
    //获取表情数据
    data.getEmotion = function(){
        return emmotion;
    }
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
    //处理字符 去掉<br>
    data.fotmatTxt = function(dom){
        var str = dom
        var subStr=new RegExp("<br />","ig");
        var result=str.replace(subStr," ")
        return result
    }
    //字符转化json
    data.getJson = function(msg){
        return JSON.parse(msg)
    }

    //跳转
    data.hrefTo = function(link){
        window.location.href = link;
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
    data.alert = function(title,subtitle){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }
    //分享
    data.setShareInfo = function(){
        var cur_id = localStorage.getItem("CUR_MEMBER_ID");
        if(cur_id != null && cur_id != undefined){
            shareTitlestr = main.getMemberInfo().memberName+"给你发来一条消息";
            shareDesc = "你好，我是"+main.getMemberInfo().memberName+"，我想向你做个自我介绍，通过我的动态来了解我是个怎样的人吧~";
            shareLink = "http://h5.snh48.com/memberPage/index.html?mid="+cur_id;
            thumbLink = CONFIG.getSource()+main.getMemberInfo().memberAvatar;
            wxshare();
        }
    }
}(window.main = {}));

main.setShareInfo();

if(checkFromWX()){
    windowcont("memberPage","wx");
}else{
    windowcont("memberPage","brower");
}



