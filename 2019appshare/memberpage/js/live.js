(function(data) {
    var lastTime = 0;
    var from = GetQueryString("from");//来自小程序
    if(from != "wxapp"){
        from = ""
    }
    var dy_li = '<li liveId="{{liveId}}" lrc={{lrcPath}}>'+
'                        <div class="icon-left"><span class="icon-type"><img src="img/live-{{liveType}}.png"></span><span class="time">{{startTime}}</span></div>'+
'                        <span class="icon"><em></em>{{islive}}</span>'+
'                        <div class="avatar-wrapper">'+
'                            <img src="{{picPath}}">'+
'                            <div class="shadow">'+
'                                <img src="img/shadow.png" class="shadowimg">'+
'                                <p class="programme"><span>{{subTitle}}</span></p>'+
'                            </div>'+
'                        </div>'+
'                        <div class="m-info">'+
'                            <span>{{mname}}<em class="team-bg-{{tname}}">{{tname1}}</em></span>'+
'                            <img src="img/icon_share2.png" title="{{title}}" subtitle="{{subTitle2}}" class="share-btn">'+
'                        </div>'+
'                    </li>'


    //加载列表
    data.init = function(){
        INDEX.getList();
        INDEX.addListeners();
    }
    //添加事件
    data.addListeners = function(){
        
        //跳转视频页
        $(".lists").on("click",".avatar-wrapper",function(){

            var id = $(this).parent().attr("liveid");
            var lrcPath = $(this).parent().attr("lrc");
            console.log(id)
            main.hrefTo("liveplayer.html?id="+id+"&lrc="+lrcPath+"&from="+from);
        })
        //返回
        $(".btn-back").click(function(){
            window.history.back()
        })
        //分享
        $(".lists").on("click",".share-btn",function(){

            $(".msk").show();

            var id = $(this).parent().parent().attr("liveid");
            var title = $(this).attr("title");
            var subTitle = $(this).attr("subtitle");
            var type = $(this).attr("type");
            // if(type == 1){//视频
            //     shareLink = "https://h5.48.cn/2017appshare/memberLiveShare/index.html?id="+id;
            // }else{//电台
            //     shareLink = "https://h5.48.cn/2017appshare/memberLiveShare/index.html?id="+id;
            // }
            shareLink = "https://h5.48.cn/2017appshare/memberLiveShare/index.html?id="+id;
            shareTitlestr = title;
            shareDesc = subTitle;
            thumbLink = CONFIG.getSource()+main.getMemberInfo().memberAvatar;
            wxshare();
        })
        $(".msk").click(function(){
            $(this).hide();
        })
    }
    
    //加载信息
    data.getList = function(){
        main.getLiveInfo(nextId,function(dt){
            if(dt.status == 200){
                var html = '';
                //直播中 匹配当前成员是否有直播
                if(dt.content.liveList){
                    $.each(dt.content.liveList,function(index,info){
                        if(info.memberId == main.getMemberInfo().memberId){
                            var _li = dy_li;
                            _li = _li.replace("{{liveId}}",info.liveId);//直播id

                            _li = _li.replace("{{liveType}}",INDEX.checkType(info.liveType));//直播类型  视频1  电台2
                            _li = _li.replace("{{startTime}}",INDEX.formatFansMsgTime(info.startTime));//直播时间
                            _li = _li.replace("{{islive}}","直播中");   //直播状态
                            _li = _li.replace("{{picPath}}",INDEX.formatCover(info.picPath));//封面
                            _li = _li.replace("{{title}}",info.title);   //title
                            _li = _li.replace("{{subTitle}}",info.subTitle);   //subTitle
                            _li = _li.replace("{{subTitle2}}",info.subTitle);   //subTitle
                            _li = _li.replace("{{mname}}",main.getMemberInfo().memberName);       //成员姓名
                            _li = _li.replace("{{tname}}",INDEX.getTeam(main.getMemberInfo().teamName));       //成员所属队伍名
                            _li = _li.replace("{{tname1}}",INDEX.getTeam(main.getMemberInfo().teamName));      //成员所属队伍名
                            html += _li;
                            //lastTime = info.startTime;//记录最新时间戳
                        }
                        
                    })
                }
                //当前成员重播列表循序加载
                $.each(dt.content.reviewList,function(index,info){
                    var _li = dy_li;
                    _li = _li.replace("{{liveId}}",info.liveId);//直播id
                    _li = _li.replace("{{lrcPath}}",info.lrcPath); //歌词文件
                    _li = _li.replace("{{liveType}}",INDEX.checkType(info.liveType));//直播类型  视频1  电台2
                    _li = _li.replace("{{startTime}}",INDEX.formatFansMsgTime(info.startTime));//直播时间
                    _li = _li.replace("{{islive}}","重播中");   //直播状态
                    _li = _li.replace("{{picPath}}",INDEX.formatCover(info.picPath));//封面
                    _li = _li.replace("{{title}}",info.title);   //title
                    _li = _li.replace("{{subTitle}}",info.subTitle);   //subTitle
                    _li = _li.replace("{{subTitle2}}",info.subTitle);   //subTitle
                    _li = _li.replace("{{mname}}",main.getMemberInfo().memberName);       //成员姓名
                    _li = _li.replace("{{tname}}",INDEX.getTeam(main.getMemberInfo().teamName));       //成员所属队伍名
                    _li = _li.replace("{{tname1}}",INDEX.getTeam(main.getMemberInfo().teamName));      //成员所属队伍名
                    html += _li;
                    
                })
                nextId = info.startTime;//记录最新时间戳
                //数据已没有
                if(dt.content.reviewList.length == 0){
                    flag = true;
                }
                $(".lists").append(html);
                INDEX.resize();
            }else{
                main.alert(dt.message)
            }
        })
    }
    data.formatFansMsgTime = function(time){
        var curDate = new Date();//当前日期
        var cur_times=curDate.getTime();//当前时间戳

        var date = new Date();
        date.setTime(time);//评论时间
        var y = date.getFullYear();
        var m = date.getMonth() + 1;    
        m = m < 10 ? ('0' + m) : m;    
        var d = date.getDate();    
        d = d < 10 ? ('0' + d) : d;    
        var h = date.getHours();  
        h = h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        var second = date.getSeconds();  
        minute = minute < 10 ? ('0' + minute) : minute;
        //console.log(curDate.getFullYear()+"__"+curDate.getMonth()+"___"+curDate.getDate())
        //console.log(y+"__"+m+"___"+curDate.getDate())
        if(curDate.getFullYear() == parseInt(y) && curDate.getMonth() == parseInt(m) && curDate.getDate() == parseInt(d)){//当天消息  无需前面的年 月 日  只要分 时
            return "今天 "+h+':'+minute;
        }else{//历史消息
            return  y + "." + m + '.' + d;
        }
    }
    data.checkType = function(type){
        if(type == 1){
            return "video";
        }else{
            return "audio";
        }
    }
    //切割队伍
    data.getTeam = function(team){
        return team.split(" ")[1]
    }
    //封面
    data.formatCover = function(str){
        var imgarr = str.split(",");
        if(imgarr[0].indexOf("http://")>=0 ||imgarr[0].indexOf("https://")>=0){
            return imgarr[0];
        }else{
            return CONFIG.getSource()+imgarr[0];
        }
    }
    //resize
    data.resize = function(){
        $(".avatar-wrapper").height($(".lists li").width())
    }
}(window.INDEX = {}));

INDEX.init();


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