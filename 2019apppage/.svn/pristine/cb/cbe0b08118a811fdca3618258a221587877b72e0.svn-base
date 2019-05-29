$(function () {
  
  // 分享标题
  var ShareTitle = 'SNH48 GROUP 2019 夏季三团联合招募';
  // 分享描述
  var ShareDesc = '我报名参加了SNH48 GROUP 2019夏季三团联合招募，来为我加油鼓劲吧~';
  // 分享链接
  var ShareLink = 'https://h5.48.cn/2019apppage/snh_13/wx/index.html';
  // 分享图标
  var ShareimgUrl = 'https://h5.48.cn/2019apppage/snh_13/wx/images/thumb.png';
  // 微信配置启动
  wx_config();

  wx.ready(function() {

      wx.onMenuShareTimeline({
          title: ShareTitle,
          desc: ShareDesc,
          link: ShareLink,
          imgUrl: ShareimgUrl
      });

      wx.onMenuShareAppMessage({
          title: ShareTitle,
          desc: ShareDesc,
          link: ShareLink,
          imgUrl: ShareimgUrl
      });
  });


});

