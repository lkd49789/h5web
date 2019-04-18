
(function(data) {
    var nextId_post = 0;//帖子索引
    var nextId_gallery = 0;//图片索引
    var nextId_video = 0;//视频索引
    var nextId_live = 0;//直播索引
    var uid = GetQueryString("id");//用户id
    
    var from = GetQueryString("from");//来自小程序
    if(from != "wxapp"){
        from = ""
    }
    var pocketid ;     //口袋id
    //帖子
    var li_tiezi = '<li class="olis">'+
'                    <div class="limsg">'+
'                        <span class="lihead_box"><em class="lihead" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></em></span>'+
'                        <div class="liinfo_box">'+
'                            <p>{{uname}}<img src="{{icon-team}}"></p>'+
'                            <p>{{ctime}}</p>'+
'                       </div>'+
'                    </div>'+
'                    <div class="texts" postId="{{postId}}">{{content}}</div>'+
'                    {{previewInfo}}'+
'                    <div class="icons_tab">'+
'                        <div class="fans">'+
'                            <ul>{{viewersavatar}}</ul>'+
'                            <span>{{replycount}}</span>'+
'                        </div>'+
'                        <div class="icons">'+
'                            <span><img src="images/like_gift.png">礼物</span>'+
'                            <span><img src="images/like_icon.png">{{likeCount}}</span>'+
'                            <span><img src="images/like_comment.png">{{commentCount}}</span>'+
'                        </div>'+
'                    </div>'+
//'                    <div class="comment">'+
//'                        <ul>{{comment}}</ul>'+
//'                        <p>查看全部122条评论></p>'+
//'                    </div>'+
'                </li>'
    //视频盒子
    var box_video = '<div class="media-box">'+
'                        <video src="{{vpath}}" poster="{{vcover}}" width="100%" height="240" controls="controls"></video>'+
'                    </div>'
    //音频盒子
    var box_radio = '<div class="media-box">'+
'                        <div class="cover">'+
'                            <img src="images/music-thumb.jpg">'+
'                        </div>'+
'                        <audio src="{{rpath}}" width="100%" height="240" controls="controls"></audio>'+
'                    </div>'
    //直播回放
    var li_playback = '<li liveId="{{liveId}}" liveType="{{liveType}}">'+
'                        <div class="avatar-wrapper">'+
'                            <img src="{{picPath}}">'+
'                        </div>'+
'                        <p class="programme">{{title}}</p>'+
'                    </li>'
    //档案
    var li_history = '<li>'+
'                            <img src="images/adult_Timenode@2x.png" class="yuan"/>'+
'                            <div>'+
'                                <p class="time">{{ctime}}</p>'+
'                                <p>{{content}}</p>'+
'                            </div>'+
'                        </li>'
    //图片
    var img_span = '<li><img class="img-info" src="{{filePath}}" data-preview-src="{{filePath1}}" data-preview-group="{{oindex}}"/></li>';
    var viewer_li = '<li><img src="{{avatar}}"></li>'
    //加载列表
    
    data.init = function(){
        main.getUserInfo(uid,function(dt){
            $(".menu").show()
            if(!dt.baseUserInfo.isStar){//粉丝
                $(".page-playback,.page-info").hide();
                $(".menu li").css("width","32%");
            }
            INDEX.getList();//获取成员动态列表
            INDEX.addListeners()//添加事件
            INDEX.setMemberInfo(dt);//用户信息
            
        })
        //INDEX.setUserInfo();
    }
    
    //用户登录后 显示用户头像
    data.setUserInfo = function(){
        var u_info = JSON.parse(localStorage.getItem("POCKET48_USER_INFO"));
        if(u_info == null || u_info == undefined){
            $(".signbtn").show();
            $(".user_avatar").hide();
        }else{//已登录
            $(".user_avatar").css({"background":"url("+CONFIG.getSource()+u_info.content.userInfo.avatar+") no-repeat","background-position-x":"50%","background-size":"100%"})
            $(".signbtn").hide();
        }
    }
    data.setMemberInfo = function(dt){
        if(dt.baseUserInfo.bgImg != ""){//有自定义背景图
            $(".member-bg").attr("src",main.formatCover(dt.baseUserInfo.bgImg))
        }
        //头像
        $(".left_head").css({"background":"url("+main.formatAvata(dt.baseUserInfo.avatar)+") no-repeat","background-position-x":"50%","background-size":"100%"})
        //成员队伍标签
        if(dt.baseUserInfo.teamLogo != ""){
            $(".teamLogo").attr("src",main.formatCover(dt.baseUserInfo.teamLogo))
        }
        //昵称
        $(".mname,.mname2").html(dt.baseUserInfo.nickname);

        //粉丝数
        $(".mui-ellipsis").html("粉丝 "+dt.baseUserInfo.followers);
        
        //分享
        //main.setShareInfo(main.getMemberInfo().memberName,mid,main.formathttp(main.getMemberInfo().memberAvatar)+main.getMemberInfo().memberAvatar)
    }
    //添加事件
    data.addListeners = function(){
        //帖子
        $(".page-list").click(function(){
            //main.hrefTo("album.html");
            $("body > div").hide()
            $(".post-wrapper").show();//图片
        })
        //相册
        $(".page-gallery").click(function(){
            //main.hrefTo("album.html");
            $("body > div").hide()
            $(".gallery-wrapper").show();//图片
            console.log("---------"+$(".lists2 li").length)
            if($(".lists2 li").length == 0){
                INDEX.loadAlbum();
            }
            INDEX.resizeGallery()
        })
        //回放
        $(".page-playback").click(function(){
            $("body > div").hide()
            $(".live-wrapper").show();
            console.log("---------"+$(".lists4 li").length)
            if($(".lists4 li").length == 0){
                INDEX.getPlayBackList();
            }
        })
        //视频
        $(".page-video").click(function(){
            $("body > div").hide()
            $(".video-wrapper").show();
            console.log("---------"+$(".lists3 li").length)
            if($(".lists3 li").length == 0){
                INDEX.getVideoList();
            }
        })
        //档案
        $(".page-info").click(function(){
            $("body > div").hide()
            $(".info-wrapper").show();
            if($(".chronicle li").length == 0){
                INDEX.getInfoList();
            }
        })
        
        //点赞
        $(".lists1").on("click",".icons",function(){
            downLoadPocketApp()
        })
        //动态详情页
        $(".lists1").on("click",".texts",function(){
            var id = $(this).attr("postid")
            console.log(id)
            main.hrefTo("../dynamic/?id="+id);
        })
        //回放
        $(".lists4").on("click","li",function(){
            var id = $(this).attr("liveId")
            var type = $(this).attr("liveType")
            main.hrefTo("../memberLiveShare/?id="+id);//视频
            // if(type == "video"){
            //     main.hrefTo("../memberLiveShare/?id="+id);//视频
            // }else{
            //     main.hrefTo("../radio/?id="+id);//电台
            // }
            console.log(id)
            
        })
        //底部更多
        $(".comment-more").click(function(){
            downLoadPocketApp()
        })
        //底部菜单
        $(".menu-bottom").click(function(){
            downLoadPocketApp()
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
        main.getDynamic(uid,nextId_post,function(dt){
            if(dt.status == 200){
                var html = '';
                $.each(dt.content.postsInfo,function(index,info){
                    var _li = li_tiezi;
                    _li = _li.replace("{{avata}}",main.formatAvata(main.getMemberInfo().avatar));
                    _li = _li.replace("{{icon-team}}",main.formatAvata(main.getMemberInfo().teamLogo));
                    _li = _li.replace("{{uname}}",main.getMemberInfo().nickname);
                    _li = _li.replace("{{ctime}}",formatDate(info.postsInfo.createAt));
                    _li = _li.replace("{{content}}",main.fotmatTxt(info.postsInfo.previewText));
                    _li = _li.replace("{{postId}}",info.postsInfo.postId);
                    if(info.postsInfo.viewCount == 0){
                        _li = _li.replace("{{replycount}}",'');
                    }else{
                        _li = _li.replace("{{replycount}}",info.postsInfo.viewCount+"看过");
                    }
                    
                    _li = _li.replace("{{likeCount}}",info.postsInfo.likeCount);
                    _li = _li.replace("{{commentCount}}",info.postsInfo.commentCount);
                    //文本  图文
                    if(info.postsInfo.postSource == 0 || info.postsInfo.postSource == 1){

                        //预览图
                        var html_img = "<ol class='imgs'>";
                        if(info.postsInfo.previewImg){
                            $.each(info.postsInfo.previewImg, function(i,img){
                                var img_li = img_span;
                                img_li = img_li.replace("{{filePath}}",main.formathttp(img.imgUrl)+"/resize_150x150"+img.imgUrl);
                                img_li = img_li.replace("{{filePath1}}",main.formathttp(img.imgUrl)+img.imgUrl);
                                img_li = img_li.replace("{{oindex}}",index);
                                html_img += img_li
                            })
                            html_img += '</ol>'
                        }
                        _li = _li.replace("{{previewInfo}}",html_img);
                    }else if(info.postsInfo.postSource == 2){
                        var previewInfo = box_video;
                        previewInfo = previewInfo.replace("{{vpath}}",main.getGSVideo()+info.postsInfo.audioInfo.audioUrl);
                        previewInfo = previewInfo.replace("{{vcover}}",main.getSource()+info.postsInfo.audioInfo.videoImg);
                        _li = _li.replace("{{previewInfo}}",previewInfo);
                    }else if(info.postsInfo.postSource == 3){
                        var previewInfo = box_radio;
                        previewInfo = previewInfo.replace("{{vpath}}",main.getGSVideo()+info.postsInfo.audioInfo.audioUrl);
                        //previewInfo = previewInfo.replace("{{vcover}}",main.getSource()+info.postsInfo.audioInfo.videoImg);
                        _li = _li.replace("{{previewInfo}}",previewInfo);
                    }
                    //预览人信息
                    var viewer_img = "";
                    if(info.viewers){
                        $.each(info.viewers, function(i,img){
                            var img_li = viewer_li;
                            img_li = img_li.replace("{{avatar}}",main.formathttp(img.avatar)+"/resize_50x50"+img.avatar);
                            viewer_img += img_li
                        })
                    }
                    _li = _li.replace("{{viewersavatar}}",viewer_img);

                    html += _li;

                    
                })
               
                //数据已没有
                if(dt.content.postsInfo.length < 10){
                    flag1 = true;
                }
                $(".lists1").append(html);
                //数据已没有
                if(nextId_post == 0 && dt.content.postsInfo.length == 0){
                    $(".lists1").html('<img class="img-empty" src="../../common/images/tip.png">');
                }

                nextId_post = dt.content.nextId;//记录最新时间戳
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
    
    //resize
    data.resize = function(){
        //$('.top_content').height($('.top_content').width()/2.08);
        $.each($(".imgs"),function(index,ol){
            if($(this).find("li").length < 3 || $(this).find("li").length == 4){
                $(this).find("li").css({'width':'48%'});
            }else{
                $(this).find("li").css({'width':'31%'});
            }
            $(this).find("li").height($(this).find("li").width());
        })
        
    }
    data.resizeGallery = function(){
        console.log("resizeGallery")
        $('.lists2 li').height($('.lists2 li').width());
    }
    //加载图片
    data.loadAlbum = function(){
        main.getAlbum(uid,nextId_gallery,function(dt){
             if(dt.status == 200){
                $.each(dt.content.list,function(i,items){
                    /*console.log(iitems.filePath);*/
                    var html = [];
                    html.push('<li>');
                    html.push('<span></span><img src="'+CONFIG.getSource()+"/resize_150x150"+items.imgUrl+'" data-preview-src="'+CONFIG.getSource()+items.imgUrl+'" data-preview-group="1" />');
                    html.push('</li>');
                    $('.lists2').append(html.join(""));
                })
                
                INDEX.resizeGallery()
                //数据已没有
                if(nextId_gallery == 0 && dt.content.list.length == 0){
                    $(".lists2").html('<img class="img-empty" src="../../common/images/tip.png">');
                }
                nextId_gallery = dt.content.next;
                //数据已没有
                if(dt.content.list.length < 10){
                    flag2 = true;
                }
                setTimeout(function(){
                    INDEX.resizeGallery()

                },1000)
            }else{

                main.alert(dt.message);

            }
        })
    }
    //加载视频
    data.getVideoList = function(){
        main.getVideoList(uid,nextId_video,function(dt){
            if(dt.status == 200){
                var html = '';
                $.each(dt.content.postsInfo,function(index,info){
                    var _li = li_tiezi;
                    _li = _li.replace("{{avata}}",main.formatAvata(main.getMemberInfo().avatar));
                    _li = _li.replace("{{icon-team}}",main.formatAvata(main.getMemberInfo().teamLogo));
                    _li = _li.replace("{{uname}}",main.getMemberInfo().nickname);
                    _li = _li.replace("{{ctime}}",formatDate(info.postsInfo.createAt));
                    _li = _li.replace("{{content}}",main.fotmatTxt(info.postsInfo.previewText));
                    _li = _li.replace("{{postId}}",info.postsInfo.postId);
                    if(info.postsInfo.viewCount == 0){
                        _li = _li.replace("{{replycount}}",'');
                    }else{
                        _li = _li.replace("{{replycount}}",info.postsInfo.viewCount+"看过");
                    }
                    
                    _li = _li.replace("{{likeCount}}",info.postsInfo.likeCount);
                    _li = _li.replace("{{commentCount}}",info.postsInfo.commentCount);
                    //文本  图文
                    if(info.postsInfo.postSource == 0 || info.postsInfo.postSource == 1){

                        //预览图
                        var html_img = "<ol class='imgs'>";
                        if(info.postsInfo.previewImg){
                            $.each(info.postsInfo.previewImg, function(i,img){
                                var img_li = img_span;
                                img_li = img_li.replace("{{filePath}}",main.formathttp(img.imgUrl)+"/resize_150x150"+img.imgUrl);
                                img_li = img_li.replace("{{filePath1}}",main.formathttp(img.imgUrl)+img.imgUrl);
                                img_li = img_li.replace("{{oindex}}",index);
                                html_img += img_li
                            })
                            html_img += '</ol>'
                        }
                        _li = _li.replace("{{previewInfo}}",html_img);
                    }else if(info.postsInfo.postSource == 2){
                        var previewInfo = box_video;
                        previewInfo = previewInfo.replace("{{vpath}}",main.getGSVideo()+info.postsInfo.audioInfo.audioUrl);
                        previewInfo = previewInfo.replace("{{vcover}}",main.getSource()+info.postsInfo.audioInfo.videoImg);
                        _li = _li.replace("{{previewInfo}}",previewInfo);
                    }else if(info.postsInfo.postSource == 3){
                        var previewInfo = box_radio;
                        previewInfo = previewInfo.replace("{{vpath}}",main.getGSVideo()+info.postsInfo.audioInfo.audioUrl);
                        //previewInfo = previewInfo.replace("{{vcover}}",main.getSource()+info.postsInfo.audioInfo.videoImg);
                        _li = _li.replace("{{previewInfo}}",previewInfo);
                    }
                    //预览人信息
                    var viewer_img = "";
                    if(info.viewers){
                        $.each(info.viewers, function(i,img){
                            var img_li = viewer_li;
                            img_li = img_li.replace("{{avatar}}",main.formathttp(img.avatar)+"/resize_50x50"+img.avatar);
                            viewer_img += img_li
                        })
                    }
                    _li = _li.replace("{{viewersavatar}}",viewer_img);

                    html += _li;

                    
                })
                
                //数据已没有
                if(dt.content.postsInfo.length < 10){
                    flag3 = true;
                }
                //数据已没有
                if(nextId_video == 0 && dt.content.postsInfo.length == 0){
                    $(".lists3").html('<img class="img-empty" src="../../common/images/tip.png">');
                }
                nextId_video = dt.content.nextId;//记录最新时间戳

                $(".lists3").append(html);
                
            }else{
                main.alert(dt.message)
            }
        })
    }
    //加载回放
    data.getPlayBackList = function(){
        main.getPlayBackList(uid,nextId_live,function(dt){
            if(dt.status == 200){
                var html = '';
                $.each(dt.content.liveList,function(index,info){
                    var _li = li_playback;
                    _li = _li.replace("{{liveId}}",info.liveId);//直播id
                    _li = _li.replace("{{liveType}}",INDEX.checkType(info.liveType));//直播类型  视频1  电台2
                    
                    _li = _li.replace("{{picPath}}",main.formatCover(info.coverPath));//封面
                    _li = _li.replace("{{title}}",info.title);   //title
                    html += _li;
                    //console.log(index)
                })
                
                //数据已没有
                if(dt.content.liveList.length < 10){
                    flag4 = true;
                }
                //数据已没有
                if(nextId_live == 0 && dt.content.liveList.length == 0){
                    $(".lists4").html('<img class="img-empty" src="../../common/images/tip.png">');
                }
                
                nextId_live = dt.content.next;//记录最新时间戳

                $(".lists4").append(html);
                
                $(".avatar-wrapper").css("height",$(".avatar-wrapper").width())
                
            }else{
                main.alert(dt.message)
            }
        })
    }
    //加载档案
    data.getInfoList = function(){
        main.getInfoList(uid,function(dt){
            if(dt.status == 200){
                $(".info-name").html(dt.content.starInfo.starName)
                $(".info-nick").html(dt.content.starInfo.nickname)
                $(".info-team").html(dt.content.starInfo.starTeamName)
                $(".info-join").html(dt.content.starInfo.joinTime)
                //
                var html = '';
                $.each(dt.content.history,function(i,_history){
                    var _li = li_history;
                    _li = _li.replace('{{ctime}}',_history.ctime)
                    _li = _li.replace('{{content}}',_history.content)
                    html += _li
                })
                $(".chronicle ul").html(html)
            }else{
                main.alert(dt.message)
            }
        })
    }
    //checkType
    data.checkType = function(type){
        if(type == 1){
            return "video";
        }else{
            return "audio";
        }
    }
}(window.INDEX = {}));

INDEX.init();

mui.previewImage();

//上拉加载
var flag1 = false;
var flag2 = false;
var flag3 = false;
var flag4 = false;

//mui.init();
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
                        console.log("pull>>>"+index)
                        var self = this;
                        setTimeout(function() {
                            if(index == 0){//帖子
                                //INDEX.getList();
                                self.endPullUpToRefresh(flag1);
                            }else if(index == 1){//相册
                                //INDEX.loadAlbum();
                                self.endPullUpToRefresh(flag2);
                            }else if(index == 2){//视频
                                //INDEX.getVideoList();
                                self.endPullUpToRefresh(flag3);
                            }else if(index == 3){//直播
                                //INDEX.getVideoList();
                                self.endPullUpToRefresh(flag4);
                            }
                            
                        }, 1000);
                    }
                }
            });
        })
    });
})(mui);

window.addEventListener('touchmove',function(e){e.preventDefault();});