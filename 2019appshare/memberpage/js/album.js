 
var flag = false;
var nextId = 0;

//返回
$(".btn-back").click(function(){
    window.history.back()
})



loadAlbum();
function loadAlbum(){
    main.getAlbum(nextId,function(dt){
        //console.log(dt.content.data);
         if(dt.status == 200){

            
            $.each(dt.content.list,function(i,items){
                /*console.log(iitems.filePath);*/
                var html = [];
                html.push('<li>');
                html.push('<span></span><img src="'+CONFIG.getSource()+"/resize_150x150"+items.imgUrl+'" data-preview-src="'+CONFIG.getSource()+items.imgUrl+'" data-preview-group="1" />');
                html.push('</li>');
                $('.lists').append(html.join(""));
                 
                $('.mui-content-padded li').height($('.mui-content-padded li').width());
            })
            nextId = dt.content.next;
            //数据已没有
            if(dt.content.list.length == 0){
                flag = true;
            }
        }else{

            main.alert(dt.message);

        }
    })
}

mui.previewImage();



//上拉加载
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
                            loadAlbum();
                            self.endPullUpToRefresh(flag);
                        }, 1000);
                    }
                }
            });
        })
    });
})(mui);

window.addEventListener('touchmove',function(e){e.preventDefault();});