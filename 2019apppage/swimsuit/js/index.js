var app =new Vue({
    el:'#app',
    data:{
        content:[],
        bannerArr:[],
        banner:true,
        showpop:0,
        videoArr:['2892','2851','2796','2773','2759'] /*视频数组 从头添加视频ID*/
    },
    created:function(){
        if(checkFromApp()){
            if(!dsBridge.call("snhUserInfo")){
                this.showpop = 1;
            }
        }
    },
    mounted:function(){
        var that = this;
        main.getList(function(data){
            if(data.status == 200){
                that.content = data.content;
                if(that.content.bannerImages.indexOf(',')<0){
                    that.banner = true;
                }else{
                    that.bannerArr = that.content.bannerImages.split(',').map(function(item,index){return 'https://source.48.cn'+item;})
                    /*防止提前开启拍卖 视频ID顺序错误*/
                    if(that.bannerArr.length != that.videoArr.length){
                        for(var i = 0;i<Math.abs(that.bannerArr.length - that.videoArr.length);i++){
                            that.bannerArr.length>that.videoArr.length?that.videoArr.unshift(''):that.videoArr.shift();
                        }    
                    }
                    /**开启轮播 */
                    that.$nextTick(function(){
                        var gallery = mui('.mui-slider');
                            gallery.slider({
                                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                            });
                    })
                    that.banner = false;
                }
            }else{
                alert(data.message)
            }
        })
    },
    methods:{
        /*跳转方法 */
        gotoPage:function(_url){
            if(checkFromApp()){
                if(!dsBridge.call("snhUserInfo")){
                    this.showpop = 1;
                    return false;
                }
            }
            var url = _url
            if(url.indexOf("http://")>=0 ||url.indexOf("https://")>=0){
                
            }else{
                url = CONFIG.geturl()+url
            }
            if(checkFromNew()){
                snhOpenNewWebview(url)
            }else if(checkFromOld()){
                window.web.gotoDetail(url);
            }else{
                window.location.href = url
            }         
        }
    }
})
