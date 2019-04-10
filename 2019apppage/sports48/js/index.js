// snhReloadPage()

var vm = new Vue({
	el:'.wrapper',
	data:{
		showpop:0 //0 关闭  1.全场指定预言家 2.吐槽实体化 4百万应援墙  5粉丝应援挑战计划 6.冠军竞猜
	},
	filters:{
		time:function(_time){
			return ''
		}
	},
	methods: {
	    gotoRule: function (id) {
	      vm.showpop = id;
	    },
	    gotoPage: function (id) {
	      if(id == 1){//全场指定预言家
	      	gotoPage('seer.html?needlogin=1')
	      }else if(id == 2){//吐槽实体化
	      	gotoPage('speak.html?needlogin=1')
	      }else if(id == 3){//VIP专属直播间
	      	gotoPage('vip.html?needlogin=1')
	      }else if(id == 4){//百万应援墙
	      	gotoPage('https://1m.48.cn/preview.html')
	      }else if(id == 5){//粉丝应援挑战计划
	      	gotoPage('votemusic.html?needlogin=1')
	      }else if(id == 6){//冠军竞猜
	      	gotoPage('champion.html?needlogin=1')
	      }else if(id == 7){//粉丝应援排行榜TOP20
	      	gotoPage('ranking.html')
	      }
	    },
	    closePop:function(){
	    	vm.showpop = 0;
	    }
	}

})

//getRanking()
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
function gotoPage(_url){
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
	vm.showpop = 0;
}