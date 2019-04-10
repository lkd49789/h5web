//主文件
(function(data) {
	var isload = false//是否加载中
    var result = [];//答案数组
    var total = 0;   //总题目
    var succ = 0;    //完成答题数
    var dataId = "";  //项目id
    var status = "" ;  //状态 1:未报名 2:已报名
	//初始化
	data.init = function(_total){
        dataId = localStorage.getItem("publicApplication_id")
        status = localStorage.getItem("publicApplication_status")

        console.log("dataId>"+dataId)
        console.log("status>"+status)


        total = _total;
        main.addListeners()
        $(".wrapper-submit").show()
        if(status == "1"){//未报名
           
        }else if(status == "2"){//已报名
            
            main.getInfo()
        }

	}
    //成员token
    data.getToken = function(){
        if(checkFromApp()){
            return window.web.getAccessToken();
        }else{
            return "BCrYaZMREslm4s8SgQ7zytY1SOEtZb5YZYp7nhGbHSBhei1x3c7efQ=="
        }
    }
    //成员id
    data.getMemberId = function(){
        if(checkFromApp()){
            return window.web.getLoginUserId();
        }else{
            return "5527"
        }
    }
	//添加事件
	data.addListeners = function(){
		// messageAlert.alert("显示的文字","按钮名称",function(){
  //           alert("回调函数！")
  //       })
        /*单选*/
        $('.choose-single p').click(function(){
            var _this = $(this).parent();
            _this.find("p").removeClass("choose-S-yes").addClass("choose-S-no")
            $(this).removeClass("choose-S-no").addClass("choose-S-yes")

            $(this).parent().parent().attr("value",$(this).attr("value"))//给上级元素li赋值
        })
        /*多选*/
        $('.choose-muti span').click(function(){
            if($(this).hasClass("choose-M-yes")){
                $(this).removeClass("choose-M-yes").addClass("choose-M-no")
            }else{
                $(this).removeClass("choose-M-no").addClass("choose-M-yes")
            }
            var str = "";
            $.each($(this).parent().find(".choose-M-yes"), function(index,dt){
                str += $(dt).attr("value")
                str += " "
            })
            $(this).parent().parent().attr("value",str)//给上级元素li赋值
        })
        /*灯光展示*/
        $(".icon-thumb").click(function(e){
            $(".pop-img").fadeIn();
            console.log($(this).attr("src"))
            $(".pop-img > img").attr("src",$(this).attr("src"))
            $(".pop-img > p").html($(this).parent().attr("value"));
            e.stopPropagation()
        })
        /*灯光展示浮层关闭*/
        $(".pop-img").click(function(){
            $(this).hide();
        })
        /*完成提交*/
        $(".btn-preview").click(function(){
            $.each($(".choose-input"),function(index,dt){
                $(this).parent().attr("value", $(this).find("input").val())
            })
            //填空题
            $.each($(".choose-textarea"),function(index,dt){
                $(this).parent().attr("value", $(this).find("textarea").val())
            })

            succ = 0;
            $(".tips").css("opacity",0);
            $.each($(".wrapper-submit").find("li"),function(index,dt){
                console.log("--"+index)
                //console.log("--"+$(dt).attr("value"))
                if($(dt).attr("value") == "" || $(dt).attr("value") == undefined){
                    $(dt).find(".tips").css("opacity",1);
                }else{
                    if($(dt).attr("value") == "是"){
                        if($(dt).find("input").val() == ""){
                            $(dt).find(".tips").html("此项未填写！").css("opacity",1);
                        }else{
                            $(dt).attr("value",$(dt).find("input").val())
                            result[index] = $(dt).attr("value");
                            succ += 1;
                        }
                        console.log("---"+$(dt).find("input").val())
                    }else{
                        result[index] = $(dt).attr("value");
                        succ += 1;
                    }
                }
            })
            //答题完毕 进入preview页
            if(succ ==total){
                console.log("done>>"+result)
                main.addInfoPreview(result)
            }
            console.log(succ)
            //console.log($(".timu1>div").hasClass(".choose-single"))
        })
        //返回编辑
        $(".btn-edit").click(function(){
            $(".wrapper-preview").hide();
            $(".wrapper-submit").show();
            
        })
        //提交
        $(".btn-submit").click(function(){
            main.submitData(result,function(){

            })
        })
	}
    data.addInfoPreview = function(dat){//预览题目 然后提交
        if(status == "2"){//已报名
            // $(".btn-wrapper-submit").hide()
            // $(".tip-succ").show()
        }
        $(".wrapper-submit").hide();
        $(".wrapper-preview").show();
        $.each($(".wrapper-preview").find("li").find("div"),function(index,dt){
            
            $(dt).html(dat[index])
        })
    }
    data.addInfo = function(dat){//编辑已答题目
        if(status == "2"){//已报名
            // $(".btn-wrapper-submit").hide()
            // $(".tip-succ").show()
        }

        $(".wrapper-submit").show();
        $(".wrapper-preview").hide();
        $.each($(".wrapper-submit").find("li").find("div"),function(index,dt){
            //赋值给li value
            $(this).parent().attr("value",dat[index])
            //
            var _this = $(dt);//div
            if(_this.hasClass("choose-input")){//输入框
                _this.find("input").val(dat[index]);
            }else if(_this.hasClass("choose-single")){//单选
                $.each(_this.find("p"),function(i,p){//单选项
                    //console.log($(p).attr("value"))
                    if(dat[index] == "没有" || dat[index] == "否"){//如果保存的答案是否定
                        if($(p).attr("value") == "没有" || $(p).attr("value") == "否"){//如果当前选项是否定
                            $(p).removeClass("choose-S-no").addClass("choose-S-yes");
                        }
                    }else{//答案不是否定 则赋值给已选项
                        if($(p).attr("value") == "有" || $(p).attr("value") == "是"){//如果当前选项是肯定
                            $(p).removeClass("choose-S-no").addClass("choose-S-yes");
                            $(p).find("input").val(dat[index]);
                        }else{
                            if(dat[index] == $(p).attr("value")){
                                $(p).removeClass("choose-S-no").addClass("choose-S-yes");
                            }
                        }
                    }
                })
            }else if(_this.hasClass("choose-muti")){//多选
                $.each(_this.find("span"),function(i,sp){//单选项
                    if(dat[index].indexOf($(sp).attr("value"))>=0 ){
                        $(this).removeClass("choose-M-no").addClass("choose-M-yes");
                    }else{
                        //$(this).addClass("choose-M-no");
                    }
                })
            }else if(_this.hasClass("choose-textarea")){
               _this.find("textarea").val(dat[index]);
            }
            //$(dt).html(dat[index])
        })
    }
	data.getValue = function(obj){
        obj.find(".choose-S-yes").attr("value")
    }
    //报名内容取得
    data.getInfo = function(_info){
        isload = true;
        $.ajax({
            url: "https://pother.48.cn/othersystem/api/apply/v1/getOne",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "memberId":main.getMemberId(),
                "dataId": dataId,
                "token":main.getToken()
            }),
            timeout: 5000, 
            success: function (dt) {
                if(dt.status == 200){
                    main.addInfo(dt.content)
                }
               
                isload = false
            },
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
                isload = false
            }
        });
    };
    //报名内容提交
    data.submitData = function(_info){
    	isload = true;
        $.ajax({
            url: "https://pother.48.cn/othersystem/api/apply/v1/applyCommit",
            type: "POST", 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "memberId":main.getMemberId(),
                "dataId": dataId,
                "info":_info,
                "token":main.getToken()
            }),
            timeout: 5000, 
            success: function (dt) {
                if(dt.status == 200){
                    //提交按钮隐藏
                    $(".btn-wrapper-submit").hide();
                    $(".tip-succ").show();
                    //
                    isload = false
                    localStorage.setItem("refresh","1")//初始化
                }
            },
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
                isload = false
            }
        });
    };
}(window.main = {}));

//-----------------------------------------------------------------------------------------------
