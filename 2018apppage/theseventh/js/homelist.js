(function(data) {
    
    var allMembers ;//所有成员
    var prevTeam = "";
    var teamList = [];//队伍列表

    var page = 1;   //分页 初始值1
    var ctime = "0";  //时间戳 初始0
    var sort = "0";    //排序 0根据祝福值排序(默认) 1根据时间排序
    var type = "index";    //区分查看内容 myself-查看我的表白内容 index-表白墙内容
    var li_bless = '<li>'+    //祝福li
'							<p class="names"><b class="ranknum rank{{rank0}}">{{rank}}</b><span class="username">{{fansNicker}}</span>对<span class="mername">{{memberId}}</span>说：</p>'+
'							<p class="text replycolor">{{content}}</p>'+
'							<p class="icons">'+
'                               <span class="icon-jt"><img src="img/icon_jt.png">{{jt}}</span>'+
'								<span class="icon_msg icon_msg{{repStatus}}" conId="{{conId}}"><img src="img/icon_msg.png"></span>'+
'								<span class="icon_like"><img src="img/icon_like.png">{{benisons}}点</span>'+
'							</p>'+
'						</li>'
    var jtArr = [11296,8314,4974,4894,4856,4842,4660,4406,4162,4112,3918,3894,3804,3780,3090,2760]

    data.init = function(){
        //$(".msg").html(window.location.href)
        $(".msg").append("--------"+GetQueryString("para"))
        $(".msg").append("--------"+GetQueryString("wxtoken"))
		
        main.getAllMembers(function(dt){
            allMembers = dt.rows
            //INDEX.createMemberList(allMembers)
            localStorage.setItem("allMembers",JSON.stringify(allMembers))
            $.each(allMembers,function(index,mdt){
            	localStorage.setItem(mdt.sid,JSON.stringify(mdt))
            })

            INDEX.getWall()
        })
        INDEX.addListeners();
    }
    
    data.addListeners = function(){
    	//活动规则
    	$(".rulebtn").click(function(){
            main.hrefTo("rule.html")
        })
        //返回顶部
      //   $(".backtopbtn").click(function(){
    		// console.log("top")
      //        window.scrollTo(0,0); 
      //      //mui('#pullrefresh').pullRefresh().scrollTo(0, 0, 100);//滚动到顶部
      //      $('html,body').animate({'scrollTop': 0},400);

      //   })
        //查看我的表白
    	$(".selfbtn").click(function(){
            main.hrefTo("myconfession.html")
        })
        //关闭表白
	    $('.closebtn').click(function(){
	    	$('.mask,.lookconf-box').hide();
	    })
        //打开小程序
        $(".openminiapp").click(function(){
            window.web.launchWechatMiniProgram(launchParams());
        })
        //根据队伍选择成员
        $(".team").change(function(){
            console.log($(this).val())
            INDEX.chooseTeam($(this).val())
        })

        //排序方法
        $('.sortbox p').click(function(){
            console.log("sort")
			$('.sortbox ol').show();
		})
		$('.sortbox ol li').click(function(){
			$('.mol').html($(this).html());
			$(this).parent().hide();

			sort = $(this).attr("sort")
			page = 1;
			flag = false;
			$('.lists').html("");
			INDEX.getWall();
		})
		//点击查看成员回复内容
		mui(".lists").on('tap','.icon_msg',function(){
			var conid = $(this).attr("conid");
			console.log("conid--"+conid)
			INDEX.getReply(conid)
		})
    }
    //获取表白墙数据
    data.getWall = function(){
    	main.getWall(page,sort,type,function(dt){
    		if(dt.status == 200){
    			if(dt.content.confessionContentList.length == 0){//无新数据
    				flag = true;
    				if($('.lists li').length ==0){
						$('.lists').html('<p class="nohave">暂时还没有数据</p>');
						$('.mui-pull-bottom-tips').hide();
					}
    			}else{
    				var html = "";
    				$.each(dt.content.confessionContentList,function(index,bless){

		    			var _li = li_bless

                        _li = _li.replace("{{rank0}}",bless.rank)
		    			_li = _li.replace("{{rank}}",bless.rank)
		    			_li = _li.replace("{{fansNicker}}",bless.fansNicker)
		    			_li = _li.replace("{{memberId}}",INDEX.getMemberName(bless.memberId))
		    			_li = _li.replace("{{content}}",bless.content)
		    			_li = _li.replace("{{benisons}}",bless.benisons)
		    			_li = _li.replace("{{conId}}",bless.conId)
		    			_li = _li.replace("{{repStatus}}",bless.repStatus)

                        _li = _li.replace("{{jt}}",jtArr[index])
		    			html += _li
		    		})
                    page += 1;
                    if(dt.content.confessionContentList[0].rank != 0){
                        $(".sortbox p").hide()
                        $('.lists').html(html);
                    }else{
                        $('.lists').append(html);
                    }
		    		
    			}
    			
    		}else{
    			main.alert(dt.message)
    		}
    		
    	})
    }
    //根据成员id查找成员队伍/姓名
    data.getMemberName = function(mid){
    	console.log(mid)
    	var minfo = JSON.parse(localStorage.getItem(mid))
    	return minfo.gname + "-" +minfo.sname;
    }
    //查看告白成员回复内容
    data.getReply = function(conId){
    	main.getReply(conId,function(dt){
    		if(dt.status == 200){
    			$(".mask, .lookconf-box").fadeIn();
    			$(".lookconf-box .mername").html(INDEX.getMemberName(dt.content.memberId));
    			$(".conftext").html(dt.content.replyContent);
    			$(".lookconf-box  .username").html(dt.content.nicker);
    		}else{
    			main.alert(dt.message);
    		}
    	})
    }
    //成员分组
    data.createMemberList = function(dt){
        var html = ""
        $.each(dt,function(i, member) {
            var teamName;//队伍名
            if(member.tname == "预备生"){
                teamName = member.gname+" 预备生"
            }else{
                teamName = "TEAM "+member.tname
            }
            if(teamName != prevTeam){//切换队伍
                teamList.push(teamName);
                prevTeam = teamName;
                html += '<option value="'+member.tid+'">'+teamName+'</option>';
            }
        })
        console.log(teamList)
        $(".team").html(html)
        INDEX.chooseTeam("101")
    }
    //根据tid选择队伍
    data.chooseTeam = function(tid){
        var html = ""
        $.each(allMembers,function(i, member) {
            if(member.tid == tid){
                html += '<option value="'+member.sid+'">'+member.sname+'</option>';
            }
        })
        $(".member").html(html)
    }

}(window.INDEX = {}));

INDEX.init();

/*******************************************************口袋打开小程序********************************************************************/
//var appToken = window.web.getAccessToken();
var thisurl = "https://h5.48.cn/2018apppage/theseventh/index.html?id=1"
var url = "h5.48.cn/2018apppage/theseventh/index.html"
function launchParams() {
    //var url = encodeURIComponent(thisurl)
    return JSON.stringify({
        id: "gh_dc1ce10e9cd3",
        path: "pages/h5share/h5share?htp=https&url="+url+"&para=1",
        //path: "pages/h5share/h5share?url="+url+"&apptoken="+appToken,
        type: 'test',  //test（开发版），trial（体验版），release（正式版）
        callback: "launchCallback"
    })
}
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
							INDEX.getWall();
							self.endPullUpToRefresh(flag);
						}, 500);
					}
				}
			});
		})
	});
})(mui);