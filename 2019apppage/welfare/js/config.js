//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式环境
    //-------------------------------------------正式环境-------------------------------------------------
    
    var FORMAL_URL = "https://pother.48.cn/othersystem/";              //正式
    var FORMAL_URL_XK = "https://puser.48.cn/usersystem/"                //星卡正式
    var SOURCE_URL = "https://source.48.cn";                      //图片 视频等域名地址
    //---------------------------------------------------------------------------------------------
    

    data.getFormal = function(){//正式接口地址
        return FORMAL_URL;
    }
    data.getFormalxk = function(){//正式接口地址
        return FORMAL_URL_XK;
    }

    data.getSource = function(){//接口地址
        return SOURCE_URL;
    }

}(window.CONFIG = {}));


