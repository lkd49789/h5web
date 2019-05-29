
var groupName = GetQueryString('mid');

var vidVM = new Vue({
    el: '#vidList',
    data: {
    	vidpic:'',
    	active1: false,
    	active2: false,
        vid_list:[]
    },
    methods: {
        toggleShow:function(event){
        	//console.log(this.vid_list);
        	$.each(this.vid_list, function(index,dl) {
        		if(dl.redDescripe && dl.whiteDescripe){
        			Vue.set(dl,'active1',true);
        			Vue.set(dl,'active2',true);
        		}else if(dl.redDescripe){
        			Vue.set(dl,'active2',true);
        			Vue.set(dl,'active1',false);
        		}else if(dl.whiteDescripe){
        			Vue.set(dl,'active1',true);
        			Vue.set(dl,'active2',false);
        		}else{}
        	})
        },
        giveLike:function(team,song){
       		// console.log("---------"+JSON.stringify(song))
       		// console.log("song.dzTeam---------"+song.dzTeam)

       		if(song.dzTeam==0){
       			main.savePraise(song.songId,team,function(dt){
	        		if(dt.status==200){
	        			if(team==2){//白队
	        				song.whitePraise+=1;
	        				song.dzTeam = 1;
	        			}else if(team==1){//红队
	        				song.redPraise+=1;
	        				song.dzTeam = 2;
	        			}else{}
	        			$('.zanclick').show();
	        			song.praiseStatus=false;
	        			setTimeout(function(){
	        				$('.zanclick').hide();
	        			},1000);
	        		}else{
	        			alert(dt.message);
	        		}
	        	})
       		}else{
       			main.alert("已点过赞")
       		}
        },
        playClick(){
        	
        }

    }
});


//获取视频列表
main.getVidList(groupName,function(dt){
	console.log(dt);
	if(dt.status==200){
		vidVM.vidpic=dt.content.topPic;//顶部图片
		vidVM.vid_list = dt.content.praiseInfos;
		vidVM.toggleShow();
	}else{
		main.alert(dt.message);
	}
})
