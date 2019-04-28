//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式环境
    //-------------------------------------------正式环境-------------------------------------------------
    
    var FORMAL_URL = "https://pocketapi.48.cn/swc/";              //正式
    var SOURCE_URL = "https://source.48.cn";                      //图片 视频等域名地址
    var WEB_URL = "https://h5.48.cn/2019apppage/welfare/"       //页面地址
    //---------------------------------------------------------------------------------------------
    
    data.getPath = function(){//
        return WEB_URL;
    }
    data.getFormal = function(){//正式接口地址
        return FORMAL_URL;
    }
    

    data.getSource = function(){//接口地址
        return SOURCE_URL;
    }

}(window.CONFIG = {}));


