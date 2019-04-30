var vm=new Vue({
    el:'#app',
    data:{
        showpop:0,/*控制弹框显示隐藏 */
        tips:'报名成功',/*弹框内容 */
        alreadyShow:false, /*是否已报名 */
        sclick:true /*能否报名 */
    },
    created:function(){
        main.getApply(1,function(data){
            if(data.status == 200){
                if(data.content.code == 2){
                    /*未报名 */
                    vm.alreadyShow = false;
                }else{
                    vm.alreadyShow = true;
                }
            }else{
                vm.tips = data.message;
                vm.showpop = 1;
            }
        })
    },
    methods:{
        /*报名 */
        submit:function(){
            if(this.sclick){
                this.sclick = false;
                main.getApply(2,function(data){
                    if(data.status == 200){
                        if(data.content.code == 0){
                            /*报名成功 */
                            vm.alreadyShow = true;
                            vm.tips = '报名成功';
                            vm.showpop = 1;
                        }
                    }else{
                        vm.tips = data.message;
                        vm.showpop = 1;
                    }
                    vm.sclick = true
                })
            }
        },
        /*弹框 */
        closePop:function(){
            vm.showpop = 0;
        }
    }
})