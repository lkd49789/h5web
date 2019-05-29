//主界面
(function(data) {
    //init
    data.init = function(){
        //判断当前账户是否已经授权 已授权 打开列表页投票 否 打开授权页授权
        // main.checkBind(function(dt){
        //     if(dt.status == 200){
        //         if(dt.content.isVoteUser){
        //             INDEX.getMemberList()
        //             INDEX.refreshUserInfo();
        //         }else{
        //             $(".s1").show();
        //         }
                
        //     }else{
        //         $(".s1").show();
        //         //main.alert(dt.message)
        //     }

        //     INDEX.addListeners()
        // })
        INDEX.addListeners();
    }
    //添加事件
    data.addListeners = function(){
        //充值
        $(".btn-1").click(function(){
            main.hrefTo()
        })
        //点击充值
        $(".btn-buyjt span").click(function(){
            window.web.gotoPage("recharge/detail")
        })
    }
    //选择支付方式
    data.choosePayType = function(_type){
        INDEX.showTip(_type);
    }
    
    //刷新当前用户余额
    data.refreshUserInfo = function(){
        main.refreshUserInfo(function(dt){
            $(".total-jt").html(dt.content.appInfo.appPayMoney);
            $(".total-like").html(dt.content.rsRest);
        })
    }
    //-----------------------------------------------------------------------------------------------------首页--------------------
    
    //成员头像大小设置
    data.resize = function(){
        //列表头像
        $('.m-avatar').width(($('body').width()/10));
        $('.m-avatar').height($('.m-avatar').width());
        //内页头像
        $('.m-avatar1').width(($('body').width()/7));
        $('.m-avatar1').height($('.m-avatar1').width());
    }
    data.refreshList = function(dt){
        var html = ""
        $.each(dt,function(index,minfo){
            var _li = m_li;
            _li = _li.replace("{{avatar}}",avatar_url+minfo.sid+".jpg");
            _li = _li.replace("{{mname}}",minfo.sname);
            _li = _li.replace("{{id}}",index);
            
            html += _li
        })
        $(".memberList").html(html)
        INDEX.resize();
    }
    //----------------------------------------------------------------------------------------------通用
    
    data.getDate = function(ns) {  
        var test = new Date(parseInt(ns));  
        var $_year = test.getFullYear();  
        var $_month = parseInt(test.getMonth())+1;  
        var $_day = test.getDate();
        var $_hours = test.getHours();
        
        if(test.getMinutes()<10 ){
            var $_minutes = "0"+test.getMinutes();
        }else{
             var $_minutes = test.getMinutes();
        }
        
        if( test.getSeconds()<10 ){
            var $_seconds = "0"+ test.getSeconds();
        }else{
            var $_seconds = test.getSeconds();
        }

        return  $_year +"-"+$_month+"-"+$_day+" "+$_hours+":"+$_minutes+":"+$_seconds;  
    }
}(window.INDEX = {}));

//INDEX.init()

