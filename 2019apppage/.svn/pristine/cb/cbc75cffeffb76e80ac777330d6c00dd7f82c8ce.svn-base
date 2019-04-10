var vm = new Vue({
	el:'.wrapper',
	data:{
		options:[1,5,2,6,3,7,8],
		txt:['冠军队完赛用时','冠军单项成绩','冠军队完赛用时','冠军总环数','决赛用时','横杆掉落次数','第一次缩圈淘汰人数']
	},
	filters:{
		img:function(_id){
			return 'img-champion/option'+_id+'.png'
		}
	},
	methods: {
		
	    gotoGame:function(_game){
	    	gotoPage('seer'+(_game+1)+'.html?id='+vm.options[_game])
	    	
	    },
	    closePop:function(){//关闭弹框
	    	vm.showpop = 0;
	    }
	}

})


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
}