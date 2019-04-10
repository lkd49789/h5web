var vm = new Vue({
	el:'.wrapper',
	data:{
		list:[],
		local:''
	},
	filters:{
		time:function(_time){
			return formatDate(_time)
		}
	},
	methods: {
	    gotoSubmit: function () {//跳转提交页
	      	snhOpenWebUrl(CONFIG.getURL()+"bug_report.html")
	    },
	    gotoDetail: function (id) {//跳转详情页
	      	snhOpenWebUrl(CONFIG.getURL()+"detail.html?id="+id)
	    }
	}

})

getList()
function getList(){
	if(checkLoginApp()){
		main.getList(function(dt){
			if(dt.status == 200){
				vm.list = dt.content
			}
		})
	}else{
		main.getList1(function(dt){
			if(dt.status == 200){
				vm.list = dt.content
			}
		})
	}
}

setInterval(function(){
	console.log(localStorage.getItem("FEEDBACK_APP_NEW"))
	//alert(localStorage.getItem("FEEDBACK_APP_NEW"))
	//vm.local = localStorage.getItem("FEEDBACK_APP_NEW")
	if(localStorage.getItem("FEEDBACK_APP_NEW") == "1"){
		
		getList()
		localStorage.setItem("FEEDBACK_APP_NEW","0")
	}
},1000)
//snhOpenWebUrl(CONFIG.geturl()+_url)