var vm = new Vue({
	el:'.wrapper',
	data:{
		infoData:[]
	},
	filters:{
		
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
        url:  CONFIG.getTripPath()+"/api/trip/v1/list/detail",
        type: "POST", 
        async:true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (request) {
             
        },
        data: JSON.stringify({
        	"tripId":_resId
        }),
        timeout: 15000, 
        dataType:"json",
        success: function (data) { 
            if(data.status == 200){
                vm.infoData = data.content
            }else{
                alert(data.message)
            }
            

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
        } 
    });
	
}




