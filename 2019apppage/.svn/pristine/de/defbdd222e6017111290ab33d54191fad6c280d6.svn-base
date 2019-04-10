var curMember = JSON.parse(localStorage.getItem("curMember"))

var vm = new Vue({
	el:'#box',
	data:{
		curMember:curMember,
		totalmoney:0,
		votemoney:"",
		showtip:false,
		tips:"",
		showpop:false
	},
	filters:{
		top:function(id){
			return 'img/top/'+id+'.png'
		}
	},
	methods: {
	    vote: function () {
	    	vm.tips = "";
	      console.log(curMember.memberId)
	      console.log(vm.votemoney)
	      if(vm.votemoney > vm.totalmoney){
	      	vm.showtip = true;
	      	return false;
	      }else{
	      	vm.showtip = false;
	      }
	      //
	      if(vm.votemoney == "" || vm.votemoney <= 0){
	      	vm.tips = "请输入正确的鸡腿数！"
	      	return false;
	      }
	      	main.sendMoney(curMember.memberId,vm.votemoney,function(dt){
				if(dt.status == 200){
					vm.votemoney = ""
					getMoney()
					vm.showpop = true;
				}else{
					vm.tips = dt.message
				}
			})
	    },
	    recharge:function(){
	    	window.web.gotoPage("recharge/detail")
	    },
		closePop: function () {
			vm.showpop = false;
		}
	}
})


getMoney()
function getMoney(){
	main.getMoney(function(dt){
		if(dt.status == 200){
			vm.totalmoney = dt.content
		}
	})
	
}

