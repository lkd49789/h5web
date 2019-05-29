//项目配置文件 除非地址有变化 否则无需更新

(function(data) {
    //var WEB_URL = "https://vote.48.cn/app/"  //正式接口地址
    var WEB_URL = "http://h5.snh48.com/2018apppage/2018vote/app/"
    //var WEB_URL = ""                                         //页面地址
	var JK_URL = "http://101.71.63.240/5thvote/";               //接口地址
    //var JK_URL = "https://voteapi.48.cn/5thvote/";               //接口地址 //
	var PIC_URL = "https://vote.48.cn/resource/img/member/"    //成员头像地址
    var YWT = "https://h5.48.cn/pay/app_cmb/vote_pay.php"        //一网通接口
    var UPLOAD_URL = "http://gs.48.cn"                            //上传图片域名
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
}(window.CONFIG = {}));


