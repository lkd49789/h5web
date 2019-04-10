var url = "https://h5.48.cn/2019apppage/apphelp/"

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

		gotoPage:function(page){

			console.log(page+page)

			snhOpenWebUrl(url+page)

		},
		gotoAppPage:function(page){
			console.log(page)
			//dsBridge.call("snhOpenRouterPage",page)
			snhOpenWebUrl('https://h5.48.cn/2019apppage/feedback/index.html')

		}

	}



})

