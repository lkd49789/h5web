var vm = new Vue({
	el:'.wrapper',
	data:{
		showpop:0, //0 关闭  1.购买方式 2提示语弹框 3 不要实体包装提示
		totalPrice:0,   //总价
		total:'',    //个数
		tips:'',
		btnstr:"知道了", //浮层按钮文字
    post:1,     //是否需要邮寄  0不需要  1需要
    area:'',
    province:'',//省
    city:"",    //市
    county:'',   //区县
    uname:'',   //用户姓名
    phone:"",   //用户手机
    address:"",  //详细地址
    canload:true,   //是否可加载  false 不可  true  可
    backhome:0,   //是否返回
    picker:true
	},
  mounted: function () {
    var that = this;
      main.getsite(function(data){
        if(data.status == 200){
            if(data.content){
              that.uname = data.content.name
              that.phone = data.content.mobile
              that.province = data.content.province
              that.city = data.content.city
              that.county = data.content.country
              that.address = data.content.details
              that.area = that.province+' '+that.city+' '+that.county
            }
        }else{
            alert(data.message)
        }
      })
  },
	computed:{
		getTotal:function(){
      console.log(this.post*12)
			return {totalPrice:this.total*78,totalVote:this.total*30};
		}
	},
	methods: {
    showProPanel:function(){//选择省市
      var that = this;
      that.picker = false;
      mui("body").on("tap",".mui-poppicker-header > .mui-poppicker-btn-cancel",function(){
        that.picker = true;
      });
      var city_picker = new mui.PopPicker({layer:3});
      city_picker.setData(init_city_picker);
        city_picker.show(function(items){
          that.picker = true;
          vm.province = (items[0] || {}).text
          vm.city = (items[1] || {}).text;
          vm.county = (items[2] || {}).text;
          vm.area = vm.province+" "+vm.city+" "+vm.county
          console.log(vm.province)
          console.log(vm.city)
          console.log(vm.county)
        });
    },
		 showBuyPanel:function(){//显示购买选项
      if(!/^[\u4E00-\u9FA5]{2,6}$/.test(this.uname)){
        this.showPop("请正确填写姓名！",2,"知道了");
        return false
      }
      if(!/1\d{10}/.test(this.phone) || this.phone.length < 5){
        this.showPop("请正确填写收货人联系方式！",2,"知道了");
        return false
      }
      if(this.province=="" || this.city=="" || this.county==""){
        this.showPop("请输入收货人地址！",2,"知道了");
        return false
      }
      if(this.address==""){
        this.showPop("请输入收货详细地址！",2,"知道了");
        return false
      }
      this.setSite()
     },
     setSite:function(){
       var that = this;
       var obj = {
        'name':this.uname,         //收货人姓名
        'phone':this.phone,        //收货人手机号
        'province':this.province,  // 收件地址 - 省份
        'city':this.city,           // 收件地址 - 城市
        'county':this.county,       // 收件地址 - 区(县)
        'details':this.address 
       }
       main.setsite(obj,function(data){
        if(data.status == 200){
          that.showPop("地址保存成功",3,"确认");
        }else{
            alert(data.message)
        }
       })
     },
	    showPop:function(_str,id,_btnstr){//弹框
        if(_str == "success"){
          this.backhome = 1;
          this.tips = "购买成功！";
        }else if(_str == "cancel"){
          this.tips = "取消购买！";
        }else{
          this.tips = _str;
        }
	    	this.showpop = id;
	    	this.btnstr = _btnstr;
        
	    },
	    closePop:function(){
        if(this.backhome == 1){
            snhGoBack()
        }
	    	vm.showpop = 0;
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
    }
	}

})

