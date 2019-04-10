//主文件
(function(data) {
	var li = 
'        <li>'+
'            <img src="{{banner}}">'+
'            <article>'+
'                <p class="info-top">{{title}}</p>'+
'                <p class="info-bottom"><span class="date">{{fromToDate}}</span><span class="btn" id={{dataId}} status="{{status}}">{{statusStr}}</span></p>'+
'            </article>'+
'        </li>'
    var localInterval;
    var refresh = "0"//初始刷新参数   变为1 则开始刷新
    //成员token
    data.getToken = function(){
        if(checkFromApp()){
            return window.web.getAccessToken();
        }else{
            return "uBj7yzs0lbP2ooS1H6pjzePujqlFqdx7cK2PmtDtL9WbhVVM+daH3I/PF+gEzuWA"
        }
    }
    //成员id
    data.getMemberId = function(){
        if(checkFromApp()){
            return window.web.getLoginUserId();
        }else{
            return "3"
        }
    }
    //获取列表
    data.getList = function(){
    	isload = true;
        $.ajax({
            url: "https://pother.48.cn/othersystem/api/apply/v1/list",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "memberId":main.getMemberId()
            }),
            timeout: 5000, 
            success: function (dt) {
                console.log(dt.content.length)
                if(dt.content.length>0){
                    var html = ""
                    $.each(dt.content,function(index,dt1){
                        var _li = li;
                        _li = _li.replace("{{dataId}}", dt1.dataId)
                        _li = _li.replace("{{banner}}", CONFIG.getAssetsUrl()+dt1.picPath)
                        _li = _li.replace("{{title}}", dt1.title)
                        _li = _li.replace("{{fromToDate}}", dt1.fromToDate)
                        _li = _li.replace("{{status}}", dt1.status)
                        _li = _li.replace("{{statusStr}}", main.getStatus(dt1.status))
                        html += _li
                    })
                    //console.log(html)
                    $("ul").html(html)
                    $('article').css("height",$(".wrapper").find("img").css("height"))
                    main.addListeners()
                }else{
                    $("ul").hide();
                    $("h1").show();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) { 
//              alert("eee");
               
            }
        });
    };
    data.addListeners = function(){
        $(".btn").off();
        $(".btn").click(function(){
            var id = $(this).attr("id");
            var status = $(this).attr("status");
            localStorage.setItem("refresh","0")
            localStorage.setItem("publicApplication_id",id)
            localStorage.setItem("publicApplication_status",status)
            if(id == "1"){
                main.hrefTo("zongxuan.html")
            }else if(id == "2"){
                main.hrefTo("birthday.html")
            }else if(id == "3" || id == "8" || id == "9"){
                main.hrefTo("special.html")
            }else if(id == "4"){
                main.hrefTo("jinqu.html")
            }else if(id == "5"){
                main.hrefTo("teamFT.html")
            }else if(id == "6"){
                main.hrefTo("birthday.html")
            }else if(id == "7"){
                main.hrefTo("zongxuan2018.html")
            }
        })

        main.startRefresh()
    }
    //
    data.startRefresh = function(){  
        if(localInterval != null){
            clearInterval(localInterval)
        }
        localInterval = setInterval(function(){
            refresh = localStorage.getItem("refresh"); 
            if(refresh == "1"){//开始刷新
                main.getList()
                localStorage.setItem("refresh","0")//初始化
            }
            $('article').css("height",$(".wrapper").find("img").css("height"))//刷新时候重定义位置大小
        },1000)
    }
    data.getStatus = function(str){
        if(str == 1){
            return "报名"
        }else{
            return "查看"
        }
    }
    data.hrefTo = function(_url){
        if(checkFromApp()){
            window.web.gotoDetail(CONFIG.getWebUrl()+_url)
        }else{
            window.location.href = _url;
        }
    }
}(window.main = {}));

main.getList()