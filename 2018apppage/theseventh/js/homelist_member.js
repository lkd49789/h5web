(function(data) {
    
    var allMembers ;//所有成员
    var prevTeam = "";
    var teamList = [];//队伍列表

    var page = 1;  //页码
    var sort = "1";    //排序 0根据祝福值排序(默认) 1根据时间排序
    var type = "index";    //区分查看内容 myself-查看我的表白内容 index-表白墙内容
    var li_bless = '<li>'+    //祝福li
'							<p class="names"><span class="username">{{fansNicker}}</span>对你说：</p>'+
'							<p class="text replycolor">{{content}}</p>'+
'							<p class="icons">'+
'								<span class="icon_like"><img src="img/icon_like.png">{{benisons}}点</span>{{repStatus}}'+
'							</p>'+
'						</li>'
    var curLi;   //当前li

    data.init = function(){
        INDEX.checkMyBless()
        INDEX.addListeners();
    }
    
    data.addListeners = function(){
        
        //排序方法
        $('.sortbox p').click(function(){
			$('.sortbox ol').show();
		})
		$('.sortbox ol li').click(function(){
			$('.mol').html($(this).html());
			$(this).parent().hide();

			sort = $(this).attr("sort")
			ctime = 0;
			benisons = -1;
			flag = false;
			$('.lists').html('<li class="tips"><p>共收到<span class="total">--</span>条表白</p></li>');

			INDEX.checkMyBless();
		})

		//点击查看回复内容
		mui(".lists").on('tap','.icon_msging',function(){
			var conid = $(this).attr("conId");
			console.log("conid--"+conid)
			INDEX.getReply(conid)
		})
        //点击回复粉丝
        mui(".lists").on('tap','.icon_msg',function(){
            curLi = $(this).parent().parent();
            var conid = $(this).attr("conId");
            console.log("conid--"+conid)
            var fansname = $(this).parent().parent().find(".username").html();
            var fanstxt = $(this).parent().parent().find(".text").html();
            
            INDEX.showReplyBox(conid,fansname,fanstxt)
        })
        //提交回复
        $('.rep_completebtn').click(function(){
            INDEX.reply();
        })

        //回复留言控制字数
        $('#repmsg').bind('input',function(){
            setTimeout(function(){
                INDEX.countStrNum()
            },10);
        });
        //关闭回复
        $('.rep_closebtn').click(function(){
            $('.mask,.replymsg-box').hide();
        })
        //关闭表白
        $('.closebtn').click(function(){
            $('.mask,.lookconf-box').hide();
        })

    }
    data.countStrNum = function(){
        var total = 25;
        var len = Number($("#repmsg").val().length);
        if (len > total) {
            $("#repmsg").val($("#repmsg").val().substring(0, 25));
        }else{
            $("#word-count").text(len + "/" + total);
        }
        //console.log($("#repmsg").val().length)
        
    }
    //获取表白墙数据
    data.checkMyBless = function(){
    	main.checkMyBless(page,sort,type,function(dt){
    		if(dt.status == 200){

    			if(dt.content.confessionContentList.length == 0){//无新数据
    				flag = true;
    				if($('.lists li').length ==0){
						$('.lists').append('<p class="nohave">暂时还没有数据</p>');
						$('.mui-pull-bottom-tips').hide();
					}
    			}else{
    				var html = "";
    				$.each(dt.content.confessionContentList,function(index,bless){

		    			var _li = li_bless
		    			_li = _li.replace("{{fansNicker}}",bless.fansNicker)
		    			_li = _li.replace("{{content}}",bless.content)
		    			_li = _li.replace("{{benisons}}",bless.benisons)
		    			_li = _li.replace("{{repStatus}}",INDEX.getRepStatus(bless.repStatus,bless.conId));
		    			html += _li

		    			
		    		})
                    page += 1;
		    		$('.lists').append(html);
                    $(".total").html(dt.content.num)
    			}
    			
    		}else{
    			main.alert(dt.message)
    		}
    		
    	})
    }
    //成员是否访问 返回状态
    data.getRepStatus = function(status,conId){
        if(status == 0){
            return '<span class="icon_msg" conId="'+conId+'"><img src="img/icon_msg.png">回复</span>'
        }else{
            return '<span class="icon_msging" conId="'+conId+'"><img src="img/icon_msging.png">已回复</span>'
        }
    }

    //查看告白成员回复内容
    data.getReply = function(conId){
    	main.getReply(conId,function(dt){
    		if(dt.status == 200){
    			$(".mask, .lookconf-box").fadeIn();
    			$(".lookconf-box  .username").html(dt.content.nicker);
                $(".lookconf-box  .conftext").html(dt.content.replyContent);
    		}else{
    			main.alert(dt.message);
    		}
    	})
    }
    //成员打开回复粉丝框
    data.showReplyBox = function(conId,fasname,fanstxt){
        $(".mask, .replymsg-box").fadeIn();

        $("#repmsg").val("");
        $(".textareabox #word-count").html("0/25");

        $(".replymsg-box .text").html(fanstxt);
        $(".replymsg-box .username").html(fasname);
    }
    //回复粉丝
    data.reply = function(){
        if($("#repmsg").val() == ""){
            main.alert("回复不能为空！")
            return false;
        }
        var _conId = $(curLi).find(".icon_msg").attr("conId");
        console.log("_conId----"+_conId)
        main.saveReply($("#repmsg").val(),_conId,function(dt){
            if(dt.status == 200){
                $(".mask, .replymsg-box").hide();
                $(curLi).find(".icon_msg").remove();
                $(curLi).find(".icons").append('<span class="icon_msging" conId="'+_conId+'"><img src="img/icon_msging.png">已回复</span>')
            }else{
                main.alert(dt.message);
            }
        })
    }
    
}(window.INDEX = {}));

INDEX.init();


/*******************************************************上拉加载********************************************************************/
var flag = false;
//上拉加载
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
							INDEX.checkMyBless();
							self.endPullUpToRefresh(flag);
						}, 500);
					}
				}
			});
		})
	});
})(mui);