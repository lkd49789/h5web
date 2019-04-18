(function(data) {
    var lastTime = 0;
    var type = GetQueryString("type");//// 0：文章 1：图片 2：音乐 3：视频 5：成员   
    var dy_li = '<li materialType="{{materialType}}" materialId="{{materialId}}" sharePath="{{sharePath}}">'+
'                    <div class="popnews">'+
'                        <span class="avatar" style="background:url({{userAvatar}}) center no-repeat;background-size: 100%;"></span><b>{{userName}}</b><em>{{ctime}}</em>'+
'                    </div>'+
'                    <div class="cover">'+
'                        <div class="c_left" style="background:url({{coverPath}}) center no-repeat;background-size: 100%;">'+
'                            <img src="img/icon_shadow.png" class="shadow">'+
'                            <span>{{typeName}}</span>'+
'                        </div>'+
'                        <div class="c_right">'+
'                            <p class="c_title">{{title}}</p>'+
'                            <p class="icon_data">'+
'                                <span><img src="img/icon_smhot.png" class="smhot">{{hotNum}}</span>'+
'                                <span><img src="img/icon_msg.png" class="msg">{{commentNum}}</span>'+
'                            </p>'+
'                            <div class="tag-wrapper">{{tags}}</div>'
'                        </div>'+
'                    </div>'+
'                </li>'
    //var tag = '<span class="labelname">{{tag}}<img src="img/icon_sanjiao.png"></span>'

    //加载列表
    data.init = function(){
        INDEX.getTypeList();
        INDEX.addListeners();
    }
    //添加事件
    data.addListeners = function(){
        //点赞
        $(".lists").on("click","li",function(){
            var type = $(this).attr("materialType");//稿件type
            var id = $(this).attr("materialId");//稿件id
            localStorage.setItem("sharePath",$(this).attr("sharePath"));
            main.hrefTo("details.html?material_type="+type+"&material_id="+id);
        })
        //返回
        $(".btn-back").click(function(){
            window.history.back()
        })
    }

    //加载分类信息
    data.getTypeList = function(){
        main.getTypeList(type,lastTime,function(dt){
            if(dt.status == 200){
                var html = '';
                //当前成员重播列表循序加载
                $.each(dt.content.data,function(index,info){
                    if(info.docket != 1){
                        var _li = dy_li;
                        _li = _li.replace("{{materialType}}",info.materialType);//投稿类型
                        _li = _li.replace("{{materialId}}",info.materialId);   //稿件id
                        _li = _li.replace("{{userAvatar}}",main.formatAvata(info.userAvatar));//粉丝头像
                        _li = _li.replace("{{userName}}",info.userName);//粉丝昵称
                        _li = _li.replace("{{ctime}}",formatDate(info.ctime));   //时间
                        _li = _li.replace("{{coverPath}}",main.formatAvata(info.coverPath));//封面
                        _li = _li.replace("{{sharePath}}",main.formatAvata(info.coverPath));//分享链接图片
                        _li = _li.replace("{{typeName}}",info.typeName);   //投稿类型
                        _li = _li.replace("{{title}}",info.title);       //投稿title
                        _li = _li.replace("{{hotNum}}",info.hotNum);       //成员姓名
                        _li = _li.replace("{{commentNum}}",info.commentNum);       //成员姓名
                        
                        _li = _li.replace("{{tags}}",INDEX.getTags(JSON.parse(info.tag)));   //标签
                        html += _li;
                        lastTime = info.ctime;//记录最新时间戳
                    }
                })
                //数据已没有
                if(dt.content.data.length == 0){
                    flag = true;
                }
                
                $(".lists").append(html);
                INDEX.resize();
            }else{
                main.alert(dt.message)
            }
        })
    }
    //获取标签
    data.getTags = function(tagdata){
        var taghtml = "";
        $.each(tagdata,function(i,tag){
            if(i<3){
                taghtml += '<span class="labelname">'+tag.name+'<img src="img/icon_sanjiao.png"></span>'
            }
        })
        return taghtml;
    }
    //resize
    data.resize = function(){
        $('.cover').height($('.c_left').width()/1.65+10);
        $('.c_left').height($('.c_left').width()/1.65);
        $('.c_right').height($('.c_left').width()/1.65);
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
                            INDEX.getTypeList();
                            self.endPullUpToRefresh(flag);
                        }, 1000);
                    }
                }
            });
        })
    });
})(mui);


window.addEventListener('touchmove',function(e){e.preventDefault();});