var app=new Vue({
    el:"#app",
    data:{
        music:false,
        list:[],
        tips:'帖子审核中',
        showpop:0,
        bg:{
            imgUrl:"",  /*弹框按钮背景图片 */
            bgColor:"#ff9c0d" /*弹框按钮背景颜色 */
        },
        available:true,  /**防止多次加载 */
        songId:0, /*曲目ID */
        action:false,
        playImgShow:true,
        liHeigt3:100, /*图片高度 给默认100 */
        liHeigt2:100,
        praiseStatus1:true,
        praiseStatus2:true
    },
    directives:{
        /*定义指令 根据照片数修改宽度 */
        imgnum:{
            bind:function(el, bind, vNode){
                if(bind.value < 3 ){
                    el.className="marginTwo";
                }else{
                    el.className="marginThree";
                }
            }
        }
    },
    mounted:function(){
        this.getList()
    },
    methods:{
        getList:function(){
            /*获取曲目 */
            this.songId = this.getUrlParam('songId')
            main.listDetails(0,this.songId,function(data){
                if(data.status == 200){
                        app.music = data.content.songResult;
                        app.list = app.mapList(data.content.postInfos);
                }else{
                    alert(data.message)
                }
                /*计算高度 */  
                setTimeout(function(){
                    var listWidth = app.$refs.listWidth.offsetWidth;
                    app.liHeigt3 = listWidth*0.325;
                    app.liHeigt2 = listWidth*0.49;
                },1000)    
            })
            /*触底加载 */
            window.addEventListener('scroll',this.handleScroll,true);
        },
        videoClick:function(url){
            if(!url){
                return false;
            }
            this.playImgShow = false;
            var vid = this.$refs.video;
            if(this.action){
                this.action = false;
                vid.pause();
            }else{
                this.action = true;
                vid.play();
            }
        },
        /*修改数组 */
        mapList:function(list){
            list.map(function(value,index){
                value.ctime = value.createAt;
                value.createAt = app.dateFormat(value.createAt - 0);   
            })
            return list;
        },
        /*时间 */
        dateFormat:function(time) {
            /*Number格式的time */
            var date=new Date(time);
            var year=date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
            var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
            var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
            var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
            var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
            var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
            // 拼接
            return+month+"月"+day+"日 "+hours+":"+minutes+":"+seconds;
        },
        /*曲目点赞 */
        songPraise:function(){
            if(this.praiseStatus1){
                this.praiseStatus1 = false;
                main.setPraise(this.songId,function(data){
                    if(data.status == 200){
                        app.music.praise = parseInt(app.music.praise) + 1;
                        app.music.praiseStatus = true;
                        app.praiseStatus1 = false;
                    }else{
                        app.praiseStatus1 = true;
                        app.music.praiseStatus = false;
                        alert(data.message);
                    }
                })
            }
        },
        /*帖子点赞 */
        songPraise2:function(id,index){
            if(this.praiseStatus2){
                this.praiseStatus2 = false;
                main.setPraise2(id,function(data){
                    if(data.status == 200){
                        app.praiseStatus2 = false;
                        app.list[index].praiseStatus = true;
                        app.list[index].likeCount = parseInt(app.list[index].likeCount) + 1;
                    }else{
                        app.praiseStatus2 = true;
                        app.list[index].praiseStatus = false;
                        alert(data.message);
                    }
                })
            }
        },
        /*帖子详情 */
        _openNativeModule:function(id){
            _openNativeModule('post/detail?id='+id);
        },
        /*创建帖子 */
        createPostCallback:function() {
            var that = this;
            var params = {
                //投稿属性，由server端定，必填
                ext:JSON.stringify({
                    "manuscript":{
                        "join":1,  
                        "relateId": this.songId,
                        "activeId":[]
                    }
                })
            }
            dsBridge.call("snhCreatePost",params,function(params1){
                 /*获取曲目 */
                that.getList()
                // that.showpop = 1;
                //如果发送帖子成功，则会返回该帖子的id，否则为空字符串
                // alert(typeof params1);
                // alert(params1);
                // alert("解析json");
                // var result = JSON.parse(params1);
                // alert(result);
                // // var result = params1.parseJSON();
                // alert(typeof result);
                // if (result["id"] == 0) {
                    // alert("取消发布");
                //     that.tips = '取消发布';
                // } else {
                //     // alert("发布成功" + result["id"]);
                //     that.tips = '帖子审核中';
                // }
                // that.showpop = 1;
                
            })
        },
        /*触底加载 */
        handleScroll:function(){
            // 获取滚轮位置
           var height1 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
           // 文档高度
           var height2 = document.body.scrollHeight || document.documentElement.scrollHeight;
           // 可视区域
           var height3 = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
           if(height3 + height1 >= height2 - 10 && this.available){
                this.available = false;
                var ctime = this.list.length>0?this.list[this.list.length-1].ctime:0;
                main.listDetails(ctime,this.songId,function(data){
                    app.available = true;
                    if(data.status == 200){
                        app.music = data.content.songResult;
                        if(data.content.postInfos.length < 5){
                            app.available = false;
                        }
                        app.list = app.list.concat(app.mapList(data.content.postInfos));
                    }else{
                        alert(data.message);
                    }
                })
           }
         },
        /*获取url参数*/
        getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return decodeURI(r[2]);
            return null; //返回参数值
        }
    }
})