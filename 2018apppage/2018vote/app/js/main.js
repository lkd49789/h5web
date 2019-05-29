(function(data) {

    //web端测试（用户信息）
    var webUserInfo = {
       
    }

//--------------------------------------------------------------------------------------------------------------------
    //正式
    //var appUserInfo
    if(checkFromApp()){
        var appUserInfo = {
            "appid":window.web.getLoginUserId(),             //用户ID
            "apptoken":window.web.getAccessToken(),         //验证Token
            "uname":window.web.getLoginUserNickName(),       //用户昵称
            "avatar":window.web.getLoginUserPic(),            //头像地址
            "dev_cd":(window.web.getPhoneIMEI().length <3) ? window.web.getLoginUserId() :  window.web.getPhoneIMEI(),   //设备号
            "device":window.web.phoneSystemVersion()+window.web.phoneName()
        }
        
    }
    
//--------------------------------------------------------------------------------------------------------------------
    data.refleshAPP = function(){
        if(isExitsFunction('window.web.headVoteStatusChanged')){
            window.web.headVoteStatusChanged()
        }
    }


    data.getAppUserInfo = function(){
        console.log("checkFromApp>>"+checkFromApp())
        if(checkFromApp()){
            return appUserInfo;
        }else{
            return webUserInfo;
        }
        
    }
    //获取系统类型  ios   安卓
    data.getSysType = function(){
        if(checkFromApp()){
            if(isFromIphone()){
                return "IOS";
            }else{
                return "ANDROID";
            }
        }else{
            return "IOS";//测试 默认iOS 
        }
    }
    //获取token
    data.getAccessToken = function(){
        if(checkFromApp()){
            return window.web.getAccessToken()
        }else{
            return ""
        }
        
    }
   
    //登录
    data.logInApp = function(succ){
        //console.log(main.getAppUserInfo().appid)
      
        $.ajax({
            url: CONFIG.getJK()+"api/v1/login/app",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                appToken:main.getAccessToken(),
                nickName:main.getAppUserInfo().uname,
                avatar:main.getAppUserInfo().avatar,
                device:main.getAppUserInfo().device,
                platform:main.getSysType()
            }),
            timeout: 30000,
            dataType:"json",
            success: function (data) { 
                localStorage.setItem("USER_INFO",JSON.stringify(data.content))
              /*  if(data.errcode == "0"){
                    localStorage.setItem("LAST_LOGIN_TIME",new Date().getTime());               //登录时间点
                    localStorage.setItem("USER_INFO",JSON.stringify(data))                      //记录当前投票用户信息
                    succ(data);
                }else if(data.errcode == "1201" || data.errcode == "120"){//APPToken验证失败 跳转故障申告
                    mui.alert(data.errmsg, '', function() {
                        window.web.backHome();
                    });
                    //main.alert("请重新登录后继续投票!")
                    //window.web.showLoginPhoneAlert();
                    
                    //return false;
                }else if(data.errcode == "1202"){//非绑定设备号 绑定设备
                    bind.addPop()
                }else{//
                    mui.alert(data.errmsg, '', function() {
                        window.web.backHome();
                    });

                }*/

                succ(data);
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };
    
    
	//获取成员信息
	data.getAllMembers = function(succ){
        $.ajax({
            url: '../resource/json/vote_member.json',
            type: "GET", 
            dataType:"json",
            success: function (data) { 

                succ(data.rows)
                
            }
        });
       
    };



    //获取用户资料
    data.getUserInfo = function(_token,succ){
        //alert("fun-getUserInfo")
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/userinfo/get",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };



    //APP用户绑定手机号短信发送api_bind_sms.php
    data.bindSMS = function(_token,_mobile,_area,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/sms/send",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token,
                mobile:_mobile,
                area:_area
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };

    //验证手机号发送短信
    data.testSMS = function(_tmpToken,_area,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/verify/sendsms",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                tmpToken:_tmpToken,
                area:_area
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };

    //APP用户绑定手机号提交
    data.bindDEV = function(_token,_mobile,_area,_clientCode,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/bind/phone",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token,
                mobile:_mobile,
                area:_area,
                clientCode:_clientCode,
                platform:'IOS',
                device:main.getAppUserInfo().device,
                appImei:main.getAppUserInfo().dev_cd
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };

    // 验证更换imei
    data.testDEV = function(_tmpToken,_clientCode,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/verify/changeimei",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                tmpToken:_tmpToken,
                clientCode:_clientCode
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };

    //判断是否绑定丝瓜账号
    data.ifPocket = function(_token,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/userinfo/check/bind/sg",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };



    //APP用户绑定丝瓜账号
    data.bindWeb = function(_token,_sgAccount,_sgPwd,succ){
        //alert("fun-bindWeb-"+main.getAppUserInfo().appid+"--"+window.web.getAccessToken()+"--"+_username+"--"+_password+"--"+main.getAppUserInfo().dev_cd)

        $.ajax({
            url: CONFIG.getJK()+"api/v1/bind/sg",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token,
                appToken:main.getAccessToken(),
                sgAccount:_sgAccount,
                sgPwd:_sgPwd,
                device:main.getAppUserInfo().device,
                platform:main.getSysType()
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
       
    };
    //口袋用户绑定丝瓜账号资料取得
    data.bindPocket = function(succ){
        //alert("fun-bindWeb-"+main.getAppUserInfo().appid+"--"+window.web.getAccessToken()+"--"+_username+"--"+_password+"--"+main.getAppUserInfo().dev_cd)
        $.ajax({
            url: CONFIG.getJK()+"api_pocket_bind_info.php",
            type: "GET", 
            async:true,
            data: {},
            timeout: 30000, 
            dataType:"jsonp",
            success: function (data) { 
                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
               //alert("eee>"+textStatus);
            }
        });
       
    };

    //是否绑定微信
    data.ifbindWx = function(_token,succ){
        $.ajax({
            url: CONFIG.getJK()+"api/v1/userinfo/check/bind/wx",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    }

    //绑定微信
    data.bindWx = function(_token,_wxAccessToken,_wxOpenId,succ){
        $.ajax({
            url: CONFIG.getJK()+"api/v1/bind/wx",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token,
                appToken:main.getAccessToken(),
                wxAccessToken:_wxAccessToken,
                wxOpenId:_wxOpenId,
                device:main.getAppUserInfo().device,
                platform:main.getSysType()
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
    }



    //激活投票券
    data.codeAct = function(_token,_tpCd,succ){
        // alert("tpcd")
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/code/act",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token,
                appToken:main.getAccessToken(),
                tpCd:_tpCd,
                device:main.getAppUserInfo().device,
                platform:main.getSysType()
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            }
        });
       
    };

    //激活投票券记录
    data.codeActList = function(_token,_limit,_lastTime,succ){
        $.ajax({
            url:  CONFIG.getJK()+"api/v1/code/act/history/list",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token,
                limit:_limit,
                lastTime:_lastTime
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            }
        });
       
    };


    //用户投票
    data.userVote = function(_token,_sid,_voteNum,succ){
        $.ajax({
            url: CONFIG.getJK()+"api/v1/vote",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token,
                sid:_sid,
                voteNum:_voteNum,
                device:main.getAppUserInfo().device,
                platform:main.getSysType(),
                appToken:main.getAccessToken()
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            }
        });
       
    };


    //投票记录取得
    data.voteList = function(_token,_limit,_lastTime,succ){
        $.ajax({
            url: CONFIG.getJK()+"api/v1/vote/history/list",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token,
                limit:_limit,
                lastTime:_lastTime
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            }
        });
       
    };
                
     //投票总记录取得前五名
    data.voteSumList = function(_token,succ){
        $.ajax({
            url: CONFIG.getJK()+"api/v1/vote/history/top5",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 
                localStorage.setItem("localVoteSumList",JSON.stringify(data.content))
                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            }
        });
       
    };


    //星沃卡/丝芭卡领取赠票资格检查
    data.ifGetfree = function(_token,succ){
        $.ajax({
            url: CONFIG.getJK()+"api/v1/freetp/swc/check",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) {
                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            }
        });
       
    };


    //星沃卡/丝芭卡领取
    data.getTicket = function(_token,succ){
        $.ajax({
            url: CONFIG.getJK()+"api/v1/freetp/swc",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token,
                device:main.getAppUserInfo().device,
                platform:main.getSysType()
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) {
                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            }
        });
       
    };

    //商品列表
    data.getPDlist = function(_token,succ)
    {
        $.ajax({
            url: CONFIG.getJK()+"api/v1/pd/list",
            type: "POST",
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                needAppPd:false
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 
                succ(data)               
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                 //alert("eee");
            } 
        });
     
    }
    //电子券订单提交
    data.buyOrder = function(_token,_payType,_productId,_quantity,_cdType,_dlvName,_dlvPhone,_dlvProvince,_dlvCity,_dlvCounty,_dlvDetails,_needcard,succ){
        $.ajax({
            url: CONFIG.getJK()+"api/v1/order/create",
            type: "POST",
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token,
                payType:_payType,        // 购买渠道 （1 支付宝 2 微信支付 3一网通 ALI,WX_APP,WX_MP,CMB ）
                productId:_productId,             // 产品类型 （1: 5元单曲 2: 50元EP 3:588   4:1680）
                quantity:_quantity,      //购买数量
                device:main.getAppUserInfo().device,                 //设备信息
                platform:main.getSysType(),                //系统平台
                cdType:_cdType,               // 是否需要实物CD （0 不需要 1 需要）
                address:{
                    dlvName:_dlvName,         //收货人姓名
                    dlvPhone:_dlvPhone,        //收货人手机号
                    dlvProvince:_dlvProvince,  // 收件地址 - 省份
                    dlvCity:_dlvCity,           // 收件地址 - 城市
                    dlvCounty:_dlvCounty,       // 收件地址 - 区(县)
                    dlvDetails:_dlvDetails,      // 收件地址 - 详细
                    needcard:_needcard
                }
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 
                succ(data)               
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                 //alert("eee");
            } 
        });
       
    };


     //电子券购买记录获得
    data.buyList = function(_token,_limit,_lastTime,succ){
        $.ajax({
            url: CONFIG.getJK()+"api/v1/order/history/list",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token,
                limit:_limit,
                lastTime:_lastTime
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 
                succ(data)               
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                 //alert("eee");
            } 
        });
       
    };

    //积分领取
    data.getIntegral = function(_token,_tradeNo,succ){
        $.ajax({
            url: CONFIG.getJK()+"api/v1/order/receive/integral",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                token:_token,
                tradeNo:_tradeNo
            }),
            timeout: 30000, 
            dataType:"json",
            success: function (data) { 
                succ(data)               
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                 //alert("eee");
            } 
        });
    }
    
    

    //故障申告
    data.bugReport = function(phone,pic,submit_info,succ,error){
        $.ajax({
            url:"https://h5.48.cn/2017voteapi/app/api_feedback.php",
            type: "GET", 
            async:true,
            data: { appid:main.getAppUserInfo().appid,                          //用户ID（WEB场合：丝瓜账号，APP场合：APPID）
                    // order_from:"2",                                      //报告途径（1 WEB 2 APP 3 微信）
                    uname:main.getAppUserInfo().uname,                            //用户昵称
                    phone:phone,                            //联系电话
                    //type:type,                              //故障类型
                    pic_url:pic,                                //故障截图
                    browser:"APP",                          //浏览器（APP，WX，官网）
                    submit_info:submit_info,  
                    //devVer:'1.0',                                            //故障内容
                    dev_cd:main.getAppUserInfo().dev_cd                           //设备号
            },
            timeout: 30000, 
            dataType:"jsonp",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                // alert("eee>"+textStatus);
                error(data)
            } 
        });
       
    };
    
    //故障申告记录获得
    data.feedback = function(offset,_limit,succ,error){
        $.ajax({
            url: "https://h5.48.cn/2017voteapi/app/api_feedback_log.php",
            type: "GET", 
            async:true,
            data: { appid:main.getAppUserInfo().appid,                          //用户ID（WEB场合：丝瓜账号，APP场合：APPID）
                    // order_from:"2",                 //报告途径（1 WEB 2 APP 3 微信）
                    offset:offset,
                    limit:_limit                            //记录条数
                 
            },
            timeout: 30000, 
            dataType:"jsonp",
            success: function (data) { 

                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
                error()
            } 
        });
       
    };

    //显示错误信息
    data.showTip = function(info){
        $('.tip').css('opacity',1);
        $('.tip').html(info);
    }

    //跳转
    data.hrefTo = function(_url){
        if(checkFromApp()){
            if(_url.indexOf("https") >=0 || _url.indexOf("http")>=0 ){
                window.web.gotoDetail(_url);
            }else{
                window.web.gotoDetail(CONFIG.getURL()+_url);
            }
            
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
        // var iframe = document.createElement("IFRAME");
        // iframe.style.display="none";
        // iframe.setAttribute("src", 'data:text/plain,');
        // document.documentElement.appendChild(iframe);
        // window.frames[0].window.alert(name);
        // iframe.parentNode.removeChild(iframe);
        mui.alert(name, '', function() {
            
        });
    }


}(window.main = {}));




//------------------------------------------------------------------------------------判断是否来自移动设备
function isFromMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        return false;
    } else {
        return true;
    }
}

//------------------------------------------------------------------------------------------是否来自iphone
function isFromIphone() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    return bIsIphoneOs;
}
//--------------------------------------------------------------------------------------------是否来自口袋48
function checkFromApp() {
    if ((isFromMobile() && isExitsFunction("window.web.backHome"))) {
        
        return true;
    } else {
        
        return false;
    }
}

//----------------------------------------------------------------------------------------------------------判断是否存在方法
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch (e) {
    }
    return false;
}

//-----------------------------------------------------------------------------------------------------获取url 参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


function add0(m){return m<10?'0'+m:m };  
function getDate(shijianchuo) {  
  //shijianchuo是整数，否则要parseInt转换  
  var time = new Date(shijianchuo);  
  var y = time.getFullYear();  
  var m = time.getMonth()+1;  
  var d = time.getDate();  
  var h = time.getHours();  
  var mm = time.getMinutes();  
  var s = time.getSeconds();  
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);  
};   


(function() {
    try {
        var $_console$$ = console;
        Object.defineProperty(window, "console", {
            get: function() {
                if ($_console$$._commandLineAPI)
                    throw "抱歉, 为了用户安全, 本网站已禁用console脚本功能";
                return $_console$$
            },
            set: function($val$$) {
                $_console$$ = $val$$
            }
        })
    } catch ($ignore$$) {
    }
})();
(function() {var a = new Date(); debugger; return new Date() - a > 100;}())