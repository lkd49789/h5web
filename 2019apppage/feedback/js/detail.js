var vm = new Vue({
	el:'.wrapper',
	data:{
		info:[],
		imgs:[]
	},
	filters:{
		path:function(_img){

			return 'https://source.48.cn'+_img;
		},
		str:function(str){
			if(str == '' || str == null || str == undefined){
				return '暂未处理'
			}else{
				return str
			}
		}
	},
	methods: {
	    gotoSubmit: function () {//跳转提交页
	      	snhOpenWebUrl(CONFIG.getURL()+"bug_report.html")
	    },
	    gotoDetail: function () {//跳转详情页
	      	snhOpenWebUrl(CONFIG.getURL()+"detail.html")
	    }
	}

})

getDetail()
function getDetail(){
	if(checkLoginApp()){
		main.getDetail(GetQueryString("id"),function(dt){
			if(dt.status == 200){

				if(dt.content.faultScreenshots != null && dt.content.faultScreenshots != ''){
					var imgs = dt.content.faultScreenshots.split(";")
					var html = ''
					$.each(imgs,function(i,_img){
						html += '<img data-preview-src="'+_img+'" src="'+_img+'">'
					})
					$(".info div").html(html)
				}

				vm.imgs = imgs
				vm.info = dt.content
			}
		})
	}else{
		main.getDetail1(GetQueryString("id"),function(dt){
			if(dt.status == 200){

				if(dt.content.faultScreenshots != null && dt.content.faultScreenshots != ''){
					var imgs = dt.content.faultScreenshots.split(";")
					var html = ''
					$.each(imgs,function(i,_img){
						html += '<img data-preview-src="'+_img+'" src="'+_img+'">'
					})
					$(".info div").html(html)
				}

				vm.imgs = imgs
				vm.info = dt.content
			}
		})
	}
}

mui.previewImage();