var shareTitlestr="2018口袋48年度报告",
	shareDesc="2018在口袋48写下了美好的回忆，2019也要一直喜欢SNH48 GROUP！",
	shareLink="https://h5.48.cn/2019wxpage/yearend/share.html",
	thumbLink="https://h5.48.cn/2019wxpage/yearend/img/thumb.jpg",
	shareTitle="yearend";


/*loading加载*/
var pictures = [
		"img/bg1.jpg",
		"img/bg2.jpg",
		"img/bg3.jpg",
		"img/bg4.jpg",
		"img/bg5.jpg",
		"img/bg6.jpg",
		"img/bg7.jpg",
		"img/bg8.jpg",
		"img/p1-icon1.png",
		"img/p1-icon2.png",
		"img/p1-title.png",
		"img/p2-1.png",
		"img/p2-2.png"
	];
var count = 0;
var total = pictures.length;
var word = ['一年有365天，所以聚聚要等365秒','开玩笑啦','但是时间是有点久','聚聚多等一下下','退出是禁止的哦~','刷新也是禁止的！','袋王口袋里的东西有点多','袋王的胳膊有点短','袋王找东西有点慢','袋王废话有点多','马！上！就！好！','呃···','还没好···','再来一次···']
var index = 0;
var token
if(checkFromApp()){
	token = window.web.getAccessToken()
}
getInfo()

function loadcount(){
    count += 1
    var per = Math.floor(count/total*100)+'%';
    $('.per').html(per);
};

function loadComplete(){
	//return false
	setTimeout(function(){
		$('.loading').remove();
		$('.sec').show();
		var mySwiper = new Swiper ('.swiper-container', {
			direction: 'vertical',
			nextButton:'.swiper-button-next',
		  	onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
			    swiperAnimateCache(swiper); //隐藏动画元素 
			    swiperAnimate(swiper); //初始化完成开始动画
		  	}, 
		  	onSlideChangeEnd: function(swiper){ 
		    	swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		    	// console.log(swiper.activeIndex);
		    	switch (swiper.activeIndex) {
		            case 0:
		            case 1:
		        }
		  	} 
		})
		var mySwiper1 = new Swiper('.p8-5', {
			onTap: function(swiper) {
				window.web.share("ALL",thumbLink,shareLink,shareTitlestr,shareDesc,"https://h5.48.cn/admin/sharecount.php?title=yearend",false);
			}
		})
	},500)
}


/*音乐*/

$(".btn-music").click(function(){
    if($(".btn-music").hasClass("music")){
        $(".btn-music").removeClass("music")
        $("#audioPlay")[0].pause()
    }else{
        $(".btn-music").addClass("music")
        $("#audioPlay")[0].play()
    }
});


function autoPlayAudio() {
        wx.config({
            // 配置信息, 即使不正确也能使用 wx.ready
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function() {
            var globalAudio=document.getElementById("audioPlay");
            globalAudio.play();
        });
	};
	// 解决ios音乐不自动播放的问题



/*分享*/
if(checkFromApp()) {
	document.body.addEventListener('touchstart', function(event) {
		if($(".btn-music").hasClass("music")){
			$("#audioPlay")[0].play()
		}
	})
	
	windowcont(shareTitle,"app");
}else{
	autoPlayAudio();
	
    windowcont(shareTitle,"wx");
}



function countPvApp(){
    $.get("https://h5.48.cn/admin/sharecount.php",{title: shareTitle,type:'app'},function(data){})
}


function getToken(){
	if(checkFromApp()){
		return token
	}else{
		return ""
		
	}
}

function getInfo(){
	//alert("getToken()--"+getToken())
	$.ajax({
		url:  "https://activity.48.cn/activity/api/report/v1/query",
        //url:  "http://192.168.0.22:8093/activity/api/report/v1/query",
        type: "POST",
        async:true, 
        beforeSend: function (request) {
            request.setRequestHeader("token", getToken());
        },
        contentType: "application/json; charset=utf-8",
        data:{},
        timeout: 150000,
        success: function (dt) {
			if(dt.status == 200){
				var vm = new Vue({
					el:'#info',
					data:{
						infoData:dt.content
					},
					filters:{
						communename:function(name){
							return name.split("/")[1]
						}
					}
				})
				loadAllImg(pictures,loadcount,loadComplete);
			}else{
				//alert("result:" + JSON.stringify(dt))
				setTimeout(function(){
					getInfo()
				},5000)
			}
        },
        error: function (jqXHR, textStatus, errorThrown) { 
        	window.web.backHome();
    //     	setTimeout(function(){
				// 	getInfo()
				// },5000)
            // alert("eee");
        } 
    });
}
//加载时候显示文本提示
showTip()
function showTip(){
	setTimeout(function(){
		$(".tip").html(word[index]).fadeIn()
		index += 1;
		if(index >= word.length){
			index = 0;
		}
		setTimeout(function(){
			$(".tip").fadeOut()
			showTip()
		},3000)
	},1000)
}