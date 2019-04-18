
(function(data) {
    var lastTime = 0;
    var uid = 0;//用户id
    var mid = GetQueryString("mid");//官网id
    var pocketid ;     //口袋id

    var dy_li = '<li class="olis" dynamicId="{{dynamicId}}">'+
    '                    <img src="img/icon_rabbit.png" class="rabbit m{{mid}}">'+
    '                    <div class="limsg">'+
    '                        <span class="lihead_box"><em class="lihead" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></em><span class="mname">{{mname}}</span></span>'+
    '                        <span class="litime">{{ctime}}</span>'+
    '                    </div>'+
    '                    <div class="texts">{{content}}</div>'+
    '                    <ol class="imgs">{{images}}</ol>'+
    '                    <div class="icons_tab">'+
    '                        <span class="btn-praise"><img src="img/m_{{dynamicId2}}.png"><em>{{praise}}</em></span>'+
    '                        <span class="btn-comment" dynamicId="{{dynamicId1}}"><img src="img/m_say.png">{{comment}}</span>'+
    // '                        <span class="btn-quote"><img src="img/icon_turn.png">{{quote}}</span>'+
    '                        <span class="btn-share"><img src="img/m_share.png">{{share}}</span>'+
    '                    </div>'+
    '                </li>'
    //图片
    var img_span = '<li ><img class="img-info" src="{{filePath}}" data-preview-src="{{filePath1}}" data-preview-group="{{oindex}}"/></li>';
    //加载列表
    
    data.init = function(){
        //获取对应id
        main.getJsonId(mid,function(dt){
            
            INDEX.getList();//获取成员动态列表
            INDEX.addListeners()//添加事件
            INDEX.setMemberInfo();//成员信息
        })
        INDEX.setUserInfo();
    }
    //用户登录后 显示用户头像
    data.setUserInfo = function(){
        var u_info = JSON.parse(localStorage.getItem("POCKET48_USER_INFO"));
        if(u_info == null || u_info == undefined){
            $(".user_avatar").hide();
            $(".signbtn").show();
        }else{//已登录
            $(".user_avatar").show().css({"background":"url("+CONFIG.getSource()+u_info.content.userInfo.avatar+") no-repeat","background-position-x":"50%","background-size":"100%"})
            $(".signbtn").hide();
        }
    }
    data.setMemberInfo = function(){
       /* $(".member-bg").attr("src",CONFIG.getSource()+main.getMemberInfo().memberAvatar)*/
        $(".left_head").css({"background":"url("+CONFIG.getSource()+main.getMemberInfo().memberAvatar+") no-repeat","background-position-x":"50%","background-size":"100%"})
        $(".mname").html(main.getMemberInfo().memberName);
        $(".mui-ellipsis").html(main.getMemberInfo().groupName+" "+main.getMemberInfo().teamName);
        
        //分享
        main.setShareInfo(main.getMemberInfo().memberName,mid,CONFIG.getSource()+main.getMemberInfo().memberAvatar)
    }
    //添加事件
    data.addListeners = function(){
        //直播
        $(".btn-tv").click(function(){
            main.hrefTo("live.html");
        })
        //相册
        $(".btn-album").click(function(){
            main.hrefTo("album.html");
        })
        //应援墙
        $(".btn-port").click(function(){
            main.hrefTo("support.html");
        })
        //点赞
        $(".lists").on("click",".btn-praise",function(){
            var id = $(this).parent().parent().attr("dynamicId")
            // main.hrefTo("dynamic.html?id="+id);
            var _this = $(this);
            if(_this.find("img").attr("src") == "img/m_like.png")
            {
                // var cur_praise = parseInt($(this).find("em").html());
                // cur_praise = cur_praise+= 1;
                // $(this).find("em").html(cur_praise);
                // $(this).find("img").attr("src","img/icon_zan.png");
                // INDEX.setZanInfo(id);

                main.praise(id,function(dt){
                    if(dt.status == 200){
                        _this.find("img").attr("src","img/m_zan.png");
                    }else if(dt.statu == 401){//登录过期 重新登录
                        main.hrefTo("login.html");
                    }else{
                        main.alert(dt.message)
                    }
                })
            }
        })
        //动态详情页
        $(".lists").on("click",".btn-comment",function(){
            var id = $(this).attr("dynamicId")
            main.hrefTo("dynamic.html?id="+id);
        })
        //链接跳转
        $(".lists").on("click",".btn-link",function(){
            var url = $(this).attr("href");
            main.hrefTo(url);
        })
        //分享
        $(".lists").on("click",".btn-share",function(){
            $(".msk").fadeIn();
        })
        
        //档案
        $(".archives").click(function(){
            main.hrefTo("archives.html?id="+mid);
        })
        //风尚大赏 入口
        $(".icon-fashion").click(function(){
            main.hrefTo("https://vote.48.cn/wx_star/?member_id="+mid);
        })
        //浮层
        $(".msk").click(function(){
            $(".msk").hide();
        })

        //登录
        $(".signbtn").click(function(){
            main.hrefTo("login.html");
        })
    }
    //获取成员粉丝数量和聚聚房间信息
    data.getMemberFansAndRoom = function(){
        main.getMemberFansAndRoom(mid,function(dt){
            if(dt.status == 200){
                var member_info = "粉丝"+dt.content.fansNum+"|";
                if(dt.content.roomInfo){
                    member_info += "聚聚房间/"+dt.content.roomInfo.roomId;
                }else{
                    member_info += "聚聚房间/未创建";
                }
                $(".mui-ellipsis").html(member_info)
            }else{
                main.alert(dt.message)
            }
        })
    }
    //加载信息
    data.getList = function(){
        main.getDynamic(uid,lastTime,function(dt){
            if(dt.status == 200){
                var html = '';
                $.each(dt.content.data,function(index,info){
                    var _li = dy_li;
                    _li = _li.replace("{{mname}}",main.getMemberInfo().memberName);
                    _li = _li.replace("{{avata}}",CONFIG.getSource()+main.getMemberInfo().memberAvatar);
                    _li = _li.replace("{{ctime}}",formatDate(info.ctime));
                    _li = _li.replace("{{dynamicId}}",info.dynamicId);
                    _li = _li.replace("{{dynamicId1}}",info.dynamicId);
                    _li = _li.replace("{{dynamicId2}}",INDEX.checkZan(dt.content.praise[info.dynamicId]));
                    _li = _li.replace("{{content}}",main.replaceToUrl(info.content));
                    _li = _li.replace("{{praise}}",info.praise);
                    _li = _li.replace("{{comment}}",info.comment);
                    _li = _li.replace("{{quote}}",info.quote);
                    _li = _li.replace("{{share}}",info.share);

                    var html_img = "";
                    if(info.picture){
                        $.each(info.picture, function(i,img){

                            var img_li = img_span;
                            img_li = img_li.replace("{{filePath}}",CONFIG.getSource()+"/resize_150x150"+img.filePath);
                            img_li = img_li.replace("{{filePath1}}",CONFIG.getSource()+img.filePath);
                            img_li = img_li.replace("{{oindex}}",index);
                            html_img += img_li
                        })
                    }
                    _li = _li.replace("{{images}}",html_img);
                    html += _li;

                    lastTime = info.ctime;//记录最新时间戳
                })
                //数据已没有
                if(dt.content.data.length == 0){
                    flag = true;
                }
                $(".lists").append(html);
                // $('.imgs li').height($('.imgs li').width());
                INDEX.resize();
                // setTimeout(function(){
                //     INDEX.resize();
                // },500)
                setInterval(function(){
                    //INDEX.resize();
                },2000)
                
            }else{
                main.alert(dt.message)
            }
        })
    }
    //点赞
    data.setZanInfo = function(_dyid){
        var zanInfo = localStorage.getItem("ZAN_"+mid);
        if(_dyid == ""){
        }else{
            zanInfo += _dyid +"_";
            localStorage.setItem("ZAN_"+mid,zanInfo);
            console.log("zanInfo>"+zanInfo)
        }
    }
    //是否已点赞
    data.checkZan = function(_praise){
        // var zanInfo = localStorage.getItem("ZAN_"+mid);
        // if(zanInfo != undefined){
        //     if(zanInfo.indexOf(_dyid) >=0){
        //         return "zan";
        //     }else{
        //         return "like";
        //     }
        // }else{
        //      return "like";
        // }
        if(_praise){
            return "zan";
        }else{
            return "like";
        }
    }
    //resize
    data.resize = function(){
        $('.top_content').height($('.top_content').width()/2.08);
        $.each($(".imgs"),function(index,ol){
            if($(this).find("li").length<3){
                $(this).find("li").css({'width':'48%'});
            }else{
                $(this).find("li").css({'width':'31%'});
            }
            $(this).find("li").height($(this).find("li").width());
        })
        //所有图片  适配居中
        $.each($(".img-info"),function(i,_img){
            var li_w = $(this).parent().width();
            var w = $(this).width();
            var h = $(this).height();
            var scale = w/h;
            if(li_w < h){
                $(this).css({"height":li_w+"px","width":li_w*scale+"px"});
            }else{
                //$(this).css({"margin-top":(li_w-h)/2+"px"});
            }
        })
    }
}(window.INDEX = {}));

INDEX.init();

mui.previewImage();

//上拉加载
var flag = false;
mui.init();
(function($) {
    //阻尼系数
    var deceleration = mui.os.ios?0.003:0.0009;
    $('.mui-scroll-wrapper').scroll({
        bounce: false,
        indicators: true, //是否显示滚动条
        deceleration:deceleration
    });
    $.ready(function() {
        //循环初始化所有下拉刷新，上拉加载。
        $.each(document.querySelectorAll('.mui-scroll'), function(index, pullRefreshEl) {
            $(pullRefreshEl).pullToRefresh({
                up: {
                    callback: function() {
                        var self = this;
                        setTimeout(function() {
                            INDEX.getList();
                            self.endPullUpToRefresh(flag);
                        }, 1000);
                    }
                }
            });
        })
    });
})(mui);

window.addEventListener('touchmove',function(e){e.preventDefault();});