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
            data:function(){
                return {
                    content:[],
                    width:0,
                    btnShow:false
                }
            },
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
            },
            created:function(){
                var that=this;
                main.getIdolMy(function(data){
                    if(data.status == 200){
                        that.btnShow = data.content.showButton;
                        if(data.content.integrals < 20000){
                            that.width = data.content.integrals / 20000 * 100 + '%';
                         }
                         data.content.liveTime = data.content.liveTime.replace(/小时|分钟|秒/g,',').split(',')
                         data.content.myTasks.sort(function(a,b){
                            return b.integral - a.integral
                         })
                         that.content = data.content;
                    }else{
                        alert(data.message);
                    }
                })
            },
            methods:{
                imgError:function(src){
                    this.content.starInfo.starAvatar = "https://source.48.cn/"+src;
                },
                gotoPage:function(_url){
                    this.$parent.gotoPage(_url)
                }
            }
        },
        /*积分榜页面 */
        integral:{
            template:'#integralPage',
            data:function(){
                return{
                    indexShow:1,
                    date:'',
                    content:'',
                    noneShow:false
                }
            },
            mounted:function(){
                this.getIntegral(1)
            },
            methods:{
                ilTabClick:function(index){
                    this.noneShow = false;
                    this.indexShow = index;
                    this.getIntegral(index);
                },
                imgError:function(index,src){
                    this.content[index].avatar = "https://source.48.cn/"+src;
                },
                //获取排名
                getIntegral:function(num){
                    var that=this;
                    main.getIdolIntegral(num,function(data){
                        if(data.status == 200){
                            if(data.content.rankInfos.length == 0){
                                that.noneShow = true;
                            }else{
                                that.noneShow = false;
                            }
                            that.date = data.content.date;
                            that.content = data.content.rankInfos;
                        }else{
                            alert(data.message);
                        }
                    }) 
                }
            }
        },
        /*公演MVP */
        mvp:{
            template:"#mvpPage",
            data:function(){
                return {
                    content:[],
                    contentList:[],
                    noneShow:false
                }
            },
            mounted:function(){
                var that = this;
                main.getIdolMVP(function(data){
                    if(data.status == 200){
                        if(data.content.length == 0){
                           that.noneShow = true 
                        }else{
                            that.noneShow = false;
                        }
                        that.contentList = JSON.parse(JSON.stringify(data.content));
                        that.content = data.content;
                        that.content.forEach(function(item,index){
                            if(item.pastEventList.length > 3){
                                item.pastEventList = item.pastEventList.slice(0,3);
                            }
                        }) 
                    }else{
                        alert(data.message);
                    }
                    // data.content.forEach(function(item,index){
                    //     item.pastEventList.sort(function(a,b){
                    //         return a.title.split('-')[1].split('TEAM')[0] - b.title.split('-')[1].split('TEAM')[0]
                    //     })
                    // }) 
                })
            },
            methods:{
                /*跳转到MVP排名页面 */
                go:function(infoId){ 
                    this.gotoPage('mvpList.html?infoId='+infoId)                
                },
                /*展开 */
                unfold:function(index){
                    this.content[index].pastEventList = this.contentList[index].pastEventList;
                },
                /*跳转方法 */
                gotoPage:function(_url){
                    this.$parent.gotoPage(_url)     
                }
            }
        }
    },
    methods:{
        /*跳转方法 */
        gotoPage:function(_url){
            var url = _url
            if(url.indexOf("http://")>=0 || url.indexOf("https://")>=0){
                
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
        },
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