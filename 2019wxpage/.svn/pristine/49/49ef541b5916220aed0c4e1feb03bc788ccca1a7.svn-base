var isloading = false;//是否在提交中

// 弹出提示
function ShowMsg(content) {
  layer.open({
    content: content
    ,skin: 'msg'
    ,time: 3 //3秒后自动关闭
  });
}
// 弹出询问
function ShowConfirm(content, btn, yes_func) {
  layer.open({
    content: content
    ,btn: btn
    ,yes: function(index){
      yes_func();
      layer.close(index);
    }
  });
}
$(function(){
    //城市选择
    new PCAS("live_province","live_city");
    // 重新填写处理
    $('#reset_btn').click(function () {
        $("#postform").get(0).reset();
        window.scrollTo(0,680);
    });
    // 提交报名处理
    $('#submit_btn').click(function () {
        if(!/^[\u4E00-\u9FA5]{2,6}$/.test($("#name").val()))
        {
          ShowMsg('请正确填写姓名！');
          return false;
        }
        if(!/^[\u4E00-\u9FA5]+$/.test($("#nation").val()))
        {
          ShowMsg('请正确填写民族！');
          return false;
        }
        if(!/^[\d\w]{5,18}$/.test($("#identity").val()))
        {
          ShowMsg('请正确填写身份证或海外护照！');
          return false;
        }
        var birthday = $("#birthday").val().split("-");
        var day = new Date(birthday[0], birthday[1]-1, birthday[2]);
        if(isNaN(day.getMonth()) || birthday[1] != day.getMonth()+1)
        {
          ShowMsg('请正确选择出生年月！');
          return false;
        }
        if(isNaN(parseFloat($("#height").val())) || isNaN(parseFloat($("#weight").val())))
        {
          ShowMsg('请正确填写身高和体重！');
          return false;
        }
        if(!/\w@\w+\.\w/.test($("#email").val()))
        {
          ShowMsg('请正确填写邮箱地址！');
          return false;
        }
        if(!/1\d{10}/.test($("#phone_own").val()) && $("#phone_own").val().length < 5)
        {
          ShowMsg('请正确填写你的手机号码！');
          return false;
        }
        if(!/1\d{10}/.test($("#phone_guardian").val()) && $("#phone_guardian").val().length < 5)
        {
          ShowMsg('请正确填写你的监护人手机号码！');
          return false;
        }
        if($("#weibo_url").val().length < 5)
        {
          ShowMsg('请正确填写你的新浪微博！');
          return false;
        }
        if ($("#experience").val().length < 1){
          ShowMsg('请填写演出经历！');
          return false;
        }
        if ($('#tcity').val()== "" || $('#tcity').val()== undefined || $('#tcity').val()== "undefined"){
          ShowMsg('请选择复试城市！');
          return false;
        }
        if ($('#ttitle').val()== "" || $('#ttitle').val()==undefined  || $('#ttitle').val()== "undefined"){
          ShowMsg('请选择优选报名所属！');
          return false;
        }
        if($("#live_city").val() == '' || $("#live_city").val().indexOf("选择") > -1)
        {
          ShowMsg('请选择你所在的地区！');
          return false;
        }
        if($("#address").val().length < 5 && $("#address_non_prc").val().length < 5)
        {
          ShowMsg('请正确填写你的家庭住址！');
          return false;
        }
        if($("#postform input:hidden[name='upload_id']").size() == 0)
        {
          ShowMsg('请上传身份证件图！');
          return false;
        }
        if($("#postform input:hidden[name^='upload_bust']").size() == 0)
        {
          ShowMsg('请上传上半身正面照！');
          return false;
        }
        if($("#postform input:hidden[name^='upload_full']").size() == 0)
        {
          ShowMsg('请上传单人全身照！');
          return false;
        }
        var formdata = {};
        var postform = $("#postform");
        postform.find('input[name]').each(function () {
            formdata[$(this).attr('name')] = $(this).val();
        });
        postform.find('select[name]').each(function () {
            formdata[$(this).attr('name')] = $(this).val();
        });
        postform.find('textarea[name]').each(function () {
            formdata[$(this).attr('name')] = $(this).val();
        });
        // 报名期别根据当前路径自动识别
        //var urlpath = window.location.href.split('/');urlpath[3]
        formdata['period'] = $("input[name='period']").val();
        // 出生年份处理
        formdata['birth_year'] = day.getFullYear();
        var m = day.getMonth() + 1;
        if (m >= 1 && m <= 9) m = "0" + m;
        var d = day.getDate();
        if (d >= 0 && d <= 9) d = "0" + d;
        // 生日处理
        formdata['birth_day'] = m + '.' + d;
        //身份证处理
        var upload_id_arr = []
        upload_id_arr[0] = $("input[name='upload_id']").val()
        formdata['upload_id'] = upload_id_arr;
        // 上半身正面照处理
        var bust_array = new Array;
        $("input[name='upload_bust']").each(function(i){
            bust_array[i] = $(this).val();
        });
        formdata['upload_bust'] = bust_array;
        // 单人全身照处理
        var full_array = new Array;
        $("input[name='upload_full']").each(function(i){
            full_array[i] = $(this).val();
        });
        formdata['upload_full'] = full_array;
        console.log(formdata)
        // 提交报名表处理
        var $this = $(this);
        //if (DisableClick($this)) return;
        if(isloading){
          return false;
        }else{
          isloading = true;
        }
        InfoSubmit(formdata, function (response) {
            //ActiveClick($this, '提交报名表');
            isloading = false;
            if (response.errcode == 0) {
                ShowConfirm('你提交的信息已经成功受理，请登录你填写的邮箱，查询并仔细阅读招募邮件，确认报名成功。', ['确认'], function(){
                    window.location.href = "finish.html";;
                });
            } else {
              console.log("-----------"+response)
              ShowMsg(response.errmsg);
            }
        }, function (response) {
            //ActiveClick($this, '提交报名表');
            ShowMsg(response.errmsg);
            isloading = false;
        });
    });

});
$('.citybox li').click(function(){
    var cityval = $('input[name="area1"]:checked').val();
    console.log(cityval);
    $('#tcity').val(cityval);
})
$('.titlebox li').click(function(){
    var titleval = $('input[name="resident1"]:checked').val();
    console.log("---"+titleval);
     $('#ttitle').val(titleval);
})




var curid; // 当前照片位
function previewImage(id){
    curid = id;
    var file = $("input[name='file"+curid+"']")[0].files;
    console.log("size>>"+file[0].size)
    
    if(curid == 1){//身份证只能上传一张
        if($("#postform input:hidden[name='upload_id']").size() > 0){
          ShowMsg("最多上传1张图片")
          return false;
        }
        
    }else if(curid == 2){
        if($("#postform input:hidden[name='upload_bust']").size() >= 3){
          ShowMsg("最多上传3张图片")
          return false;
        }
        
    }else if(curid == 3){
        if($("#postform input:hidden[name='upload_full']").size() >= 3)
        {
           ShowMsg("最多上传3张图片")
        return false;
        }
       
    }
    

    if (file[0].type.match(/image*/))
    {
        var reader = new FileReader();
        reader.onload = function (e)
        {
            // $('.uploadmask').show();
            // $('.imgbox').css('background-image','url('+e.target.result+')');

            var formData =  new FormData()
            formData.append("file", file[0]);
            //上传文件到服务器
            _uploadToServer(formData,e.target.result)
            
            
        };
        reader.readAsDataURL(file[0]);
    }else
    {
        console.log("此文件不是图片文件！");
    }
}
//提交图片上传
function _uploadToServer(formData,imgobj) {
    $.ajax({
        "async": false,
        "crossDomain": true,
        "url": 'https://apimeet.48.cn/join/api/file/upload',
        "method": "POST",
        "headers": {},
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": formData,
        success: function (response) {
            var data = JSON.parse(response);
            //console.log(JSON.stringify(data))
            var filename = data.result
            console.log("data.errcode---"+data.errcode)
            if(data.errcode==0){
                if(curid == 1){
                  $("#postform").append($("<input />",{"value":filename,"type":"hidden","name":"upload_id"}));
                  $("#idcard_show").show().css("background-image", "url("+ imgobj +")").attr("title", "点击取消图片，重新上传").click(function(){
                      var that = $(this);
                      ShowConfirm('是否取消该图片，重新上传？', ['是', '否'], function(){
                          that.removeAttr("style");
                          that.removeAttr("title");
                          $("#postform input:hidden[value='" + filename + "']").remove();
                          $("#idcard_show").hide();
                        });
                  });
                }else if(curid == 2){
                    $("#postform").append($("<input />",{"value":filename,"type":"hidden","name":"upload_bust"}));
                    //console.log($("#upload_bust").children(".thumb:empty:eq(0)"))
                    $("#upload_bust").children(".thumb:empty:eq(0)").css("background-image", "url("+imgobj+")").css("display", "inline-block").attr("title", "点击取消图片，重新上传").click(function(){
                        var that = $(this);
                        ShowConfirm('是否取消该图片，重新上传？', ['是', '否'], function(){
                          that.removeAttr("style");
                          that.removeAttr("title");
                          that.empty();
                          that.css("display", "none");
                          $("#postform input:hidden[value='"+filename+"']").remove();
                      },function(){})
                    }).append("<span/>");
                }else if(curid == 3){
                    $("#postform").append($("<input />",{"value":filename,"type":"hidden","name":"upload_full"}));
                    //console.log($("#upload_bust").children(".thumb:empty:eq(0)"))
                    $("#upload_full").children(".thumb:empty:eq(0)").css("background-image", "url("+imgobj+")").css("display", "inline-block").attr("title", "点击取消图片，重新上传").click(function(){
                        var that = $(this);
                        ShowConfirm('是否取消该图片，重新上传？', ['是', '否'], function(){
                          that.removeAttr("style");
                          that.removeAttr("title");
                          that.empty();
                          that.css("display", "none");
                          $("#postform input:hidden[value='"+filename+"']").remove();
                      },function(){})
                    }).append("<span/>");
                }
                
                //上传成功
                // $('.mask').show();
                // $('.uploadmask').hide();
                // var picPath = CONFIG.getSourcePic()+data.content[0].picPath;

                // main.holdPic(picPath,function(dt){
                //     if(dt.status==200){
                //         $('.lookinfopic').attr('pathpic',picPath);
                //     }else{
                //         main.alert(dt.message);
                //     }
                // })
                $('input[type=file]').wrap('<form>').closest('form').get(0).reset();
            }else{
                //上传失败
                ShowMsg(data.errmsg)
            }
           return 
        }, error: function (err) {
            //上传失败
            ShowMsg("上传失败")
        }
    });
}