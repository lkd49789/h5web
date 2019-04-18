var vm = new Vue({
	el:'.wrapper',
	data:{
		info:[]
	},
	filters:{
		top:function(id){
			
		}
	},
	methods: {
		gotoDownLoad:function(){
			console.log("download")
			downLoadPocketApp();
		}
	}

})

//getInfo()
function getInfo(){
	$.ajax({
        url:  CONFIG.getLink()+"api/activity/swimsuit/v1/money",
        type: "POST", 
        async:true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (request) {
             request.setRequestHeader("token", main.getToken());
        },
        data: JSON.stringify({

        }),
        timeout: 15000, 
        dataType:"json",
        success: function (data) { 
            succ(data)
        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
        } 
    });
	
}

