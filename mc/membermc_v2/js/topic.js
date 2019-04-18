

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
       user_id = "1";
       user_name = "测试";
       user_pic = "/mediasource/avatar/111806.jpg";
       encryption = "+0nXftz1Z7bLH4Pb1MKA6g+jnUUTIyc3P7b85NnBO1+9405/mPFo8Q==";
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
      url: CONFIG.getPath()+"mc/v1/topic/memberTopList",
      //url: "http://101.71.63.240:8089/othersystem/api/mc/v1/topic/memberTopList",
      
      type: "POST", 
      dataType: 'json', 
      data: {auth:encryption,teamId:teamId,memberId:user_id},
      timeout: 5000, 
      // contentType: "application/json;utf-8", 
			success:function (sus){

				if (sus.status == 200) {
					succ(sus);
				} else {
					error(sus.message);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				error;
			}
		});
	};


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
  return "http://source.snh48.com"+img;
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

