//主文件
(function(data) {
    if(checkFromWX()){
        if(common.getOauth("https://h5.48.cn/2018apppage/opinion_survey/index.html")){
            getUserInfo(function(){
                // alert(GetQueryString("openid"))
            })
        }
    }else if(checkFromApp()){
        if(window.web.getLoginUserId()){

        }else{
            $('.mask').show();
            $('.rightbtn').click(function(){
                $('.mask').hide();
                window.web.backHome();
            });
        }
    }else{
        if(localStorage.getItem("uuid")){
            //localStorage.setItem("uuid", localStorage.getItem("uuid"));
        }else{
            localStorage.setItem("uuid", guid());
        }
        /*alert(localStorage.getItem("uuid"));*/
    }

    var _from;
	var isload = false//是否加载中
    var result = [];//答案数组
    var total = 0;   //总题目
    var succ = 0;    //完成答题数
    var dataId = "";  //项目id
    var status = 0 ;  //状态 1:未报名 2:已报名
    var fa = 0;
	//初始化
	data.init = function(_total){
        if(checkFromApp()){
            _from="app";
        }else if(checkFromWX()){
            _from="wx";
        }else{
            _from="web";
        }
        main.getInfo(_from,function(dt){
            if(dt.status == 200){//已提交
                $(".btn-wrapper-submit").hide();
                var arr = (dt.msg[0].datas).split('$$$');
                console.log(arr);
                main.addInfo(arr)
                status = 2;
            }else if(dt.status == 600){
                $(".wrapper-submit").show()
                total = _total;
                main.addListeners()
            }else if(dt.status==1354){
                alert('请退出重新登录口袋48app');
            }else{
                alert(dt.errmsg+',,,,,,,,');
            }
        })
	}
    //web端测试（用户信息）
    var webUserInfo = {
        "type":"app",
        "appid":"27422",                                //用户ID
        "apptoken":"60zqstDJNCeLxIqktg/ec9VT28cAvWPMLfhGm9tXv2eq0GFU0m9FafcuoI9LMzSl",                          //验证Token
        "uname":"GavinG",                                 //用户昵称
        "avata":"https://source2.48.cn/mediasource/avatar/27422.jpg",                                    //头像地址
        "dev_cd":"6ABD1571-807E-4699-B045-6DA85D7C262E"                        //设备号
    }

    /*var wxUserInfo = {
        "appid":GetQueryString("openid"),                                //用户ID
        "apptoken":"",                          //验证Token
        "uname":"",                                 //用户昵称
        "avata":"",                                    //头像地址
        "dev_cd":"",
        "type":"web"   
    }

    
    var webUserInfo = {
        "appid":localStorage.getItem("uuid"),  //用户ID
        "apptoken":"",                          //验证Token
        "uname":"",                                 //用户昵称
        "avata":"",                                    //头像地址
        "dev_cd":"",
        "type":"web"  
    }
   */

    //口袋用户信息
    if(checkFromApp()){
        var appUserInfo = {
            "appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avata":window.web.getLoginUserPic(),            //头像地址
            "dev_cd":window.web.getPhoneIMEI(),               //设备号
            "type":"app"
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
    data.getToken = function(){
        //alert("checkFromApp()>"+checkFromApp())
        if(checkFromApp()){
            return window.web.getAccessToken()
        }else{
           /* return "Fs9MTz1h3BK8SRRL/7gUUTEA24bkfrQv/PzrET59y2LkMrNJTh0mY26w7AJ/x9GD"*/
        }
    }

	//添加事件
	data.addListeners = function(){
        /*单选*/
        $('.choose-single p').click(function(){
            $(this).parents("li").find(".tips").css("opacity",0);
            var _this = $(this).parent();
            _this.find("p").removeClass("choose-S-yes").addClass("choose-S-no")
            $(this).removeClass("choose-S-no").addClass("choose-S-yes")

            $(this).parent().parent().attr("value",$(this).attr("value"))//给上级元素li赋值
        })
        /*多选*/
        $('.choose-muti span').click(function(){
            $(this).parents("li").find(".tips").css("opacity",0);
            if($(this).hasClass("choose-M-yes")){
                $(this).removeClass("choose-M-yes").addClass("choose-M-no")
            }else{
                console.log($(this).parent().find(".choose-M-yes").length);
                $(this).removeClass("choose-M-no").addClass("choose-M-yes")
            }
            var str = "";
            $.each($(this).parent().find(".choose-M-yes"), function(index,dt){
                str += $(dt).attr("value")
                str += "|||"
            })
            $(this).parent().parent().attr("value",str)//给上级元素li赋值
        })
        /*最多选三项*/
        $('.choose-three span').click(function(){
            $(this).parents("li").find(".tips").css("opacity",0);
            if($(this).hasClass("choose-T-yes")){
                $(this).removeClass("choose-T-yes").addClass("choose-T-no")
            }else{
                $(this).removeClass("choose-T-no").addClass("choose-T-yes")
                if($(this).parent().find(".choose-T-yes").length > 3){
                    $(this).removeClass("choose-T-yes").addClass("choose-T-no")
                }
            }
            var str = "";
            $.each($(this).parent().find(".choose-T-yes"), function(index,dt){
                str += $(dt).attr("value")
                str += "|||"
            })
            $(this).parent().parent().attr("value",str)//给上级元素li赋值
        })

        /*是否的勾选多选（第一题）*/
        $('.choose-could p').click(function(){
            $(this).parents("li").find(".tips").css("opacity",0);
            var _this = $(this).parent();
            _this.find("p").removeClass("choose-S-no").addClass("choose-S-yes")//选中无
            $(".choose-many span").removeClass("choose-M-yes").addClass("choose-M-no")//取消选中公演
            $(this).parent().parent().attr("value",$(this).attr("value"))//给上级元素li赋值
        })
        $('.choose-many span').click(function(){
            $(this).parents("li").find(".tips").css("opacity",0);
            $(this).parent().siblings('p').removeClass("choose-S-yes").addClass("choose-S-no")//取消无

            if($(this).hasClass("choose-M-yes")){
                $(this).removeClass("choose-M-yes").addClass("choose-M-no")
            }else{
                console.log($(this).parent().find(".choose-M-yes").length);
                $(this).removeClass("choose-M-no").addClass("choose-M-yes")
            }
            var str = "";
            $.each($(this).parent().find(".choose-M-yes"), function(index,dt){
                str += $(dt).attr("value")
                str += "|||"
            })
            $(this).parent().parent().parent().attr("value",str)//给上级元素li赋值
        })

        /*第七题：评价题是否满意*/
        $('.topic .chk').click(function(){
            $(this).parents(".timuAll").find(".tips").css("opacity",0);
            $(this).removeClass("choose-A-no").addClass("choose-A-yes");
            $(this).siblings('.chk').removeClass("choose-A-yes").addClass("choose-A-no");

            var str = "";
            $.each($(this).parents('.timuAll').find(".choose-A-yes"), function(index,dt){
                str += $(dt).attr("value")
                str += "|||"
            })
            $(this).parents('.timuAll').attr("value",str)//给上级元素li赋值

            if($(this).parents('.timuAll').find(".choose-A-yes").length == 6){
                $('.timuAll').addClass('checktrue');
            }else{
                $('.timuAll').removeClass('checktrue');
            }
        })



        //当重新点击选择时去掉红色提示（此项为选择）
        $('input,textarea').focus(function(){
            $(this).parents("li").find(".tips").css("opacity",0);
        })

        /*完成提交*/
        $(".btn-preview").click(function(){
            $.each($(".choose-input"),function(index,dt){
                $(this).parent().attr("value", $(this).find("input").val())
            })
            //填空题
            $.each($(".chooyes"),function(index,dt){
                $(this).parent().attr("value", $(this).find("textarea").val())
            })
            //不是必选题
            $.each($(".choono"),function(index,dt){
                if($(this).find("textarea").val() == "" || $(this).find("textarea").val() == undefined){
                    $(this).parent().attr("value", " ");
                }else{
                    $(this).parent().attr("value", $(this).find("textarea").val())
                }
            })

            succ = 0;
            $(".tips").css("opacity",0);
            $.each($(".wrapper-submit").find("li"),function(index,dt){
                console.log("--"+index)
                if($(dt).attr("value") == "" || $(dt).attr("value") == undefined ){
                    $(dt).find(".tips").css("opacity",1);
                }else if($(".wrapper-submit").find("li").eq(6).hasClass("checktrue")!=true){
                    $(".wrapper-submit").find("li").eq(6).find(".tips").css("opacity",1);
                }else{
                    var _val = ($(dt).attr("value")).split('.');
                    var str = (_val[_val.length-1]).split('|||');
                    var _str= str[str.length-1];
                    var _str2 = str[str.length-2]
                    if(_str == "其他" || _str2=="其他"){
                        if($(dt).find("input").val() == ""){
                            $(dt).find(".tips").html("此项未填写！").css("opacity",1);
                        }else{
                            var a = $(dt).attr("value");
                            var b = $(dt).find("input").val();
                            var st = a.split('|||');
                            st.pop();
                            // console.log(st);
                            var kd = st.join("|||")
                            // console.log(kd);
                            if(_str == "其他"){
                                $(dt).attr("value",a+':'+b);
                                result[index] = $(dt).attr("value");
                            }else if(_str2 == "其他"){
                                $(dt).attr("value",kd+':'+b);
                                // console.log($(dt).attr("value"));
                                result[index] = ($(dt).attr("value"));
                                // console.log(result[index]);
                            }
                            succ += 1;
                        }
                    }else{
                        result[index] = $(dt).attr("value");
                        succ += 1;
                    }
                }
            })
            //答题完毕 进入preview页
            if(succ ==total){
                console.log("done>>"+result)
                main.addInfo(result)
            }
            console.log(succ)
            //console.log($(".timu1>div").hasClass(".choose-single"))
        })
        //返回编辑
        $(".btn-edit").click(function(){
            $(".wrapper-preview").hide();
            $(".wrapper-submit").show();
            
        })
        //提交
        $(".btn-submit").click(function(){
            if(checkFromApp()){
                _from="app";
            }else if(checkFromWX()){
                _from="wx";
            }else{
                _from="web";
            }
            main.submitData(_from,result.join("$$$"),function(){

            })
        })
	}
    data.addInfo = function(dat){
        if(status == 2){//已报名
            $(".btn-wrapper-submit").hide()
            $(".tip-succ").show()
        }
        $(".wrapper-submit").hide();
        $(".wrapper-preview").show();
        // var arr = dat.split(',');
        $.each($(".wrapper-preview .timu-list").find("div").find("p"),function(index,dt){
            $(dt).html(dat[index].split("|||").join(";<br/>"));
        })
    }
	data.getValue = function(obj){
        obj.find(".choose-S-yes").attr("value")
    }
    //报名内容预览
    data.getInfo = function(_from,succ){
        if(_from  == "app"){
            $.ajax({
                url: "https://h5.48.cn/siba/de/surveys/index.php?r=surveys/content",
                type: "POST", 
                dataType: "json",
                data:{
                    "type":main.getAppUserInfo().type,
                    "version_id":180204,
                    "user_id":main.getAppUserInfo().appid,
                    "dev_cd":main.getAppUserInfo().dev_cd,
                    "token":main.getAppUserInfo().apptoken
                },
                timeout: 5000, 
                success: function (dt) {
                    succ(dt)
                    // console.log(dt.msg)
                    // if(dt.status == 200){
                    //     main.addInfo(dt.content)
                    // }
                },
                error: function (jqXHR, textStatus, errorThrown) { 

                }
            });
        }else if(_from == "wx"){
            $.ajax({
                url: "https://h5.48.cn/siba/de/surveys/index.php?r=surveys/content",
                type: "POST", 
                dataType: "json",
                data:{
                    "type":"weixin",
                    "version_id":180204,
                    "openid":GetQueryString("openid"),
                    "dev_cd":"",
                    "token":""
                },
                timeout: 5000, 
                success: function (dt) {
                    succ(dt)
                    // console.log(dt.msg)
                    // if(dt.status == 200){
                    //     main.addInfo(dt.content)
                    // }
                },
                error: function (jqXHR, textStatus, errorThrown) { 

                }
            });
        }else if(_from == "web"){
            $.ajax({
                url: "https://h5.48.cn/siba/de/surveys/index.php?r=surveys/content",
                type: "POST", 
                dataType: "json",
                data:{
                    "type":"web",
                    "version_id":180204,
                    "uuid":localStorage.getItem("uuid"),
                    "dev_cd":"",
                    "token":""
                },
                timeout: 5000, 
                success: function (dt) {
                    succ(dt)
                    // console.log(dt.msg)
                    // if(dt.status == 200){
                    //     main.addInfo(dt.content)
                    // }
                },
                error: function (jqXHR, textStatus, errorThrown) { 

                }
            });
        }else{}
        
    };

    //报名内容提交
    data.submitData = function(_from,_info){
        if(_from  == "app"){
            $.ajax({
                url: "https://h5.48.cn/siba/de/surveys/index.php?r=surveys/FYA",
                type: "POST", 
                dataType: "json",
                data:{
                    "type":main.getAppUserInfo().type,
                    "user_id":main.getAppUserInfo().appid,
                    "nickname":main.getAppUserInfo().uname,
                    "dev_cd":main.getAppUserInfo().dev_cd,
                    "token":main.getAppUserInfo().apptoken,
                    "data":_info,
                    "version_id":180204
                },
                timeout: 5000, 
                success: function (dt) {
                    if(dt.status == 200){
                        //提交按钮隐藏
                        $(".btn-wrapper-submit").hide();
                        $(".tip-succ").show();
                       
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) { 

                }
            });
        }else if(_from  == "wx"){
            $.ajax({
                url: "https://h5.48.cn/siba/de/surveys/index.php?r=surveys/FYA",
                type: "POST", 
                dataType: "json",
                data:{
                    "type":"weixin",
                    "openid":GetQueryString("openid"),
                    "nickname":"",
                    "dev_cd":"",
                    "token":"",
                    "data":_info,
                    "version_id":180204
                },
                timeout: 5000, 
                success: function (dt) {
                    if(dt.status == 200){
                        //提交按钮隐藏
                        $(".btn-wrapper-submit").hide();
                        $(".tip-succ").show();
                       
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) { 

                }
            });
        }else if(_from  == "web"){
            $.ajax({
                url: "https://h5.48.cn/siba/de/surveys/index.php?r=surveys/FYA",
                type: "POST", 
                dataType: "json",
                data:{
                    "type":"web",
                    "uuid":localStorage.getItem("uuid"),
                    "nickname":"",
                    "dev_cd":"",
                    "token":"",
                    "data":_info,
                    "version_id":180204
                },
                timeout: 5000, 
                success: function (dt) {
                    if(dt.status == 200){
                        //提交按钮隐藏
                        $(".btn-wrapper-submit").hide();
                        $(".tip-succ").show();
                       
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) { 

                }
            });
        }else{}
        
    };
}(window.main = {}));


function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

//-----------------------------------------------------------------------------------------------
