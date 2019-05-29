(function(data) {
    var allMembers ;//所有成员
    var prevTeam = "";
    var curMemberId = "";//所选成员id
    var curMemberName = "";//所选成员姓名
    var curIndex ;//当前名次索引

    var _li = '<li>'+
'                    <div class="rankLeft">'+
'                        <span class="rank">{{index}}</span>'+
'                        <span class="avatar"></span>'+
'                    </div>'+
'                    <button class="mername" id="{{id}}">选一位成员</button>'+
'                </li>'

    data.init = function(){
        INDEX.createTop16();
        main.getAllMembers(function(dt){
            allMembers = dt.rows
            INDEX.createMemberList(allMembers)
        })

        INDEX.addListners()
    }
    //top16列表
    data.createTop16 = function(){
        var html = "";
        for(var i=0; i<16;i++){
            var li = _li
            li = li.replace("{{index}}",(i+1));
            li = li.replace("{{id}}",i);
            html += li;
        }
        $(".rankList").html(html)
    }
    //成员列表
    data.createMemberList = function(dt){
        var html = ""
        $.each(dt,function(i, member) {
            var _team,teamName;
            if(member.tname == "预备生"){
                _team = "YBS"
                teamName = member.gname+" 预备生"
            }else{
                _team = member.tname
                teamName = "TEAM "+member.tname
            }
            if(_team != prevTeam){
                html += "<div class='team "+_team+"-c'>" + teamName + "</div>";
                prevTeam = _team;
            }
            html += "<div class='mem_ciSingle' sid='"+member.sid+"'>" + member.sname + "</div>";
            
        })
        $("#option_list").html(html)

    }
    data.addListners = function(){
        //点击选择成员
        $(".mername").click(function(){
            if($(this).html() != "选一位成员"){
                return false;
            }
            curIndex = $(this).attr("id");
            $(".pop-penel").show();
            console.log(curIndex)
        })
        //选择成员
        $(".mem_con").on("click",".mem_ciSingle",function(){
            $(".mem_ciSingle").removeClass("mem_ciSingleSel");
            $(this).addClass("mem_ciSingleSel")
            curMemberId = $(this).attr("sid");
            curMemberName = $(this).html()
        })
        //确认选择
        $(".mem_cbtn").click(function(){
            if(curMemberId == ""){
                main.alert("请先选择成员")
                return false;

            }
            $(".rankList li").eq(curIndex).attr("memberId",curMemberId)
            $(".mername").eq(curIndex).html(curMemberName)

            $(".avatar").eq(curIndex).css("background-image","url(https://vote.48.cn/resource/img/member/zp_"+curMemberId+".jpg)")
            $(".mem_ciSingleSel").remove()
            $(".pop-penel").hide()
            $(".mem_ciSingle").show()

            curMemberId = "";
            curMemberName = ""
        })
        //关闭
        $(".close").click(function(){
            $(".pop-penel").hide()
        })

        //重选
        $(".againbtn").click(function(){
            $(".rankList li").removeAttr("memberid");
            $(".avatar").css("background-image","url(img/headeg.png)")
            $(".mername").html("选一位成员");
            curMemberId = "";
            curMemberName = ""
            INDEX.createMemberList(allMembers)
        })


        //提交
        $(".subbtn").click(function(){
            var arr = [];
            $.each($(".rankList li"),function(index,dt){
                if($(this).attr("memberid") == undefined || $(this).attr("memberid") == null){
                    main.alert("请选择所有预测结果！")
                    return false;
                }else{
                    arr.push($(this).attr("memberid"))
                }
            })
            if(arr.length>=16){
                $(".underbtns button").attr("disabled",true)
                main.submit(arr,function(dt){
                    $(".underbtns button").attr("disabled",false)
                    if(dt.status == 200){
                        localStorage.setItem("submitGuess","yes")
                        window.web.backHome()
                    }else{
                        main.alert(dt.message)
                    }
                })
            }
            
        })
    }

}(window.INDEX = {}));

INDEX.init();
