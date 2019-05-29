$(function (){
    surplusNum();

    var rotateTimeOut = function (){
        $('#rotate').rotate({
            angle:0,
            animateTo:2160,
            duration:8000,
            callback:function (){
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    var bRotate = false;

    var rotateFn = function (awards, angles, txt,emourl){
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle:0,
            animateTo:angles+1800,
            duration:8000,
            callback:function (){
                if(awards==5 || awards=="5"){
                    $('.icon_prize').css('width','30%');
                    $('.icon_prize').attr('src',emourl);
                }else{
                     $('.icon_prize').attr('src','images/icon_'+awards+'.png');
                }
               /* $('.icon_prize').attr('src','images/icon_'+awards+'.png');*/
                $('.text').html('恭喜您抽中'+txt);
                $('.mask,.window').show();
                surplusNum()
                bRotate = !bRotate;
            }
        })
    };

    $('.pointer').click(function (){
        //alert("aaa")
        if(bRotate)return;

        main.luckDraw(function(dt){
            console.log(dt);
            if(dt.status == 200){
               switch (dt.gift_id) {
                    case 0:
                        rotateFn(0, 220, '总选演唱会门票');
                        break;
                    case 1:
                        rotateFn(1, 270, '9折鸡腿券');
                        break;
                    case 2:
                        rotateFn(2, 315, '10个鸡腿');
                        break;
                    case 3:
                        rotateFn(3, 360, '8折鸡腿券');
                        break;
                    case 4:
                        rotateFn(4, 40, '5个鸡腿');
                        break;
                    case 5:
                        rotateFn(5, 85, '表情包',dt.emoji_id);
                        break;
                    case 6:
                        rotateFn(6, 125, '20个鸡腿');
                        break;
                    case 7:
                        rotateFn(7, 175, '9.5折鸡腿券');
                        break;
                }

                console.log(dt.gift_id);

            }else if(dt.status == 409){//没有抽奖机会了
                main.alert("您没有抽奖机会");
            }else{
                main.alert(dt.message);
            }
        })

       
        //  [40,85,125,175,220,270,315,360]//旋转的角度

    });



    $('.btn-click').on('click', function() {
            $('.mask').hide();
            $('.window').hide();
        });
});

function rnd(n, m){
    return Math.floor(Math.random()*(m-n+1)+n)
}


//还有几次抽奖机会
function surplusNum(){
    main.surplusNum(function(dt){
        //alert(dt.message);
        if(dt.status==200){
            $('.numCh').html(dt.message);
        }else{
            main.alert(dt.message);
        }
    })
}


function ifDownload(){
    main.ifDownload(function(dt){
        if(dt.status==200){
           if(dt.content.canDownload==false || dt.content.canDownload=="false"){
                $('.loadmask').show();
                $('.upbox p').html('请到SNH48总选投票页面购买电子EP获取下载资格');
           }else{
                $('.loadmask').show();
                $('.upbox h4').show();
                $('.upbox p').html('https://vote.48.cn/resource/FileRecv.rar');
           }
        }else{
            main.alert(dt.message);
        }
    })
}


$('.download').click(function(){
    ifDownload();
})

$('.know').click(function(){
    $('.loadmask').hide();
})

