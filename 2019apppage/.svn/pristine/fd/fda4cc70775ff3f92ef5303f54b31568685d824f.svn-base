var vm=new Vue({
    el:'.wrap',
    data:{
        headUrl:'img-speak/head_bg.png',
        headId:'',  /*偶像ID */
        sendWord:'', /*寄语*/
        sendWordDis:1,  /*能否进行填写寄语 */
        num:'',  /*鸡腿数 */
        numDisable:false, /*能否输入竞价鸡腿 */
        idolList:[], /*偶像成员 */
        selectIdolText:'请选择一个偶像', /*偶像名字 */
        idolTextshow:0,    /*偶像名字颜色 0 蓝色 1绿色*/
        selectIdolShow:0,    /*选择偶像蒙版显示与否*/
        disable:false,  /*能否进行竞价 */
        biddingNum:3, /*剩余竞价次数 */
        soleList:[],  /*个性化项目ID */
        showOnly:false,   /*是否中标 */
        /*弹框 */
        showpop:0,
        tips:''
    },
    async created () {
        /*获取全场唯一贴纸数据 */
        try{
            /*获取全场唯一贴纸数据 */
            await this.getBiddingNum()
            /*获取个性化贴纸数据 */
            await this.getSoleTags()
            /*获取成员 */
            await this.soleTagsPeople()
        }catch(error){
            /*错误处理 */
            this.showpop = 1;
            this.tips=error
        }
    },
    methods:{
        /*获取全场唯一贴纸数据 */
        getBiddingNum(){
            return new Promise((resolve,reject)=>{
                main.getBiddingNum((data)=>{
                    if(data.status==200){
                        resolve(data)
                        /*是否中标 */
                        this.showOnly=data.content.showOnly;
                        if(this.showOnly){
                            localStorage.setItem('bidding',JSON.stringify(data.content))
                        }
                        /*end */
                        if((data.content.num > 0 && data.content.num < 3) || data.content.num == 0){
                            this.headUrl=data.content.avatarMember;
                            this.selectIdolText=data.content.nickerMember;
                            this.biddingNum=data.content.num;
                            this.sendWord=data.content.content;
                            this.headId=data.content.memberId;
                            this.sendWordDis=0;
                            this.num=data.content.price;
                        }
                        if(data.content.num > 0 && data.content.num < 3){
                            this.disable=false;
                        }else if(data.content.num == 0){
                            this.disable=true;
                        }
                    }else{
                        reject(data.message)
                    }
                })

            })
        },
        /*获取个性化贴纸数据 */
        getSoleTags(){
            return new Promise((resolve,reject)=>{
                main.getSoleTags(1,(data)=>{
                    if(data.status==200){
                        data.content.stickerInfoList.sort((a,b)=>{
                            return a.proId-b.proId
                        })
                        this.soleList=data.content.stickerInfoList
                        resolve(data)
                    }else{
                        reject(data.message)
                    }
                })
            })
        },
        /*获取全部成员 */
        soleTagsPeople(){
            return new Promise((resolve,reject)=>{
                main.soleTagsPeople(0,(data)=>{
                    if(data.status==200){
                        this.idolList=data.content;
                        resolve(data)
                    }else{
                        reject(data.message)
                    }
                }) 
            })
        },
        /* 跳转到规则 */
        speakRuleClick(val){
            this.gotoPage('rulePage.html?whoRule='+val)
        },
        /*选择偶像 */
        selectIdol(){
            this.selectIdolShow=1;
        },
        /*选中偶像 */
        idolClick(val){
            this.selectIdolShow=0;
            this.headUrl=val.avatar;
            this.headId=val.memberId;
            this.selectIdolText=val.realName;
            this.idolTextshow=1;
        },
        /* 提交竞价*/
        upBidding(){
            if(this.headId.length==0 && this.biddingNum==3){
                this.tips='请选择偶像';
                this.showpop=1;
                return false;
            }else if(this.sendWord.length==0 && this.biddingNum==3){
                this.tips='请填写寄语/竞价数';
                this.showpop=1;
                return false;
            }else if(this.num.length==0){
                this.tips='请输入你竞价的鸡腿数';
                this.showpop=1;
                return false;
            }
            main.submitBidding({
                avatar:this.headUrl,
                content:this.sendWord,
                memberId:this.headId,
                moneyNum:this.num,
                secc:(data)=>{
                    if(data.status==200){
                        this.sendWordDis=0;
                        this.biddingNum-=1;
                        if(this.biddingNum == 0){
                            this.disable=true;
                        }
                        this.idolTextshow = 0;
                        this.showpop = 1;
                        this.tips='提交成功，祝你好运！'
                    }else{
                        this.showpop = 1;
                        this.tips=data.message
                    }
                }
            })
        },
        /*前往中标页面 */
        goBidding(){
            this.gotoPage('bidding.html')
        },
        realtime(){
            this.gotoPage('realtime.html')
        },
        sportEvent(val){
            this.gotoPage('forecast.html?proId='+val)
        },

        /*弹框方法 */
        closePop(){
            this.showpop=0;
        },
        gotoPage(_url){
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
    },
    watch:{
        /*监听寄语长度 */
        sendWord(n,o){
            if(n && n.length>10)
             this.sendWord=n.substr(0,10)
        }
    },
    components:{
        /*选择偶像组件 */
        selectidol:{
            props:['list'],
            template:'#selectIdol',
            methods:{
                idolClick(val){
                    this.$emit('idol',val)
                },
                close(){
                    this.$emit('idolclose')
                } 
            }
        }
    }
})
