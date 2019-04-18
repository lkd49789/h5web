
(function(data) {
    var lastTime = 0;
    var dynamicId = GetQueryString("id");//官网id

    var c_li = '<li class="mui-table-view-cell mui-media">'+
'                    <span class="mui-pull-left user_avatar" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></span>'+
'                    <div class="mui-media-body">'+
'                        <p class="user_name">{{nickName}}<span>{{ctime}}</span></p>'+
'                        <p class="comm_text">{{content}}</p>'+
'                    </div>'+
'                </li>'
    //图片
    var img_span = '<li><img src="{{imgPath1}}" data-preview-src="{{imgPath}}" data-preview-group="1"/></li>';
    //加载列表
    
    data.init = function(){
        INDEX.setMemberInfo();//成员信息
        INDEX.getDynamicInfo();//获取动态详情
        INDEX.getCommentList();
        INDEX.addListeners()//添加事件
    }
    data.setMemberInfo = function(){
        $(".left_head").addClass(main.getMemberTeam()+"-bd");//队伍边框
        $(".left_head").css({"background":"url("+CONFIG.getSource()+main.getMemberInfo().memberAvatar+") no-repeat","background-position-x":"50%","background-size":"100%"})
        $(".mname").html(main.getMemberInfo().memberName);
        $(".team").addClass("team-bg-"+main.getTeam(main.getMemberInfo().teamName)).html(main.getTeam(main.getMemberInfo().teamName));
        
    }
    //添加事件
    data.addListeners = function(){
        //点赞
        // $(".btn-praise").click(function(){
        //     if($(this).find("img").attr("src") == "img/icon_like.png")
        //     {
        //         main.praise(dynamicId,function(dt){
        //             if(dt.status == 200){
        //                 $(".btn-praise").find("img").attr("src","img/icon_zan.png");
        //             }else{
        //                 main.alert(dt.message)
        //             }
        //         })
        //     }
        // })
        //分享
        // $(".btn-share").click(function(){
        //     $(".msk").fadeIn();
        // })
        //浮层
        // $(".msk").click(function(){
        //     $(".msk").hide();
        // })
        //发表评论
        $(".btn-comment").click(function(){
            if(main.checkLogin()){
                if($(".comment").val() == ""){
                    main.alert("请输入内容！")
                    console.log("请输入内容！")
                    return false;
                }
                main.reply(dynamicId,$(".comment").val(),function(dt){
                    if(dt.status == 200){
                        //清空数据
                        lastTime = 0;
                        $(".lists").html("");
                        INDEX.getCommentList();//重新加载
                        $(".comment").val("");//清空输入框
                    }else if(dt.statu == 401){//登录过期 重新登录
                        main.hrefTo("login.html");
                    }else{
                        main.alert(dt.message)
                    }
                })
            }else{
                LOGINPOP.show("dynamic");
            }
        })
        //链接跳转
        $(".texts").on("click",".btn-link",function(){
            var url = $(this).attr("href");
            main.hrefTo(url);
        })

        //返回
        
        $(".btn-back").click(function(){
            window.history.back()
        })

        shareLink = "https://h5.48.cn/2017appshare/dynamic/index.html?id="+dynamicId;
        shareTitlestr = main.getMemberInfo().memberName+"的动态";
        shareDesc = main.getMemberInfo().memberName+"的动态分享";
        thumbLink = CONFIG.getSource()+main.getMemberInfo().memberAvatar;
        wxshare();
    }
    //获取当前动态详情  图片列表
    data.getDynamicInfo = function(){
        main.getDynamicInfo(dynamicId,function(dt){
            if(dt.status == 200){
                $(".texts").html(main.replaceToUrl(dt.content.data.content));
                $(".time").html(formatDate(dt.content.data.ctime))
                $(".praise").html(dt.content.data.praise);
                $(".comment").html(dt.content.data.comment);
                $(".share").html(dt.content.data.share);
                if(dt.content.data.picture){
                    var html = '';
                    $.each(dt.content.data.picture, function(i,img){
                        console.log(i)
                        var img_li = img_span;
                        img_li = img_li.replace("{{avata}}",CONFIG.getSource()+img.filePath);
                        img_li = img_li.replace("{{imgPath}}",CONFIG.getSource()+img.filePath);
                        img_li = img_li.replace("{{imgPath1}}",CONFIG.getSource()+"/resize_150x150"+img.filePath);
                        img_li = img_li.replace("{{oindex}}","1");
                        html += img_li;
                    })
                    $(".imgs").show().html(html);
                    INDEX.resize();
                }
            }

            //$(".btn-praise").find("img").attr("src",INDEX.checkZan(dt.content.praise))
        })
    }
   //获取所有评论
   data.getCommentList = function(){
        main.getCommentList(dynamicId,lastTime,function(dt){
            if(dt.status == 200){
                if(dt.content.data){
                    var html = '';
                    $.each(dt.content.data, function(i,info){
                        var img_li = c_li;
                        img_li = img_li.replace("{{avata}}",main.formatAvata(info.avatar));
                        img_li = img_li.replace("{{nickName}}",info.nickName);
                        img_li = img_li.replace("{{ctime}}",formatDate(info.ctime));
                        img_li = img_li.replace("{{content}}",info.content);
                        html += img_li;
                        lastTime = info.ctime
                    })
                    $(".lists").append(html);
                }

                if(dt.content.data.length == 0){
                    flag = true;
                }
            }
        })
    }
    //点赞
    // data.setZanInfo = function(_dyid){
    //     var zanInfo = localStorage.getItem("ZAN_"+dynamicId);
    //     if(_dyid == ""){
    //     }else{
    //         zanInfo += _dyid +"_";
    //         localStorage.setItem("ZAN_"+dynamicId,zanInfo);
    //         console.log("zanInfo>"+zanInfo)
    //     }
    // }
    //是否已点赞
    // data.checkZan = function(_praise){
    //     if(_praise){
    //         return "img/icon_zan.png";
    //     }else{
    //          return "img/icon_like.png";
    //     }
    // }
    //resize
    data.resize = function(){
        $('.top_content').height($('.top_content').width()/2.08);
        if($('.imgs li').length<3){
            $('.imgs li').css({'width':'48%'});
        }else{
            $('.imgs li').css({'width':'31%'});
        }
        $('.imgs li').height($('.imgs li').width());
    }
}(window.INDEX = {}));

INDEX.init();
mui.init();
mui.previewImage();


//上拉加载
var flag = false;

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
                            INDEX.getCommentList();
                            self.endPullUpToRefresh(flag);
                        }, 1000);
                    }
                }
            });
        })
    });
})(mui);

window.addEventListener('touchmove',function(e){e.preventDefault();});