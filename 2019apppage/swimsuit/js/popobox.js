Vue.component('popbox',{
    data:function(){
        return{
            showpop:this.show
        }
    },
    props:{
        show:{
            type:Number /*弹框显示与隐藏 */
        },
        tips:{
            type:String /*弹框内容 */
        },
        submit:{
            type:Function /*方法 */
        },
        bg:{
            type:Object, /*按钮背景图片和颜色 */
            default: function () {
                return { imgUrl: '',imgUrl2: ''}
            }
        }
    },
    template:'<div v-cloak class="mask" v-if="showpop != 0" @touchmove.prevent>'+
        '<!-- no money -->'+
        '<div class="no-money" v-if="showpop == 1">'+
            '<p><b v-html="tips"></b></p>'+
            '<span :style="\'background:url(\'+bg.imgUrl+\') no-repeat 0 0/100% 100%;\'"  @click="showpop = 0">知道了</span>'+
            '</div>'+
        '<div class="submit-box" v-if="showpop == 2">'+
            '<p>内容</p>'+
            '<span class="nospan" @click="showpop = 0">再想想</span>'+
            '<span @click="submit">确定参加</span>'+
        '</div>'+
        '<div class="no-money" v-if="showpop == 3">'+
            '<p  v-html="tips"></p>'+
            '<span :style="\'background:url(\'+bg.imgUrl+\') no-repeat 0 0/100% 100%;\'" @click="showpop = 0">再说</span>'+
            '<span :style="\'background:url(\'+bg.imgUrl+\') no-repeat 0 0/100% 100%;\'" @click="recharge()">去充值</span>'+
        '</div>'+
    '</div>',
    methods:{
        /*去充值 */
        recharge(){
            if(checkFromNew()){
	    		_openNativeModule("recharge/recharge");
	    	}else{
	    		window.web.gotoPage("recharge/detail");
	    	}
        }
    }
})