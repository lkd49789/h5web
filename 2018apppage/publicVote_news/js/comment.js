var li_info = '<li>'+
'			       <span class="avata" style="background-image:url({{avata}})"></span>'+
'			       <div class="content">'+
'                       <p class="name color{{ismember1}}1">{{uname}}{{avata-self}}</p>'+
'                       <p class="time color{{ismember2}}2">{{ctime}}<span clss="floor">#{{floor}}</span></p>'+
'						<p class="texts color{{ismember3}}3">{{info}}</p>'+
'					</div>'+

'					<div class="zanbtn {{like}} {{like-box}}" logid={{logid}}><img class="like-heart" src="img/likexin.png"><img class="zanimg" src="img/icon_zanbtn_{{like2}}.png"><em class="zannum">{{praise_no}}</em></div>'+
'				</li>';

var _mid = 99;//对整场公演的评论mid参数
if(GetQueryString('from') == 'home'){
    _mid = GetQueryString("mid");
}else{
    _mid = 99
}

var logidsAlls = [];
logidsAlls = JSON.parse(localStorage.getItem('ArrLogids_'+main.getOid()+"_"+main.getAppUserInfo().appid));
if(!logidsAlls){
    logidsAlls = [];
}


(function(data) {

	var isload = false//是否加载中
    var _limit = 20;//每页数量
    var s_Flg=null;//是否是成员
    if(isExitsFunction("window.web.getLoginMemberInfo")){
    	s_Flg = 1;
    }else{
    	s_Flg = 0;
    }
	//初始化
	data.init = function(){
        comment.getCommentList();//评论列表
		comment.addListeners();//事件
	}

	//点击事件
	data.addListeners = function(){
		//提交评论
		$('.likebtn').click(function(){
            if(_mid == 99 || _mid == "99"){
                if($("#alltexts").val().length == 0){
                    main.alert("全场公演评论需输入评论内容");
                    return false;
                }       
            }
            /*if(!check_bad_words($("#alltexts").val()))
            {
                main.alert("含有非法字符！")
                return false;
            }*/
            main.getMusicLike(main.getOid(),_mid,s_Flg,comment.filteremoji($.trim($("#alltexts").val())),function(dt){
                if(dt.errcode == 0){
                    $(".pagination").attr("curpage","1")
                    $("#alltexts").val("");
               		comment.getCommentList();
                }else{
                    main.alert(dt.errmsg)
                }
            })
		});

        //过滤表情输入
        data.filteremoji = function(content){  
            var ranges = [  
                '\ud83c[\udf00-\udfff]',  
                '\ud83d[\udc00-\ude4f]',  
                '\ud83d[\ude80-\udeff]'  
            ];  
            emojireg = content .replace(new RegExp(ranges.join('|'), 'g'), '');  
            return emojireg;  
        } 

        //对评论点赞
        $('.commentList').on('click','.zanbtnlist',function(dt){
            _this = $(this);
            var logid = _this.attr('logid');
            var likenum = _this.children('.zannum').html();
            if(_this.hasClass('like')==false){
                main.getCommentLike(logid,function(dt){
                    if(dt.errcode==0){
                        logidsAlls.push(logid);
                        localStorage.setItem('ArrLogids_'+main.getOid()+"_"+main.getAppUserInfo().appid,JSON.stringify(logidsAlls));
                        _this.children('img').attr('src','img/icon_zanbtn_like.png');
                        _this.children('.zannum').html(parseInt(likenum)+1);
                        _this.addClass('like');
                   }else{
                        main.alert(dt.errmsg);
                    }
                })
            }
            
        })

	}
    //判断当前评论是否被点赞
    data.checkIsLike = function(_logid){
        if(logidsAlls){//数组存在  
            if(logidsAlls.length > 0){
                if($.inArray(_logid,logidsAlls) >=0){
                    return "like";
                }else{
                    return "";
                }
            }else{
                return "";
            }
        }else{//数组不存在  
            return "";
        }
    }
	//获取评论列表
    data.getCommentList = function(){
        if(isload){
            return false;
        }else{
            isload = true;
        }
        var _offset
        if($(".pagination").attr("curpage") == null || $(".pagination").attr("curpage") == undefined){
            _offset = 0;
        }else{
            _offset = (parseInt($(".pagination").attr("curpage"))-1)*_limit;
        }
        main.getCommentList(_mid,main.getOid(),_limit,_offset,function(dt){
        	/*console.log(dt);*/
            isload = false;
            if(dt.errcode == 0){
                comment.setMemList(dt);
            }else{
                main.alert(dt.errmsg);
            }
        })
    };

	//生成评论列表
    data.setMemList = function(dt){
        //设置页码
        if($(".pagination").html().length == 0){
            Page({
                num:Math.ceil(parseInt(dt.total)/_limit),                                  //页码数
                startnum:parseInt($(".pagination").attr("curpage")),     //指定页码
                elem:$('.pagination'),                                   //指定的元素
                callback:function(n){                                    //回调函数
                    console.log(n);
                    $(".pagination").attr("curpage",n)     //页码属性改变
                    comment.getCommentList()                          //加载数据
                }
            });
        }
        // $(".comment_num").html("共"+dt.msg.total+"条评论")
        
        var html = ""
        var _index = 0;
        for(var i=0; i<dt.rows.length;i++){
            if(dt.rows[i].uname != main.getAppUserInfo().uname){
                html += comment.getLiInfo(_index+1,dt.rows[i]);
                _index += 1;
            }
            
        }
        
        if(dt.rows.length >0){
            $(".commentList").html(html);
            if($(".pagination").attr("curpage") == "1"){
                comment.getAllComment();
            }  
        }else{
            $(".commentList").html("暂无信息！")
        }
        
    }


    data.getLiInfo = function(_floor,dt){
        var _info = li_info;
        _info = _info.replace("{{avata}}",         dt.avata);                          //头像
        _info = _info.replace("{{avata-self}}",    comment.checkIsSelf(dt.uname));                          //头像
        _info = _info.replace("{{like}}",          comment.checkIsLike(dt.logid));                          //是否点赞
        _info = _info.replace("{{like2}}",         comment.checkIsLike(dt.logid));                          //点赞黄手
        _info = _info.replace("{{uname}}",     	   dt.uname);                       //昵称
        _info = _info.replace("{{ctime}}",         dt.ctime);                           //时间
        _info = _info.replace("{{floor}}",         comment.getFloor(_floor));                       //楼层
        _info = _info.replace("{{info}}",          dt.info);                         //评论内容
        _info = _info.replace("{{like-box}}",      comment.checkIsEmpty(dt.info));                         //评论内容是否为空
        _info = _info.replace("{{praise_no}}",     dt.praise_no);                         //点赞数
        _info = _info.replace("{{ismember1}}",     dt.s_flg);                          //判断是否成员
        _info = _info.replace("{{ismember2}}",     dt.s_flg);                          //判断是否成员
        _info = _info.replace("{{ismember3}}",     dt.s_flg);                          //判断是否成员
        _info = _info.replace("{{logid}}",         dt.logid);                          //每个评论的logid
        return _info;
    }
    //判断评论是否为空
    data.checkIsEmpty = function(_info){
        if(_info == ""){
            return "like-box";
        }else{
            return 'zanbtnlist';
        }
    }

    //获取楼层
    data.getFloor = function(_floor){
        var page = parseInt($(".pagination").attr("curpage"))
        return (page-1)*_limit + _floor;
    }

    //判断是否本人
    data.checkIsSelf = function(_uname){
        if(_uname == main.getAppUserInfo().uname){
            return '<img src="img/icon_self.png" class="icon_self">'
        }else{
            return '';
        }
    }

    //自己的评论
    data.getAllComment = function(){
    	main.getSelfComment(main.getOid(),_mid,function(dt){
    		if(dt.errcode == 0){
    			if(dt.is_praise==1){
    				$(".commentList").prepend('<li><span class="avata" style="background-image:url('+main.getAppUserInfo().avata+')"></span>'
    					+'<div class="content"><p class="name">'+main.getAppUserInfo().uname+'<img src="img/icon_self.png" class="icon_self"></p>'
    					+'<p class="time">'+dt.ctime+'</p><p class="texts">'+dt.info+'</p></div>'
    					+'<div class="zanbtn '+comment.checkIsLike(dt.logid)+" "+comment.checkIsEmpty(dt.info)+'" logid='+dt.logid+'><img class="like-heart" src="img/likexin.png"><img class="zanimg" src="img/icon_zanbtn_'+comment.checkIsLike(dt.logid)+'.png"><em class="zannum">'+dt.praise_no+'</em></div>');
                    if(_mid == 99 || _mid == "99"){
                        
                    }else{
                        $("#alltexts").attr('disabled','disabled');
                        $("#alltexts").attr('placeholder','您已喜欢此歌曲');
                        $(".likebtn").attr("disabled", true);
                        $(".likebtn").css('background-color','#535356');
                    }
    			}else{
    				$(".commentList").prepend("");
    			}
                // $.each($(".zanbtnlist"),function(i,item){
                //     if($(this).attr("logid") == dt.logid){
                //         $(this).parent().remove();
                //     }
                // })
    		}else{
    			main.alert(dt.errmsg)
    		}
    	})
    }

}(window.comment = {}));



/*---------------------------------------------------------------------------------------------------------------------------*/
$(function(){
    comment.init();
})