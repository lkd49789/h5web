//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //-------------------------------------------正式环境-------------------------------------------------
    var LINK_URL = "https://ppay.48.cn/paysystem/";        //接口地址
    //var LINK_URL = "http://101.71.63.240:8090/paysystem/";        //测试接口地址
    data.getLink = function(){//接口地址
        return LINK_URL;
    }
    
}(window.CONFIG = {}));
