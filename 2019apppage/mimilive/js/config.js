(function(data) {
	//var LINK_URL = "http://192.168.0.57:8083/othersystem/";
    var LINK_URL = "https://pother.48.cn/othersystem/";
  	var SOURCE_URL = "https://source.48.cn/";   //资源地址
  	var JUMP_URL = "https://h5.48.cn/2018apppage/mimilive/";

    data.geturl = function(){
        return LINK_URL;
    }
    data.getSourceUrl = function(){
        return SOURCE_URL;
    }
    data.getJumpUrl = function(){
        return JUMP_URL;
    }

}(window.CONFIG = {}));