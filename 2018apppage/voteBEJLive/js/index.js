//主界面
(function(data) {
    var voteType = "";//支付类型
    var voteNum = 0;   //所需积分  鸡腿   免费票数
    var groupId ;     // 被投票分组 0 白队 1 红队
    var canload = false;  //是否可提交
    //初始化
    data.init = function(){
        //获取积分 鸡腿 免费票
        main.getBalance(function(dt){
            
            if(dt.status == 200){
                $(".integral").html(dt.content.integral);
                $(".money").html(dt.content.money);
                $(".free").html(dt.content.free);

                canload = true;

                INDEX.addListeners();
            }
        })
    }
    
    
    //添加事件
    data.addListeners = function(){
        //为红队应援
        $(".btn-red").click(function(){
            if(!canload){
                return false;
            }
            $(".vote-panel,.edit-panel").fadeIn();
            $(".btn-red").attr("src","img/btn-red-active.png");
            $(".btn-white").attr("src","img/btn-white.png");

            $(".btn-vote").html("确认为红队应援")
            $(".btn-revote").html("继续为红队应援")

            if($(".btn-vote").hasClass("btn-vote-white")){
                $(".btn-vote").attr('class',"btn-vote btn-vote-red")
                $(".btn-revote").attr('class',"btn-revote btn-vote-red")
            }
            //成功后
            $(".success-panel").hide();
            $(".success-panel > img").attr("src","img/success-red.png");

            groupId = 1;
            INDEX.canVote();
        })

        //为白队应援
        $(".btn-white").click(function(){
            if(!canload){
                return false;
            }
            $(".vote-panel,.edit-panel").fadeIn();
            $(".btn-red").attr("src","img/btn-red.png");
            $(".btn-white").attr("src","img/btn-white-active.png");


            $(".btn-vote").html("确认为白队应援")
            $(".btn-revote").html("继续为白队应援")
            
            if($(".btn-vote").hasClass("btn-vote-red")){
                $(".btn-vote").attr('class',"btn-vote btn-vote-white")
                $(".btn-revote").attr('class',"btn-revote btn-vote-white")
            }
            //成功后
            $(".success-panel").hide();
            $(".success-panel > img").attr("src","img/success-white.png");
            
            groupId = 0;
            INDEX.canVote();
        })

        //继续投票
        $(".btn-revote").click(function(){
            $(".success-panel").hide();
            $(".edit-panel").fadeIn();
            
        })
        //选支付类型
        $(".pay-type span").click(function(){
            $(this).siblings().removeClass("choose");
            $(this).addClass("choose");
            voteType = $(this).attr("type");
            INDEX.canVote();
        })
        //输入框输入
        $(".num").bind('input propertychange',function(){
            INDEX.canVote();
        })
        //关闭
        $(".btn-close").click(function(){
            $(".vote-panel,.tips").hide();

            $(".btn-red").attr("src","img/btn-red.png");
            $(".btn-white").attr("src","img/btn-white.png");

            INDEX.reset();
        })
        $(".btn-close-m").click(function(){
            window.web.closePopBox();
        })
        //提交
        $(".btn-vote").click(function(){
            if($(this).hasClass("btn-vote-disabled")){//不可点击
                return false;
            }
            if(!canload){
                return false;
            }
            canload = false;
            main.voteIng(voteType,groupId,voteNum,function(dt){
                if(dt.status == 200){
                    //投票成功
                    $(".edit-panel").hide();
                    $(".success-panel").fadeIn()
                    $(".tips").hide();

                    
                    //获取积分 鸡腿 免费票
                    main.getBalance(function(dt){
                        if(dt.status == 200){
                            $(".integral").html(dt.content.integral);
                            $(".money").html(dt.content.money);
                            $(".free").html(dt.content.free);

                        }
                        canload = true;
                    })
                }else{
                    canload = true;
                }
                INDEX.reset();
            })
            
        })

    }
    //判断积分鸡腿是否够
    data.canVote = function(){
        //没输入票数
        if($(".num").val() <= 0){
            $(".tips").hide();
            $(".btn-vote").attr("class","btn-vote btn-vote-disabled") 
            return false;
        }
        //没选类型
        if(!$(".pay-type span").hasClass("choose")){
            return false;
        }else{
            console.log("is choose!")
        }
        voteNum = $(".num").val()

        if(voteType == "1"){
            $(".need-count").html(voteNum*30+"积分");
        }else{
            $(".need-count").html(voteNum*30+"鸡腿");
        }
        

        //选择积分
        switch(voteType){
            //免费票
            case "0":
                $(".tips").hide();
                var total = parseInt($(".choose").find("em").html());//已有积分 鸡腿
                if(voteNum > total){
                    $(".btn-vote").attr("class","btn-vote btn-vote-disabled") 
                }else{
                    if(groupId == 0){//白队
                         $(".btn-vote").attr("class","btn-vote btn-vote-white")
                         $(".btn-revote").attr("class","btn-revote btn-vote-white")
                    }else{
                        $(".btn-vote").attr("class","btn-vote btn-vote-red")
                        $(".btn-revote").attr("class","btn-revote btn-vote-red")
                    }
                }
                break;
            case "1"://积分
            case "2"://鸡腿
                $(".tips").show();
                var total = parseInt($(".choose").find("em").html());//已有积分 鸡腿
                if(total >= voteNum*30){//资金充裕
                    if(groupId == 0){//白队
                         $(".btn-vote").attr("class","btn-vote btn-vote-white")
                         $(".btn-revote").attr("class","btn-revote btn-vote-white")
                    }else{
                        $(".btn-vote").attr("class","btn-vote btn-vote-red")
                        $(".btn-revote").attr("class","btn-revote btn-vote-red")
                    }
                }else{//钱不够  无法投
                   $(".btn-vote").attr("class","btn-vote btn-vote-disabled") 
                }
                break;
        }
        
        
    }
    //初始化选择投票方式
    data.reset = function(){
        $(".tips").hide();
        $(".choose").removeClass("choose");
        $(".num").val("")
        voteType = "";
        voteNum = 0;
        canload = true;

        $(".btn-vote").attr("class","btn-vote btn-vote-disabled") 
    }

}(window.INDEX = {}));


INDEX.init()

