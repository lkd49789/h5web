

(function(data) {
    var user_id,user_name,user_pic,encryption,imei;

	  if(isExitsFunction("window.web.getLoginUserId")){
        user_id = window.web.getLoginUserId();
        user_name = window.web.getLoginUserNickName();
        user_pic = window.web.getLoginUserPic().replace("https://source.48.cn","");
        encryption = window.web.getEncryptionStr();
        imei = window.web.getPhoneIMEI();
    }else{
       user_id = 256;
       user_name = "测试";
       user_pic = "/mediasource/avatar/111806.jpg";
       encryption = "I8q8xisJy6CIGmowFs+hRE3TPHcq8fz1oqIV7ItNZ4B+QQsZXAu2ePw85G7+rq3peRrBQabuGmw=";
       encryption = "Ws3uL7iYHrTCVzLkHa4BBCsYXzIXP0YsPiq5a2Olrxt/ehWuA5sdWT5J59dTCg7j/PD01tJDlvWt518qtCBiXV4LfNt4RdUoyFLCJEcr9okBAOSsbPDg5A==";
    }
	  
    data.getCurCity = function(){
        return localStorage.getItem("CUR_CITY");

    }
  

	//所有队伍列表

	data.getTeamList = function(city, succ, error){
		$.ajax({
      async: true, 
      crossDomain: true,
      url: CONFIG.getPath()+"h5/topic/teamListV2",
      type: "POST", 
      dataType: 'json', 
      data: {city:city},
      timeout: 5000,
      // contentType: "application/json;utf-8", 
			success:function (sus){
				if (sus.status == 200) {
					succ(sus.content);
				} else {
					error(sus.message);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				error;
			}
		});
	};

	

	//每个队伍话题列表

	data.getTopicList = function(teamId, succ, error){
		$.ajax({
      async: true, 
      crossDomain: true,
      url: CONFIG.getPath()+"h5/topic/list",
      type: "POST", 
      dataType: 'json', 
      data: {teamId:teamId},
      timeout: 5000, 
      // contentType: "application/json;utf-8", 
			success:function (sus){
				if (sus.status == 200) {
					succ(sus.content);
				} else {
					error(sus.message);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				error;
			}
		});
	};

	

	//新发话题

	data.topicNew = function(title, teamId,teamName, succ, error) {
		$.ajax({
      async: true, 
      crossDomain: true,
      url: CONFIG.getPath()+"h5/topic/saveV2",
      type: "POST", 
      dataType: 'json', 
      data: {auth:encryption,title:title,teamId:teamId,teamName:teamName,userAvatar:user_pic,userNickname:user_name,city:mcTopic.getCurCity()},
      timeout: 5000, 
      // contentType: "application/json;utf-8", 
			success:function (sus){
				succ(sus.message);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				error;
			}
		});
	}

	

	//点赞

	data.topicLike = function(mcId, topicId, succ, error) {
    //alert(encryption+"-------topicId----"+topicId+"--------city-----"+mcTopic.getCurCity())
		$.ajax({
      async: true, 
      crossDomain: true,
      url: CONFIG.getPath()+"h5/topic/parseV2",
      type: "POST", 
      dataType: 'json', 
      data: {auth:encryption,topicId:topicId,city:mcTopic.getCurCity()},
      timeout: 5000, 
      // contentType: "application/json;utf-8", 
			success:function (sus){
        //alert(sus.status)
				succ(sus.status);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
        //alert("textStatus>>>"+textStatus)
				error;
			}
		});
	}

  //已入围话题

  data.topList = function(succ, error) {
    $.ajax({
      async: true, 
      crossDomain: true,
      url: CONFIG.getPath()+"h5/topic/topListV2",
      type: "POST", 
      dataType: 'json', 
      data: {auth:encryption,city:mcTopic.getCurCity()},
      timeout: 5000, 
      // contentType: "application/json;utf-8", 
      success:function (sus){
        succ(sus.content);
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        error;
      }
    });
  }
	//修复Header高度
    data.fix_header = function () {
        if (isFromIphone()) {
            document.getElementsByTagName('header')[0].style.height = '64px';
            document.getElementsByTagName('header')[0].style.paddingTop = '20px';
            $("header").next("div").css("margin-top","10px");
        }
    };
    data.hrefTo = function(_url){
    	if(checkFromApp()){
    		window.web.gotoDetail(_url);
    	}else{
    		window.location.href=_url;
    	}
    }
    data.backTo = function(_url){
    	if(checkFromApp()){
    		window.web.backHome();
    	}else{
    		window.history.back(-1);
    	}
    }
   

    data.alert = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }
    data.muiAlert = function(msg){
        // mui.alert(msg, '', function() {
              
        // });
        mcTopic.alert(msg)
    }
}(window.mcTopic = {}));

mcTopic.fix_header();


Vue.filter('MCTime', function (ts) {
  var t,y,m,d,h,i,s;
  t = ts ? new Date(ts) : new Date();
  m = t.getMonth()+1;
  d = t.getDate();
  h = t.getHours();
  i = t.getMinutes();
  return m+'-'+d+' '+(h<10?'0'+h:h)+':'+(i<10?'0'+i:i);
});



Vue.filter('Avata', function (img) {
  return "https://source.48.cn"+img;
});

  //判断是否隐藏h5头部
  if(isExitsFunction("window.web.isHideHead")){//默认有头部   应该隐藏掉h5头部
      $("header").hide();
      $("header").next("div").css("margin-top","0px");
      $(".mui-content").css("padding-top","0");
  }else{
      //$("header").show();
      $("header").next("div").css("margin-top","0px");
      $(".mui-content").css("padding-top","0");
  }

//------------------------------------------------------------------------------------判断是否来自移动设备
function isFromMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        return false;
    } else {
        return true;
    }
}

//------------------------------------------------------------------------------------------是否来自iphone
function isFromIphone() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    return bIsIphoneOs;
}
//--------------------------------------------------------------------------------------------是否来自口袋48
function checkFromApp() {
    if ((isFromMobile() && isExitsFunction("window.web.backHome")) || localStorage.getItem('$deviceType') == 'app') {
        localStorage.setItem('$deviceType', 'app');
        return true;
    } else {
        return false;
    }
}

//----------------------------------------------------------------------------------------------------------判断是否存在方法
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch (e) {
    }
    return false;
}



//帮助
$(".help").click(function(){
    mcTopic.hrefTo(CONFIG.getWebUrl()+'help.html')
})

//入围话题
$(".btn-sel").click(function(){
    mcTopic.hrefTo(CONFIG.getWebUrl()+'comment_top.html')
})
//返回
$(".nav_back_btn").click(function(){
    mcTopic.backTo()
})

//提交页面
$(".comment_send").click(function(){
    mcTopic.hrefTo(CONFIG.getWebUrl()+'comment.html')
})