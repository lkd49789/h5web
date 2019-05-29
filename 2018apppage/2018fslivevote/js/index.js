//主界面
(function(data) {
    var m_li = '<li class="m-avatar" style="background-image:url({{avatar}});background-size: 100%;">'+
'                <p class="member_name">{{mname}}</p>'+
'                <p class="btn-like" id="{{id}}">投票</p>'+
'            </li>'
    var avatar_url = "https://vote.48.cn/resource/img/member/zp_"
    var allData = [];//所有成员
    var curMember;//当前成员
    var payType = 0;//支付类型
    var totalPage = 0;//总页数
    var curPage = 0;//当前页面
    var pageNum = 8;//每页成员数

    //init
    data.init = function(){
        //判断当前账户是否已经授权 已授权 打开列表页投票 否 打开授权页授权
        main.checkBind(function(dt){
            if(dt.status == 200){
                if(dt.content.isVoteUser){
                    INDEX.getMemberList()
                    INDEX.refreshUserInfo();
                }else{
                    $(".s1").show();
                }
                
            }else{
                $(".s1").show();
                //main.alert(dt.message)
            }

            INDEX.addListeners()
        })
    }
    //添加事件
    data.addListeners = function(){
        //关闭浮层
        $(".btn-quit,.btn-close").click(function(){
            // if(checkFromApp()){
            //     window.web.closePopBox();
            // }else{
            //     $("section").hide();
            // }
            $("section").hide();
            window.web.closePopBox();
        })
        //风尚点赞小程序
        $(".btn-bind").click(function(){
            if(checkFromApp()){
                main.hrefTo("https://vote.48.cn/2018song/index_app.html");
                //window.web.launchWechatMiniProgram(launchParams());
                window.web.closePopBox();
            }else{
                $("section").hide();
            }
        });
        //点击投票 跳到单独投票页
        $(".memberList").on("click",".btn-like",function(){
            var id = parseInt($(this).attr("id"));
            curMember = allData[id]
            var curavatar = avatar_url+curMember.sid+".jpg"
            //跳转成员投票页
            $(".s2").hide();
            $(".s3").show();
            $(".vote-ing").show();
            $(".vote-end").hide();
            $(".m-avatar1").css({"background":"url("+curavatar+")","background-size":"100%"})
            $(".minfo-name").html(curMember.sname)
            if(curMember.tname == "预备生"){
                $(".minfo-team").attr("class","minfo-team YBS-bg")
            }else{
                $(".minfo-team").attr("class","minfo-team "+ curMember.tname+"-bg")
            }
            
        })
        //点击切换支付类型
        $(".type-box div").click(function(){
            if(!$(this).hasClass("choose")){
                $(".type-box > div").removeClass("choose");
                $(this).addClass("choose");

                if(!$(".vote-num").val() == ""){//若选择支付类型 则显示提示
                    var type = $(this).attr("type");
                    payType = $(this).attr("id");

                    INDEX.choosePayType(type)
                }
                
            }
        })

        //点赞输入 判断是否有选择类型  若有 则相应显示所需   若无 则不显示提示
        $(".vote-num").keyup(function(){
            if($(".choose-jt").hasClass("choose")){
                INDEX.showTip("jt");
            }else if($(".choose-like").hasClass("choose")){
                INDEX.showTip("like");
            }else{
                
            }
            //console.log("----"+$(".vote-num").val())
        })
        //为她点赞
        $(".btn-submit").click(function(){
            if($(".vote-num").val() == ""){//没输入点赞数量
                INDEX.showTip("请输入点赞数！");
                return false;
            }else if(!$(".type-box div").hasClass("choose"))//没选择支付类型
            {
                INDEX.showTip("请选择支付类型！");
                return false;
            }
            //若所选金额不足 则不可继续提交
            if($(".btn-buyjt").css("display") == "block" || $(".btn-buylike").css("display") == "block"){
                return false;
            }
            //提交
            main.userVote(curMember.sid,$(".vote-num").val(),payType,function(dt){
                if(dt.status == 200){
                    //提交成功后 显示结束页
                    $(".vote-ing").hide();
                    $(".vote-end").show();
                    $(".btn-back").hide();
                    $(".tips p").hide();
                    INDEX.refreshUserInfo();
                }else{
                    INDEX.showTip(dt.message);
                }
            })
            
        })
        //继续为其他小偶像点赞
        $(".btn-go-vote").click(function(){
            $(".vote-num").val("")
            $(".btn-back").show();
            $(".s3").hide();
            $(".s2").show();
        })
        //点击购买点赞权
        $(".btn-buyjt span").click(function(){
            main.hrefTo("https://vote.48.cn/2018song/index_app.html");
        })
        //点击充值
        $(".btn-buyjt span").click(function(){
            window.web.gotoPage("recharge/detail")
        })
        //返回s2
        $(".btn-back").click(function(){
            $(".s3").hide();
            $(".s2").show();
        })
        //上一页
        $(".arrow-prev").click(function(){
            INDEX.gotoPage(-1)
        })
        //下一页
        $(".arrow-next").click(function(){
            INDEX.gotoPage(1)
        })
    }
    //选择支付方式
    data.choosePayType = function(_type){
        INDEX.showTip(_type);
    }
    //提示
    data.showTip = function(_type){
        var num = parseInt($(".vote-num").val());
        $(".tips p").hide();
        if($(".vote-num").val() == ""){
            $(".tip").show().html("请输入点赞数");
            return false;
        }
        switch(_type){
            case "jt":
                var total_jt = parseInt($(".total-jt").html());

                if(num <= total_jt){//鸡腿足够
                    $(".tip").show().html("需要"+num+"鸡腿");
                }else{//鸡腿不足
                    $(".btn-buyjt").show();
                }
                break;
            case "like":
                var total_like = parseInt($(".total-like").html());
                console.log(total_like)
                if(num <= total_like){//点赞权足够
                    $(".tip").show().html("需要"+num+"点赞权");
                }else{//点赞权不足
                    $(".btn-buylike").show();
                }
                break;
            default:
                $(".tip").show().html(_type);
                break;
        }
    }

    //刷新当前用户余额
    data.refreshUserInfo = function(){
        main.refreshUserInfo(function(dt){
            $(".total-jt").html(dt.content.appInfo.appPayMoney);
            $(".total-like").html(dt.content.rsRest);
        })
    }
    //-----------------------------------------------------------------------------------------------------首页--------------------
    //加载成员列表
    data.getMemberList = function(){
        $(".s2").show();
        
        main.getMemberList(GetQueryString("num"),function(dt){
            allData = dt.content
            //allData = dt.rows
            INDEX.refreshList(allData)
            // if(dt.status == 200){
            //       INDEX.refreshList(dt.content)
            // }else{
            //     main.alert(dt.message)
            // }
            totalPage = Math.ceil(allData.length/pageNum);
            console.log("totalPage---"+totalPage)
            INDEX.gotoPage(0)
        })
    }
    //跳转页面
    data.gotoPage = function(_num){
        curPage += _num
        if(curPage <= 0){
            curPage = 0;
            $(".arrow-prev").hide()
        }else{
            $(".arrow-prev").show()
        }
        if(curPage >= totalPage-1){
            curPage = totalPage-1;
            $(".arrow-next").hide()
        }else{
            $(".arrow-next").show()
        }
        console.log("curPage---"+curPage)
        $(".memberList li").hide();
        $.each($(".memberList li"),function(index,_li){
            if(index >= curPage*pageNum && index<(curPage*pageNum+pageNum)){
                $(_li).show()
            }else{
                $(_li).hide()
            }
        })
    }
    //成员头像大小设置
    data.resize = function(){
        //列表头像
        $('.m-avatar').width(($('body').width()/10));
        $('.m-avatar').height($('.m-avatar').width());
        //内页头像
        $('.m-avatar1').width(($('body').width()/7));
        $('.m-avatar1').height($('.m-avatar1').width());
    }
    data.refreshList = function(dt){
        var html = ""
        $.each(dt,function(index,minfo){
            var _li = m_li;
            _li = _li.replace("{{avatar}}",avatar_url+minfo.sid+".jpg");
            _li = _li.replace("{{mname}}",minfo.sname);
            _li = _li.replace("{{id}}",index);
            
            html += _li
        })
        $(".memberList").html(html)
        INDEX.resize();
    }
    //----------------------------------------------------------------------------------------------通用
    
    //显示规则
    data.showRule = function(_id){
        $(".rule_comeback").attr("page",_id);//page
        $(".s5").show();
        $(".rule_box").hide()
        $(".rule_box"+_id).show()
    }

    data.getDate = function(ns) {  
        var test = new Date(parseInt(ns));  
        var $_year = test.getFullYear();  
        var $_month = parseInt(test.getMonth())+1;  
        var $_day = test.getDate();
        var $_hours = test.getHours();
        
        if(test.getMinutes()<10 ){
            var $_minutes = "0"+test.getMinutes();
        }else{
             var $_minutes = test.getMinutes();
        }
        
        if( test.getSeconds()<10 ){
            var $_seconds = "0"+ test.getSeconds();
        }else{
            var $_seconds = test.getSeconds();
        }

        return  $_year +"-"+$_month+"-"+$_day+" "+$_hours+":"+$_minutes+":"+$_seconds;  
    }
}(window.INDEX = {}));

if(isFromAndroid()){//安卓
    if(!isExitsFunction("window.web.getAccessToken")){//老版本
        $(".s1").show();
        $(".s1 p").html("请下载最新版本参与互动！")
        INDEX.addListeners();
    }else{
        INDEX.init()
    }
}else{//ios
    INDEX.init()
}


//风尚
function launchParams(eventId) {
    alert(1)
    var apppara = {
        "appAvatar":window.web.getLoginUserPic(),
        "appNickname":window.web.getLoginUserNickName(),
        "appToken":encodeURIComponent(window.web.getAccessToken())
    }
    alert(2)
    //alert(apppara.appToken)
    apppara = JSON.stringify(apppara);
    alert(apppara)
    return JSON.stringify({
        id: "gh_6c44253c9640",//原始id
        path: "pages/main/main?apppara="+apppara,
        type: 'test', //test（开发版），trial（体验版），release（正式版）  
        callback: "launchCallback"
    })
}