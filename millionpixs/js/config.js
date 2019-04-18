
(function(data) {

	//测试地址
    //var URL = "http://192.168.0.9/web/millionpixs/"                                  //页面地址
    //var LINK_URL = "http://192.168.0.57:8080/games/";            //接口地址
    //var LOGIN_URL = "http://192.168.0.159:8080/usersystem/";            //登录接口地址

    //正式地址
     var URL = "https://1m.48.cn/"                                  //页面地址
     var LINK_URL = "https://48game.48.cn/fans/";            //接口地址
     var LOGIN_URL = "https://puser.48.cn/usersystem/";            //登录接口地址



    var SOURCE_URL = "https://source.48.cn/"                                    //资源地址
    //老版本
    var LINK_UPLOAD_SMALL = "https://gsupload.48.cn/filesystem/upload/smallfile"    //上传小文件接口
    var SOURCE_UPLOAD_URL = "https://gs.48.cn"                                      //上传后的文件地址
    //新版本
    //var LINK_UPLOAD_SMALL = "https://pfile.48.cn/filesystem/upload/image"    //上传小文件接口(new)
    //var SOURCE_UPLOAD_URL = "https://source.48.cn"                                  //上传后的文件地址
    var LINK_UPLOAD_BIG = "https://gsupload.48.cn/filesystem/upload/bigfile"        //上传大文件接口
   
   	data.getWebUrl = function(){//页面地址
        return URL;
    }   
    data.getLink = function(){//接口地址
        return LINK_URL;
    }
    data.getLoginLink = function(){//接口地址
        return LOGIN_URL;
    }
    data.getSourceUrl = function(){//资源地址
        return SOURCE_URL;
    } 
    data.getUploadSmall = function(){//上传小文件接口
        return LINK_UPLOAD_SMALL;
    } 
    data.getUploadBig = function(){//上传大文件接口
        return LINK_UPLOAD_BIG;
    } 
    data.getUploadSourceUrl = function(){//上传后的文件地址
        return SOURCE_UPLOAD_URL;
    } 
}(window.CONFIG = {}));


