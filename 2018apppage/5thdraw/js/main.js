(function(data) {

    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        "apptoken":"",                          //验证Token
        "uname":"GavinG",                                 //用户昵称
        "avata":"https://source2.48.cn/mediasource/avatar/27422.jpg",                                    //头像地址
        "dev_cd":"123456789"                        //设备号
    }

//--------------------------------------------------------------------------------------------------------------------
    //正式
    //var appUserInfo
    if(checkFromApp()){
        var appUserInfo = {
            "appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avata":window.web.getLoginUserPic(),            //头像地址
            "dev_cd":(window.web.getPhoneIMEI().length <3) ? window.web.getLoginUserId() :  window.web.getPhoneIMEI()   //设备号
        }
        
    }
    
//--------------------------------------------------------------------------------------------------------------------
    //获取app用户信息
    data.getAppUserInfo = function(){
        console.log("checkFromApp>>"+checkFromApp())
        if(checkFromApp()){
            return appUserInfo;
        }else{
            return webUserInfo;
        }
    }
    
    
    //获取服务器下发token
    data.getToken = function(){
        if(checkFromApp()){
            return window.web.getAccessToken()
        }else{
            return "60zuoI9LMzSl"
        }
    }
    //我的抽奖资格
    data.getDrawInfo = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/5yearaward/v1/qualifications",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            
            data: JSON.stringify({
                
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    };
    //获取我的中奖纪录
    data.getMyAwardInfo = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/5yearaward/v1/list/award/my",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            
            data: JSON.stringify({
                
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    };
    //获取中奖结果
    data.getAwardInfo = function(_lasttime,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/5yearaward/v1/list/award",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                limit:500,
                lastTime:_lasttime
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    };
    //开始抽奖
    data.startDraw = function(succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/5yearaward/v1/lottery",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            data: JSON.stringify({
                nickName:main.getAppUserInfo().uname
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 
                succ(data)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    };
    //提交个人信息
    data.submitUserInfo = function(_logId,_awardId,_buyerName,_buyerPhone,_addrProvince,_addrCity,_addrCounty,_addrDetail,succ){
        $.ajax({
            url:  CONFIG.getLink()+"api/5yearaward/v1/save/addr",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (request) {
                 request.setRequestHeader("token", main.getToken());
            },
            data: JSON.stringify({
                logId:_logId,                               //int 中奖记录ID
                awardId:_awardId,                            //int 奖品ID
                dlvName:_buyerName,                          //购买者姓名
                dlvPhone:_buyerPhone,                        //手机号
                dlvAddrPro:_addrProvince,                    //省
                dlvAddrCity:_addrCity,                            //市
                dlvAddrCounty:_addrCounty,                        //区
                dlvAddrDetail:_addrDetail                         //详细地址
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };
    
    
    //跳转
    data.hrefTo = function(_url){
        if(checkFromApp()){
            window.web.gotoDetail(CONFIG.geturl()+_url);
        }else{
            window.location.href=_url;
        }
    }
    //返回
    data.backTo = function(_url){
        if(checkFromApp()){
            window.web.backHome();
        }else{
            window.history.back(-1);
        }
    }
    //弹框
    data.alert = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
//		$('body').append('<div class="mui-popup mui-popup-in" style="display: block;"><div class="mui-popup-inner"><div class="mui-popup-text">'+ name +'</div></div><div class="mui-popup-buttons"><span class="mui-popup-button mui-popup-button-bold">确定</span></div></div><div class="mui-popup-backdrop mui-active" style="display: block;"></div>')
// 		$('.mui-popup-buttons').click(function(){
// 			$('.mui-popup,.mui-popup-backdrop').remove()
// 		})
    }
}(window.main = {}));



//返回格式化的时间了符串	   
function getDateFormat(time1){
	var yearStr = time1.getFullYear().toString();
	var monStr=(time1.getMonth()+1).toString();
	var dayStr=time1.getDate().toString();
	var hhStr =time1.getHours().toString();
	var mmStr=time1.getMinutes().toString();
	var ssStr=time1.getSeconds().toString();
	var SSSStr=time1.getMilliseconds().toString();
	return yearStr+monStr+dayStr+hhStr+mmStr+ssStr+SSSStr;
}
	
//返回格式化的时间了符串	   
function getDFormat(time1){
	var yearStr = time1.getFullYear().toString();
	var monStr=(time1.getMonth()+1).toString();
	var dayStr=time1.getDate().toString();
	var hhStr =time1.getHours().toString();
	var mmStr=time1.getMinutes().toString();
	var ssStr=time1.getSeconds().toString();
	return yearStr+"-"+monStr+"-"+dayStr+" "+hhStr+":"+mmStr+":"+ssStr;
}