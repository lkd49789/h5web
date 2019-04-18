//项目配置文件 除非地址有变化 否则无需更新
/*
新版本分享
2019.3.7

 */
(function(data) {
    //--------------------------------------------------------------测试地址
    var media_url = "https://pocketapi.48.cn/media"//视听详情 音乐详情 电台详情 视频详情
    var posts_url = "https://pocketapi.48.cn/posts";         //帖子
    var live_url = "https://pocketapi.48.cn/live";              //直播相关接口
    var trip_url = "https://pocketapi.48.cn/trip";              //相关接口
    //--------------------------------------------------------------测试地址
    //
    //素材
    var video_asset = "https://mp4.48.cn"//视频 音频路径
    var img_asset = "https://source.48.cn" //图片路径
    var page_url = "https://h5.48.cn/2019appshare/"//文件地址

    data.getVideoPath = function(){//视频 音乐接口
        return media_url; 
    }
    data.getLivePath = function(){//直播相关接口
        return live_url; 
    }
    data.getPostsPath = function(){//帖子相关接口
        return posts_url; 
    }
    data.getTripPath = function(){//行程相关接口
        return trip_url; 
    }


    data.getVideoSource = function(){//视频路径
        return video_asset; 
    }

    data.getImgSource = function(){//图片路径
        return img_asset; 
    }
    data.getWebUrl = function(){//文件路径
        return page_url; 
    }
}(window.CONFIG = {}));