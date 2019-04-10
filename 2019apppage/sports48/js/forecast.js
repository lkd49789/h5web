var vm=new Vue({
    el:"#app",
    data:{
        tagsList:[], /*所有的贴纸 */
        arr:[],  /*当前选中的贴纸数组 */
        needmoney:0,    /*所需鸡腿数量 */
        selectIdolShow:0,    /*选择偶像蒙版显示与否*/
        proId:'',
        idolList:[], /*偶像list */
        headUrl:'img-speak/head_bg.png',
        idolName:'请选择一位偶像',
        idolId:'',
        money:0,  /*我的鸡腿数 */
        showpop:0,   /*弹框 */
        tips:'',  /*弹框内容*/ 
        previewUrl:'',
        previewText:''
    },
    async mounted () {
        this.proId=this.getUrlParam('proId')
        if(localStorage.getItem('allTags')){
            this.tagsList=JSON.parse(localStorage.getItem('allTags'))       
        }
        try{
            /*获取全部贴纸 */
            await this.getAllTags()
            //获取参与成员
            await this.soleTagsPeople()
        }catch(error){
            /*错误处理 */
            this.showpop=1
            this.tips=error
        }
    },
    methods: {
        /*获取全部贴纸 */
        getAllTags(){
            return new Promise((resolve,reject)=>{
                main.getAllTags(data=>{
                    if(data.status==200){
                        this.tagsList=data.content.dataSportStickerList;
                        this.money=data.content.userAccount.money;
                        localStorage.setItem('allTags',JSON.stringify(data.content.dataSportStickerList))
                        resolve(data)
                    }else{
                        reject(data.message)
                    }
                    }) 
               })
        },
        //获取参与成员
        soleTagsPeople(){
            return new Promise((resolve,reject)=>{
                main.soleTagsPeople(this.proId,data=>{
                    if(data.status==200){
                        this.idolList=data.content;
                        resolve(data)
                    }else{
                        reject(data.message)
                    }
                })
            })
        },
        /*选择偶像 */
        selectIdol(){
            this.selectIdolShow=1
        },
        /*选中偶像 */
        idolClick(val){
            this.headUrl=val.avatar
            this.idolName=val.realName
            this.idolId=val.memberId
            this.selectIdolShow=0
        },
        /*贴纸点击 添加入选中的贴纸数组中 */
        tagsClick(val){
            var index=this.arr.indexOf(val);
            if(index>=0){
                this.arr.splice(index,1)
            }else if(this.arr.length<3){
                this.arr.push(val)
            }
        },
        /*提交个性化贴纸前确认 */
        upTags(){
            if(this.idolId.length==0){
                this.showpop=1;
                this.tips='请选择一位偶像'
            }else if(this.arr.length==0){
                this.showpop=1;
                this.tips='请选择贴纸'
            }else if(this.needmoney>this.money){
                this.showpop=3
            }else{
                this.showpop=2
            }
        },
        /*提交个性化贴纸 */
        submit(){
            main.submitTags(this.arr.join(','),this.idolId,parseInt(this.proId),(data)=>{
                if(data.status == 200){
                    this.showpop = 1;
                    this.tips='提交成功，祝你好运！'
                }else{
                    this.showpop = 1;
                    this.tips=data.message;
                }

            })
        },
        /*预览 */
        preview(url,text){
            this.previewUrl = url.replace('icons','icons-big')
            this.previewText = text
            this.showpop = 4;
        },
        /*关闭弹框 */
        closePop(){
            this.showpop = 0;
            if(this.tips=='提交成功，祝你好运！'){
                this.gotoPage('speak.html')
            }
        },
        /*去充值 */
        recharge(){
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
        /*监听选中的贴纸修改所需鸡腿数 */
        arr(){
            if(this.arr.length==1){
                this.needmoney=50
            }else if(this.arr.length>1&&this.arr.length<4){
                this.needmoney=(this.arr.length-1)*20+50
            }else{
                this.needmoney=0
            }
        }
    },
    components:{
        /*选择偶像组件 */
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
        },
    }
})