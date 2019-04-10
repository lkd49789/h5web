/*
音频播放对象
url:音频地址
auto(true/false):是否自动播放
-------------------------------------------
AUDIO.init(url,auto);初始化

AUDIO.toggle()//播放状态切换
*/




(function(data) {
	
	var audio;
	data.init = function(url,auto){
		audio = new Audio();
	    audio.src = url;
	    audio.oncanplay = function() {
	        if (auto) {
	            audio.play();
	        }
	    }
	    audio.onended = function() {
	        audio.play();
	    }
	    audio.load();
	}
    
    data.toggle = function(){
        if (audio.paused) {
            audio.play();
        }else {
            audio.pause();
        }
    }
    
}(window.AUDIO = {}));


