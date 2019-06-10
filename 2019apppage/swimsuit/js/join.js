var app = new Vue({
    el:'#app',
    data:{
        showpop:0,
        tips:'',
        money:'', /*填写的价格 */
        list:[],   //历史记录
        content:'',
        time:{  /*时间 */
            hours:0,
            minutes:0,
            seconds:0
        },
        start:true,  /*是否开启拍卖 默认没 */
        btnClick:true  /*是否可以点击 */
    },
    mounted:function(){
        var that = this;
        main.getList(function(data){
            if(data.status == 200){
                that.content = data.content; 
                that.thinkTime(data.content.startAt,data.content.endAt);
                if(that.content.auctionPrice)
                that.money = that.content.auctionPrice;
            }else{
                that.tips = data.message;
                that.showpop = 1;
            }
        })
        that.getHistory()
    },
    watch:{
        money:function(newVal,oldVal){
            if(isNaN(newVal)){
                this.money = oldVal
            }
            if(newVal>0 && (typeof this.money)!= undefined){
                this.money = parseInt(newVal)
            }
        }
    },
    methods:{
        /* 获取历史记录 */
        getHistory:function(){
            var that = this;
            main.getHistory(this.getUrlParam('?goodsId'),function(data){
                if(data.status == 200){
                    if(data.content.length >0){
                        data.content[0].logAuctionJions.forEach(function(item,index){
                            item.logAt = that.dateFormat(item.logAt)
                        })
                    }
                    that.list = data.content; 
                }else{
                    that.tips = data.message;
                    that.showpop = 1;
                }
            })
        },
        /*竞拍 */
        auction:function(){
            // if(!this.content.auctionPrice){
            //     this.tips = '你的鸡腿不足，无法缴纳保证金，请先充值。';
            //     this.showpop = 3;
            //     return false;
            // }else 
            if(this.money <= 0){
                this.tips = '请正确填写竞拍价格'
                this.showpop = 1
                return false;
            }
            var that = this;
            if(that.btnClick){
                that.btnClick = false;
                that.mainAuction()
                main.getList(function(data){
                    if(data.status == 200){
                        that.content = data.content; 
                        that.thinkTime(data.content.startAt,data.content.endAt);
                        if(that.content.auctionPrice)
                        that.money = that.content.auctionPrice;
                    }else{
                        that.tips = data.message;
                        that.showpop = 1;  
                    }
                })
            }
        },
        /*出价*/ 
        mainAuction:function(){
            var that = this;
            main.auction(this.getUrlParam('?goodsId'),this.money,function(data){
                that.getHistory()
                if(data.status == 200){
                    that.content.highestPrice = data.content;
                    that.tips = '竞价已提交,<br/>祝你竞拍成功！';
                    that.showpop = 1;
                }else{
                    that.content.highestPrice = data.content;
                    if(data.message == '当前鸡腿少于保证金所需金额'){
                        that.tips = '你的鸡腿不足，请先充值';
                        that.showpop = 3;
                    }else{
                        that.tips = data.message;
                        that.showpop = 1;
                    }
                }
                that.btnClick = true;
            })
        },
         /*根据时间设置定时器 */
         thinkTime:function(start,end){
            var that = this;
           if(new Date().getTime()<start){
               setTimeout(function(){
                   that.interval(end)
               },start - new Date().getTime())
           }else{
               that.interval(end)
            // that.interval(1558681459381)
           }
       },
       /*循环定时器 */
       interval:function(end){
           var that = this;
           that.timer=setInterval(function(){
               if(end<new Date().getTime()){
                   that.start = false;
                   clearInterval(that.timer)
                   return false;
               }
               that.start = true;
               that.countDown(end,new Date().getTime())
           },1000)
       },
       /*倒计时 */
       countDown:function(end,presentTime){
           var date = end - presentTime 
           // console.log(date/ 1000 / 60 / 60)
           var hours    = Math.floor(date/ 1000 / 60 / 60) ;
           var minutes   = Math.floor(date / 1000 /60  - (60 * hours));
           var seconds   = Math.floor(date/ 1000  - (60 * 60 * hours) - (60 * minutes));
           var time = "倒计时"+(hours +"时"+minutes+"分"+seconds+"秒");
           this.time.hours = hours;
           this.time.minutes = minutes;
           this.time.seconds = seconds;
       },
        /*充值 */
        recharge:function(){
            if(checkFromNew()){
	    		_openNativeModule("recharge/recharge")
	    	}else{
	    		window.web.gotoPage("recharge/detail");
	    	}
        },
        /*获取url参数*/
        getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return decodeURI(r[2]);
            return null; //返回参数值
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
        close:function(){
            if(this.tips == '竞价已提交,<br/>祝你竞拍成功！'){
                this.showpop = 0 
                localStorage.setItem('refresh',1)
            }else{
                this.showpop = 0 
            }
        }
    }
})