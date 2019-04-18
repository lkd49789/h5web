var curType = ""; // 0：文章 1：图片 2：音乐 3：视频 5：成员   
(function(data) {
    var lastTime = 0;
    var memberId
    
    var dy_li = '<li materialType="{{materialType}}" materialId="{{materialId}}">'+
'                    <div class="popnews">'+
'                        <span class="avatar" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></span><b>{{userName}}</b><em>{{ctime}}</em>'+
'                    </div>'+
'                    <div class="cover">'+
'                        <div class="cover-wrapper"><img src="{{coverPath}}" class="coverimg"></div>'+
// '                        <span class="label">易嘉爱推荐<img src="img/icon_triangle.png" class="icon_triangle"></span>'+
'                        <div class="cover_bottom">'+
'                            <img src="img/shadow2.png" class="shadow">'+
'                            <span class="name">{{typeName}}</span>'+
'                            <span class="hot"><img src="img/icon_hot.png">{{hotNum}}</span>'+
'                        </div>'+
'                    </div>'+
'                    <p class="text">{{title}}</p>'+
'                </li>'


    //加载列表
    data.init = function(){
        if(GetQueryString("game") == "xm"){
            memberId = GetQueryString("memberId")
            $.ajax({
                type:"get",
                async:true,
                contentType: "application/json; charset=utf-8",
                url:"member_mapping.json",
                dataType: "json",
                success: function(data){
                    
                    localStorage.setItem("CUR_MEMBER_ID",memberId);
                    //localStorage.setItem("CUR_MEMBER_MAINPAGE",JSON.stringify(data[memberId]));
                    INDEX.getList();
                    INDEX.addListeners();
                }
            })
            
            
        }else{
            INDEX.getList();
            INDEX.addListeners();
        }
        
    }
    //添加事件
    data.addListeners = function(){
        //跳转投稿详情
        $(".support_lists").on("click","li",function(){
            var type = $(this).attr("materialType");//稿件type
            var id = $(this).attr("materialId");//稿件id
            
            main.hrefTo("details.html?material_type="+type+"&material_id="+id);
        })

        //跳转投稿分类
        $(".tabs li").click(function(){
            var type = $(this).attr("type");
            main.hrefTo("supportlist.html?type="+type);
        })

        //返回
        $(".btn-back").click(function(){
            window.history.back()
        })
    }
    //加载信息
    data.getList = function(){
        main.getRecommend(lastTime,function(dt){
            if(dt.status == 200){
                var html = '';
                //当前成员重播列表循序加载
                $.each(dt.content.data,function(index,info){
                    if(info.docket != 1){
                        var _li = dy_li;
                        _li = _li.replace("{{materialType}}",info.materialType);//投稿类型
                        _li = _li.replace("{{materialId}}",info.materialId);   //稿件id
                        _li = _li.replace("{{avata}}",main.formatAvata(info.userAvatar));//头像
                        _li = _li.replace("{{userName}}",info.userName);//用户昵称
                        _li = _li.replace("{{ctime}}",formatDate(info.ctime));   //直播状态
                        _li = _li.replace("{{coverPath}}",main.formatCoverBig(info.coverPath));//封面
                        _li = _li.replace("{{typeName}}",info.typeName);   //title
                        _li = _li.replace("{{hotNum}}",info.hotNum);       //成员姓名
                        _li = _li.replace("{{title}}",info.title);       //成员所属队伍名
                        html += _li;
                        lastTime = dt.content.nextTime;//记录最新时间戳
                    }
                })
                //数据已没有
                if(dt.content.data.length < 20){
                    flag = true;
                }
                $(".support_lists").append(html);
                INDEX.resize();
            }else{
                main.alert(dt.message)
            }
        })
    }

    
    //resize
    data.resize = function(){
        $('.cover-wrapper').height($('.cover-wrapper').width()*9/16);
        
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