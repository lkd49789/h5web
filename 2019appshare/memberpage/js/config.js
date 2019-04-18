//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式环境
    //-------------------------------------------正式环境-------------------------------------------------
    var USERSYSTEM_URL = "https://puser.48.cn/usersystem/";            //用户系统 接口域名
    var DYNAMIC_URL = "https://pdynamic.48.cn/dynamicsystem/";        //动态类接口域名
    var JUJU_URL = "https://pjuju.48.cn/imsystem/";                      //聚聚房间
    var USER_URL = "https://puser.48.cn/usersystem/";              //用户信息 成员信息  金钱相关接口域名
    var LIVE_URL = "https://plive.48.cn/livesystem/";              //直播相关接口
    var CUMMUNE_URL = "https://pcommnue.48.cn/communesystem/";        //公社相关
    var SOURCE_URL = "https://source.48.cn";                      //图片 视频等域名地址
    var getGSpbase = "https://pcommnue.48.cn/communesystem/";    //公社
    var PocketBase = "https://pmedia.48.cn/media"                //nightwords music video 夜谈分享/音乐/视频
    
    //---------------------------------------------------------------------------------------新版2019
    var DYNAMIC_URL = "https://pocketapi.48.cn/posts/";              //帖子
    var USER_URL = "https://pocketapi.48.cn/user/";                 //用户系统
    var LIVE_URL = "https://pocketapi.48.cn/live/";              //直播相关接口
    //---------------------------------------------公用------------------------------------------------
    var UPLOAD_URL = "http://gs.48.cn"                            //上传图片域名
    var GONGSHE_VIDEO = "https://mp4.48.cn"                           //公社视频地址
    data.getLink = function(){//接口地址
        return LINK_URL;
    }
    data.getJujuUrl = function(){//聚聚房间
        return JUJU_URL;
    }
    data.getUsersystemUrl = function(){//用户系统接口
        return USERSYSTEM_URL;
    }
    data.getDynamicUrl = function(){//动态
        return DYNAMIC_URL;
    }
    data.getUserUrl = function(){//用户信息 成员信息等
        return USER_URL;
    }
    data.getLiveUrl = function(){//直播相关
        return LIVE_URL;
    }
    data.getCummuneUrl = function(){//公社
        return CUMMUNE_URL;
    }
    data.getSource = function(){//接口地址
        return SOURCE_URL;
    }
    data.getGSpbase = function(){//公社详情
        return getGSpbase;
    }
    data.getGSVideo = function(){//公社视频地址
        return GONGSHE_VIDEO;
    }
    data.getPocketBase = function(){
        return PocketBase; //nightwords music video 夜谈分享/音乐/视频
    }
}(window.CONFIG = {}));


