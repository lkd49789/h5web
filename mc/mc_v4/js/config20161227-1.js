//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    var WEB_URL = "http://h5test.snh48.com/mc/mc_v4/" //页面正式地址
    //var PATH_URL = "http://apitest.snh48.com:8080/pocket_v2/"   //接口地址
    var PATH_URL = "http://pocket2.snh48.com/pocket_v2/"   //接口地址
    
    data.getWebUrl = function(){
        return WEB_URL;
    }
    data.getPath = function(){
        return PATH_URL;
    }
    
}(window.CONFIG = {}));


