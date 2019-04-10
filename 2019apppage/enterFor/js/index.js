var Vue=new Vue({
    el:'#app',
    data:{
        AprilList:[
            {day:15,num:4},
            {day:16,num:0},
            {day:17,num:0},
            {day:18,num:0},
            {day:19,num:0},
            {day:20,num:0},
            {day:21,num:0},
            {day:22,num:0},
            {day:23,num:0},
            {day:24,num:0},
            {day:25,num:0},
            {day:26,num:0},
            {day:27,num:0},
            {day:28,num:0},
            {day:29,num:0},
            {day:30,num:0}
        ],
        MayList:[
            {day:1,num:2},
            {day:2,num:0},
            {day:3,num:3},
            {day:4,num:0},
            {day:5,num:0},
            {day:6,num:0},
            {day:7,num:0},
            {day:8,num:0},
            {day:9,num:0},
            {day:10,num:0},
            {day:11,num:0},
            {day:12,num:0},
            {day:13,num:0},
            {day:14,num:0},
            {day:15,num:0},
            {day:16,num:0},
            {day:17,num:0},
            {day:18,num:0},
            {day:19,num:0},
        ],
        showpop:0,/*控制弹框显示隐藏 */
        tips:'',/*弹框内容 */
        month:4, /*月份 */
        day:0, /*日 */
        alreadyShow:false, /*是否成功报名 */
        time:'已成功报名2019-4-18日拍摄', /*成功报名时间 */
    },
    directives:{
        /*定义指令 根据人数修改颜色 */
        color:{
            bind(el, bind, vNode){
                if(bind.value == 0){
                    el.style.color='#6fd69f'
                }else if(bind.value > 0 && bind.value < 4){
                    el.style.color='#caabff'
                }else{
                    el.style.color='#c4c4c4'
                }
            }
        }
    },
    methods:{
        dayClick(item,month){
            this.month=month
            if(item.num == 4){
                this.tips='当天已经报名满额，请换一天'
                this.showpop=1;
            }else{
                this.day=item.day;
                this.showpop=2;
            }
        },
        /*跳转*/ 
        go(){
            console.log(1)
            this.gotoPage('rule.html');
        },
        /*弹框 */
        closePop(){
            this.showpop=0;
        },
        /*跳转方法 */
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
    }
})