var cH = document.documentElement.clientHeight;
var cW = document.documentElement.clientWidth;
$('.play-box').css('height',cH-$(".download-up").height());
// $('#video').css('width',(cH-65)*9/16)
var vm = new Vue({
	el:'.wrapper',
	data:{
		cover:true,
		infoData:[]
	},
	filters:{
		imgpath:function(_url){
			return CONFIG.getImgSource()+_url;
		},
		videopath:function(_url){
			//return _url.replace(".flv",".m3u8")
			//return CONFIG.getVideoSource()+_url;
		}
	},
	methods: {
		playvideo:function(){
			vm.cover = false;
			console.log("playvideo")
			document.querySelector("#video").currentTime=0;
			document.querySelector("#video").play();
		},
		gotoDownLoad:function(){
			console.log("download")
			downLoadPocketApp();
		}
	}
})
console.log(cH)


var appInfo = '{"vendor":"apple","deviceName":"iPhone 8Plus","deviceId":"123","appVersion":"0.0.1","appBuild":"1","osType":"ios","osVersion":"ios 10.3.3","longitude":1.033,"latitude":1.033}'
getInfo(GetQueryString("id"))
//312700548644872192
function getInfo(_id){
	$.ajax({
        url:  CONFIG.getLivePath()+"/api/v1/live/getLiveOne",
        type: "POST", 
        async:true,
        contentType: "application/json; charset=utf-8",
        // beforeSend: function (request) {
        // 	request.setRequestHeader("appInfo", appInfo);
        // },
        data: JSON.stringify({
        	"liveId":_id,
        }),
        timeout: 15000, 
        dataType:"json",
        success: function (data) { 
        	if(data.status == 200){
	            var tepData = data.content
	            vm.infoData = tepData
	        }else{
                alert(data.message)
            }
        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
        } 
    });
	
}

