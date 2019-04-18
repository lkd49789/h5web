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
		},
		formatData:function(_ctime){
            console.log(_ctime)
			return formatDate(_ctime);
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
        url:  CONFIG.getPostsPath()+"/api/v1/posts/details",
        type: "POST", 
        async:true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (request) {
             
        },
        data: JSON.stringify({
        	"needComment": true,
			"needViewer": true,
			"postId": _resId
        }),
        timeout: 15000, 
        dataType:"json",
        success: function (data) { 
            if(data.status == 200){
                var tepData = data.content
               // var tepData = tepData.replace(new RegExp(/xxx/g), "YYY")
             //    if(tepData.data.joinMemberNames != ""){
            	// 	var joinMemberNames = tepData.data.joinMemberNames.split(",")
            	// 	tepData.data.joinMemberNames = joinMemberNames
            	// }
                vm.infoData = tepData
                setTimeout(function(){
                	$.each($(".tiezi-info a"),function(i,adt){//@xxx 跳转成员主页
                		if($(adt).attr("href").indexOf("snh48://") ==0){
                			var id = $(adt).attr("href").split("://")[1];
                			$(adt).attr("href","https://h5.48.cn/2019appshare/memberpage/?id=")
                		}
                	})
                	$.each($(".tiezi-info img"),function(i,adt){//图片
                		if($(adt).attr("src").indexOf("/") ==0){
                			var url = $(adt).attr("src")
                			$(adt).attr("src","https://source.48.cn"+url)
                		}
                	})
                	$.each($(".tiezi-info video"),function(i,adt){//@视频
                		if($(adt).attr("src").indexOf("/") ==0){
                			var url = $(adt).attr("src")
                			$(adt).attr("src","https://source.48.cn"+url)
                		}
                	})
                },100)
            }else{
                alert(data.message)
            }
        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
        } 
    });
	
}


// var str = "<span>锵锵镪～～～✨</span><br /><br /><span>女子乐坊里的秋芸妹妹！</span><br /><br /><span>这孩子每天都傻乎乎的就知道乐，一定要和一涵一起加油努力生活哇～～！[嘻嘻] </span><br /><img width='2160' height='2880' src='/20181106/1541511229867TDl223436O.jpg' size='2225278' /><br /><img width='2160' height='2880' src='/20181106/1541511230569fW5iT4229A.jpg' size='1647701' /><br /><img width='2160' height='2880' src='/20181106/1541511231252goxlHA0Kc5.jpg' size='2089823' /><br /><img width='2123' height='2840' src='/20181106/1541511231913De0DReBiWU.jpg' size='2470450' />"
// var subStr=new RegExp("src='/","ig");
// var result=str.replace(subStr,"src='https://source.48.cn/")
// console.log(result)