var url = "https://h5.48.cn/2019apppage/apphelp/"

var vm = new Vue({

	el:'.wrapper',

	data:{

		info:[],
		roleId:0
	},

	filters:{

		top:function(id){

			

		}

	},

	methods: {

		gotoPage:function(page){

			console.log(page+page)

			snhOpenWebUrl(url+page)

		},
		gotoAppPage:function(page){
			console.log(page)
			//dsBridge.call("snhOpenRouterPage",page)
			snhOpenNewWebview('https://h5.48.cn/2019apppage/feedback/index.html')

		}

	}



})

if(checkFromNew()){
    var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
    vm.roleId = u_info.userInfo.roleId
    
}