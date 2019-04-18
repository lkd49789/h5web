function typechange(){

	$('.contype1').on('click',function(){
		$(this).css({"background-color":"#fbfbfb","color":"#829aff"});
		$(this).siblings().css({"background-color":"#efefef","color":"#333"});
		$('.contentright').css('visibility','visible');
		$('.contentrightvip').css('visibility','hidden');
	})
	$('.contype2').on('click',function(){
		$(this).css({"background-color":"#fbfbfb","color":"#829aff"});
		$(this).siblings().css({"background-color":"#efefef","color":"#333"});
		$('.contentrightvip').css('visibility','visible');
		$('.contentright').css('visibility','hidden');
	})

}
$('.radios label').click(function(){
    var radioId = $(this).attr('name');
    $('.radios label').css('backgroundImage','url(/Public/img/iconbtn1.png)');
    $(this).css('backgroundImage','url(/Public/img/iconbtn2.png)');

    $('.radios label').removeAttr('class') && $(this).attr('class', 'checked');
    $('.radios input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
});


//设置弹幕透明度
function selectLabel(className,type){
	var value =1;
	if(className == "high"){
	$("#radiohigh").css("background-image","url(/Public/img/iconbtn2.png)");
	$("#radiolow").css("background-image","url(/Public/img/iconbtn1.png)");
	$("#radioin").css("background-image","url(/Public/img/iconbtn1.png)");
	var value =0.3;	
	}else if(className == "in"){
	
	$("#radioin").css("background-image","url(/Public/img/iconbtn2.png)");
	$("#radiolow").css("background-image","url(/Public/img/iconbtn1.png)");
	$("#radiohigh").css("background-image","url(/Public/img/iconbtn1.png)");	
	var value =0.5;	
	}else if(className == "low"){
		
	$("#radiolow").css("background-image","url(/Public/img/iconbtn2.png)");
	$("#radiohigh").css("background-image","url(/Public/img/iconbtn1.png)");
	$("#radioin").css("background-image","url(/Public/img/iconbtn1.png)");
	var value =1;		
	}
	if(type==1){
	ajax_set_danmu("opacity",value);
	}
			
}


//设置弹幕位置
function selectPosition(className,type){
	
	var value =1;
	if(className == "whole"){
	$("#screenwhole").css("background-image","url(/Public/img/iconbtn2.png)");
	$("#screenhalf").css("background-image","url(/Public/img/iconbtn1.png)");
	$("#screenupper").css("background-image","url(/Public/img/iconbtn1.png)");
	var value =1;	
	}else if(className == "half"){
	$("#screenhalf").css("background-image","url(/Public/img/iconbtn2.png)");
	$("#screenwhole").css("background-image","url(/Public/img/iconbtn1.png)");
	$("#screenupper").css("background-image","url(/Public/img/iconbtn1.png)");
	var value =2;		
	}else if(className == "upper"){
	$("#screenupper").css("background-image","url(/Public/img/iconbtn2.png)");
	$("#screenhalf").css("background-image","url(/Public/img/iconbtn1.png)");
	$("#screenwhole").css("background-image","url(/Public/img/iconbtn1.png)");	
	var value =3;	
	}
	if(type==1){
	ajax_set_danmu("position",value);

	}
			
}

/*//单选

$('#transparent').click(function(){
    var radioId = $(this).attr('name');
    $('#transparent label').css('backgroundImage','url(/Public/img/iconbtn1.png)');
    $(this).css('backgroundImage','url(/Public/img/iconbtn2.png)');

    $('#transparent label').removeAttr('class') && $(this).attr('class', 'checked');
    $('#transparent input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
});
$('#screen label').click(function(){
    var radioId = $(this).attr('name');
    $('#screen label').css('backgroundImage','url(/Public/img/iconbtn1.png)');
    $(this).css('backgroundImage','url(/Public/img/iconbtn2.png)');

    $('#screen label').removeAttr('class') && $(this).attr('class', 'checked');
    $('#screen input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');

});*/

function randNums(){
		var randomNum = Math.random()*3;
		var ints = parseInt(randomNum,10);
		if(ints>0){
			return "https://source"+ints+".48.cn";
		}else{
			return "https://source.48.cn";
			}
		
	}
	function hoverBtn(){
	$('.contentright li').hover(function(){
		$(this).find('.report').css('visibility','visible');
	},function(){
		$(this).find('.report').css('visibility','hidden');
	})
	}
	
	$('.choicenum li').click(function(){
	$(this).css({'background':'#fff','color':'#05b4ed','border-color':'#05b4ed'});
	console.log(($(this).children().attr("snum")));
	$("#giftnum").val($(this).html());
	$(this).siblings().css({'background':'#f8f8f8','color':'#999','border-color':'#eaeaea'})
})
	function showBottombox(memberId,memberName,avatar,hot){
			var oheight = document.body.scrollHeight;
			var owidth = document.body.scrollWidth;
		$('.bottombox').css({"height":oheight,"width":owidth});
		//$('.bottombox').css("width",owidth);	
		$('.bottombox').fadeIn();
		$('.boardname').html(memberName);
		$(".bombpops").html("人气:"+hot);
		$(".hot_avatar").attr("src",randNums()+avatar);
		$(".hot_avatar").attr("mid",memberId);
		$(".hot_avatar").attr("mname",memberName);
		$('.bombbox').addClass('zoomin').show();
		}
		
		function showBottombox2(memberId,memberName,avatar,hot){
			var oheight = document.body.scrollHeight;
			var owidth = document.body.scrollWidth;
		$('.bottombox').css({"height":oheight,"width":owidth});
		//$('.bottombox').css("width",owidth);	
		$('.bottombox').fadeIn();
		$('.boardname').html(memberName);
		$(".bombpops").html("人气:"+hot);
		$(".hot_avatar").attr("src",avatar);
		$(".hot_avatar").attr("mid",memberId);
		$(".hot_avatar").attr("mname",memberName);
		$('.bombbox').addClass('zoomin').show();
		}

	function showBottombox1(memberName,memberId,avatar,hot){
		var oheight = document.body.scrollHeight;
		var owidth = document.body.scrollWidth;
		$('.bottombox').css({"height":oheight,"width":owidth});	
		$('.bottombox').fadeIn();
		$(".bombpops").html("人气:"+hot);
		$('.boardname').html(memberName);
		$(".hot_avatar").attr("src",randNums()+avatar);
		$(".hot_avatar").attr("mid",memberId);
		$(".hot_avatar").attr("mname",memberName);
		$(".hot_avatar").attr("src","https://source.48.cn/mediasource/avatar/"+memberId+".jpg");
		
		$('.bombbox').addClass('zoomin').show();
		}
function spotevent(){	
	$('.goodsclose').on('click',function(){
		$('.bombbox').removeClass('zoomin');
		$('.bottombox').fadeOut();
		$('.bombbox').hide();
	})

	

	$('.konwbtn').on('click',function(){
		$('.bottombox').hide();
		$('.codebox').removeClass('zoomin').hide();
	})
}
//关闭发送礼物小弹框
	function closeSmalltip(){
		//alert('111');
		$(".codebox").hide();
	}
//问卷显示
function showSurvey(){
	
	$(".problembox").show();
}

function showLine(type){
	
	
	if(type==1){
		var s = $(".controlbar-btns-clear").html();
		
		if(s=="超清"){			
			$(".lg").css("color","#839cff");
			$(".gq").css("color","white");
			$(".lc").css("color","white");
		
		}else if(s=="高清"){
			$(".lc").css("color","white");
			$(".lg").css("color","white");
			$(".gq").css("color","#839cff");	
		}else if(s=="普清"){
			$(".gq").css("color","white");
			$(".lg").css("color","white");
			$(".lc").css("color","#839cff");	
		}
	$(".controlbar-btns-clear").css("color","#839cff");
	$(".clears").show();	
	}else{
	$(".clears").hide();
	$(".controlbar-btns-clear").css("color","#bfbebe");		
	}
}

/**/
	$(".clears li").click(function(){
			var line =this.innerHTML;	
			
			$(".control-btns-clear").html(line);
			$(".clears").hide();
		})

function showLine1(type){
	var s = $(".controlbar-btns-clear").html();

	if(type==1){
		var s = $(".controlbar-btns-clear").html();
		
		if(s=="超清"){			
			$(".lg").css("color","#839cff");
			$(".gq").css("color","white");
			$(".lc").css("color","white");
		
		}else if(s=="高清"){
			$(".lc").css("color","white");
			$(".lg").css("color","white");
			$(".gq").css("color","#839cff");	
		}else if(s=="普清"){
			$(".gq").css("color","white");
			$(".lg").css("color","white");
			$(".lc").css("color","#839cff");	
		}
	$(".controlbar-btns-clear").css("color","#839cff");
	$(".controlbar-btns-clear").css("color","#839cff");
	$(".clears").show();	
	}else{
	$(".clears").hide();
	$(".controlbar-btns-clear").css("color","#bfbebe");		
	}
}

$(".wrongclose").click(function(){
	$(".problembox").hide();
		
})


function strformat(nick){
	
if(nick.substr(0,8)=="snh48vip"){
			
			if(nick.substr(8,1)==1){
				nick  = "小丝瓜";
			}			
			else if(nick.substr(8,1)==2){
			
				nick= "银丝瓜";
				}
			else if(nick.substr(8,1)==3){
					
				nick  = "金丝瓜";
				}
			else if(nick.substr(8,1)==4){
					
				nick  = "白金丝瓜";
				}
			else if(nick.substr(8,1)==5){
					
				nick  = "钻石丝瓜";
				}
			else{
				nick  = "注册会员";
			}
				
				
}else{
		nick  = "注册会员";
	}
			
			return nick;	
}


function colorFormat(level_name){
	var color ="";
		if(level_name =="钻石丝瓜"){
			color = "#c45bfc";
		}else if(level_name =="白金丝瓜"){
			color ="#ff7885";
		}else if(level_name=="金丝瓜"){
			color="#ffbc55";
		}else if(level_name=="银丝瓜"){
			color="#1798fb";
		}else if(level_name=="小丝瓜"){
			color="#2bddb2";
		}else{
			color="#000000";
		}
		return color;
}

function strformat2(level){
	var s1 = "";
	if(level ==1){
			s1 = "小丝瓜";
	}else if(level ==2){
			s1 = "银丝瓜";
	}else if(level ==3){
			s1 = "金丝瓜";
	}else if(level ==4){
			s1 = "白金丝瓜";
	}else if(level ==5){
			s1 = "钻石丝瓜";
	}else{
		s1 = "注册会员";	
	}
	return s1;
	}
	
	
	function showloginbox(){
	$(".signbox").show();		
}


function ajax_set_danmu(param,value){
	
	$.ajax({ 
			type : "post", 
			url :"/Index/ajax_set_danmu/", 
			//data : "act="+param+"&username="+account+"&"+param+"="+value, 
			data:{'act':param,'username':account,'param':value},
			async : false, 
			dataType:"json",
			success : function(data){
				if(data.status=="00")
				
				if(param=="opacity"){
					danmu_opacity=data.desc;
					//danmu_position=data.desc;
				}else if(param=="position"){
					
					danmu_position=data.desc;
				}
				
			 } 
			  
			}); 	
	}


//随机生成云信账号
function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz012345678_@';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return "48web"+pwd;
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// 调用函数

function getCookie(cookie_name)
{
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度
  
    // 如果找到了索引，就代表cookie存在，
    // 反之，就说明不存在。
    if (cookie_pos != -1)
    {
        // 把cookie_pos放在值的开始，只要给值加1即可。
        cookie_pos += cookie_name.length + 1;      //这里容易出问题，所以请大家参考的时候自己好好研究一下
        var cookie_end = allcookies.indexOf(";", cookie_pos);
  
        if (cookie_end == -1)
        {
            cookie_end = allcookies.length;
        }
  
        var value = unescape(allcookies.substring(cookie_pos, cookie_end));         //这里就可以得到你想要的cookie的值了。。。
    }
    return value;
}


function showDanmutips(type){
			
	if(type==1){
	if(danmu.danmuShowed){
	$(".barragebox").show();	

	
	}}else{
	$(".barragebox").hide();	
	}
	
}




function exitFullScreen() {

  var el = document;

  var cfs = el.cancelFullScreen || el.webkitCancelFullScreen || 

      el.mozCancelFullScreen || el.exitFullScreen;

  if(typeof cfs != "undefined" && cfs) {

    cfs.call(el);

  } else if(typeof window.ActiveXObject != "undefined") {

    //for IE，这里和fullScreen相同，模拟按下F11键退出全屏

    var wscript = new ActiveXObject("WScript.Shell");

    if(wscript != null) {

        wscript.SendKeys("{F11}");

    }

  }
}


  function textCounter(field, countfield, maxlimit) {  
   // 函数，3个参数，表单名字，表单域元素名，限制字符；  
   if (field.value.length > maxlimit)  
   //如果元素区字符数大于最大字符数，按照最大字符数截断；  
   field.value = field.value.substring(0, maxlimit);  
   else  
   //在记数区文本框内显示剩余的字符数；  

   countfield.value = maxlimit - field.value.length;  
   } 
   
   
   $('.sendbarrage input').bind('input',function(){//编辑限制150字
      checkLength(30,this,$('.dnum')); 
      // $(".sen"+curindex).html($(".rows textarea").val())
});
   $('.reflectsbox input').bind('input',function(){//编辑限制150字
      checkLength(30,this,$('.dnum')); 
      // $(".sen"+curindex).html($(".rows textarea").val())
});

function checkstr(obj,e){
	 checkLength(30,obj,$('.dnum'));

	 checkEnter1(e); 
	}
function checkLength(num,which,obj) { //编辑限制150字

    var maxChars = num;
    if (which.value.length > maxChars){
        which.value = which.value.substring(0,maxChars);
        return false;
    }else{
        var curr = which.value.length; 
        obj.html( curr.toString() );
	 
	    return true;
    }
}


function fullScreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}



function changeVedio(type,title){
		
		$(".controlbar-btns-clear").html(title);
	 	 var url =$("#chao_url").val();
	   	var gq_url =$("#gao_url").val();
	   	var lc_url =$("#liuchang_url").val();
		if(type==1){			
			var videoUrl=url;	
		}else if(type==2){		
			var videoUrl=gq_url;
		}else{
			var videoUrl = lc_url;
		}
		console.log(videoUrl);
	   var config={
		    	elid:"con1",
		    	autostart:true,
		    	type:"m3u8",
				logo:"/Public/img/live.png",
                url:videoUrl,
		    	skin:"liveWhite",
				server:"live"
		    };
			
  			//dowReady(config);
			
		player.toPlay(videoUrl, '', '', true);
	
	 
	}


$('.listmsg').css({'height':$('.message').height()});

//更新在线人数
function updateMemberCount(id,m_count,type){
	
	$.ajax({ 
			type : "post", 
			url :"/Index/updateMemberCount/", 
			data : "id="+id+"&m_count="+m_count+"&type="+type, 
			async : false, 
			dataType:"json",
			success : function(data){ 
			
				
			 } 
			}); 		


}

//获取在线人数

function getOnlineCount(){
	
	$.ajax({ 
			type : "post", 
			url :"/Index/getOnlineMember/", 
			data : "", 
			async : false, 
			dataType:"json",
			success : function(data){ 
				if(data.status=="00"){
				
				//$(".title2").show();
				$(".onlinemember").html(data.desc);
					
				}
				
			 } 
			}); 		


}



function launchFullscreen(element) {
document.body.style.overflow='hidden';
var h = ( document.body.clientHeight);
var w = ( document.body.clientWidth);
var o = document.getElementById("con1");
var vw= o.offsetWidth;

if(w!=vw){
$(".reflectsbox").css("display","block");
$("#reflects").attr("placeholder","按回车键可以快速发弹幕");
$("#launchFullscreen").css("background","url('/Public/img/exitScreen.png') no-repeat center center");
$("#pagelist").css("width","100%");
$("#con1").css("height","100%");
$("#con1").css("width","100%");
$("#con1").css("z-index","1001");
$("#con1").css("top","0");
$("#con1").css("left","0");
$("#con1").css("position","fixed");
}else{
	$(".reflectsbox").css("display","none");
$("#launchFullscreen").css("background","url('/Public/img/whole.png') no-repeat center center");
$("#pagelist").css("width","1200px");
$("#con1").css("height","500px");
$("#con1").css("width","900px");
$("#con1").css("position","relative");
}
 //return ;
}


function checkEnter1(e)
{
var et=e||window.event;
var keycode=et.charCode||et.keyCode;
if(keycode==13)
{
btnClick1(2);
document.getElementById("reflects").focus();
if(window.event)
window.event.returnValue = false;
else

e.preventDefault();//for firefox
}
}
	
function setDanmuOpen(flag){
	
	 $.ajax({ 
			type : "post", 
			url :"/Index/ajax_set_danmu/", 
			//data : "act=default&username="+account+"&flag="+flag, 
			data:{'act':'default','username':account,'flag':flag},
			async : false, 
			dataType:"json",
			success : function(data){
				alert(data); 
				if(data.status=="00"){
				
						
				}else{
					alert(data.desc);
					}
				
			 } 
			}); 		
	}
function showMsg(title,type){
	
	
	$("#msgtips").html(title);
	$(".text-a").html("");
	$(".layerbtn").hide();
	$(".text-c").hide();
	$(".floatlayer").show();
	closeMask(type);
	
	
} 


$(".closelayer").click(function(){
	
	$(".floatlayer").hide();
	})
	
function checkEnter(e)
{
	
var et=e||window.event;
var keycode=et.charCode||et.keyCode;
if(keycode==13)
{
btnClick1(1);	
if(window.event)
window.event.returnValue = false;
else


e.preventDefault();//for firefox
}
}


$(function(){
		$("#contentright").on("click",".report",function(){
		var messageTxt = $(this).parents(".reportbox").siblings(".message").text();  //举报内容
		var fromid = $(this).parents(".reportbox").siblings(".msgname").find(".niname").attr("fromid");
		var fromavatar = $(this).parents(".reportbox").siblings(".msgname").find(".niname").attr("avatar");
		var fromnickname = $(this).parents(".reportbox").siblings(".msgname").find(".niname").attr("nickName");;
		//var ninameTxt = $(this).parents(".reportbox").siblings(".msgname").find(".niname").text(); //被举报人id
		var msgClientId = $(this).parents(".reportbox").siblings(".msgname").find(".niname").attr("clientid");
		 var msgServerId = $(this).parents(".reportbox").siblings(".msgname").find(".niname").attr("serverid");
		if(msgServerId==undefined){
				msgServerId="";
		}
		if (appuid==null || appuid=="" || appuid==undefined) {
			$(".signbox").show();
			return;
		}
		
		//console.log(111);
		//return;
		
			
	 $.ajax({  
       url:"https://paudit.48.cn/audit/web/report/comment/publive",  
        dataType:'jsonp',  
        data:{"reason":"snh48web直播举报","userId":fromid, "userAvatar":fromavatar, "userNickname":fromnickname,"content":messageTxt, "fromUserId":appuid,"msgClientId":msgClientId},  
        jsonp:'jsoncallback',  
        success:function(result) {  
			console.log(result);
            if(result.status ==200){
			 showMsg("举报成功");
			
			}else{
			showMsg("举报失败");			
			}
        },  
         
    });
		})
	})
	
	
//按esc退出全屏

$(document).keyup(function(event){
 switch(event.keyCode) {
 case 27:
 var ss =$("#con1").css("height");
if(ss !="500px"){
	launchFullscreen();		
}
 break;
 case 96:
// alert("ESC");
 break;
 }

});




function closeMask(type){
		if(type==1){
			setTimeout("closetime(1)",1000);
		}else{
			setTimeout("closetime(2)",2000);
			}
	}
	
function closetime(type){
	
		$(".floatlayer").hide();
		if(type==1){	
		window.location.reload();	
		}
	}
	
	
function giftImg(giftName){
	var img ="";
	if(giftName == "应援棒" || giftName == "应用棒"){
			img = "gift1_1.png";
	}else if(giftName == "玫瑰花"){
			img = "gift2_2.png";
	}else{
			img = "gift3_3.png";
	}
	
	
	return img;
}

function giftImgtype(giftName){
	var img ="";
	if(giftName == "应援棒" || giftName == "应用棒"){
			img = 1;
	}else if(giftName == "玫瑰花"){
			img = 2;
	}else{
			img = 3;
	}
	
	return img;
}


function showEmotion(type){
	if(type==1){
		$(".emoticonlist").show();	
	}else{
		$(".emoticonlist").hide();	
		}
		
}
function findEmotion(value){
		var emmotion = new Array(
			new   Array("[呲牙]","f_static_000"),     
        new   Array("[调皮]","f_static_001"),   
	    new   Array("[流汗]","f_static_002"),     
        new   Array("[偷笑]","f_static_003"),  
	  	new   Array("[再见]","f_static_004"),
		new   Array("[敲打]","f_static_005"), 
		new   Array("[擦汗]","f_static_006"), 
		new   Array("[猪头]","f_static_007"), 
		new   Array("[玫瑰]","f_static_008"), 
		new   Array("[流泪]","f_static_009"), 
		new   Array("[大哭]","f_static_010"), 
		new   Array("[嘘]","f_static_011"), 
		new   Array("[酷]","f_static_012"), 
		new   Array("[抓狂]","f_static_013"), 
		new   Array("[委屈]","f_static_014"), 
		new   Array("[便便]","f_static_015"), 
		new   Array("[炸弹]","f_static_016"), 
		new   Array("[菜刀]","f_static_017"), 
		new   Array("[可爱]","f_static_018"), 
		new   Array("[色]","f_static_019"), 
		new   Array("[害羞]","f_static_020"), 
		new   Array("[得意]","f_static_021"),		
		new   Array("[吐]","f_static_022"), 
		new   Array("[微笑]","f_static_023"), 
		new   Array("[发怒]","f_static_024"), 
		new   Array("[尴尬]","f_static_025"), 
		new   Array("[惊恐]","f_static_026"), 
		new   Array("[冷汗]","f_static_027"),
		new   Array("[爱心]","f_static_028"), 
		new   Array("[示爱]","f_static_029"), 
		new   Array("[白眼]","f_static_030"), 
		new   Array("[傲慢]","f_static_031"), 
		new   Array("[难过]","f_static_032"), 
		new   Array("[惊讶]","f_static_033"), 
		new   Array("[疑问]","f_static_034"), 
		new   Array("[睡]","f_static_035"), 
		new   Array("[亲亲]","f_static_036"), 
		new   Array("[憨笑]","f_static_037"), 
		new   Array("[爱情]","f_static_038"), 
		new   Array("[衰]","f_static_039"), 
		new   Array("[撇嘴]","f_static_040"), 
		new   Array("[阴险]","f_static_041"), 
		new   Array("[奋斗]","f_static_042"), 
		new   Array("[发呆]","f_static_043"), 
		new   Array("[右哼哼]","f_static_044"), 
		new   Array("[拥抱]","f_static_045"), 
		new   Array("[坏笑]","f_static_046"), 
		new   Array("[飞吻]","f_static_047"), 
		new   Array("[鄙视]","f_static_048"), 
		new   Array("[晕]","f_static_049"), 
		new   Array("[大兵]","f_static_050"), 
		new   Array("[可怜]","f_static_051"), 
		new   Array("[强]","f_static_052"),
		new   Array("[弱]","f_static_053"), 
		new   Array("[握手]","f_static_054"), 
		new   Array("[胜利]","f_static_055"), 
		new   Array("[抱拳]","f_static_056"),
		new   Array("[凋谢]","f_static_057"), 
		new   Array("[饭]","f_static_058"),
		new   Array("[蛋糕]","f_static_059"), 
		new   Array("[西瓜]","f_static_060"), 
		new   Array("[啤酒]","f_static_061"), 
		new   Array("[飘虫]","f_static_062"), 
		new   Array("[勾引]","f_static_063"),
		new   Array("[OK]","f_static_064"), 
		new   Array("[爱你]","f_static_065"), 
		new   Array("[咖啡]","f_static_066"), 
		new   Array("[钱]","f_static_067"), 
		new   Array("[月亮]","f_static_068"), 
		new   Array("[美女]","f_static_069"),
		new   Array("[刀]","f_static_070"), 	
		new   Array("[发抖]","f_static_071"), 
		new   Array("[差劲]","f_static_072"), 
		new   Array("[拳头]","f_static_073"),
		new   Array("[心碎]","f_static_074"), 
		new   Array("[太阳]","f_static_075"), 
		new   Array("[礼物]","f_static_076"), 
		new   Array("[足球]","f_static_077"), 
		new   Array("[骷髅]","f_static_078"), 
		new   Array("[挥手]","f_static_079"),
		new   Array("[闪电]","f_static_080"), 	
		new   Array("[饥饿]","f_static_081"), 
		new   Array("[困]","f_static_082"), 
		new   Array("[咒骂]","f_static_083"),
		new   Array("[折磨]","f_static_084"), 
		new   Array("[抠鼻]","f_static_085"), 
		new   Array("[鼓掌]","f_static_086"), 
		new   Array("[糗大了]","f_static_087"), 
		new   Array("[左哼哼]","f_static_088"), 
		new   Array("[哈欠]","f_static_089"),
     	new   Array("[快哭了]","f_static_090"), 	
		new   Array("[吓]","f_static_091"), 
		new   Array("[篮球]","f_static_092"), 
		new   Array("[乒乓球]","f_static_093"),
		new   Array("[NO]","f_static_094"), 
		new   Array("[跳跳]","f_static_095"), 
		new   Array("[怄火]","f_static_096"), 
		new   Array("[转圈]","f_static_097"), 
		new   Array("[磕头]","f_static_098"), 
		new   Array("[回头]","f_static_099"),    
		new   Array("[跳绳]","f_static_100"), 	
		new   Array("[激动]","f_static_101"), 
		new   Array("[街舞]","f_static_102"), 
		new   Array("[献吻]","f_static_103"),
		new   Array("[左太极]","f_static_104"), 
		new   Array("[右太极]","f_static_105"), 
		new   Array("[闭嘴]","f_static_106"));
		
		
    value = value.replace(/\[(.+?)\]/g,function(word){
	
	for(var j in emmotion){
		if(emmotion[j][0] == word)	{
			return ("<img height='22px' width='22px' src='/Public/face/"+emmotion[j][1]+"@2x.png'>");	
		}
	}
	});
	
	return value;
		
	}
function findEmotion1(value) {
	
	   var   emmotion   =  new   Array(new   Array("[):]","emoji_477"),     
       new   Array("[(!K)]","emoji_1883"),   
	   new   Array("[(!E)]","emoji_1881"),     
       new   Array("[(!U)]","emoji_1872"),  
	  	new   Array("[):]","emoji_477"),
		new   Array("[(!K)]","emoji_1883"), 
		new   Array("[(!E)]","emoji_1881"), 
		new   Array("[(!U)]","emoji_1872"), 
		new   Array("[(!O)]","emoji_1866"), 
		new   Array("[(!Y)]","emoji_1840"), 
		new   Array("[(!X)]","emoji_1836"), 
		new   Array("[(!V)]","emoji_1826"), 
		new   Array("[(!N)]","emoji_1799"), 
		new   Array("[(!B)]","emoji_1796"), 
		new   Array("[(!L)]","emoji_1786"), 
		new   Array("[(!J)]","emoji_1781"), 
		new   Array("[(!W)]","emoji_1736"), 
		new   Array("[(!A)]","emoji_1695"), 
		new   Array("[(!P)]","emoji_1682"), 
		new   Array("[(!&)]","emoji_1666"), 
	
		new   Array("[(!#)]","emoji_1638"),
		new   Array("[(!%)]","emoji_1656"), 
		new   Array("[(!@)]","emoji_1613"), 
		new   Array("[(!-)]","emoji_1604"), 
		new   Array("[(:98)]","emoji_1590"), 
		new   Array("[(:>)]","emoji_1582"), 
		new   Array("[(:<)]","emoji_1575"), 
		new   Array("[(:M)]","emoji_1554"),
		new   Array("[(:O)]","emoji_1551"), 
		new   Array("[(:A)]","emoji_1549"), 
		new   Array("[(:P)]","emoji_1546"), 
		new   Array("[(:G)]","emoji_1545"), 
		new   Array("[(*;)]","emoji_1536"), 
		new   Array("[(D)]","emoji_1532"), 
		new   Array("[(W)]","emoji_1527"), 
		new   Array("[(F)]","emoji_1525"), 
		new   Array("[(k)]","emoji_1509"), 
		new   Array("[(})]","emoji_1505"), 
		new   Array("[({)]","emoji_1492"), 
		new   Array("[(R)]","emoji_1488"), 
		new   Array("[(#)]","emoji_1486"), 
		new   Array("[(*)]","emoji_1481"), 
		new   Array("[(S)]","emoji_1438"), 
		new   Array("[(u)]","emoji_1426"), 
		new   Array("[(|)]","emoji_1421"), 
		new   Array("[8-)]","emoji_1404"), 
		new   Array("[^o)]","emoji_1402"), 
		new   Array("[:-*]","emoji_1367"), 
		new   Array("[:-#]","emoji_1359"), 
		new   Array("[*-)]","emoji_1356"), 
		new   Array("[|-)]","emoji_1339"), 
		new   Array("[<o)]","emoji_1301"), 
		new   Array("[+o(]","emoji_1292"),
		new   Array("[8-|]","emoji_1280"), 
		new   Array("[8o|]","emoji_1275"), 
		new   Array("[(a)]","emoji_1268"), 
		new   Array("[:|]","emoji_1266"),
		new   Array("[:'(]","emoji_1264"), 
		new   Array("[:(]","emoji_1224"),
		new   Array("[:$]","emoji_1223"), 
		new   Array("[:s]","emoji_1210"), 
		new   Array("[:@]","emoji_1206"), 
		new   Array("[(H)]","emoji_1202"), 
		new   Array("[:p]","emoji_1195"),
		new   Array("[:-o]","emoji_931"), 
		new   Array("[;)]","emoji_613"), 
		new   Array("[:D]","emoji_523"));
	
	
    value = value.replace(/\[(.+?)\]/g,function(word){
	
	for(var j in emmotion){
		if(emmotion[j][0] == word)	{
			return ("<img src='/Public/arclist/"+emmotion[j][1]+".png'>");	
		}
	}
	});
	
	return value;
	
}
function replace_em(str){
	//str = str.replace(/\</g,'&lt;');
	//str = str.replace(/\>/g,'&gt;');
	//str = str.replace(/\n/g,'<br/>');
	pattern = /\[^\]/g;
	str.match(pattern);
	str = str.replace(pattern,'<img src="arclist/$1.gif" border="0" />');
	return str;
}
$(".emoticonlist li img").on('click',function(){
	var v = ($(this).attr("ems"));
	var v1 = $("#barrage").val();
	var v2  = ($(this).attr("sm"));
	$("#barrage").val(v1+v);
	$("#barrage").focus();
	var obj = document.getElementById("barrage");
	checkLength(30,obj,$('.dnum'));
	//showEmotion(2);
	
	
})


//发送礼物
$(".subgift").click(function(){
	var type = $(".giftimg").attr("stype");
	var giftnum = $("#giftnum").val();
	var id = $("#vedio_id").val();
	var giftId = $(".giftimg").attr("giftid");
	var memberId = $(".hot_avatar").attr("mid");
	var memberName = $(".boardname").html();
	
	$.ajax({ 
			type : "post", 
			url :"/Send/sendGift/", 
			data : {'type':type,'giftNum':giftnum,'vedio_id':id,'memberId':memberId,'memberName':memberName,'giftId':giftId}, 
			//data : "type="+type+"&giftNum="+giftnum+"&vedio_id="+id+"&memberId="+memberId, 
			async : false, 
			dataType:"json",
			success : function(data){
				if(data.status=="00"){
					showMsg("赠送成功",2);
					var	 money = data.desc;  //剩余鸡腿数
					$(".bottombox").hide();
					$(".codebox").hide();
				}else{
					if(data.status=="01"){
						$(".signbox").show();
						
						$(".codebox").hide();
						$(".bottombox").hide();
					}else{
						$(".bottombox").hide();
						showMsg(data.desc,2);
					}

				}
			}
			  
			}); 	
		
})



//充值弹层


$(".recharget").click(function(){
	
	$(".rechargebox").show();
	$.ajax({ 
			type : "post", 
			url :"/Index/getappinfo/", 
			data :"", 
			async : false, 
			dataType:"json",
			success : function(data){
				if(data.status=="00"){
					
					var money = data.money;  //剩余鸡腿数
					var nickname = data.nickname;
					
					$(".j-user").html("("+nickname+")");
					$(".credit-num").html(money);
					
				}else{
				//showMsg(data.desc,2);	
				alert(data.desc);
				}
			}
			  
			}); 
		
})

$(".iconcredit").click(function(){
	$(".rechargebox").hide();
	$(".paycode img").remove();
	$(".paytext").html("");
	$(".paymentbtn").show();
		
})

$("#item_con_options li").on("click",function(){
		$(".sum").html(($(this).attr("enum")));
		$("#item_con_options li").each(function(){
			if($(this).attr("class") == "selected"){
				$(this).removeAttr("class");	
			}
			$(".paycode img").remove();
			$(".paymentbtn").show();
			$(".paytext").html("");	
		  });
		if($(this).attr("class")!="tips"){
		$(this).attr("class","selected");
		}
		
	
})

$("#pay_item_con_options li").on("click",function(){
		$(this).parents().children("li").removeAttr("class");
		$(this).attr("class","selected");
		$(".paycode img").remove();
		$(".paymentbtn").show();
		$(".paytext").html("");	
	})
	
	

//输入数量限制
function checkNum(value){
	//console.log(value);
	if(value !=1 && value !=9 && value !=22 && value !=99){
		console.log(value);
		$(".choicenum li").css("border-color","#eaeaea");
		$(".choicenum li").css("color","#999");		
		$(".choicenum li").css("background-color","#f8f8f8");
	}	
}	
function checkForm(){
	var num = $("#item_con_options .selected").attr("enum");	
	var payid = $("#pay_item_con_options .selected").attr("payid");
	$("#chargeNum").val(num);
	$("#payType").val(payid);
	
	//return false;
	if(num<=0){
	 return false;	
	}
	if(payid==""){
		return false;	
	}
	$.ajax({ 
			type : "post", 
			url :"/Pay/do_charge/", 
			data :{"num":num,"payType":payid}, 
			async : false, 
			dataType:"json",
			success : function(data){
				if(data.status=="00"){
					$(".paymentbtn").hide();
					$("#order_sn").val(data.id);
					
					$(".paycode").append(data.desc);
					if(payid==1){
					$(".paytext").html("支付宝扫一扫支付");	
					}else{
						$(".paytext").html("微信扫一扫支付");		
					}
					setTimeout("paynotify()", 3000);
					
					
				}else{
				showMsg(data.desc,2);	
				//alert(data.desc);
				}
			}
			  
			}); 
		
		
}
	var int="";
function paynotify(order_sn){
 int= setInterval(checkOrder,10000);

		
}

function checkOrder(){
	
	var ordersn = $("#order_sn").val();
	var timestamp = (new Date()).valueOf();
	$.ajax({ 
			type : "post", 
			url :"/Pay/checkOrder/", 
			data :{"sn":ordersn,"timestamp":timestamp/1000}, 
			async : false, 
			dataType:"json",
			success : function(data){
				if(data.status=="00"){					
					$(".rechargebox").hide();
					clearInterval(int);
					showMsg(data.desc,2);
				}else if(data.num>10){
					
					clearInterval(int);
					
				}
			}
			  
			}); 
}

//贡献榜

/*$('.sicencebox').hover(function(){
	console.log(2222);
	$(this).css('height','auto');
},function(){
	$(this).css('height','105px');
	console.log(111);
})*/




function scrolls(){
	
	var all_length = $("#bannerstart1 a").length * 222*2;
	$("#inbanners").css("width",all_length+"px")
	var demo = document.getElementById("bannersbox");
	var demo1 =document.getElementById("inbanners");
	var demo2 =document.getElementById("bannerstart1");
	var bannerstart2 =document.getElementById("bannerstart2");
 	var speed=25//速度数值越大速度越慢
	bannerstart2.innerHTML=demo2.innerHTML;
	$("#inbanners").css("width",parseInt($("#bannerstart1").css("width"))*2+7+"px")
	function Marquee(){
		if(demo.scrollLeft-demo2.offsetWidth>=0){
			demo.scrollLeft=0
			// console.log("1-------------------"+demo2.offsetWidth+"-------------"+demo.scrollLeft)
		}else{
			// console.log("-------------------"+demo2.offsetWidth+"-------------"+demo.scrollLeft)
			demo.scrollLeft+=3
		}
	}
	var MyMar=setInterval(Marquee,speed)
	demo.onmouseover=function() {clearInterval(MyMar)}
	demo.onmouseout=function() {MyMar=setInterval(Marquee,speed)};
}

$(".emoticonlist").mouseleave(function(){
		$(".emoticonlist").hide();
	});
	
	
	

/*******************宝箱的点击事件*************************************************/
//positionclick();
function positionclick(){
	$('.place1').click(function(){
		$('.place1 img').attr('src','/Public/img/blueposition1.png');
		$(this).css('color','#839cff');
		$('.place2 img').attr('src','/Public/img/barposition2.png');
		$('.place2').css('color','#999');
		$('.place3 img').attr('src','/Public/img/barposition3.png');
		$('.place3').css('color','#999')
	})
	$('.place2').click(function(){
		$('.place2 img').attr('src','/Public/img/blueposition2.png');
		$(this).css('color','#839cff');
		$('.place1 img').attr('src','/Public/img/barposition1.png');
		$('.place1').css('color','#999');
		$('.place3 img').attr('src','/Public/img/barposition3.png');
		$('.place3').css('color','#999')
	})
	$('.place3').click(function(){
		$('.place3 img').attr('src','/Public/img/blueposition3.png');
		$(this).css('color','#839cff');
		$('.place1 img').attr('src','/Public/img/barposition1.png');
		$('.place1').css('color','#999');
		$('.place2 img').attr('src','/Public/img/barposition2.png');
		$('.place2').css('color','#999')
	})

	$('.fontslist div').click(function(){
		$(this).css('color','#839cff');
		$(this).siblings().css('color','#999');
	})
}

$('.chestbox').click(function(){
	showMsg("活动暂未开放",2);
	return false;
	$('.bottombox').fadeIn();
	$('.thechestbox').addClass('zoomin').show();
})
$('.caseclosebtn').click(function(){
	$('.bottombox').hide();
	$('.thechestbox').removeClass('zoomin').hide();
})



/***************************************************************************/


function showFont(){
	$(".typesetting").show();
	
}
function showVideo(type){
	if(type==1){
		$(".logo").css("display","block");
	}else{
		$(".logo").css("display","none");	
	}	
}




function danmuSetting(){
	
	$.ajax({ 
			type : "post", 
			url :"/Index/getdanmusetting/", 
			//data : "act="+param+"&username="+account+"&"+param+"="+value, 
			data:{'act':"default"},
			async : false, 
			dataType:"json",
			success : function(data){
				if(data.state==0){
					//设置透明度
					if(data.opacity==0.5){
						selectLabel('in',2);
						}else if(data.opacity==0.3){
						selectLabel('high',2);
						}else if(data.opacity==1){
						selectLabel('low',2);
						}
				
					//设置弹幕位置
					if(data.position==1){
					selectPosition('whole',2)
					}else if(data.position==2){
					selectPosition('half',2);
					}else if(data.position==3){
					selectPosition('upper',2);
					}
				
				}
			 } 
			  
			}); 
}
   function flashChecker() {  
        var hasFlash = 0;         //是否安装了flash  
        var flashVersion = 0; //flash版本  
        var isIE = /*@cc_on!@*/0;      //是否IE浏览器  
  
        if (isIE) {  
            var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');  
            if (swf) {  
                hasFlash = 1;  
                VSwf = swf.GetVariable("$version");  
                flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);  
            }  
        } else {  
            if (navigator.plugins && navigator.plugins.length > 0) {  
                var swf = navigator.plugins["Shockwave Flash"];  
                if (swf) {  
                    hasFlash = 1;  
                    var words = swf.description.split(" ");  
                    for (var i = 0; i < words.length; ++i) {  
                        if (isNaN(parseInt(words[i]))) continue;  
                        flashVersion = parseInt(words[i]);  
                    }  
                }  
            }  
        }  
        return { f: hasFlash, v: flashVersion };  
    }  
  
  
  function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}