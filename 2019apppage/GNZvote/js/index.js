var app=new Vue({
    el:'#app',
    data:{
        tabIndex:1,
        timer:null, /*定时器 */
        showpop:0, /*弹框 */
        tips:'投票成功,感谢你的支持',  /*弹框内容 */
        teamList:[],
        idolList:[]
    },
    created:function(){
        var that = this;
        main.getList(function(data){
            that.teamList = data.content.gnzTeamList
            that.idolList = data.content.gnzMemberList
        })


        /*根据日期判断开启哪一天的投票 */
        // if(new Date().getMonth()+1 == 5){
        //     if(new Date().getDate() == 1){
        //         this.thinkTime(new Date("2019/5/1 20:00:00").getTime(),new Date("2019/5/1 24:00:00").getTime())
        //     }else if(new Date().getDate() == 2){
        //         this.thinkTime(new Date("2019/5/2 20:00:00").getTime(),new Date("2019/5/2 24:00:00").getTime())
        //     }else if(new Date().getDate() == 3){
        //         this.thinkTime(new Date("2019/5/3 20:00:00").getTime(),new Date("2019/5/3 24:00:00").getTime())
        //     }else if(new Date().getDate() == 4){
        //         this.thinkTime(new Date("2019/5/4 16:30:00").getTime(),new Date("2019/5/4 18:30:00").getTime())
        //     }
        // }
    },
    methods:{
        tabClick:function(index){
            this.tabIndex = index;
        },
        /*根据时间设置定时器 */
        thinkTime:function(start,end){
            if(new Date().getTime()<start){
                setTimeout(function(){
                    this.interval(end)
                }.bind(this),start - new Date().getTime())
            }else{
                this.interval(end)
            }
        },
        /*循环定时器 */
        interval:function(end){
            this.timer=setInterval(function(){
                if(end<new Date().getTime()){
                    clearInterval(that.timer)
                    return false;
                }
                this.countDown(end,new Date().getTime())
            }.bind(this),1000)
        },
        /*倒计时 */
        countDown:function(end,presentTime){
            var date= end - presentTime 
            var hours    = date/ 1000 / 60 / 60 
            var hoursRound   = Math.floor(hours);
            var minutes   = date / 1000 /60  - (60 * hoursRound);
            var minutesRound  = Math.floor(minutes);
            var seconds   = date/ 1000  - (60 * 60 * hoursRound) - (60 * minutesRound);
            var secondsRound  = Math.floor(seconds);
            var time = "倒计时"+(hoursRound +"时"+minutesRound+"分"+secondsRound+"秒");
            console.log(time)
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
        },
        /*关闭弹框 */
        closePop:function(){
            this.showpop = 0
        }
    }
})
