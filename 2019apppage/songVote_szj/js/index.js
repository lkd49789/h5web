var app=new Vue({
    el:"#app",
    data:{
        ruleShow:false,
        list:[]
    },  
    mounted:function(){
        main.getList(function(data){
            if(data.status == 200){
                data.content.map(function(item,index){
                    item.play = false;
                    item.imgShow = true;
                })
                data.content.sort(function(a,b){
                    return b.praise - a.praise
                })
                app.list = data.content;
            }else{
                alert(data.message);
            }
        })
    },
    methods:{
        videoClick:function(index,url){
            if(!url){
                return false;
            }
            var vid = this.$refs.video[index];
            if(this.list[index].play){
                this.list[index].play = false;
                vid.pause();
            }else{
                app.list.forEach(function(item,ind){
                    app.$refs.video[ind].pause();
                    if(app.list[ind].videoUrl){
                        app.list[ind].play = false;
                        app.$refs.video[ind].pause();
                    }
                })
                this.list[index].play = true;
                this.list[index].imgShow = false;
                vid.play();
            }
        },
        /*分享 */
        snhOnActionShare:function() {
            var sdt = {
                    platform: 'ALL',
                    imageUrl:'https://h5.48.cn/2019apppage/songVote_szj/img/share.png',
                    htmlUrl:'https://h5.48.cn/2019apppage/songVote_szj/share.html',
                    title:'十洲古国六族汇聚，时之卷大门开启！',
                    desc:'快来选出SNH48 TEAM NII《时之卷》你最喜欢的曲目吧！',
                    isGif:false
            }
            dsBridge.call("snhOnActionShare",sdt, function(block){
                alert(block);
            });
        },
        /*跳转方法 */
        gotoPage:function(_url){
            var url = _url;
            if(url.indexOf("http://")>=0 ||url.indexOf("https://")>=0){
                
            }else{
                url = CONFIG.geturl()+url;
            }
            
            if(checkFromNew()){
                snhOpenNewWebview(url);
            }else if(checkFromOld()){
                window.web.gotoDetail(url);
            }else{
                window.location.href = url;
            }
        }
    }
})