//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    var WEB_URL = "https://h5.48.cn/2018apppage/2018vote/bugreport/"   //故障申告地址
	var PHP_URL = "https://h5.48.cn/2018voteapi/app/";               //故障申告接口地址
    var UPLOAD_URL = "http://gs.48.cn"                            //上传图片域名
    data.getURL = function(){//路径
        return WEB_URL;
    }
    data.getPhpJK = function(){//接口地址
        return PHP_URL;
    }
    data.getUploadPicPath = function(){
        return UPLOAD_URL;
    }
}(window.CONFIG = {}));