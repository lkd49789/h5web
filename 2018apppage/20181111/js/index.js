//init
var mainVM = new Vue({
    el: '#main-wrapper',
    data: {
        mainData:{
            bejCard: 0,
            ckgCard: 0,
            dwCard: 0,
            gnzCard: 0,
            shyCard: 0,
            snhCard: 0,
            wzCard: 0
        },
        prizeData:[]
    },
    methods: {
        gotoRecharge:function(){
            if(checkFromApp()){
                console.log("app")
                window.web.gotoPage("recharge/detail")
            }else{
                console.log("web")
                window.location.href = "http://h5.snh48.com/snh48/user_v3/"
            }
            
        },
        gotoPrize:function(){
            main.hrefTo("prize.html")
        },
        gotoList:function(){
            if(checkFromApp()){
                main.hrefTo("list.html")
            }else{
                if(checkLogin()){
                    main.hrefTo("list.html")
                }else{
                    $(".login-wrapper").show();
                }
            }
        },
        gotoRule:function(){
            main.hrefTo("rule.html")
        },
        gotoTop:function(){
            main.hrefTo("top.html")
        },
        showLogin:function(){
            
            $(".login-wrapper").show();

        },
        closeLogin:function(){//关闭登录框
            $(".login-wrapper").hide();
        },
        gotoLogin:function(){//提交登录
            if($(".phonenum").val() == "" ){
                showTip("请输入手机号码！")
                return false;
            }
            if($(".phonenum").val().length < 8){
                showTip("请输入正确的手机号码！")
                return false;
            }
            if($(".password").val() == ""){
                showTip("请输入密码！")
                return false;
            }
            main.logIn($(".phonenum").val(),$(".password").val(),function(dt){
                if(dt.status == 200){
                    $(".login-wrapper").hide();
                    localStorage.setItem("token_20181111",dt.content.token);
                    init()
                }else{
                    showTip(dt.message)
                }
            })
        }
    }
});


$(".btn-goto-login").hide();
//
if(checkFromApp()){
    init()
}else{
    if(checkLogin()){
        init()
    }else{
        $(".btn-goto-login").hide();
        $(".btn-show-login").show();
    }
}


function checkLogin(){
    var token = localStorage.getItem("token_20181111")
    if(token == null || token ==undefined){
        console.log("not login")
        return false;
    }else{
        console.log("is login")
        return true;
    }
}

function init(){
    main.getUserInfo(function(dt){
        if(dt.status == 200){
            
            $(".btn-goto-login").show();
            //$(".btn-show-login").hide();

            refreshUinfo()
        }else if(dt.status == 401){
            $(".login-wrapper").show();
        }else{
            main.alert(dt.message)
        }

        getBigPrizeList()
    })
}
//大奖记录
function getBigPrizeList(){
    main.getBigPrizeList(0,function(dt){
        if(dt.status == 200){
            mainVM.prizeData = dt.content;
            setTimeout(function(){
                scrollList()
            },1000)
            
        }
    })
}
//刷新用户信息
function refreshUinfo(){
    setInterval(function(){
        var double11_2018 = JSON.parse(localStorage.getItem("double11_2018"));
        mainVM.mainData = double11_2018;
        console.log(double11_2018.drawNum);
    },1000)
}

function showTip(str){
    $(".warning").css("opacity",1).html(str);
}



function scrollList(){
    console.log("scrollList")
    var offset=0;
    var dis = $('.list-box ul').height();
    var speed=50;
    $('.list-box ul').clone().appendTo($('.list-box .scroll-box') )
    setInterval(function(){
        if(offset >= dis) {
            offset = 0;
        }
        offset ++;
        $('.list-box .scroll-box').css("margin-top", offset*-1+ "px")
    },speed);
}






function getDate(ns) {  
    var test = new Date(parseInt(ns));  
    var $_year = test.getFullYear();  
    var $_month = parseInt(test.getMonth())+1;  
    var $_day = test.getDate();
    var $_hours = test.getHours();
    
    if(test.getMinutes()<10 ){
        var $_minutes = "0"+test.getMinutes();
    }else{
         var $_minutes = test.getMinutes();
    }
    
    if( test.getSeconds()<10 ){
        var $_seconds = "0"+ test.getSeconds();
    }else{
        var $_seconds = test.getSeconds();
    }

    return  $_year +"-"+$_month+"-"+$_day+" "+$_hours+":"+$_minutes+":"+$_seconds;  
}


Vue.filter('timeFormat', function (ctime) {
  return getDateFormat(ctime);
});

Vue.filter('prizeName', function (pname) {
  if(pname == 1){
    return '5张SNH48 Group团卡'
  }else if(pname == 2){
    return '锦鲤五折卡'
  }else if(pname == 3){
    return '锦鲤袋王卡'
  }
});
Vue.filter('getType', function (pname) {
  if(pname == 1){
    return '集齐了'
  }else{
    return '抽中了'
  }
});


