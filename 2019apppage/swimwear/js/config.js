//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式接口
    var LINK_URL = "https://pactivity.48.cn/app-activity/";               //接口地址
    var URL_PATH = "https://h5.48.cn/2019apppage/swimwear/"                       //项目地址
    //测试
    
    //var LINK_URL = "http://192.168.0.22:8094/app-activity/";               //测试接口地址
    //var URL_PATH = "http://192.168.0.9/2019apppage/swimwear/"    //项目地址
    
    
    data.getLink = function(){//接口地址
        return LINK_URL;
    }
    
    data.geturl = function(){//项目地址
        return URL_PATH;
    }
      
   	
}(window.CONFIG = {}));


