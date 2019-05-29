//项目配置文件 除非地址有变化 否则无需更新

(function(data) {
    var WEB_URL = "https://h5.48.cn/2018apppage/2018vote/handshake"
    //var WEB_URL = "https://meet.48.cn/app/"                      //页面地址
    //var WEB_URL = ""                                           //页面地址
	var JK_URL = "https://h5.48.cn/meetapi/app/";                   //接口地址
	var PIC_URL = "https://h5.48.cn/resource/img/member/"        //成员头像地址
    var YWT = "https://h5.48.cn/pay/app_cmb/vote_pay.php"        //一网通接口
    var UPLOAD_URL = "http://gs.48.cn"                           //上传图片域名
    var SOURCE_URL = "https://source.48.cn/"                     //头像地址前缀
    data.getURL = function(){//路径
        return WEB_URL;
    }
    data.getJK = function(){//接口地址
        return JK_URL;
    }
    data.getPicUrl = function(){
    	return PIC_URL;
    }
    data.getYWT = function(){
        return YWT;
    }
    data.getUploadPicPath = function(){
        return UPLOAD_URL;
    }
    data.getSourceUrl = function(){
        return SOURCE_URL;
    }
}(window.CONFIG = {}));


