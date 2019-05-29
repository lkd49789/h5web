
var H5UPLOAD = {};
H5UPLOAD.html5upload = (function ()
{
    var _ID_UPLOAD_BOX = "uploadBox";
    var _CLASS_PROGRESS = "progress";
    var _CLASS_PERCENTAGE = "percentage";

    var _tip_no_drag = "可将图片拖到这里";
    var _tip_drag_over = "释放鼠标立即上传！";

    var _uploadEle = null;
    var _tip_holder = null;
    /**
     * 初始化对象与事件
     * @private
     */
    function _init(_upload_holder)
    {

        _ID_UPLOAD_BOX = _upload_holder
        _uploadEle = document.getElementById(_ID_UPLOAD_BOX);
        _tip_holder = _uploadEle.getElementsByTagName("p")
        _uploadEle.ondragenter = _onDragEnter;
        _uploadEle.ondragover = _onDragOver;
        _uploadEle.ondragleave = _onDragLeave;
        _uploadEle.ondrop = _onDrop;
        _setStatusNoDrag();

    };


    /**
     * 正在拖拽状态
     * @private
     */
    function _setDragOverStatus()
    {
        _tip_holder.innerText = _tip_drag_over;
       console.log(_tip_drag_over)
    }

    /**
     * 初始化状态
     * @private
     */
    function _setStatusNoDrag()
    {
        _tip_holder.innerText = _tip_no_drag;
    }

    /**
     * 上传文件
     * @private
     */
    function _setDropStatus()
    {
        _tip_holder.innerText = _tip_no_drag;
    };

    /**
     * 当ondragenter触发
     * @private
     */
    function _onDragEnter(ev)
    {
        _setDragOverStatus();
    }
    /**
     * 当ondargmove触发
     * @private
     */
    function _onDragOver(ev)
    {
        ev.preventDefault();
    }
    /**
     * 当dragleave触发
     * @private
     */
    function _onDragLeave(ev)
    {
        _setStatusNoDrag();
    }

    /**
     * ondrop触发
     * @private
     */
    function _onDrop(ev)
    {
        //drop 事件的默认行为是以链接形式打开，所以也需要阻止其默认行为。
        ev.preventDefault();
        _setDropStatus();

        //拿到拖入的文件
        var files = ev.dataTransfer.files;

        var len = files.length;
        if(len >1){
            //alert("只能上传一张图片")
            messageAlert.alert("只能上传一张图片!","确定",function(){})
            return false;
        }
        if(files[0].size > 300*1024){
            messageAlert.alert("图片不能超过300k","确定",function(){})
            return false;
        }
        console.log("size>>"+files[0].size)
        //页面显示图片
        _showUploadFile(files[0]);
        
    }
    /**
     * 页面上显示需要上传的文件
     * @private
     */
    function _showUploadFile(file)
    {
        var reader = new FileReader();
        //判断文件类型
        if (file.type.match(/image*/))
        {
            reader.onload = function (e)
            {
                var formData = new FormData();
                var img = $("#cover img");
                $(".percentage").show().html("上传中")
                img.attr("src", e.target.result);
                img.attr("width","190px").attr("height","114px")
                $(".progress-bar").show()
                $(".btn-delete").hide();
                formData.append("uploadFile", file);
                //上传文件到服务器
                _uploadToServer(formData);
            };
            reader.readAsDataURL(file);
        }
        else
        {
            console.log("此文件不是图片文件！");
        }
    }

    /**
     * 上传文件到服务器
     * @private
     */
    function _uploadToServer(formData)
    {
        var settings = {
              "async": true,
              "crossDomain": true,
              "url": CONFIG.getUploadSmall(),
              "method": "POST",
              "headers": {},
              "processData": false,
              "contentType": false,
              "mimeType": "multipart/form-data",
              "data": formData
            }

            $.ajax(settings).done(function (data) {
                var dt = JSON.parse(data);
               
                if(dt.status ==200){
                    $(".progress-bar").hide()
                    $(".percentage").show().html("完成")
                    $("#cover").attr("img-src",CONFIG.getUploadSourceUrl()+dt.content[0].picPath)
                    $("#cover img").attr("img-src",CONFIG.getUploadSourceUrl()+dt.content[0].picPath)
                    $(".btn-delete").show()
                    
                }else{
                    $(".percentage").hide()
                    $("#cover img").attr("src","");
                    messageAlert.alert(dt.message,"确定",function(){

                    })
                        
                    
                }
            });


        //var xhr = new XMLHttpRequest();
        //xhr.open("POST", "http://gsupload.48.cn/filesystem/upload/smallfile", true);
        //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest', 'Content-Type', 'multipart/form-data;');
        //HTML5新增的API，存储了上传过程中的信息
        // xhr.upload.onprogress = function (e)
        // {
        //     var percent = 0;
        //     if (e.lengthComputable)
        //     {
        //         //更新页面显示效果
        //         percent = 100 * e.loaded / e.total;
        //         percentage.text(percent + "%");
        //         percent >= 100 && $(".progress-bar").hide();
        //     }
        // };
        //xhr.send(formData);
    }


    //把init方法公布出去
    return{
        init: _init }


})();
