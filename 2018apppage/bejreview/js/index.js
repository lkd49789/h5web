

var picVM = new Vue({
    el: '#picList',
    data: {
        pic_list:[]
    },
    methods: {
       // 设置当前消息并打开消息详细页面
        jumpList: function (pic) {
          	var mid = pic.groupName;
          	main.hrefTo('vidlist.html?mid='+mid);
        } 
    }
});


//获取首页列表
main.getPicList(function(dt){
	//console.log(dt);
	if(dt.status==200){
		picVM.pic_list = dt.content;
	}else{
		main.alert(dt.message);
	}
})