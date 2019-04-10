var vm = new Vue({
	el:'#wrapper',
	data:{
		listA:[],
		listB:[],
		page:0,
		over:false,
		date:""
	},
	filters:{
		top:function(id){
			console.log(id)
			return 'img/top/'+id+'.png'
		},
		menu1:function(menu){
			if(menu == 0){
				
				return 'img/btn1-active.png'
			}else{
				return 'img/btn1.png'
			}
			
		},
		menu2:function(menu){
			if(menu == 0){
				return 'img/btn2.png'
			}else{
				return 'img/btn2-active.png'
			}
		}
	},
	methods: {
		gotoRule:function(){
			main.hrefTo("rule.html")
		},
	    gotoVote: function (id) {
	      console.log(id)
	      var curMember
	      if(vm.page == 0){
	      	curMember = vm.listA[id]
	      }else{
	      	curMember = vm.listB[id]
	      }
	      localStorage.setItem("curMember",JSON.stringify(curMember))

	      main.hrefTo("pay.html")
	    },
	    choosePage1:function(){
	    	vm.page = 0;
	    },
	    choosePage2:function(){
	    	vm.page = 1;
	    }
	}

})

//getMemberList()
function getMemberList(){
	main.getAllMembers(function(dt){
		vm.listA = dt

		getRanking()
	})
	
}
getRanking()
function getRanking(){
	main.getRanking(function(dt1){
		if(dt1.status == 200){
			vm.over = dt1.content.status
			vm.date = dt1.content.date
			//vm.over = true
			vm.listB = dt1.content.swimRankList
		}
	})
}