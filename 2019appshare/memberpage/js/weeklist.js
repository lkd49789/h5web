(function(data) {
    var lastTime = 0;
    var flag = false;
    var room = GetQueryString("room");//聚聚房间id

    var dy_li = '<li>'+
'					<div class="runknum {{top3}}">{{top}}</div>'+
'					<div class="content">'+
'						<span class="head" style="background:url({{avata}}) center no-repeat;background-size: 100%;"></span>'+
'						<span class="name">{{userNickName}}</span>'+
'						<span class="team">{{userLevel}}</span>'+
'					</div>'+
'					<div class="val">贡献{{addMeleeNumber}}</div>'+
'				</li>'

    //加载列表
    data.init = function(){
        INDEX.getList();
        INDEX.addListeners();
    }
    //添加事件
    data.addListeners = function(){
        //返回
        $(".btn-back").click(function(){
            window.history.back()
        })


    }

    //加载列表
    data.getList = function(){
        main.getGiftTop(room,lastTime,function(dt){
            $(".loading").hide()
            if(dt.status == 200){
                var html = '';
                //当前成员重播列表循序加载
                $.each(dt.content.popInfo,function(index,info){
                    if(info.docket != 1){
                        var _li = dy_li;
                        _li = _li.replace("{{top3}}",INDEX.checkTop3(index));//投稿类型
                        _li = _li.replace("{{top}}",index+1);   //稿件id
                        _li = _li.replace("{{avata}}",main.formatAvata(info.userAvatar));//粉丝头像
                        _li = _li.replace("{{userNickName}}",info.userNickName);//粉丝昵称
                        _li = _li.replace("{{userLevel}}","LV"+info.userLevel);   //用户等级
                        _li = _li.replace("{{addMeleeNumber}}",info.addMeleeNumber);   //投稿类型
                        html += _li;
                        lastTime = info.rankTime;//记录最新时间戳
                    }
                })
                //数据已没有
                if(dt.content.popInfo.length == 0){
                    flag = true;
                }
                
                $(".weeklist").append(html);
                INDEX.resize();
            }else{
                //main.alert(dt.message)
            }
        })
    }
    data.checkTop3 = function(index){
    	if(index < 3){
    		return "the"
    	}else{
    		return ""
    	}
    }
    //resize
    data.resize = function(){
        
    }
}(window.INDEX = {}));

INDEX.init();


//上拉加载
// var flag = false;
// mui.init();
// (function($) {
//     //阻尼系数
//     var deceleration = mui.os.ios?0.003:0.0009;
//     $('.mui-scroll-wrapper').scroll({
//         bounce: false,
//         indicators: true, //是否显示滚动条
//         deceleration:deceleration
//     });
//     $.ready(function() {
//         //循环初始化所有下拉刷新，上拉加载。
//         $.each(document.querySelectorAll('.mui-scroll'), function(index, pullRefreshEl) {
//             $(pullRefreshEl).pullToRefresh({
//                 up: {
//                     callback: function() {
//                         var self = this;
//                         setTimeout(function() {
//                             INDEX.getTypeList();
//                             self.endPullUpToRefresh(flag);
//                         }, 1000);
//                     }
//                 }
//             });
//         })
//     });
// })(mui);


// window.addEventListener('touchmove',function(e){e.preventDefault();});