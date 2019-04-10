var vm = new Vue({
	el:'#wrapper',
	data:{
		listA:[]
	},
	filters:{
		top:function(id){
			console.log(id)
			return 'img/top/'+id+'.png'
		}
	},
	methods: {
	    gotoVote: function (id) {
	      console.log(id)
	      var curMember

	      curMember = vm.listA[id]

	      localStorage.setItem("IDFTMessage_curMember",JSON.stringify(curMember))

	      main.hrefTo("sendmsg.html")
	    }
	}

})

getMemberList()

function getMemberList(){
	main.botMemberInfo(function(dt){
		vm.listA = dt.content
	})
	
}

