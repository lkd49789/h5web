//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    var WEB_URL = "https://h5.48.cn/mc/mc_v7/" //页面正式地址
    var PATH_URL = "https://pother.48.cn/othersystem/api/"   //接口地址
    // var PATH_URL = "http://101.71.63.240:8089/othersystem/api/"
    
    data.getWebUrl = function(){
        return WEB_URL;
    }
    data.getPath = function(){
        return PATH_URL;
    }
    
}(window.CONFIG = {}));


