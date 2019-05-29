(function(data) {
	//活动id  固定值
	var actionId = "591d738ad5a7778da880737c"

	//web端测试（用户信息）
    var webUserInfo = {
        "appid":"87333",                                //用户ID
        "apptoken":"Fs9MTz1h3BK8SRRL/7gUUTEA24bkfrQv/PzrET59y2LkMrNJTh0mY26w7AJ/x9GD",                          //验证Token
        "uname":"GavinG",                                 //用户昵称
        "avata":"https://source2.48.cn/mediasource/avatar/27422.jpg",                                    //头像地址
        "dev_cd":"6ABD1571-807E-4699-B045-6DA85D7C262E"                        //设备号
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
    //期数
    data.getOid = function(){
        return 10;
    }
/*-------------------------------------------------------------------------------------------------------------------------------------*/
    //视频列表套用可投票曲目列表接口
    data.getVideoList = function(_oid,succ){
        $.ajax({
            type:'POST',
            url:CONFIG.geturl()+"api_music_list.php",
            dataType: "json",
            data:{
                oid:_oid
            },
            success: function(data){
                succ(data);
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }

    //曲目列表及排行
    data.getMusicList = function(_oid,succ){
        $.ajax({
            type:'POST',
            url:CONFIG.geturl()+"api_music_rank.php",
            dataType: "json",
            data:{
                oid:_oid
            },
            success: function(data){
                succ(data);
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }
    
    //评论列表
    data.getCommentList = function(_mid,_oid,_limit,_offset,succ){
        $.ajax({
            type:'POST',
            url:CONFIG.geturl()+"api_comment_log.php?mid="+_mid+"&oid="+_oid,
            dataType: "json",
            data:{
                limit:_limit,
                offset:_offset
            },
            success: function(data){
                succ(data);
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }

    //曲目评论点击喜欢提交评论
    data.getMusicLike = function(_oid,_mid,s_Flg,_info,succ){
        $.ajax({
            type:'POST',
            url:CONFIG.geturl()+"api_music_comment.php",
            dataType: "json",
            data:{
                appid:main.getAppUserInfo().appid,
                apptoken:main.getAppUserInfo().apptoken,
                uname:main.getAppUserInfo().uname,
                avata:main.getAppUserInfo().avata,
                dev_cd:main.getAppUserInfo().dev_cd,
                oid:_oid,
                mid:_mid,
                s_flg:s_Flg,
                info:_info
            },
            success: function(data){
                succ(data);
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }

    //自己的评论取得
    data.getSelfComment = function(_oid,_mid,succ){
        $.ajax({
            type:'POST',
            url:CONFIG.geturl()+"api_my_comment.php?mid="+_mid+"&oid="+_oid+"&appid="+main.getAppUserInfo().appid,
            dataType: "json",
            data:{
            },
            success: function(data){
                succ(data);
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }

    //评论点赞
    data.getCommentLike = function(_logid,succ){
        $.ajax({
            type:'POST',
            url:CONFIG.geturl()+"api_comment_praise.php",
            dataType: "json",
            data:{
                appid:main.getAppUserInfo().appid,
                apptoken:main.getAppUserInfo().apptoken,
                dev_cd:main.getAppUserInfo().dev_cd,
                logid:_logid
            },
            success: function(data){
                succ(data);
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                //console.log("error");
            } 
        });
    }


/*---------------------------------------------------------------------------------------------------------------------------------------*/
        //跳转
    data.hrefTo = function(_url){
        if(checkFromApp()){
            window.web.gotoDetail(_url);
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