
var groupName = GetQueryString('mid');
var _songId = "";
var _dzTeam = "";
var flag=true;

$(function(){
    init();
})

function init(){

    getVidList();
    addListeners();

}


function addListeners(){

    //跳转评论
    $('.vidList').on('click','.comment',function(){
        var songid = $(this).attr('songid');
        localStorage.setItem('songname',$(this).attr('songname'));
        main.hrefTo("comment.html?songId="+songid);
    })

    //点赞
    $('.vidList').on('click','.zanbtn',function(){
        var _this = $(this);
        var zanNum = parseInt(_this.find('.zanNum').text());
        _songId = _this.attr('songid');
        _dzTeam = _this.attr('dzteam');
        var teamd = _this.attr('teamd');
        if(_dzTeam==0 || _dzTeam=="0"){
            if(flag==true){
                flag=false;
                main.savePraise(_songId,teamd,function(dt){
                    flag=true;
                    if(dt.status==200){
                        _this.addClass('zanColor');
                        _this.find('.zanNum').html(zanNum+=1);
                        $('.zanclick').show();
                        setTimeout(function(){
                            $('.zanclick').hide();
                        },1000)
                    }else{
                        main.alert(dt.message);
                    }
                })
            }
        }else{
            main.alert("您已点过赞");
        }
    })

    //通过名字跳转成员个人主页
    $('.vidList').on('click','.member_name em',function(){
        var mid = $(this).attr('mid');
        if(mid!=0 || mid!="0"){
            window.web.gotoPage('member/detail?id='+mid);
        }
    })

    //点击播放视频
    $('.vidList').on('click','.qu',function(){
        $(this).hide();
        $(this).parents('.vidbox').find('video').trigger('play');
        $(this).parents('li').siblings().find('video').trigger('pause');
        $(this).parents('li').find('video').removeClass('pause').addClass('play');
        $(this).parents('li').siblings().find('video').removeClass('play').addClass('pause');
    });

    $('.vidList').on('click','video',function(){
        if ($(this).hasClass('pause')) {
            $(this).trigger('play');
            $(this).parents('li').siblings().find('video').trigger('pause');
            $(this).parents('li').siblings().find('video').removeClass('play').addClass('pause');
            $(this).removeClass('pause').addClass('play');
        }else{
            $(this).trigger('pause');
            $(this).removeClass('play').addClass('pause');
        }
    })

}

function getVidList(){
    main.getVidList(groupName,function(dt){
        if(dt.status==200){
            $('.vidpic img').attr('src',dt.content.topPic);
            var html=[];
            $.each(dt.content.praiseInfos,function(index,dl){
                html.push('<li>');
                html.push('<p class="micName">'+dl.songName+'<span class="comment" songid='+dl.songId+' songname='+dl.songName+'><img src="img/icon_comment.png">评论<em>'+dl.commentNum+'</em></span></p>');
                html.push('<div class="vidbox">');
                html.push('<div class="video">');
                html.push('<video class="bofang" src="'+dl.videoPath+'" webkit-playsinline></video>');
                html.push('</div>');
                html.push('<div class="qu" style="background-image:url('+dl.picPath+')">');
                html.push('<img src="img/play.png" class="play">');
                html.push('</div>');
                html.push('</div>');
                html.push('<div class="msgbox">');
                if(!dl.redDescripe){
                    html.push('<p class="members">');
                    html.push(listName(dl.whiteDescripe));
                    html.push('<img src="img/team_white.png" class="teamimg">');
                    if(dl.dzTeam==0 || dl.dzTeam=="0"){
                        html.push('<button class="zanbtn" songid='+dl.songId+' dzteam='+dl.dzTeam+' teamd="2">');
                    }else{
                        html.push('<button class="zanbtn zanColor" songid='+dl.songId+' dzteam='+dl.dzTeam+' teamd="2">');
                    }
                    html.push('<img src="img/zanimg.png"/>');
                    html.push('<span class="zanNum">'+dl.whitePraise+'</span>');
                    html.push('</button>');
                    html.push('</p>');
                }else if(!dl.whiteDescripe){
                    html.push('<p class="members">');
                    html.push(listName(dl.redDescripe));
                    html.push('<img src="img/team_red.png" class="teamimg">');
                    if(dl.dzTeam==0 || dl.dzTeam=="0"){
                        html.push('<button class="zanbtn" songid='+dl.songId+' dzteam='+dl.dzTeam+' teamd="1">');
                    }else{
                        html.push('<button class="zanbtn zanColor" songid='+dl.songId+' dzteam='+dl.dzTeam+' teamd="1">');
                    }
                    html.push('<img src="img/zanimg.png"/>');
                    html.push('<span class="zanNum">'+dl.redPraise+'</span>');
                    html.push('</button>');
                    html.push('</p>');
                }else{
                    html.push('<p class="members">');
                    html.push(listName(dl.whiteDescripe));
                    html.push('<img src="img/team_white.png" class="teamimg">');
                    if(dl.dzTeam==0 || dl.dzTeam=="0"){
                        html.push('<button class="zanbtn" songid='+dl.songId+' dzteam='+dl.dzTeam+' teamd="2">');
                    }else{
                        if(dl.dzTeam==2 || dl.dzTeam=="2"){
                            html.push('<button class="zanbtn zanColor" songid='+dl.songId+' dzteam='+dl.dzTeam+' teamd="2">');
                        }else{
                            html.push('<button class="zanbtn" songid='+dl.songId+' dzteam='+dl.dzTeam+' teamd="2">');
                        }
                    }
                    html.push('<img src="img/zanimg.png"/>');
                    html.push('<span class="zanNum">'+dl.whitePraise+'</span>');
                    html.push('</button>');
                    html.push('</p>');
                    html.push('<p class="members">');
                    html.push(listName(dl.redDescripe));
                    html.push('<img src="img/team_red.png" class="teamimg">');
                    if(dl.dzTeam==0 || dl.dzTeam=="0"){
                        html.push('<button class="zanbtn" songid='+dl.songId+' dzteam='+dl.dzTeam+' teamd="1">');
                    }else{
                        if(dl.dzTeam==1 || dl.dzTeam=="1"){
                            html.push('<button class="zanbtn zanColor" songid='+dl.songId+' dzteam='+dl.dzTeam+' teamd="1">');
                        }else{
                            html.push('<button class="zanbtn" songid='+dl.songId+' dzteam='+dl.dzTeam+' teamd="1">');
                        }
                    }
                    html.push('<img src="img/zanimg.png"/>');
                    html.push('<span class="zanNum">'+dl.redPraise+'</span>');
                    html.push('</button>');
                    html.push('</p>');
                }
                html.push('</div>');
                html.push('</li>');
            });
            $('.vidList').append(html.join(""));
        }else{
            main.alert(dt.message);
        }
    })
}



function listName(_List){
    _List = eval('(' + _List + ')');
    var html='<span class="member_name">';
    $.each(_List,function(index,item){
        if(item.mid==0 || item.mid=="0"){
            html+='<em mid='+item.mid+' sid='+item.sid+'>'+item.name+'</em>';
        }else{
            html+='<em mid='+item.mid+' sid='+item.sid+'>'+item.name+'<img src="img/icon_por.png"></em>';
        }
    })
    html += '</span>'
    return html;
}