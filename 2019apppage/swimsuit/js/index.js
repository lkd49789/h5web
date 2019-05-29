var app =new Vue({
    el:'#app',
    data:{
        content:[],
        bannerArr:[],
        banner:true,
        showpop:0
    },
    created:function(){
        if(checkFromApp()){
            if(!dsBridge.call("snhUserInfo")){
                this.showpop = 1;
            }
        }
    },
    mounted:function(){
        var gallery = mui('.mui-slider');
            gallery.slider({
            interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
        });
        var that = this;
        main.getList(function(data){
            if(data.status == 200){
                that.content = data.content;
                if(that.content.bannerImages.indexOf(',')<0){
                    that.banner = true;
                }else{
                    that.bannerArr = that.content.bannerImages.split(',').map(function(item,index){
                        item = 'https://source.48.cn'+item
                        return item;
                    })
                    that.banner = false;
                    /**开启轮播 */
                    that.$nextTick(function(){
                        var gallery = mui('.mui-slider');
                            gallery.slider({
                            interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                        });
                    })
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
