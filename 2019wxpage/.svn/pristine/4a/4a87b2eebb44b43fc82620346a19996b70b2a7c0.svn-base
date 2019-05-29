$(function () {
  
  // 分享标题
  var ShareTitle = '2019 SNH48 GROUP三团联合招募';
  // 分享描述
  var ShareDesc = 'SNH48十二期生招募、BEJ48七期生招募、GNZ48七期生招募、SNH48 GROUP海外练习生招募';
  // 分享链接
  var ShareLink = window.location.href;
  // 分享图标
  var ShareimgUrl = 'https://join.48.cn/snh_12/wx/images/thumb.png';
  
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

