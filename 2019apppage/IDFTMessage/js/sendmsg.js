var curMember = JSON.parse(localStorage.getItem("IDFTMessage_curMember"))
var canload = true;//是否可提交


var vm = new Vue({
	el:'#box',
	data:{
		curMember:curMember,
		msg:"",
		tips:" ",
		showpop:false
	},
	filters:{
		top:function(id){
			return 'img/top/'+id+'.png'
		}
	},
	methods: {
	    vote: function () {
	    	if(!canload){
	    		return false;
	    	}
	    	console.log("vm.msg----"+vm.msg)
	        if(vm.msg == ""){
	      	  vm.tips = "留言不能为空！"
	      	  return false;
	        }
	        canload = false;
	      	main.saveComment(vm.msg,curMember.memberId,function(dt){
				if(dt.status == 200){
					vm.msg = ""
					vm.showpop = true;
				}else{
					vm.tips = dt.message
				}
				canload = true;
				vm.tips = "";
			})
	    },
		closePop: function () {
			vm.showpop = false;
		}
	}
})

