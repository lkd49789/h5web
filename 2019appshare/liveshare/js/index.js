var vm = new Vue({
	el:'.wrapper',
	data:{
		infoData:[]
	},
	filters:{
		imgpath:function(_url){
			return CONFIG.getImgSource()+_url;
		},
		videopath:function(_url){
			return CONFIG.getVideoSource()+_url;
		}
	},
	methods: {
		gotoDownLoad:function(){
			console.log("download")
			downLoadPocketApp();
		}
	}

})

var appInfo = '{"vendor":"apple","deviceName":"iPhone 8Plus","deviceId":"123","appVersion":"0.0.1","appBuild":"1","osType":"ios","osVersion":"ios 10.3.3","longitude":1.033,"latitude":1.033}'
getInfo(GetQueryString("id"))
function getInfo(_id){
	console.log(_id)
	$.ajax({
        url:  CONFIG.getLivePath()+"/api/v1/live/getOpenLiveOne",
        type: "POST", 
        async:true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (request) {
        	// request.setRequestHeader("appInfo", appInfo);
        },
        data: JSON.stringify({
        	"liveId":_id,
        }),
        timeout: 15000, 
        dataType:"json",
        success: function (data) { 
            if(data.status == 200){
                var tepData = data.content
             //    if(tepData.liveJoiners.length > 0){
            	// 	var liveJoiners = tepData.data.joinMemberNames.split(",")
            	// 	tepData.data.joinMemberNames = joinMemberNames
            	// }
                vm.infoData = tepData
            }else{
                alert(data.message)
            }
        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
        	console.log(textStatus)
        } 
    });
	
}


