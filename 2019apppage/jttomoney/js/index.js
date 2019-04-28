var vm = new Vue({
	  el:'.wrapper',
	  data:{
      totaljt:0,   //鸡腿总数
  		listData:[
        {jt:20000,rmb:400},
        {jt:50000,rmb:1000},
        {jt:80000,rmb:2000},
        {jt:150000,rmb:4000},
        {jt:200000,rmb:6000},
        {jt:500000,rmb:18000}
      ],
      canload:true, //是否可加载
      showpop:0,    //0 不显示   1显示弹框
      tips:''     //提示语
  	},
  mounted: function () {
    
    this.refresh()
  },
	methods: {
		getRmb:function(index){
        var _this = this;
        console.log(_this.listData[index].can)
        if(!_this.listData[index].can){//鸡腿不足  无法提现
          return false;
        }

        if(!_this.canload){//正在加载中
          return false;
        }else{
          _this.canload = false;
        }
        main.getRmb(_this.listData[index].jt,function(dt){
            if(dt.status == 200){
              _this.refresh()
              _this.showPop("成功提现")
            }else{
                _this.showPop(dt.message)
            }
            _this.canload = true;
        })
		},
    refresh:function(){
      var _this = this;
      main.getJt(function(dt){
        if(dt.status == 200){
            vm.totaljt = dt.content.balance;
            for(var i=0;i<_this.listData.length;i++){
                if(_this.totaljt >= _this.listData[i].jt){
                    _this.listData[i].can = true
                }else{
                    _this.listData[i].can = false
                }
            }

        }else{
            _this.showPop(dt.message)
        }
      })
      
    },
    gotoNewRule:function(){
        snhOpenNewWebview("https://h5.48.cn/2019apppage/apphelp/idol_guide_withdrawal.html")
    },
    closePop:function(){
        this.showpop = 0
    },
    showPop:function(msg){
      this.showpop = 1;
      this.tips = msg
    }
	}

})


