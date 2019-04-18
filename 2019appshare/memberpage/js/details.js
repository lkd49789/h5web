
//分享全局变量
var shareTitlestr="";
var shareDesc="";
var shareLink="";
var thumbLink=localStorage.getItem("sharePath");
var shareTitle="";

var flag = false;
var lastTime = 0;
var _material_type = GetQueryString("material_type");
var _material_id = GetQueryString("material_id");
var _type = "";
if(_material_type==0){
    _type="ARTICLE";
    shareTitlestr="公社图文区";
    shareLink="https://h5.48.cn/2017appshare/gs_dynamic/index.html?id="+_material_id;
    shareTitle="ARTICLE";
}else if(_material_type==1){
    _type="PICTURE";
    shareTitlestr="公社图片去";
    shareLink="https://h5.48.cn/2017appshare/gs_article/index.html?id="+_material_id;
    shareTitle="PICTURE";
}else if(_material_type==2){
    _type="MUSIC";
    shareTitlestr="公社音频区";
    shareLink="https://h5.48.cn/2017appshare/gs_music/index.html?id="+_material_id;
    shareTitle="MUSIC";
}else if(_material_type==3){
    _type="VIDEO";
    shareTitlestr="公社视频区";
    shareLink="https://h5.48.cn/2017appshare/gs_video/index.html?id="+_material_id;
    shareTitle="VIDEO";
}else{
}

var c_li = '<li class="mui-table-view-cell mui-media">'+
'                    <img class="mui-media-object mui-pull-left" src="{{avata}}">'+
'                    <div class="mui-media-body">'+
'                        <p><span class="mui-tit">{{nickName}}</span><span class="mui-date">{{ctime}}</span><p>'+
'                        <p class="mui-ellipsis">{{content}}</p>'+
'                    </div>'+
'                </li>'

if(_material_type==0){//图文
    main.getArticle(_material_id,function(dt){
        /*console.log(dt);*/
        if(dt.status == 200){
            $('.de_content').show();
            $('.content1 h4').html(dt.content.data.title);//标题
            shareDesc=dt.content.data.title;
            $('.de_content').html(dt.content.data.content);//内容
            $('.de_content img').css({'max-width':'100%'});//内容里的图片
            headUserMsg(dt);//用户信息
            gratuity(dt);//打赏
            ifhasPraise(dt);//是否点赞
            badge(dt);//徽章等级
            memberRelated(dt);//相关成员
            tagsRelated(dt);//相关标签 
        }else{
            main.alert(dt.message);
        }
    })
    setTimeout(function(){
        getComments();
    },1000)
    wxshare();
}else if(_material_type==1){//图片
    main.getPicture(_material_id,function(dt){
        /*console.log(dt);*/
        if(dt.status == 200){
            $('.imginfo').show();
            $('.content1 h4').html(dt.content.data.title);//标题
            shareDesc=dt.content.data.title;
            var html=[];
            $.each(dt.content.data.picInfo,function(index,dl){//图片内容

                html.push('<span><img src="'+main.formatCover(dl.path)+'" data-preview-src="" data-preview-group="1"></span>');
            })
            $('.imginfo').append(html.join(""));
            var imginfoWith = $('.imginfo').width()-15;
            $('.imginfo span').css({'width':imginfoWith/3,'height':imginfoWith/3});
            gratuity(dt);//打赏
            ifhasPraise(dt);//是否点赞
            headUserMsg(dt);//用户信息
            badge(dt);//徽章等级
            memberRelated(dt);//相关成员
            tagsRelated(dt);//相关标签
        }else{
            main.alert(dt.message);
        }
    })
    setTimeout(function(){
        getComments();
    },1000)
    wxshare();
}else if(_material_type==2){//音乐
    main.getMusic(_material_id,function(dt){
        /*console.log(dt);*/
        if(dt.status == 200){
            $('.music_box,.smcontent').show();
            $('.icon_eye img').attr('src','img/icon_eyelook.png');
            $('.music_box').height($('.music_box').width()/1.93);
            $('.music_box').css('background-image','url('+main.formatCover(dt.content.data.previewPath)+')');
            $('#audioPlay').attr('src',main.formatCover(dt.content.data.musicPath));
            musicPlay();//播放音乐
            $('.content1 h4').html(dt.content.data.title);//标题
            shareDesc=dt.content.data.title;
            $('.smcontent').html(dt.content.data.content);//音乐小简介
            gratuity(dt);//打赏
            ifhasPraise(dt);//是否点赞
            headUserMsg(dt);//用户信息
            badge(dt);//徽章等级
            memberRelated(dt);//相关成员
            tagsRelated(dt);//相关标签
        }else{
            main.alert(dt.message);
        }
    })
    setTimeout(function(){
        getComments();
    },1000)
    wxshare();
}else if(_material_type==3){//视频
    main.getVideo(_material_id,function(dt){
        /*console.log(dt);*/
        if(dt.status == 200){
            $('#news_media_vid,.smcontent').show();
            $("#news_media_vid").html("<video id='vidbox' src='" + main.formatVideo(dt.content.data.videoPath) +"' poster='"+main.formatCover(dt.content.data.previewPath)+"' width='100%' height='auto' controls='controls'></video>");
            $('.content1 h4').html(dt.content.data.title);//标题
            shareDesc=dt.content.data.title;
            $('.smcontent').html(dt.content.data.content);//视频小简介
            gratuity(dt);//打赏
            ifhasPraise(dt);//是否点赞
            headUserMsg(dt);//用户信息
            badge(dt);//徽章等级
            memberRelated(dt);//相关成员
            tagsRelated(dt);//相关标签
        }else{
            main.alert(dt.message);
        }
    })
    setTimeout(function(){
        getComments();
    },1000)
    wxshare();
}


//点赞
$('.vidzan').on('click',function(){
    main.getPraise(_type,_material_id,function(dt){
        if(dt.status==200){
            if(localStorage.getItem("hasPraise") == false || localStorage.getItem("hasPraise") == "false"){
                $('.vid_1 img').attr('src','img/icon_zan.png');
                $('.zan_num').html(parseInt(localStorage.getItem("zan_num"))+1);
                $('.zanMask').show();
                $('.zanMask').html('点赞成功，经验值+1');
                setTimeout(function(){
                    $('.zanMask').hide();
                    localStorage.setItem("hasPraise",true);
                },1000)
            }else{
                $('.zanMask').html('已点赞').show();
                setTimeout(function(){
                    $('.zanMask').hide();
                },1000)
            }
        }else{
           main.alert(dt.message);
        }
    })
})

//分享
$('.vidshare').on('click',function(){
    $('.sharePage').show();
})
$('.sharePage').click(function(){
    $(this).hide();
})
//返回
$(".btn-back").click(function(){
    window.history.back()
})

function ifhasPraise(dt){//是否点过赞
    if(dt.content.hasPraise==true){
        $('.vid_1 img').attr('src','img/icon_zan.png');
    }
    localStorage.setItem("hasPraise",dt.content.hasPraise);
}

function musicPlay(){//音乐区域播放和暂停
    $('.icon_play').click(function(){
        $("#audioPlay")[0].play();
        $(this).hide();
        $('.icon_push').show();
    })
    $('.icon_push').click(function(){
        $("#audioPlay")[0].pause();
        $(this).hide();
        $('.icon_play').show();
    })
}

function headUserMsg(dt){//用户信息
    $('.head').css("background-image","url("+CONFIG.getSource()+dt.content.userInfo.avatar+")");
    $('.name').html(dt.content.userInfo.nickName);
    $('.date').html(getDate(dt.content.data.ctime));
}


function badge(dt){ /*徽章等级类*/
    // $('.icon_grade').html('lv'+dt.content.userInfo.level);
    if(dt.content.userInfo.ugcBadgePicPath){
        $('.grades').append('<img src='+CONFIG.getSource()+dt.content.userInfo.ugcBadgePicPath+' class="icon_beg">');
    }
    if(dt.content.userInfo.achievementPicPath){
        $('.grades').append('<img src='+CONFIG.getSource()+dt.content.userInfo.achievementPicPath+' class="icon_beg">');
    }
}

function gratuity(dt){/*打赏区*/
    $('.icon_eye em').html(dt.content.data.watchNum);//观看人数
    $('.icon_hotsm em').html(dt.content.data.hotNum);//热度
    $('.zan_num').html(dt.content.data.praiseNum);//点赞数
    $('.share_num').html(dt.content.data.shareNum);//分享数
    $('.chick_num').html(dt.content.data.awardsNum);//打赏的鸡腿数
    localStorage.setItem("zan_num",dt.content.data.praiseNum);
    localStorage.setItem("share_num",dt.content.data.shareNum);
}


function memberRelated(dt){//相关成员
    var dataTag = eval('(' + dt.content.data.tag + ')');
    $.each(dataTag,function(n,value){
        var trs ="";
        trs+='<span>'+value.name+'<img src="img/icon_sanjiao.png" class="icjiao"></span>';
        $('.vid1 .label').append(trs);
    })
}

function tagsRelated(dt){//相关标签
    if(dt.content.data.cTag){
        var datacTag = eval('(' + dt.content.data.cTag + ')');
        datacTag = datacTag[0].split(',');
        var cTrs = "";
        for(var i=0;i<datacTag.length;i++){
            cTrs+='<span>'+datacTag[i]+'<img src="img/icon_sanjiao.png" class="icjiao"></span>';
        }
        $('.vid2 .label').append(cTrs);
    }
}



function getComments(){//评论列表
    main.getComments(lastTime,_material_id,_type,function(dt){
        /*console.log(dt);*/
        if(dt.status == 200){
            if(dt.content.data){
                var html = '';
                $.each(dt.content.data, function(i,info){
                    var img_li = c_li;
                    img_li = img_li.replace("{{avata}}",CONFIG.getSource()+info.avatar);
                    img_li = img_li.replace("{{nickName}}",info.nickName);
                    img_li = img_li.replace("{{ctime}}",getDate(info.ctime));
                    img_li = img_li.replace("{{content}}",info.content);
                    html += img_li;
                    lastTime = info.ctime;
                })
                $(".contentlist").append(html);
            }

            if(dt.content.data.length == 0){
                flag = true;
            }
        }
    })
}





/*-----------------------------------------------上拉加载-------------------------------------------------------------*/
mui.init();
(function($) {
    //阻尼系数
    var deceleration = mui.os.ios?0.003:0.0009;
    $('.mui-scroll-wrapper').scroll({
        bounce: false,
        indicators: true, //是否显示滚动条
        deceleration:deceleration
    });
    $.ready(function() {
        //循环初始化所有下拉刷新，上拉加载。
        $.each(document.querySelectorAll('.mui-scroll'), function(index, pullRefreshEl) {
            $(pullRefreshEl).pullToRefresh({
                up: {
                    callback: function() {
                        var self = this;
                        setTimeout(function() {
                            getComments();
                            self.endPullUpToRefresh(flag);
                        }, 1000);
                    }
                }
            });
        })
    });
})(mui);

window.addEventListener('touchmove',function(e){e.preventDefault();});


mui.previewImage();//图片大图浏览

//时间戳转换
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

