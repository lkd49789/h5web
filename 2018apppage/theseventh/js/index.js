(function(data) {
    
    var allMembers ;//所有成员
    var prevTeam = "";
    var teamList = [];//队伍列表
    
    data.init = function(){
        //$(".msg").html(window.location.href)
        $(".msg").append("--------"+GetQueryString("para"))
        $(".msg").append("--------"+GetQueryString("wxtoken"))
        
        main.getAllMembers(function(dt){
            allMembers = dt.rows
            INDEX.createMemberList(allMembers)
        })
        INDEX.addListeners();
    }
    
    data.addListeners = function(){
        //打开小程序
        $(".openminiapp").click(function(){
            window.web.launchWechatMiniProgram(launchParams());
        })
        //
        $(".team").change(function(){
            console.log($(this).val())
            INDEX.chooseTeam($(this).val())
        })
    }
    //成员分组
    data.createMemberList = function(dt){
        var html = ""
        $.each(dt,function(i, member) {
            var teamName;//队伍名

            if(member.tname == "预备生"){
                teamName = member.gname+" 预备生"
            }else{
                teamName = "TEAM "+member.tname
            }
            if(teamName != prevTeam){//切换队伍
                teamList.push(teamName);
                prevTeam = teamName;
                html += '<option value="'+member.tid+'">'+teamName+'</option>';
            }
        })
        console.log(teamList)
        $(".team").html(html)
        INDEX.chooseTeam("101")
    }
    //根据tid选择队伍
    data.chooseTeam = function(tid){
        var html = ""
        $.each(allMembers,function(i, member) {
            if(member.tid == tid){
                if(member.status != "44" && member.status != 44){
                    html += '<option value="'+member.sid+'">'+member.sname+'</option>';
                }
                
            }
        })
        $(".member").html(html)
    }

}(window.INDEX = {}));

INDEX.init();


//var appToken = window.web.getAccessToken();
var thisurl = "https://h5.48.cn/2018apppage/theseventh/index.html?id=1"
var url = "h5.48.cn/2018apppage/theseventh/index.html"
function launchParams() {
    //var url = encodeURIComponent(thisurl)
    return JSON.stringify({
        id: "gh_dc1ce10e9cd3",
        path: "pages/h5share/h5share?htp=https&url="+url+"&para=1",
        //path: "pages/h5share/h5share?url="+url+"&apptoken="+appToken,
        type: 'test',  //test（开发版），trial（体验版），release（正式版）
        callback: "launchCallback"
    })
}