
var userId = main.getLogInUserId();
main.getUserMsg(userId,false,false,false,function(dt){
	console.log(dt);
	if(dt.status==200){
		$('.userhead').css({'background-image':'url('+CONFIG.getSource()+"/resize_150x150"+dt.content.userInfo.avatar+')'})
		localStorage.setItem("userAvatar",CONFIG.getSource()+"/resize_150x150"+dt.content.userInfo.avatar);
		$('.user-nikename').html(dt.content.userInfo.nickName);
		localStorage.setItem("userNikename",dt.content.userInfo.nickName);
		$('.user-nember').html('口袋号：'+dt.content.userInfo.userId);
		$('.dengji em').html(dt.content.userInfo.level);
		//缓存用户信息更新
		var u_info = JSON.parse(localStorage.getItem("POCKET48_USER_INFO"));
		u_info.content.userInfo = dt.content.userInfo;
		localStorage.setItem("POCKET48_USER_INFO",JSON.stringify(u_info));
	}
})

$('.lockbtn').click(function(){//修改密码
	main.hrefTo('reset.html?from=usercenter');
});

$('.namebtn').click(function(){//修改昵称
	main.hrefTo('nickname.html?from=usercenter');
});

$('.headbtn').click(function(){//修改头像
	main.hrefTo('uploadHead.html?from=usercenter');
});

$('.outbtn').click(function(){//退出登录
	localStorage.removeItem("POCKET48_USER_INFO");
	main.hrefTo("index.html?mid="+localStorage.getItem("CUR_MEMBER_ID"));
})
//返回主页
$('.btn-back').click(function(){
	main.hrefTo("index.html?mid="+localStorage.getItem("CUR_MEMBER_ID"));
});
