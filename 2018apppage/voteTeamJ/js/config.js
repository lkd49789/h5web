//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式接口
    
     var LINK_URL = "https://pscan.48.cn/qrscansystem/";           //接口地址
     var URL_PATH = "https://h5.48.cn/2018apppage/voteTeamJ/"                       //项目地址
    //测试
    
    //var LINK_URL = "http://192.168.0.18:8084/qrscansystem/";               //测试接口地址
    //var URL_PATH = "https://h5.48.cn/2018apppage/voteTeamJ/"    //项目地址
    
    
    data.getLink = function(){//接口地址
        return LINK_URL;
    }
    
    data.geturl = function(){//项目地址
        return URL_PATH;
    }
      
   	
}(window.CONFIG = {}));


