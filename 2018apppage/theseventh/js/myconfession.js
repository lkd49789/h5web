var conId,share_uname,share_mname,share_content;//分享参数

(function(data) {
    var page = 1;   //初始值1
    var sort = "0";    //排序 0根据祝福值排序(默认) 1根据时间排序
    var type = "myself";    //区分查看内容 myself-查看我的表白内容 index-表白墙内容
    var li_bless = '<li>'+    //祝福li
'                           <p class="names">你对<span class="mername">{{memberId}}</span>说：</p>'+
'                           <p class="text replycolor">{{content}}</p>'+
'                           <p class="icons">'+
'                               <span class="icon_msg icon_msg{{repStatus}}" conId="{{conId}}"><img src="img/icon_msg.png"></span>'+
'                               <span class="icon_like"><img src="img/icon_like.png">{{benisons}}点</span>'+
'                               <span class="icon_rank"><img src="img/icon_rank.png">{{rank}}</span>'+
'                           </p>'+
'                           <img src="img/icon_share.png" conId="{{conId1}}" class="icon_share">'+
'                       </li>'
    
    var allMembers ;//所有成员
    var prevTeam = "";
    var teamList = [];//队伍列表
    
    data.init = function(){
        INDEX.createMemberList();//所有成员
        INDEX.getWall();//获取我的表白
        INDEX.addListeners();//事件
    }
    
    data.addListeners = function(){
        //打开小程序
        $(".lists").on("click",".icon_share",function(){
            conId = $(this).attr("conid")
            // share_uname = encodeURI(encodeURI(main.getAppUserInfo().uname));
            // share_mname = encodeURI(encodeURI($(this).parent().find(".mername").html()));
            // share_content = encodeURI(encodeURI($(this).parent().find(".text").html()));
            share_uname = main.getAppUserInfo().uname;
            share_mname = $(this).parent().find(".mername").html();
            share_content = $(this).parent().find(".text").html();
            
            window.web.launchWechatMiniProgram(launchParams());
        })
        //点击开始表白
        $('.confstarbtn').click(function(){
            $('.mask,.leavmsg-box').show();
        })
        //关闭表白
        $('.closebtn').click(function(){
            $('.mask,.lookconf-box').hide();
        })
        //选择快捷表白语
        $('.likemsgbox li').click(function(){
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $('.message').val($(this).html());
        })
        //关闭回复选择框
        $('.leav_closebtn').click(function(){
            $('.mask,.leavmsg-box').hide();
        })
        //点击查看成员回复内容
        $(".lists").on('click','.icon_msg',function(){
            var conid = $(this).attr("conid");
            console.log("conid--"+conid)
            INDEX.getReply(conid)
        })
        //切换队伍
        $("#teammer").change(function(){
            INDEX.chooseTeam($(this).val());
            console.log("成员id："+$("#namemer").val())
        })
        
        //输入框文字变化 去掉快捷选择状态
        $("#message").keyup(function(){
            console.log("onchange")
            $(".likemsgbox li").removeClass("active")
        })
        //点击提交表白
        $('.completebtn').click(function(){
            if($("#message").val() == ""){
                main.alert("表白不能为空！")
                return false;
            }else{
                var mnick = INDEX.getMemberName($("#namemer").val())
                main.submitBless($("#message").val(),$("#namemer").val(),mnick,function(dt){
                    if(dt.status == 200){
                        $("#message").val("");
                        $('.mask,.leavmsg-box').hide();
                        $(".likemsgbox li").removeClass("active")
                        page = 1
                        INDEX.getWall();//
                    }else{
                        main.alert(dt.message)
                    }
                })
            }
        })
    }
    //获取表白墙数据
    data.getWall = function(){
        main.getWall(page,sort,type,function(dt){
            if(dt.status == 200){
                if(dt.content.confessionContentList.length == 0){//无新数据
                    $('.lists').html('<p class="nohave">您还未对成员表白！</p>');
                }else{
                    var html = "";
                    $.each(dt.content.confessionContentList,function(index,bless){
                        var _li = li_bless
                        _li = _li.replace("{{rank}}",INDEX.formatRank(bless.rank))
                        // _li = _li.replace("{{fansNicker}}",bless.fansNicker)
                        _li = _li.replace("{{memberId}}",INDEX.getMemberName(bless.memberId))
                        _li = _li.replace("{{content}}",bless.content)
                        _li = _li.replace("{{benisons}}",bless.benisons)
                        _li = _li.replace("{{conId}}",bless.conId)
                        _li = _li.replace("{{repStatus}}",bless.repStatus)
                        _li = _li.replace("{{conId1}}",bless.conId)
                        html += _li

                        page += 1;

                    })
                    $('.lists').html(html).css("opacity",1);
                }
                
                if(dt.content.status == 2){
                    $(".confstarbtn").attr("disabled",true).html("活动已结束");
                }
            }else{
                main.alert(dt.message)
            }
            
        })
    }
    //
    data.formatRank = function(rank){
        if(rank > 99){
            return "99+"
        }else{
            return rank
        }
    }
    //根据成员id查找成员队伍/姓名
    data.getMemberName = function(mid){
        console.log(mid)
        var minfo = JSON.parse(localStorage.getItem(mid))
        return minfo.gname + "-" +minfo.sname;
    }
    //查看告白成员回复内容
    data.getReply = function(conId){
        main.getReply(conId,function(dt){
            if(dt.status == 200){
                $(".mask, .lookconf-box").fadeIn();
                $(".conftext").html(dt.content.replyContent);
                $(".lookconf-box  .username").html(dt.content.nicker);
                $(".lookconf-box .mername").html(INDEX.getMemberName(dt.content.memberId));
            }else{
                main.alert(dt.message);
            }
        })
    }
    //成员分组
    data.createMemberList = function(){

        allMembers = JSON.parse(localStorage.getItem("allMembers"));

        var html = ""
        $.each(allMembers,function(i, member) {
            if(member.status != "44" && member.status != 44){
                var teamName;//队伍名
                if(member.tname == "预备生"){
                    teamName = member.gname+" 预备生"
                }else{
                    teamName = "TEAM "+member.tname
                }
                if(teamName != prevTeam){//切换队伍
                    teamList.push(teamName);
                    prevTeam = teamName;
                    html += '<option value="'+member.tid+'">'+teamName+'</option>';
                }
            }
        })
        console.log(teamList)
        $("#teammer").html(html)
        INDEX.chooseTeam("101")
    }
    //根据tid选择队伍
    data.chooseTeam = function(tid){
        var html = ""
        $.each(allMembers,function(i, member) {
            if(member.tid == tid){
                if(member.status != "44" && member.status != 44){
                    html += '<option value="'+member.sid+'">'+member.sname+'</option>';
                }
            }
        })
        $("#namemer").html(html)
    }
}(window.INDEX = {}));

INDEX.init();


//var appToken = window.web.getAccessToken();
//var thisurl = "https://h5.48.cn/2018apppage/theseventh/share.html"
var url = "h5.48.cn/2018apppage/theseventh/share.html"

function launchParams() {
    //var url = encodeURIComponent(thisurl)
    var para = encodeURI(encodeURI(conId+"___"+share_uname+"___"+share_mname+"___"+share_content))
    //para = "aaa___bbb___ccc___ddd"
    console.log(para)
    return JSON.stringify({
        id: "gh_dc1ce10e9cd3",
        path: "pages/h5share/h5share?htp=https&url="+url+"&para="+para,
        type: 'release',  //test（开发版），trial（体验版），release（正式版）
        callback: "launchCallback"
    })
}
