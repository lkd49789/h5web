//主文件
(function(data) {
	var isload = false//是否加载中
    var result = [];//答案数组
    var total = 14;
    var succ = 0;
	//初始化
	data.init = function(){
        main.addListeners()
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
            //第15题
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
                main.addInfo(result)
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
    data.addInfo = function(data){
        $(".wrapper-submit").hide();
        $(".wrapper-preview").show();
        $.each($(".wrapper-preview").find("div").find("p"),function(index,dt){
            $(dt).html(data[index])
        })
    }
	data.getValue = function(obj){
        obj.find(".choose-S-yes").attr("value")
    }
    //获取成员列表
    data.submitData = function(_info){
    	isload = true;
        $.ajax({
            url: "https://plive.48.cn/livesystem/api/live/v1/h5/loveActionInfo",
            type: "POST", 
            async:true,
            data: {
                "info":_info
            },
            timeout: 5000, 
            dataType:"json",
            success: function (dt) {
               
                isload = false
            },
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
                isload = false
            }
        });
    };
}(window.main = {}));

//-----------------------------------------------------------------------------------------------
$(function(){
    main.init()
})

