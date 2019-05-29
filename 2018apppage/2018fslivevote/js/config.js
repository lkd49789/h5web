//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式环境
    //-------------------------------------------正式环境-------------------------------------------------
    var JSON_URL = "https://vote.48.cn/resource/json/song2018/"   // json地址
    var LINK_URL = "https://voteapi.48.cn/2018b50fs/";        //接口地址
    var PHP_URL = "https://b50vote.48.cn/b50vote/";       //故障接口地址 正式接口
	var URL_PATH = "https://h5.48.cn/2018apppage/2018fslivevote/" //项目地址
    var SOURCE_URL = "https://vote.48.cn/resource/"   //资源地址
    //--------------------------------------------测试环境-------------------------------------------------
    //var JSON_URL = "json/";                                         //测试地址
    //var JSON_URL = "https://h5.48.cn/2017song/resource/json/"
    //var LINK_URL = "http://101.71.63.240/b50vote/";          //接口地址
     // var PHP_URL = "http://101.71.63.240:8087/b50vote/";               //故障接口地址
     // var URL_PATH = "http://192.168.0.179/2018wxapph5/2018song/"               //项目地址
     //var URL_PATH = "https://h5.48.cn/2017song/app/"               //项目地址
    //var SOURCE_URL = "https://vote.48.cn/resource/"              //资源地址
    //---------------------------------------------公用------------------------------------------------
    var YWT = "https://h5.48.cn/pay/app_cmb/vote_pay.php"         //一网通接口
    var UPLOAD_URL = "http://gs.48.cn"                            //上传图片域名

    data.getLink = function(){//接口地址
        return LINK_URL;
    }
    data.getPhpLink = function(){//故障接口地址
        return PHP_URL;
    }
    data.geturl = function(){//项目地址
        return URL_PATH;
    }
    data.getSourceUrl = function(){//图片等素材
        return SOURCE_URL;
    }   
   	data.getJsonUrl = function(){//json地址
        return JSON_URL;
    }
    data.getUploadPicPath = function(){//上传图片域名
        return UPLOAD_URL;
    }
    data.getYWT = function(){//一网通支付接口
        return YWT;
    }
}(window.CONFIG = {}));


