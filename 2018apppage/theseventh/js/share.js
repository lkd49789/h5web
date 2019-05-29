(function(data) {
    var para,paraArr,wxToken,conId,share_uname,share_mname,share_content;
    data.init = function(){
        INDEX.addListeners();//事件
        
        wxToken = GetQueryString("wxtoken");
        para = GetQueryString("para");
        paraArr = para.split("___")
        conId = paraArr[0]
        share_uname = decodeURI(decodeURI(paraArr[1]))
        share_mname = decodeURI(decodeURI(paraArr[2]))
        share_content = decodeURI(decodeURI(paraArr[3]))
        console.log(conId)
        console.log(share_uname)
        console.log(share_mname)
        console.log(share_content)
        main.confessionInfo(conId,function(dt){
            if(dt.status == 200){
                $(".username").html(dt.content.nicker)
                $(".mername").html(dt.content.memberNicker)
                $(".text").html(dt.content.replyContent)
            }else{
                main.alert(dt.message)
            }
        })

        
        
    }
    
    data.addListeners = function(){
        //祝福他
        $(".blessingbtn").click(function(){
            INDEX.sendHelp()
        })
        
        //领鸡腿
        $(".receivebtn").click(function(){
            main.hrefTo("index-wx.html")
            //window.location.href = ""

        })
        
        $(".btn-share").click(function(){
            $(".share-panel").fadeIn()
        })
        $(".share-panel").click(function(){
            $(".share-panel").hide()
        })
    }
    //获取表白墙数据
    data.sendHelp = function(){
        main.sendHelp(conId,wxToken,function(dt){
            if(dt.status == 200){
                $(".blessingbtn").attr("disabled",true).css("opacity",.7)
            }else{
                
            }
            main.alert(dt.message)
        })
    }
    
}(window.INDEX = {}));

INDEX.init();

