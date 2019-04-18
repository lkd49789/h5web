var staticUrl = "https://source.48.cn";//图片资源地址
var mp3Url = "https://mp4.48.cn"//歌曲资源
//var lrcUrl = "../music/lrc/";//歌词
var lrcUrl = "https://source.48.cn"//歌词
var  title ;


function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
	
	
$.ajax({ 
    url:  CONFIG.getVideoPath()+"/api/media/v1/music",
    type: "POST", 
    async:false,
    contentType: "application/json; charset=utf-8",
    beforeSend: function (request) {
         
    },
    data: JSON.stringify({
    	"resId":GetQueryString("id")
    }),
    timeout: 15000, 
    dataType:"json",
    success: function (result) { 
		if (result.status == 200){
	    	// console.log(result);
			title = result.content.data.title;
			$("document").attr("title",result.content.data.title);
			$("h1").html(result.content.data.title);
			$("h2").html(result.content.data.joinMemberNames);
			$("#audio").attr("src",mp3Url + result.content.data.musicPath);
			lrcUrl += result.content.data.lyricPath; 
			console.log(lrcUrl);
			$(".bg").css("background-image","url(" + staticUrl + result.content.data.thumbPath + ")");
			$(".thumb").css("background-image","url(" + staticUrl + result.content.data.thumbPath + ")");
		}else{
			alert(result.message)
        }
    }, 
    error: function (jqXHR, textStatus, errorThrown) { 
        //alert("error"); 
    } 
});

var lyricContainer, 
			audio, 
			fragment, 
			lyric,
			playbtn,
			pausebtn,
			stopy,
			vy,
			per,
			defx,
			timer;
			
		
		function parseLyric(text) {
			var lines = text.split('\n'),
				pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
				result = [];
	
			var offset = getOffset(text);
	
			while (!pattern.test(lines[0])) {
				lines = lines.slice(1);
			};
			lines[lines.length - 1].length === 0 && lines.pop();
			lines.forEach(function(v, i, a) {
				var time = v.match(pattern),
				value1 = v.replace(pattern, '');
					time.forEach(function(v1, i1, a1) {
						
						var t = v1.slice(1, -1).split(':');
						result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]) + parseInt(offset) / 1000, value1]);
					});
			});
			
			result.sort(function(a, b) {
				return a[0] - b[0];
			});
			return result;
		}
		function getOffset(text) {
			var offset = 0;
			try {
				var offsetPattern = /\[offset:\-?\+?\d+\]/g,
					offset_line = text.match(offsetPattern)[0],
					offset_str = offset_line.split(':')[1];
				offset = parseInt(offset_str);
			} catch (err) {
				offset = 0;
			}
			return offset;
		}
		function resetNum(num)
		{
			if(num < 10){
				return "0"+num;
			}else{
				return num;
			}
		}
		window.onload = function() {
			
			//console.log("left>>"+document.getElementById('ap_progress').offsetLeft)
			lyricContainer = document.getElementById('lyricContainer');
			audio = document.getElementById('audio');
			
			//audio = document.getElementsByTagName("audio")[0]
			playbtn = document.getElementById("play");
			pausebtn = document.getElementById("pause");
			stopy = lyricContainer.style.top
			vy = lyricContainer.style.top
			defx = document.getElementById('ap_progress').offsetLeft
			//console.log(">>>"+lyricContainer.offsetTop)
			var request = new XMLHttpRequest();
				//request.open('GET', audio.src.replace('.mp3', '.lrc'), true);
				request.open('GET', lrcUrl, true);
				request.responseType = 'text';
				request.onload = function() {
					fragment = document.createDocumentFragment();
					lyricContainer.innerHTML = '';
					lyric = parseLyric(request.response);
					//console.log(request.response)
					lyric.forEach(function(v, i, a) {
						var line = document.createElement('p');
						line.id = 'line-' + i;
						line.textContent = v[1];
						fragment.appendChild(line);
					});
					lyricContainer.appendChild(fragment);
				};
				request.onerror = request.onabort = function(e) {
					lyricContainer.textContent = '!failed to load the lyric :(';
				}
       			request.send();
			playbtn.addEventListener("click", function(e)
			{
				
				//audio.addEventListener('click', function(e) {
				//console.log("audio is play")
				audio.play();
				
				playbtn.style.display='none';
				pausebtn.style.display='inline-block';
				//audio.click(function(){
				//console.log("click")
		 		
		  	});
			
			pausebtn.addEventListener("click", function(e)
			{
				console.log("audio is pause")
				audio.pause();
				pausebtn.style.display='none';
				playbtn.style.display='inline-block';
			})
			//}
			audio.onended = function(e)
			{
				pausebtn.style.display='none';
				playbtn.style.display='inline-block';
			}
			document.getElementById('ap_progress').onmouseup = function(e){
				if(e.clientX > defx && e.clientX<(defx+240))
				{
					audio.currentTime = audio.duration*(e.clientX-defx)/240
				}
				//console.log(e.clientX)
				clearInterval(timer);
				for(var j=0;j<lyric.length;j++){
					//console.log(lyric[j][0])
					if(lyric[j][0] > audio.currentTime){
						//MoveTime = lyric[j-1][0];
						lyricContainer.style.top = 30- j*30 + "px";
						break;
					}
				}
			}
			audio.addEventListener("timeupdate", function()
			{
			//audio.ontimeupdate = function(e) {
				
				if (!lyric) return;
				
				for (var i = 0, l = lyric.length; i < l; i++) {
					
					if (this.currentTime > lyric[i][0] - 0.10 ) {
					
							var line = document.getElementById('line-' + i),
							prevLine = document.getElementById('line-' + (i > 0 ? i - 1 : i));
						prevLine.className = '';
						line.className = 'current-line';
						//lyricContainer.style.top = 30 - line.offsetTop + 'px';
						stopy = 30 - line.offsetTop //+ 'px';
						lyricContainer.style.top = stopy + 'px';
						//歌词
						/*
						clearInterval(timer);
						timer = setInterval(function(){
							vy -= 1;
							if(vy <= stopy){
								clearInterval(timer);
							}else{
								lyricContainer.style.top = vy + 'px';
								
							}
						},10);*/
						document.getElementById('curtime').innerHTML = resetNum(Math.floor(audio.currentTime/60))+":"+resetNum(Math.floor(audio.currentTime%60));
						
						document.getElementById('totaltime').innerHTML = resetNum(Math.floor(audio.duration/60))+":"+resetNum(Math.floor(audio.duration%60));
						//console.log(audio.currentTime/audio.duration)
						per = audio.currentTime/audio.duration*100
						document.getElementById('ap-play-bar').style.width = per + "%";
						
						document.getElementById('drag').style.left = per*.95 + "%";
						
					}
				};
				
				
			});
			
		}

