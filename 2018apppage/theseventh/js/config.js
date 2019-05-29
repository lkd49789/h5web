//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式环境
    //-------------------------------------------正式环境-------------------------------------------------
    var SOURCE_URL = "https://source.48.cn";                      //图片 视频等域名地址
    //---------------------------------------------公用------------------------------------------------
    var UPLOAD_URL = "http://gs.48.cn"                            //上传图片域名

    var UERLINK = "http://192.168.0.70:8080/fans/" //测试接口
    var UERLINK = "https://snhwxapi.48.cn/fans/ " //正式接口
    
    var JUMPLINK = "https://h5.48.cn/2018apppage/theseventh/"

    data.getSource = function(){
        return SOURCE_URL;
    }
    
    data.getUerlink = function(){//接口地址
        return UERLINK;
    }

    data.getJumplink = function(){//内部跳转
        return JUMPLINK;
    }

    data.getSourcePic = function(){//上传图片域名
        return UPLOAD_URL;
    }

}(window.CONFIG = {}));


