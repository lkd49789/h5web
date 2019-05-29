//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式接口
    
    // var URL_PATH = "https://h5.48.cn/"                       //项目地址
    //测试
    var USERSYSTEM_URL = "https://puser.48.cn/usersystem/";            //用户系统 接口域名
    var URL_PATH = "https://48game.48.cn/fans/"    //项目地址
    var ASSETS_URL = "https://source.48.cn/"
    var LINK_URL = "https://48game.48.cn/fans/";

    data.geturl = function(){//项目地址
        return URL_PATH;
    }

    data.getSource = function(){//
        return ASSETS_URL;
    }

    data.getUsersystemUrl = function(){//用户系统接口
        return USERSYSTEM_URL;
    }

    data.getLink = function(){//接口地址
        return LINK_URL;
    }
}(window.CONFIG = {}));


