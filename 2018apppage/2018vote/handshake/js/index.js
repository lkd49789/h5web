//登录
if(checkFromApp()){
    if(window.web.getLoginUserId() == "" || window.web.getLoginUserId() == null || window.web.getLoginUserId() == undefined){
        mui.alert("请先登录口袋48账号", '', function() {
            window.web.backHome();
        });
    }else{
        logInApp()
    }
}else{
    //window.location.href="http://app.snh48.com/"
    
    logInApp()
}
//app 登录
function logInApp(){
    main.logInApp(function(dt){
        //is_valid = dt.is_valid
        //localStorage.setItem("APP_USER_INFO_2017MEET",JSON.stringify(dt));//缓存app用户信息
        //localStorage.setItem("2017MEET_TOKEN",dt.token)
        //alert(dt.token)
        main.setUserInfo()//设置头像

        if(main.getValid() != 1){
            main.hrefTo("user.html")
        }
    })
}

//用户信息
$(".btn-info").click(function(){
	main.hrefTo("user.html")
})

//二维码
$(".btn-qrcode").click(function(){
    if(main.getValid() == 1){
        main.hrefTo("qrcode.html")
    }else{
        main.alert("请先提交您的个人信息！")
    }
})

//menu
$(".menu-wrapper li").click(function(){
    console.log($(this).index())
    var index = $(this).index()
    if(index <2){
        if(main.getValid() == 1){
            main.hrefTo($(this).attr("link"))
        }else{
            main.alert("请先提交您的个人信息！")
        }
    }else{
        main.hrefTo($(this).attr("link"))
    }
	
})