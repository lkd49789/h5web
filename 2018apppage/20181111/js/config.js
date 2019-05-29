//项目配置文件 除非地址有变化 否则无需更新
(function(data) {
    //正式环境
    //-------------------------------------------正式环境-------------------------------------------------
    //var LINK_URL = "https://voteapi.48.cn/2018b50fs/";        //接口地址
	//var URL_PATH = "http://h5.snh48.com/2018apppage/20181111/" //项目地址
    var URL_PATH = "https://h5.48.cn/2018apppage/20181111/" //项目地址
    var SOURCE_URL = "https://vote.48.cn/resource/"   //资源地址
    //--------------------------------------------测试环境-------------------------------------------------
    //var LINK_URL = "http://101.71.63.240/paysystem/";          //接口地址
    var LINK_URL = "https://ppay.48.cn/paysystem/"               //项目地址
    //var SOURCE_URL = "https://vote.48.cn/resource/"              //资源地址
    //---------------------------------------------公用------------------------------------------------

    data.getLink = function(){//接口地址
        return LINK_URL;
    }
    data.geturl = function(){//项目地址
        return URL_PATH;
    }
    data.getSourceUrl = function(){//图片等素材
        return SOURCE_URL;
    }   
   	
}(window.CONFIG = {}));


