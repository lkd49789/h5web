var vm=new Vue({
    el:'#app',
    data:{
        AprilList:[],
        MayList:[],
        showpop:0,/*控制弹框显示隐藏 */
        tips:'',/*弹框内容 */
        date: '', /*日期 */
        maskDate: '', /*日期 */
        alreadyShow:false, /*是否成功报名 */
        GMonth:new Date().getMonth() + 1,
        GDay:new Date().getDate(),
        status:0
    },
    created:function(){
        var GMonth = this.GMonth;
        var GDay = this.GDay;
        if(GMonth > 5 || (GMonth == 5 && GDay > 19)){
            this.tips = '超过预约时间';
            this.showpop=1;
            return false;
        }
        this.getList() 
    },
    directives:{
        /*定义指令 根据人数修改颜色 */
        color:{
            bind:function(el, bind, vNode){
                if(bind.value == 0){
                    el.style.color='#6fd69f';
                }else if(bind.value > 0 && bind.value < 6){
                    el.style.color='#caabff';
                }else{
                    el.style.color='#c4c4c4';
                }
            }
        }
    },
    methods:{
        /*获取所有日期预约情况 */
        getList:function(){
            main.getList(function(data){
                vm.status = data.status
                if (data.status == 200) {
                    vm.AprilList = [];
                    vm.MayList = [];
                    if (data.content.date) {
                        vm.date = data.content.date;
                        vm.alreadyShow = true;
                    }
                    data.content.dateListList.forEach(function(item, index){
                        item.day = item.date.split("月")[1].split("日")[0]
                        if (item.date.substr(0, 1) == 4) {
                            vm.AprilList.push(item);
                        } else {
                            vm.MayList.push(item);
                        }
                    })
                } else {
                    vm.tips = data.message;
                    vm.showpop = 1;
                }
            }) 
        },  
        /*提交预约 */
        upEnterFor:function(date){
            main.upEnterFor(date, function(data){
                vm.status = data.status
                if (data.status == 200) {
                    vm.tips = '报名成功';
                    vm.showpop = 1;
                    vm.alreadyShow = true;
                } else {
                    vm.tips = data.message;
                    vm.showpop = 1;
                }
            }) 
        },
        dayClick:function(item,month){
            var GMonth = this.GMonth;
            var GDay = this.GDay;
            var ThisDate = new Date("2019/" + GMonth.toString() + "/" + GDay.toString() + " 00:00:00").getTime(); /* 今天*/
            var endDate = new Date("2019/" + month.toString() + "/" + item.day.toString()+" 00:00:00").getTime();/* 报名日期*/
            if (vm.alreadyShow){
                vm.tips = '你已经成功报名啦不用在选了～';
                vm.showpop = 1;  
            }else if(item.num == 6){
                vm.tips='当天已经报名满额，请换一天';
                vm.showpop=1;
            } 
            // else if (parseInt((endDate - ThisDate) / (1000 * 60 * 60 * 24)) <= 1){/* 必须隔一天 大于等于2天才能报名*/
            //     vm.tips = '超过预约时间'
            //     vm.showpop=1;
            // }
            else{
                vm.maskDate = item.date;
                vm.showpop = 2;
            }
        },
        submit:function(){
            vm.upEnterFor(vm.maskDate);
        },
        /*跳转*/ 
        go:function(){
            vm.gotoPage('rule.html');
        },
        /*弹框 */
        closePop:function(){
            vm.showpop = 0;
            if (vm.status == 200){
                vm.getList()
            }else{
                vm.snhGoBack()
            }
        },
        snhGoBack:function() {
            if(checkFromNew()){
                dsBridge.call("snhGoBack", "");
            }else if(checkFromOld()){
                window.web.backHome();
            }else{
                window.history.back()
            }
        },
        /*跳转方法 */
        gotoPage:function(_url){
            var url = _url;
            if(url.indexOf("http://")>=0 ||url.indexOf("https://")>=0){
                
            }else{
                url = CONFIG.geturl()+url;
            }
            
            if(checkFromNew()){
                snhOpenNewWebview(url)
            }else if(checkFromOld()){
                window.web.gotoDetail(url);
            }else{
                window.location.href = url;
            }
            
        }
    }
})