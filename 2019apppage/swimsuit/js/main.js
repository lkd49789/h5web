(function(data) {
 //vip/detail 跳转vip短链接
    //web端测试（用户信息）
    var webUserInfo = {
        "appid":"27422",                                //用户ID
        // "apptoken":"xVMRXOKLBnLy/gsX7FFZ8ZQG4B6UWNfZzCoCvNUhddPvtD6UpldHGyIaUfdHkt0kQ069dkqYOOCuIJ4j2hJLTJGYqBgqKBuv",  
        "apptoken":"UnXB6inKsnu0Do3fdTrUw56/LWFccz4CqZsZWOcO36DsrJmh2+gRketRrjp9p48gIXf7iIyO5nOT89FXWLyFImiOtJdbeoCvWNZgi55k3cKYykgq/ahup7KYM1DiYpqs",  
        "uname":"nicker",                                 //用户昵称
        "avata":"avata",                                    //头像地址
        "dev_cd":"dev_cd"                        //设备号
    }
    
    //口袋用户信息
    if(checkFromNew()){
        var app_info = JSON.parse(dsBridge.call("snhAppInfo"))
        
        var dev_cd;
        if(app_info.phoneSystemVersion){
            dev_cd = app_info.phoneSystemVersion+";"+app_info.phoneName+";"+app_info.version + ";"+app_info.build
        }else{
            dev_cd = app_info.osType+";"+app_info.osVersion+";"+app_info.deviceName+";"+app_info.appVersion +";"+app_info.appBuild
        }
        var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
        var nickname = u_info.userInfo.nickname
        if(nickname == null || nickname == undefined){
            nickname = u_info.userInfo.nickName
        }
        var appUserInfo = {
            "appid":u_info.userInfo.userId,             //用户ID
            // "apptoken":u_info.token,                                             //验证Token
        "apptoken":"UnXB6inKsnu0Do3fdTrUw56/LWFccz4CqZsZWOcO36DsrJmh2+gRketRrjp9p48gIXf7iIyO5nOT89FXWLyFImiOtJdbeoCvWNZgi55k3cKYykgq/ahup7KYM1DiYpqs", 
            "uname":nickname,             //用户昵称
            "avatar":u_info.userInfo.avatar,             //头像地址
            "device":dev_cd                                                //设备号
        }
    }
    //获取用户信息
    data.getAppUserInfo = function(){
        if(checkFromApp()){
            return appUserInfo;
        }else{
            
            return webUserInfo;
        }
    }
    //查询当前竞拍商品
    data.getList = function (succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/activity/v1/getauctioninfo",
            type: "POST",
            dataType: "json",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }
    //竞拍
    data.auction = function (id,price,succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/activity/v1/auction",
            type: "POST",
            dataType: "json",
            contentType:"application/json",
            data:JSON.stringify({"goodsId":id,"price":price}),
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }
    //出价记录
    data.getHistory = function (id,succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/activity/v1/auction/mylist",
            type: "POST",
            dataType: "json",
            contentType:"application/json",
            data:JSON.stringify({"goodsId":id}),
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }
  /*支付 */
    main.Alipay = function (id,succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/v1/ali/order/create",
            type: "POST",
            dataType: "json",
            contentType:"application/json",
            data:JSON.stringify({"goodsId":id}),
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }

    main.wxpay = function (id,succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/v1/wx/order/create",
            type: "POST",
            dataType: "json",
            contentType:"application/json",
            data:JSON.stringify({"goodsId":id}),
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }

    /*获取地址 */
    main.getsite = function (succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/activity/v1/auction/getaddress",
            type: "POST",
            dataType: "json",
            contentType:"application/json",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }
    /*修改地址 */
    main.setsite = function (obj,succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/activity/v1/auction/address",
            type: "POST",
            dataType: "json",
            data:JSON.stringify({
                'name':obj.name,         //收货人姓名
                'mobile':obj.phone,        //收货人手机号
                'province':obj.province,  // 收件地址 - 省份
                'city':obj.city,           // 收件地址 - 城市
                'country':obj.county,       // 收件地址 - 区(县)
                'details':obj.details     // 收件地址 - 详细
            }),
            contentType:"application/json",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }

    /*电子 获取图片列表 */
    data.getImgList = function (succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/activity/v1/getallgoods",
            type: "POST",
            dataType: "json",
            contentType:"application/json",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }
    
    /*购买图片 */
    data.buyImg = function (id,succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/activity/v1/buygoods",
            type: "POST",
            dataType: "json",
            data:JSON.stringify({"goodsId":id}),
            contentType:"application/json",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }

    /*查看图片 */
    data.getImgDetails = function (id,succ) {
        $.ajax({
            url: CONFIG.getLink() + "api/activity/v1/getdetailsimage",
            type: "POST",
            dataType: "json",
            data:JSON.stringify({"goodsId":id}),
            contentType:"application/json",
            beforeSend: function (request) {
                request.setRequestHeader("token", main.getAppUserInfo().apptoken);
            },
            success: function (data) {
                succ(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error",jqXHR);
            }
        });
    }


    
}(window.main = {}));