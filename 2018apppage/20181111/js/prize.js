var double11_2018;//用户数据
var canload = true;
var mainVM = new Vue({
    el: '#main-wrapper',
    data: {
        mainData:[]
    },
    methods: {
        doDraw:function(times){
            draw(times)
        },
        close:function(){
            $(".msk").hide()
        },
        gotoList:function(){
            main.hrefTo("list.html")
        }
    }
});

init();

function init(){
    double11_2018 = JSON.parse(localStorage.getItem("double11_2018"));
    mainVM.mainData = double11_2018;
}

function draw(_times){
    if(mainVM.mainData.drawNum < _times){
        main.alert("你的抽奖次数不足，请先充值！")
        return false;
    }
    if(!canload){
        return false;
    }else{
        canload = false;
    }
    main.draw(_times,function(dt){
        if(dt.status == 200){
            getImgList(dt.content)
            refresh()
        }else{
            main.alert(dt.message)
        }

        canload = true
    })
}

//抽取结果
function getImgList(dt){
    var img_w;
    if(dt.length == 1){
        img_w = 55;
    }else{
        img_w = 18.5;
    }
    
    var html = ""
    $.each(dt,function(i,card){
        html += '<img style="width:'+img_w+'%;" src="images/card'+card+'.png">'
    })
    $(".msk ul").html(html);
    $(".msk").fadeIn()
}
function refresh(){
    main.getUserInfo(function(dt){
        if(dt.status == 200){
            var double11_2018 = JSON.parse(localStorage.getItem("double11_2018"));
            mainVM.mainData = double11_2018;
        }else{
            //main.alert(dt.message)
        }
    })
}
