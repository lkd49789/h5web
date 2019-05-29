(function(data) {
    var LINK_URL = "https://h5.48.cn/open_vote/php/";
  	var SOURCE_URL = "https://source.48.cn/";   //资源地址
  	var JUMP_URL = "https://h5.48.cn/2018apppage/publicVote_news_end/";

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