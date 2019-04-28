var vm = new Vue({
	el:'.wrapper',
	data:{
		cannotdown:false   //是否可下载专辑 true 不可下载   false可下载
	},
	mounted: function () {
		console.log("mounted")
		getRanking()
	},
	filters:{
		time:function(_time){
			return ''
		}
	},
	methods: {
		gotoDown: function () {
			if(this.cannotdown){
				return false;
			}else{
				console.log("candownload")
			}
	    },
	    gotoBuy: function () {
	      gotoPage("buy.html")
	    }
	}
})

//getRanking()
function getRanking(){
	main.getList(function(dt1){
		if(dt1.status == 200){
			vm.over = dt1.content.status
			vm.date = dt1.content.date
			//vm.over = true
			vm.listB = dt1.content.swimRankList
		}
	})
}
function gotoPage(_url){
	var url = _url
	if(url.indexOf("http://")>=0 ||url.indexOf("https://")>=0){
        
    }else{
        url = CONFIG.geturl()+url
    }
	snhOpenWebUrl(url)
}