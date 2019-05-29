
var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
var time = null;
var tmpToken =null;
var token = null;
var mobile = null;
var area = null;
var nickName = null;
var avatar = null;
var tpRest = null;
var toTotal = null;

//判断是否最新版本 提示下载
if(!isExitsFunction("window.web.getAccessToken")){
    
    if(checkFromApp()){
        alert("请下载最新版本投票！")
        window.web.backHome();
    }
    
}

var APP_USER_INFO = JSON.parse(localStorage.getItem("APP_USER_INFO")) || {};                  //app 用户信息

clearMembers()
getAllMembers()

if(checkFromApp()){
    if(window.web.getLoginUserId() == "" || window.web.getLoginUserId() == null || window.web.getLoginUserId() == undefined){
        mui.alert("请先登录口袋48账号", '', function() {
            window.web.backHome();
        });
    }else{
        logInApp()
    }
}else{
    logInApp()
}
//app 登录
function logInApp(){
    main.logInApp(function(dt){
        console.log(dt.status+">>>>>>")
        if(dt.status==200){
            token = dt.content.token;
            nickName = dt.content.nickName;
            avatar = dt.content.avatar;
            tpRest = dt.content.tpRest;
            tpTotal = dt.content.tpTotal;

            userInfo.setUserInfo(dt.content)
            userInfo.setLocalUserInfo()

            localStorage.setItem('token',token);

    //alert("gotoid>>"+GetQueryString("gotoid"))
            console.log(GetQueryString("gotoid"))
            //跳到成员投票页
            if(GetQueryString("gotoid") != null && GetQueryString("gotoid") != undefined){
                localStorage.setItem("CUR_MEMBER_ID",GetQueryString("gotoid"))
                if(GetQueryString("gotoid") == "buy"){//跳转到购买页 获取积分
                    main.hrefTo("buy_ticket.html")
                }else{//跳转到单个成员详情页 去投票
                    main.hrefTo("member.html")
                }
                
            }

        }else if(dt.status==10001){//需要验证身份
            $('#bindPop').show();
            $('#phone').attr('disabled',true);
            $('#bindPop').attr('mytype',10001);
            $('.bind-content h5').html('验证身份');
            tmpToken = dt.content.tmpToken;
            mobile = dt.content.mobile;
            area = dt.content.area;
            $('#phone').val(mobile);
            $('.region').html(area);

        }else if(dt.status==10002){//需要绑定手机号
            $('#bindPop').show();
            $('#bindPop').attr('mytype',10002);
            $('.bind-content h5').html('绑定设备号');
            token = dt.content.token;
            nickName = dt.content.nickName;
            avatar = dt.content.avatar;
            tpRest = dt.content.tpRest;
            tpTotal = dt.content.tpTotal;

            localStorage.setItem('token',token);

        }else{
            main.alert(dt.message);
        }
                
    })
}



//----------------------------------------------------------------------------------------------------------------------------------------

function getAllMembers(){
    var getlist = main.getAllMembers(function(data){
        localStorage.setItem("ALL_MEMBER", JSON.stringify(data));
        $.each(data,function(index,dt){
            var hd = CONFIG.getPicUrl()+'zp_'+ dt.sid +'.jpg'
            //var hd = "https://vote.48.cn/resource/img/member/zp_"+dt.sid+".jpg";
            var _li = [];
            _li.push("<li>");
            _li.push("<p class='member-hd "+dt.gid+"-"+formatYSB(dt.tname)+"-bd' style='background:#fff url("+hd+")  no-repeat;background-position-x:50%;background-size:90%;'></p>");
            
            _li.push("<div class='member-name'>"+dt.sname+"<span class='icon-team "+dt.gname+"-"+formatYSB(dt.tname)+"-bg "+addClassYSB(dt.tname)+"'>"+dt.tname+"</span></div>")
            _li.push("<a class='btn-vote' sid='"+dt.sid+"' href='###'>投票</a>")
            _li.push("</li>");
            
            $("."+dt.gname+"-"+formatYSB(dt.tname)).append(_li.join(''));
            
            

            //console.log(dt)
            localStorage.setItem("SID"+dt.sid,JSON.stringify(dt))

        })
        addEventListeners();
    })

    
}

function clearMembers(){
    $(".SNH-SII,.SNH-NII,.SNH-HII,.SNH-X,.SNH-Ft,.SNH-YBS,.BEJ-B,.BEJ-E,BEJ-J,BEJ-YBS,.GNZ-G,.GNZ-NIII,.GNZ-Z,GNZ-YBS,.SHY-SIII,.SHY-HIII,CKG-C,CKG-K,CKG-YBS").html("")

}
function formatYSB(str){
    if(str == "预备生"){
        return "YBS"
    }else{
        return str
    }
}
function addClassYSB(str){
    if(str == "预备生"){
        return "YBS"
    }else{
        return ""
    }
}
//设置用户信息
// function setUserInfo(data){
    
// }

//添加事件
function addEventListeners(){
    $(".mui-navigate").click(function(){
        var link = $(this).attr("link");
        main.hrefTo(link)
    })

    //弹出绑定微信弹窗
    $('.mui-bindwx').click(function(){
       ifbindWx();
    })
    //关闭绑定微信弹窗
    $('.btnsback').click(function(){
        $('.mask_inbox').hide();
    })
    //确认绑定微信
    $('.btnsright').click(function(){
        $('.mask_inbox').hide();
        window.web.weChatAuth(JSON.stringify({
            "callback": "authCallback"
        }));
    })

    //跳转故障申告
    $('.mui-guzhang').click(function(){
        window.web.gotoDetail('https://h5.48.cn/2018apppage/2018vote/bugreport/bug_report.html?votetoken='+token);
    })

    //总选介绍
    $(".btn-intro").click(function(){
        main.hrefTo('https://vote.48.cn/wx/about1.html')
    })
    //年度作品介绍
    $(".btn-rule").click(function(){
        main.hrefTo('https://vote.48.cn/wx/rewards1.html')
    })
    //分团切换
    $(".menu-btns li").click(function(){
        var group = $(this).attr("group") 
        var i = $(this).index();//获取分团索引
        var prevteam = $(".team-group ul").eq(i).attr("prevteam");//获取上次所选分团队伍
        chooseGroup(group,prevteam)
    })

    //队伍切换
    $(".team-group li").click(function(){
        var team = $(this).attr("team");
        $(this).parent().attr("prevteam",team)//设置上一个队伍
        chooseTeam(team)
    })

    //点击投票 跳转详情页
    $(".btn-vote").click(function(){
        var sid = $(this).attr("sid");
        
        //var info = localStorage.getItem("SID"+sid)
        localStorage.setItem("CUR_MEMBER_ID",sid)
        console.log("sid>"+sid);
        main.hrefTo("member.html")
       // console.log(JSON.stringify("SID"+sid));
    })

    //显示国家选择
    $(".region").click(function(){
        COUNTRY.show(function(code,name){
            console.log(code+"--"+name)
            $(".region").attr("area",code);
            $(".region").html(name+"(+"+code+")");
        })
    })

    //发送手机验证码
    $(".phoneCode>label").click(function(){
        if($(".phoneCode>label").hasClass("token_value_enabled")){
            return false;
        }
        //手机号
        if($("#phone").val() == ''){
            main.showTip("请输入手机号码")
            return false;
        }
        //手机号
        // if(!phonereg.test($(".phonenum").val())){
        //  INDEX.showTip("请输入正确的手机号码")
        //  return false;
        // }
        if($("#phone").val().length < 5 || $("#phone").val().length > 20){
            mian.showTip("请输入正确的手机号码")
            return false;
        }
        if($('#bindPop').attr('mytype')==10001){//验证
            //请求接口发送信息
            main.testSMS(tmpToken,area,function(dt){
                if(dt.status == 200){
                    //加载成功 倒计时开始 60 秒
                    $(".phoneCode>label").addClass("token_value_enabled");
                    var total = 60;
                    $(".phoneCode>label").html(total+"秒")
                    time = setInterval(function(){
                        total -= 1
                        $(".phoneCode>label").html(total+"秒")
                        if(total<0){
                            $(".phoneCode>label").removeClass("token_value_enabled");
                            $(".phoneCode>label").html("获取验证码")
                            clearInterval(time)
                        }
                    },1000)
                    $("#code").val("")
                }else{
                    main.showTip(dt.message);
                }
            })

        }else if($('#bindPop').attr('mytype')==10002){//绑定

            //请求接口发送信息
            main.bindSMS(token,$('#phone').val(),$('.region').attr('area'),function(dt){
                if(dt.status == 200){
                    //加载成功 倒计时开始 60 秒
                    $(".phoneCode>label").addClass("token_value_enabled");
                    var total = 60;
                    $(".phoneCode>label").html(total+"秒")
                    time = setInterval(function(){
                        total -= 1
                        $(".phoneCode>label").html(total+"秒")
                        if(total<0){
                            $(".phoneCode>label").removeClass("token_value_enabled");
                            $(".phoneCode>label").html("获取验证码")
                            clearInterval(time)
                        }
                    },1000)
                    $("#code").val("")
                }else{
                    main.showTip(dt.message);
                }
            })
        }
        
    })

    //获取焦点隐藏错误信息
    $("#phone").focus(function(){
        $(".tip").css('opacity',0);
    })
    $("#code").focus(function(){
       $(".tip").css('opacity',0);
    })

    //绑定手机号提交
    $(".btn-submit").click(function(){
        //手机号
        if($("#phone").val() == ''){
            main.showTip("请输入手机号码")
            return false;
        }

        //验证码
        if($("#code").val() == ''){
            main.showTip("请输入验证码")
            return false;
        }
        $('#btn-submit').attr({'value':'提交中...','disabled':true})
        if($('#bindPop').attr('mytype')==10001){//验证
            //验证手机验证码
            main.testDEV(tmpToken,$('#code').val(),function(dt){
                if(dt.status == 200){
                   $('#bindPop').hide();
                   logInApp()
                }else{
                    main.alert(dt.message)
                }
                $('#btn-submit').attr({'value':'提交','disabled':false})
            })
        }else if($('#bindPop').attr('mytype')==10002){
            //验证手机验证码
            main.bindDEV(token,$('#phone').val(),$('.region').attr('area'),$('#code').val(),function(dt){
                if(dt.status == 200){
                   $('#bindPop').hide();
                   logInApp()
                }else{
                    main.alert(dt.message)
                }
                $('#btn-submit').attr({'value':'提交','disabled':false})
            })
        }
    })





    var SHOW_TIP = localStorage.getItem("SHOW_TIP") || "";

    if(SHOW_TIP == ""){
        localStorage.setItem("SHOW_TIP","showtip")
        main.alert("重要提示：如果您在投票官网上https://vote.48.cn为成员进行了投票，请在“绑定丝瓜账号”的页面中进行账号绑定，投票记录将会进行累加，如果不绑定，则分开计算投票记录。")
    }
}




//选择分团
function chooseGroup(_group,prevteam){
    
    $(".group,.team-group ul").hide();
    switch(_group){
        case "SNH":
            $(".group").eq(0).fadeIn();
            
            $(".team-group ul").eq(0).fadeIn();
            $(".menu-line").css("left","0") //下划线
            break;
        case "BEJ":

            
            $(".group").eq(1).fadeIn();
            $(".team-group ul").eq(1).fadeIn();
            $(".menu-line").css("left","19%")
            break;
        case "GNZ":
            
            $(".group").eq(2).fadeIn();
            $(".team-group ul").eq(2).fadeIn();
            $(".menu-line").css("left","40%")
            break;
        case "SHY":
            
            $(".group").eq(3).fadeIn();
            $(".team-group ul").eq(3).fadeIn();
            $(".menu-line").css("left","60%")
            break;
        case "CKG":
            
            $(".group").eq(4).fadeIn();
            $(".team-group ul").eq(4).fadeIn();
            $(".menu-line").css("left","80%")
            break;
    }
    chooseTeam(prevteam)  
}

//选择队伍
function chooseTeam(_team){
    console.log("chooseTeam>"+_team)
    //menu
    $.each($(".team-group li"),function(index,dt){
        var curteam = $(this).attr("team");
        if(curteam == _team){
            $(this).attr("class",curteam+"-bg")
        }else{
            $(this).attr("class",curteam+"-c "+curteam+"-bd")
        }
        
    })

    //members
   $.each($(".members ul"), function(index,dt){
        var _class = $(this).attr("class");
        if(_class == _team){
            $(this).fadeIn();
        }else{
            $(this).hide();
        }
   })
}


//是否绑定微信
function ifbindWx(){
    //alert("aaa");
    main.ifbindWx(token,function(dt){
        //alert('----'+JSON.stringfiy(dt));
        if(dt.status==200){
            if(dt.content.bind==false){//未绑定微信
                $('.mask_inbox').show();
            }else{
                main.alert("您已绑定微信");
            }
        }else{
            main.alert(dt.message);
        }
    })
}

function authCallback(json){
    
    var jsons = JSON.parse(json);
    bindWx(jsons.accessToken,jsons.openid);
}

//绑定微信
function bindWx(_wxAccessToken,_wxOpenId){
    main.bindWx(token,_wxAccessToken,_wxOpenId,function(dt){
        if(dt.status==200){
            main.alert("绑定成功");
            userInfo.getUserInfo(function(){}) 
        }else{
            main.alert(dt.message);
        }
    })
}

