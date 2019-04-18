var mcValue = localStorage.getItem("CUR_TEAM") || "{}";
var thisMc = JSON.parse(mcValue);

var topiclistVM = new Vue({
    el: '#wrapper',
    data: {
      topics : []
    }
});


var topiclist = mcTopic.getTopicList(thisMc.teamId, function(dt){
  //console.log(JSON.stringify(topiclist));
  topiclistVM.topics = dt.content;
  $(".wrapper").fadeIn()
  if(dt.content.mcTopic.length <1){
        $(".content-choose").eq(0).append(addTip())
  }
  if(dt.content.otherTopic.length <1){
        $(".content-choose").eq(1).append(addTip())
  }
}, function(msg){
  //pullfresh_function()
    alert(msg);
});


function addTip(){
    var html= "<p class='tip'><img src='images/icon-1.png'>暂无信息</p>"
    return html;
}
