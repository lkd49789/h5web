//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式接口
    
    var URL_PATH = "https://h5.48.cn/2019apppage/swimsuit/"
    // var URL_PATH = "http://192.168.0.107/h5web/2019apppage/swimsuit/"    //项目地址
    var URL_PATH = "http://127.0.0.1:5500/2019apppage/swimsuit/"    //项目地址
    // var LINK_URL = "https://pactivity.48.cn/app-activity/";                   //接口  
    // var LINK_URL = "http://192.168.0.10:8094/app-activity/";                   //接口  
    // var LINK_URL = "http://101.71.63.240/app-activity/";                   //接口  

    var LINK_URL = "https://pactivity.48.cn/app-activity/"
    var ASSETS_URL = "https://source.48.cn/"

    data.geturl = function(){//项目地址
        return URL_PATH;
    }

    data.getSource = function(){//
        return ASSETS_URL;
    }

    data.getLink = function(){//接口地址
        return LINK_URL;
    }
}(window.CONFIG = {}));


