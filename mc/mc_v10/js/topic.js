(function(data) {
    var user_id,user_name,user_pic,encryption,imei;

	  if(dsBridge.call("snhUserInfo") != undefined){
        var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
        user_id = u_info.userInfo.bigSmallInfo.bigUserInfo.userId,             //用户ID
        encryption = u_info.token,                                             //验证Token
        user_name = u_info.userInfo.bigSmallInfo.bigUserInfo.nickname,             //用户昵称
        user_pic = u_info.userInfo.bigSmallInfo.bigUserInfo.avatar,             //头像地址
        imei = u_info.IMEI                                                //设备号
    }else{
       user_id = 389424;
       user_name = "测试";
       user_pic = "/mediasource/avatar/111806.jpg";
       encryption = "PbA3YN9bB27+d3s7NE6MJnJMwAjKYaFUI9p4ybleb5lv0qt4nEynWaPuoKLg5yKd";
    }
    data.getCurCity = function(){
        return localStorage.getItem("CUR_CITY");

    }
//   alert(user_id)
// alert(encryption)
	//所有队伍列表

	data.getTeamList = function(city, succ, error){
		$.ajax({
      async: true, 
      crossDomain: true,
      url: CONFIG.getPath()+"mc/v1/topic/teamList",
      type: "POST", 
      dataType: 'json',  
      data: {city:city,type:1},
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
      url: CONFIG.getPath()+"mc/v1/topic/list",
      type: "POST", 
      dataType: 'json', 
      data: {auth:encryption,teamId:teamId},
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

	data.topicNew = function(title, teamId,teamName, city, succ, error) {
		$.ajax({
      async: true, 
      crossDomain: true,
      url: CONFIG.getPath()+"mc/v1/topic/save",
      type: "POST", 
      dataType: 'json', 
      data: {auth:encryption,title:title,teamId:teamId,teamName:teamName,userAvatar:user_pic,userNickname:user_name,city:city},
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

	data.topicLike = function(topicId, succ, error) {
    //alert(encryption+"-------topicId----"+topicId+"--------city-----"+mcTopic.getCurCity())
		$.ajax({
      async: true, 
      crossDomain: true,
      url: CONFIG.getPath()+"mc/v1/topic/parse",
      type: "POST", 
      dataType: 'json', 
      data: {auth:encryption,topicId:topicId},
      timeout: 5000, 
      // contentType: "application/json;utf-8", 
			success:function (sus){
        //alert(sus.status)
				succ(sus);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
        //alert("textStatus>>>"+textStatus)
				error;
			}
		});
	}

  //以往入围话题

  data.topListAll = function(_teamId,_lastTime,succ, error) {
    $.ajax({
      async: false, 
      crossDomain: true,
      url: CONFIG.getPath()+"mc/v1/topic/topSelectList",
      type: "POST", 
      dataType: 'json', 
      data: {auth:encryption,teamId:_teamId,lastTime:_lastTime},
      timeout: 5000, 
      // contentType: "application/json;utf-8", 
      success:function (sus){
          if(sus.status ==200){
              succ(sus.content);
          }else{
              error(sus.message)
          }
        
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        error;
      }
    });
  }

  data.hrefTo = function (_url) {
    if (checkFromApp()) {
      window.web.gotoDetail(_url);
    } else {
      window.location.href = _url;
    }
  }
  data.backTo = function (_url) {
    if (checkFromApp()) {
      window.web.backHome();
    } else {
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




Vue.filter('MCTime', function (ts) {
  var t,y,m,d,h,i,s;
  t = ts ? new Date(ts) : new Date();
  m = t.getMonth()+1;
  d = t.getDate();
  h = t.getHours();
  i = t.getMinutes();
  return m+'-'+d+' '+(h<10?'0'+h:h)+':'+(i<10?'0'+i:i);
});

Vue.filter('Teamname', function (name) {
  if(name.length>4){
     return name;
  }else{
    return "TEAM "+name;
  }
  
});

Vue.filter('Avata', function (img) {
  return "https://source.48.cn"+img;
});
Vue.filter('haslock',function(id,relive){
   if(id==1){
    return "1";
  }else{
    if(relive == 1){
      return "2"
    }else{
      return "0"
    }
  }
})
Vue.filter('AvataLock', function (id,relive) {
  if(id==1){
    return "images/lock1.png";
  }else{
    if(relive == 1){
      return "images/lock2.png"
    }else{
      return "images/lock0.png"
    }
  }
  // console.log("id>>"+id+"----------------isRelive>>"+relive)
  //return "images/lock"+id+relive+".png";
});
  


//帮助
$(".top_hint span").click(function(){
    snhOpenWebUrl(CONFIG.getWebUrl()+'help.html')
})

//入围话题
$(".last-time").click(function(){
    snhOpenWebUrl(CONFIG.getWebUrl()+'comment.html')
})

