var app=new Vue({
    el:"#app",
    data:{
        who:'my',/*当前页面 */
        left:'16.66%',/*tab下划线位置 */
    },
    components:{
        /*我的信息页面 */
        my:{
            template:'#myPage',
            directives:{
                /*定义指令 根据人数修改颜色 */
                color:{
                    bind:function(el, bind){
                        if(bind.value == 0){
                            el.style.color='#c4c4c4'
                        }else{
                            el.style.color='#38daa6'
                        }
                    }
                }
            }
        },
        /*积分榜页面 */
        integral:{
            template:'#integralPage',
            data:function(){
                return{
                    indexShow:1
                }
            },
            methods:{
                ilTabClick:function(index){
                    this.indexShow = index
                }
            }
        },
        /*公演MVP */
        mvp:{
            template:"#mvpPage",
            methods:{
                /*跳转到MVP排名页面 */
                go:function(){ 
                    this.gotoPage('mvpList.html')                
                },
                /*展开 */
                unfold:function(){
                    console.log(2)                
                },
                /*跳转方法 */
                gotoPage:function(_url){
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
        }
    },
    methods:{
        /*tab切换 */
        tabClick:function(index){
            this.left = index * 33.33 - 16.66 +"%"
            if(index == 1){
                this.who = 'my'
            }else if(index == 2){
                this.who = 'integral'
            }else if(index == 3){
                this.who = 'mvp'
            }
        }
    }
})