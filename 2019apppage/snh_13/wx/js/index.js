$(function(){
  var isloading = false;
    // 点击重发按钮处理
    $('body').on('click','#send_btn',function () {
        var phone = $('.layui-m-layer #phone').val();
        var email = $('.layui-m-layer #email').val();
        console.log($('.layui-m-layer #phone').val())
        // 检查输入合法性
        if (phone.length <= 0) {
          ShowMsg('请输入手机号码');
          return;
        }
        if (email.length <= 0) {
          ShowMsg('请输入邮箱地址');
          return;
        }
        if (!IsPhone(phone)) {
          ShowMsg('手机号码有误');
          return;
        }
        
        if (!IsEmail(email)) {
          ShowMsg('邮箱地址有误');
          return;
        }
        var $this = $(this);
        //if (DisableClick($this)) return;
        // 邮箱验证邮件重发处理
        if(isloading){
          return false;
        }else{
          isloading = true;
        }
        EmailSend(phone, email, function (response) {
            isloading = false;
            ActiveClick($this, '<img src="images/try_btn.png" alt="">');
            if (response.errcode == '0') {
              $('.layui-m-layer #phone').val('');
              $('.layui-m-layer #email').val('');
              var html_str = '<span style="font-size:14px; font-weight:bold; margin-right:10px;">邮件已发送</span>';
              html_str += '<br>报名确认邮件可能会被系统误认为垃圾邮件，请仔细查收。';
              $(".layui-m-layer #word_h").html(html_str);
            } else {
              ShowMsg(response.errmsg);
              
            }
        }, function (response) {
            ActiveClick($this, '<img src="images/try_btn.png" alt="">');
            ShowMsg(response.errmsg);
            isloading = false;
        });
    });
});


// 弹出确认邮件重发对话框
function OpenEmailDialog() {
    layer.open({
        type: 1,
        title: false,
        closeBtn: 1,
        area: ['auto', 'auto'],
        shade: .7,
        zIndex: 10,
        shadeClose: true,
        content: $('#smallLay1'),
    });
}

// 弹出提示
function ShowMsg(content) {
  layer.open({
    content: content
    ,skin: 'msg'
    ,time: 2 //3秒后自动关闭
  });
}

/*
    时间倒计时插件
    TimeDown.js
    */
    function TimeDown(endDateStr) {
      //结束时间
      var endDate = new Date(endDateStr);
      //当前时间
      var nowDate = new Date();
      //相差的总秒数
      var totalSeconds = parseInt((endDate - nowDate) / 1000);
      //天数
      var days = Math.floor(totalSeconds / (60 * 60 * 24));
      //取模（余数）
      var modulo = totalSeconds % (60 * 60 * 24);
      //小时数
      var hours = Math.floor(modulo / (60 * 60));
      modulo = modulo % (60 * 60);
      //分钟
      var minutes = Math.floor(modulo / 60);
      //秒
      var seconds = modulo % 60;
      //输出到页面
      document.getElementById("day").innerHTML=PrefixInteger(days,2);
      document.getElementById("hour").innerHTML=PrefixInteger(hours,2);
      document.getElementById("minute").innerHTML=PrefixInteger(minutes,2);
      document.getElementById("second").innerHTML=PrefixInteger(seconds,2);
      //延迟一秒执行自己
      setTimeout(function () {
        TimeDown(endDateStr);
      }, 1000)
    }
    TimeDown("2019-3-20 0:00:0");
    function PrefixInteger(num, n) {
            return (Array(n).join(0) + num).slice(-n);

        }
    
    function openTryEmail(){
      layer.open({
        type:1,
        style:'background-color:transparent;font-size:100%;width:84%;',
        anim: 'up',
        shade:.7,
        shadeClose: false,
        content: "<div class='email_plan'>" + $(".email_plan").html() + "</div>"
      });
    }
    
      //提示
      /*layer.open({
      content: 'hello layer'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
      });*/