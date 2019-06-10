/* 1 中标 2 失标 */  

var app = new Vue({
    el:'#app',
    data:{
        content:'',
        list:[],
        payShow:false,/*支付显示与否 */
        time:{  /*时间 */
            hours:0,
            minutes:0,
            seconds:0
        },
        yesPay:0,  /*是否中标没付款 */
        showpop:0
    },
    mounted:function(){
        var that = this;
        that.getList()
        that.getHistory()
    },
    methods:{
        reload:function(){
            this.showpop = 0
            this.getList()
            this.getHistory()
        },
        getList:function(){
            var that = this;
            main.getList(function(data){
                if(data.status == 200){
                    that.content = data.content;
                    if(data.content.endAt < new Date().getTime() && that.content.auctionStatus == 1 && parseInt(data.content.endAt)+(data.content.count*30*60*1000)>new Date().getTime()){
                        that.yesPay = 1;
                        that.interval(parseInt(that.content.endAt)+(data.content.count*30*60*1000));
                    }
                }else{
                    alert(data.message)
                }
            })
        },
        getHistory:function(){
            var that = this;
            main.getHistory(0,function(data){
                if(data.status == 200){
                    if(data.content != []){
                        data.content.forEach(function(item,index){
                            item.logAuctionJions.forEach(function(ite,ind){
                                ite.logAt = that.dateFormat(ite.logAt)
                            })
                        })
                    }
                    that.list = data.content;
                }else{
                    alert(data.message)
                }
            })
        },
        pay:function(what){
            var that = this;
            if(what){
                main.Alipay(this.content.goodsId,function(data){
                    if(data.status == 200){
                        that.showpop = 3;
                        that.payShow = false;
                        dsBridge.call("snhAliWebPay",data.content, function(block){
                            that.getList();
                            that.getHistory();
                        });
                    }else{
                        that.tips = data.message;
                        that.showpop = 1;
                    }
                })
            }else{
                main.wxpay(this.content.goodsId,function(data){
                    if(data.status == 200){
                        that.showpop = 3;
                        that.payShow = false;
                        dsBridge.call("snhWeChatWebPay",data.content, function(block){
                            that.getList();
                            that.getHistory();
                        });
                    }else{
                        that.tips = data.message;
                        that.showpop = 1;
                    }
                })
            }
        },
       /*循环定时器 */
       interval:function(end){
           var that = this;
           that.timer=setInterval(function(){
               if(end < new Date().getTime()){
                //    that.yesPay = 0;
                //     if(that.content.auctionStatus == 1){
                //         that.content.auctionStatus = 2;
                //     }
                   clearInterval(that.timer)
                   that.getList()
                   that.getHistory()
               }else{
                   that.countDown(end,new Date().getTime()) 
               }
           },1000)
       },
       /*倒计时 */
       countDown:function(end,presentTime){
           var date = end - presentTime 
           var hours    = Math.floor(date/ 1000 / 60 / 60) ;
           var minutes   = Math.floor(date / 1000 /60  - (60 * hours));
           var seconds   = Math.floor(date/ 1000  - (60 * 60 * hours) - (60 * minutes));
           var time = "倒计时"+(hours +"时"+minutes+"分"+seconds+"秒");
           this.time.hours = hours;
           this.time.minutes = minutes;
           this.time.seconds = seconds;
        //    console.log(time)
       },
        dateFormat:function(time) {     
            var date=new Date(parseInt(time));
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
            return year+"."+month+"."+day
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

    }
})