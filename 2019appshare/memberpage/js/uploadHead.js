
$('#img-preview').attr('src',localStorage.getItem("userAvatar"));
$('.img-container').height($('.img-container').width());
$('.img-container').css({'marginTop':-($('.img-container').width()/2)});
var flag=false;
var $img = $('.img-container > img');
var  $dataX = $('#dataX'),
      $dataY = $('#dataY'),
      $dataHeight = $('#dataHeight'),
      $dataWidth = $('#dataWidth'),
      $dataRotate = $('#dataRotate');
var windowURL = window.URL || window.webkitURL;
var dataURL;
$(".cancel").on("click",function(){
  main.hrefTo('userCenter.html');
});
  $("#inputImage").change(function(){
    $('.s2').css('z-index','2');
    var $file = $(this);
    var fileObj = $file[0];
    
    // var $img = $("#img-preview");
    if(fileObj && fileObj.files && fileObj.files[0]){
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        $img.attr('src',dataURL);
    }else{
        dataURL = $file.val();
        var imgObj = document.getElementById("img-preview");
        imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
    }
    // var $img = $('.img-container > img'),

    $img.cropper({
      aspectRatio: 1/1 ,  //1 / 1,  //图片比例,1:1
      preview: '#img-preview',
      crop: function (data) {
        $dataX.val(Math.round(data.x));
        $dataY.val(Math.round(data.y));
        $dataHeight.val(Math.round(data.height));
        $dataWidth.val(Math.round(data.width));
        $dataRotate.val(Math.round(data.rotate));
        var $imgData=$img.cropper('getCroppedCanvas')
        var dataurl = $imgData.toDataURL('image/png');
        $("#img-preview").attr("src",dataurl);
        },
      built: function (e) {

      }
    });

    $img.on({
      'build.cropper': function (e) {
        console.log(e.type);
      },
      'built.cropper': function (e) {
        console.log(e.type);
      },
      'dragstart.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'dragmove.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'dragend.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'zoomin.cropper': function (e) {
        console.log(e.type);
      },
      'zoomout.cropper': function (e) {
        console.log(e.type);
      }
    }).cropper();

    console.log(dataURL)
    $img.cropper('replace',dataURL);

    $('.donebtn').click(function(){
      $('.s2').css('z-index','0');
      $('#img-preview>img,.cropper-hide').remove();
      /*var $imgData=$img.cropper('getCroppedCanvas')
      var dataurl = $imgData.toDataURL('image/png');*/
      flag=true;
    })

});
$("body").unbind("click").on("click",".done",function(){
      if(flag==true){
        $('.loading').show();
        var formData = new FormData();
        var img = $("#img-preview").attr('src');
        formData.append("avatar",convertBase64UrlToBlob(img),"img"+".jpg");
        $.ajax({  
            url : CONFIG.getUsersystemUrl()+"api/user/v1/edit/avatar",  
            type : "POST",  
            /*data : formData, */ 
            data: formData,
            dataType:"text",  
            processData : false,         // 告诉jQuery不要去处理发送的数据  
            contentType : false,        // 告诉jQuery不要去设置Content-Type请求头  
             beforeSend: function (request) {
                request.setRequestHeader("token", main.getToken());
                 // request.setRequestHeader("imei", main.getuuid());
                 // request.setRequestHeader("os", "web");
                 // request.setRequestHeader("version", "");
                 // // request.setRequestHeader("User-Agent", "Mobile_Pocket");
                 // request.setRequestHeader("location", "ALL");
            },
            success:function(data){  
                var dt = JSON.parse(data)
                if(dt.status == 200){
                    /*console.log(dt.content.path);*/
                    if(GetQueryString('from') == 'usercenter'){
                        $('.loading').hide();
                        main.hrefTo('userCenter.html');
                    }
                }else{
                  main.alert(dt.message);
                }
                
            },  
            xhr:function(){            //在jquery函数中直接使用ajax的XMLHttpRequest对象  
                var xhr = new XMLHttpRequest();  
                xhr.upload.addEventListener("progress", function(evt){  
                    if (evt.lengthComputable) {  
                        var percentComplete = Math.round(evt.loaded * 100 / evt.total);    
                        console.log("正在提交."+percentComplete.toString() + '%');        //在控制台打印上传进度  
                    }  
                }, false);  
                return xhr;  
            }  
              
        });
      }else{
        main.hrefTo('userCenter.html');
      }
        
    })


    function convertBase64UrlToBlob(urlData){
    
        var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
        
        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob( [ab] , {type : 'image/png'});
    }