

$(function(){
  init();
})

function init(){

  getPicList();
  addListeners();

}

function addListeners(){

  $('.picList').on('click','li',function(){
    var groupName = $(this).attr('groupName');
    main.hrefTo('vidlist.html?mid='+groupName);
  })

  //分享
  $('.sharebtn').on('click',function(){
    window.web.share("ALL","https://h5.48.cn/2018apppage/BJreview/img/thumb.jpg","https://h5.48.cn/2018apppage/BJreview/","首届BEJ红白歌会回顾","BEJ48成军两周年之际，首届BEJ48红白歌会已经完美的落下帷幕，让我们一起来回顾一下这些神曲，为自己支持的红队或白队点赞吧！","https://h5.48.cn/admin/sharecount.php?title=BJreview",false);
  })

  //跳转小程序版
  $('.smprogrambtn').click(function(){
    if(isExitsFunction('window.web.shareWechatMiniProgram')){
      window.web.shareWechatMiniProgram(shareParams());
    }else{
      main.alert('请下载最新版本口袋48app');
    }
    
  })
  
}


function getPicList(){
  main.getPicList(function(dt){
    if(dt.status==200){
      var html=[];
      $.each(dt.content,function(index,dl){
        html.push('<li groupName='+dl.groupName+'>');
        html.push('<img src="'+dl.pic+'" class="thumbnail">');
        html.push('<span class="songNum">'+dl.title+'</span>');
        html.push('<span class="zanbox"><img src="img/zan.png"><em class="zanNum">'+dl.praise+'</em></span>');
        html.push('<p class="text">'+dl.info+'</p>');
        html.push('</li>');
      });
      $('.picList').append(html.join(""));
    }else{
      main.alert(dt.message);
    }
  })
}




function shareParams() {
  return JSON.stringify({
    id: "gh_dc1ce10e9cd3",
    path: "pages/index/index",
    type: "test",
    callback: 'shareCallback',
    webpageUrl: "https://h5.48.cn/2018apppage/BJreview/",
    title: "首届BEJ红白歌会回顾",
    desc: "BEJ48成军两周年之际，首届BEJ48红白歌会已经完美的落下帷幕，让我们一起来回顾一下这些神曲，为自己支持的红队或白队点赞吧！",
    imgPath: "https://h5.48.cn/2018apppage/BJreview/img/thumb.jpg",
    scene: 'session'
  })
}


function shareCallback(params) {
  // alert("share")
  window.web.backHome();
  return "OK";
}


