var vm = new Vue({
	el:'.wrapper',
	data:{
		info:[]
	},
	filters:{
		top:function(id){
			
		}
	},
	methods: {
		gotoDownLoad:function(){
			console.log("download")
			downLoadPocketApp();
		}
	}

})

