//CONFIG.getUsersystemUrl()

var mid = GetQueryString("id");//成员个人ID

var gsite_url = ""; //当前成员分团官网地址

	mui.previewImage();

//获取当前成员分团
main.getGroupUrl(function(data,gid){
    $.each(data.rows,function(index,dl){
      if(parseInt(dl.gid) == parseInt(gid)){
        gsite_url = dl.gsite_url;
        setMemberInfo()
      }
    })
})



	$('.tabs li').click(function(){
        var  _this = $(this);
        _this.addClass('active');
        _this.siblings().removeClass('active');
        $('.content'+_this.attr('data')).show();
        $('.content'+_this.attr('data')).siblings().hide();
    })

//设置成员信息
function setMemberInfo(){
   main.getMemberNews(mid,function(dt){
   	/*console.log(dt);*/
   	$('.avatar').css('backgroundImage','url('+main.formathttp(main.getMemberInfo().memberAvatar)+main.getMemberInfo().memberAvatar+')');
  	$('.avatar').addClass(dt.tname+'-bd');
  	$('.name').html(dt.sname);
  	$('.sname').html(dt.sname);
  	$('.team').html(dt.gname+'48 Team '+dt.tname);
  	$('.nikename').html(dt.nickname);
  	$('.height').html(dt.height);
  	$('.blood').html(dt.blood_type+'型血');
  	$('.city').html(dt.birth_place);
  	$('.starsign').html(dt.star_sign_12);
  	$('.star').html(dt.star_sign_48);
  	$('.specialty').html(dt.speciality);
  	$('.hobby').html(dt.hobby);

  	for(var i=1;i<=4;i++){
  		$('.imgs').append('<li><span></span><img src='+gsite_url+"/images/member/gs4_"+mid+"_"+i+'.jpg data-preview-src="" data-preview-group="1" /></li>');
  	}
  	$('.imgs li').height($('.imgs li').width());
   })
}

main.getArchives(main.getMemberInfo().memberId,100,function(dt){

	console.log(dt);

 	if(dt.status==200){

 		$.each(dt.content.history,function(index,data){

            var html = [];
           	html.push('<li>');
           	html.push('<img src="img/yuan.png" class="yuan"/>');
           	html.push('<em class="em1"></em>');
           	html.push('<em class="em2"></em>');
           	html.push('<p class="time">'+data.showTime+'</p>');
           	html.push('<p>'+data.content+'</p>');
           	if(data.category==1){
           		if(data.picPath){
           			html.push('<div class="tuwen"><img src="'+CONFIG.getSource()+data.picPath+'"></div>');
           		}
           	}else if(data.category==2){
           		if(data.picPath){
           			html.push('<div class="vid" onclick="vidLink('+data.videoId+')"><img src="'+CONFIG.getSource()+data.picPath+'" class="vidimg"><img src="img/icon_play.png" class="play"></div>');
           		}else{
           			html.push('<div class="vid" onclick="vidLink('+data.videoId+')"><img src="img/eg_7.png" class="vidimg"><img src="img/icon_play.png" class="play"></div>');
           		}
           	}else{

           	}
           	html.push('</li>');
            $('.chronicle').append(html.join(""));

        })

 	}else{

 		main.alert(dt.message)

 	}
})

function vidLink(videoid){
	main.hrefTo('https://h5.48.cn/2017appshare/video/index.html?id='+videoid);
}


//返回
$(".btn-back").click(function(){
    window.history.back()
})
