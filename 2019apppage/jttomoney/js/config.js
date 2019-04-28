//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式接口
    // var LINK_URL = "https://pocketapi.48.cn/";
    // var URL_PATH = "https://h5.48.cn/2019apppage/jttomoney/"    //项目地址
    
    //测试
    var LINK_URL = "https://www.pocket48.com/";
    var URL_PATH = "http://192.168.0.9/2019apppage/jttomoney/"                       //项目地址


    data.geturl = function(){//项目地址
        return URL_PATH;
    }

    data.getLink = function(){//接口地址
        return LINK_URL;
    }
}(window.CONFIG = {}));


