//项目配置文件 除非地址有变化 否则无需更新

(function(data) {
    var LINK_URL = "http://h5.snh48.com/"//接口地址
    var WEB_URL = "http://source.snh48.com"   //页面地址
    data.getLink = function(){
        return LINK_URL;
    }
    data.getWeb = function(){
        return WEB_URL;
    }
}(window.CONFIG = {}));


