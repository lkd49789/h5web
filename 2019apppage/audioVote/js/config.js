//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式接口
    
    var LINK_URL = "http://101.71.63.240/app-activity/";
    //测试
    var URL_PATH = "https://h5.48.cn/2019apppage/audioVote/"    //项目地址
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

