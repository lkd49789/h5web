//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式接口
    
    // var LINK_URL = "https://48game.48.cn/fans/";           //接口地址
    // var URL_PATH = "https://vote.48.cn/wx/"                       //项目地址
    //测试
    
    //var LINK_URL = "http://192.168.0.159:8080/games/";          //测试接口地址
    var LINK_URL = "https://48game.48.cn/fans/";
    var ASSETS_URL = "https://source.48.cn/"                             //素材地址
    
    data.getLink = function(){//接口地址
        return LINK_URL;
    }
    
    data.getSource = function(){//
        return ASSETS_URL;
    }
   	
}(window.CONFIG = {}));


