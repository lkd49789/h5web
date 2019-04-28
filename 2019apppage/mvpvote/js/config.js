//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
	//var LINK_URL = "http://101.71.63.240/scan/";
	//var WEB_URL = "http://192.168.0.9/2019apppage/mvpvote/"//活动域名
    //正式接口
    var LINK_URL = "https://pocketapi.48.cn/scan/";                    
    var WEB_URL = "https://h5.48.cn/2019apppage/mvpvote/"//活动域名
    data.getLink = function(){//接口地址
        return LINK_URL;
    }
    data.getUrl = function(){//
        return WEB_URL;
    }
}(window.CONFIG = {}));


