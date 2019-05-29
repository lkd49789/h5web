//收听电台
    $('.btn1').click(function(){
        if(checkFromApp()){
            musicPlay("440")
        }else{//下载口袋app
            window.location.href="http://app.48.cn";
        }
    })
    //参加互动
    $('.btn2').click(function(){
        if(checkFromApp()){
            window.web.launchWechatMiniProgram(launchParams());
        }else{//下载口袋app
            window.location.href="http://app.48.cn";
        }
    })

    //音频详情页
    function musicPlay(id){
        window.web.gotoPage('nighttalk/detail?id='+id);
    }


    //跳转详情页
    function launchParams() {
        var param = {"defaultDetailsParam": {"infoId": 3300}}//后台素材id
        var para = encodeURIComponent(JSON.stringify(param));
        return JSON.stringify({
            id: "gh_dc1ce10e9cd3",
            path: "pages/detail/detail?para="+para,
            type: 'release',  //test（开发版），trial（体验版），release（正式版）
            callback: "launchCallback"
        })
    }