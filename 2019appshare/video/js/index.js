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

getInfo(GetQueryString("id"))

function getInfo(_resId){
	$.ajax({
        url:  CONFIG.getVideoPath()+"/api/media/v1/video",
        type: "POST", 
        async:true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (request) {
             
        },
        data: JSON.stringify({
        	"resId":_resId //811
        }),
        timeout: 15000, 
        dataType:"json",
        success: function (data) { 
            if(data.status == 200){
                var tepData = data.content
                if(tepData.data.joinMemberNames != ""){
            		var joinMemberNames = tepData.data.joinMemberNames.split(",")
            		tepData.data.joinMemberNames = joinMemberNames
            	}
                vm.infoData = tepData
            }else{
                alert(data.message)
            }
        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
        } 
    });
	
}


