if(common.getOauth("http://h5.snh48.com/snh48/user_v2")){

    }else{
        
    }
console.log($(".tip").find("a").length)
var group_id= GetQueryString("group_id");
var openid=GetQueryString("openid");
var prev_user,prev_avatar;

init()

	function init(){
		//logo
		$('.logo').attr('src',"img/"+group_id+".png")
		//设置按钮层margin距离
		showMode("notbind")

		// console.log(margin_top+"------"+$("body").height()+"---"+$(".topcontent").height()+"---"+$(".btns").height()+"---"+$(".tip").height())
		// $(".btns").css("margin-top",margin_top+"px")
		
		loaduser();//调接口获取头像昵称等信息

		addListeners()
		//根据group_id改变背景、二维码
	    switch(group_id){
			case 'SNH':
				
				break;
			case 'BEJ':
				
				break;
			case 'GNZ':
				
				break;
			case 'SHY':
				
				break;
		}

		//获取商品列表
		getItemSaleList()
	}//end init

//添加事件
	function addListeners(){
		//充值
		$(".btn-cz").click(function(){
			console.log("chongzhi")
			$(".cz-box").show();
			$(".btns, .topcontent, .tip").hide();
		})
		//验证口袋账号
		$(".btn-cz-change").click(function(){
			appUserConfirm()
		})
		//验证完毕 继续充值
		$(".btn-cz-qr").click(function(){
			$(".headimg, .meng").show()//显示头像

			$(".btn-cz-qr").hide()
			$(".btn-cz-change").hide()
			
			$(".qr-nickname").hide()
			
			$(".buy-box").show();
			$(".cz-box").hide()
			$(".topcontent").show();
		})
		//输入口袋账号返回
		$(".btn-cz-back").click(function(){
			$(".cz-box").hide();
			$(".btns, .topcontent, .headimg, .meng, .tip").show();
			//恢复用户头像 昵称 梦想数
			$(".headimg img").attr("src", prev_avatar);
			$(".titname").html(prev_user)
			$(".num, .tit").show()
		})
		//充值页面返回
		$(".btn-buy-back").click(function(){
			$(".buy-box, .headimg, .meng").hide();
			$(".cz-box").show()
		})
		//我要抽奖
		$(".btn-cj").click(function(){
			window.location.href='http://h5.snh48.com/snh48/awardRotate/index.html?group_id='+group_id+'&openid='+openid;
		})
		//领取积分
		$(".btn-jf").click(function(){
			window.location.href="list.html?group_id="+group_id+"&openid="+openid;
		})
		
		//绑定
		$(".btn-bind").click(function(){
			showMode("gotobind")
		})
		//重新绑定
		$(".btn-rebind").click(function(){
			$(".uname, .passw").val("")
			showMode("gotobind")
		})

		//确认绑定
		$(".btn-qr").click(function(){
			if(checkSubmit()){
				bind()
			}
		})
		//返回
		$(".btn-back").click(function(){
			$(".bind-box").hide()
			var len = $(".tip").find("a").length

			console.log(len)
			if(len > 0){
				showMode("notbind")
			}else{
				showMode("isbind")
			}
			
		})
		//关闭 浮层
		$(".popBox a").click(function(){
			$(".popBox").hide()
		})
		
		//点击打开下拉列表
		$(".ticket-choose").click(function(){
			if($(".ticket-list").css("display") == "none"){
				$(".ticket-list").fadeIn()
			}else{
				$(".ticket-list").fadeOut()
			}
		})
		//选择优惠券
		$(".ticket-list").on("click","p",function(){
			console.log($(this).attr("type"))
			var _type = $(this).attr("type")
			$(".ticket-wrapper").attr("type",_type)
			$(".ticket-list").fadeOut()
			if(_type == "FIVE"){
				$(".ticket-choose p").html("使用五折券")
			}else if(_type == "EIGHT"){
				$(".ticket-choose p").html("使用八折券")
			}else if(_type == "NINE"){
				$(".ticket-choose p").html("使用九折券")
			}else if(_type == "NINE_FIVE"){
				$(".ticket-choose p").html("使用九五折券")
			}else{
				$(".ticket-choose p").html("不使用")
			}
		})
	}
	//获取个人信息
	function loaduser(){
		$.ajax({
			type:'get',
			url:CONFIG.getLink()+"wxapi/user_info.php?openid="+openid+"&group_id="+group_id,
			success:function(data){
				eval('rs='+data)
				// console.log(data);
				// console.log(rs.headimgurl);
				$(".headimg img").attr("src", rs.headimgurl)
				$('.num').html(rs.points);
				$('.titname').html(rs.nickname);

				prev_user = rs.nickname;
				prev_avatar = rs.headimgurl;
				//用户绑定丝瓜账号情况
				checkBind()
			},
			error:function(){
				//alert("请求超时");
			}
		});
	}
	//用户绑定丝瓜账号查询
	function checkBind(){
		$.ajax({
			type:'get',
			url:CONFIG.getLink()+"wxapi/user/bind_web_info.php?openid="+openid+"&group_id="+group_id,
			success:function(rs){

				$(".tip").show()

				if(rs.result == "0"){//未绑定
					showMode("notbind")
					console.log(rs.result)
				}else if(rs.result == "1"){//已绑定
					showMode("isbind")
					$(".tip").html("绑定的丝瓜账号："+rs.web_usname)
				}else{
					console.log("请求失败，请重试！")
					showMsg("请求失败，请重试！")
				}
			},
			error:function(){
				//alert("请求超时");
			}
		});
	}

	//绑定丝瓜账号
	function bind(){
		$.ajax({
            url:CONFIG.getLink()+"wxapi/user/bind_web.php?openid="+openid+"&group_id="+group_id,
            type: "POST", 
            async:true,
            data: {
            	username:$(".uname").val(), 
             	password:$(".passw").val()  
            },
            timeout: 5000, 
            dataType:"json",
            success: function (rs) { 
               
				if(rs.result == "0"){//绑定失败
					showMsg(rs.errmsg)
				}else if(rs.result == "1"){//绑定成功
					showMsg("绑定成功！")
					$(".bind-box").hide()
					showMode("isbind")
					$(".tip").show().html("绑定的丝瓜账号："+$(".uname").val())
				}else{
					showMsg(rs.errmsg)
				}
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                showMsg("服务器错误！")
            } 
       }); 
	}
	

	function showMode(type){
		$(".btns div").hide();
		switch(type){
			case "isbind"://已绑定
				$(".btn-cj,.btn-jf,.btn-rebind, .btn-cz").show()

				break;
			case "notbind"://未绑定
				$(".btn-cj,.btn-bind, .btn-cz").show()
				break;
			case "gotobind"://去绑定
				$(".btn-qr").show()
				$(".btn-back").show()
				$(".bind-box").show()
				break;
			
		}

		resetMarginTop()
	}
	function checkSubmit(){
		if($(".uname").val() == ""){
			showMsg("请输入丝瓜账号")
			return false
		}else if($(".passw").val() == ""){
			showMsg("请输入密码")
			return false
		}else{
			return true;
		}
	}

	function showMsg(str){
		$(".popBox").fadeIn()
		$(".popBox p").html(str)
	}

	function resetMarginTop(){
		var margin_top;
		console.log($(".bind-box").css("display"))
		if($(".bind-box").css("display") == "none"){//不显示
			margin_top = $("html").height() - $(".topcontent").height() - $(".btns").height() - $(".tip").height() -100;
		}else{
			margin_top = $("html").height() - $(".topcontent").height() - $(".btns").height()-$(".bind-box").height() - $(".tip").height() -100;
		}
		if(margin_top<0){
			margin_top =0
		}
		console.log(margin_top+"------"+$("html").height()+"---"+$(".topcontent").height()+"---"+$(".btns").height()+"---"+$(".bind-box").height()+"---"+$(".tip").height())
		$(".btns").css("margin-top",margin_top+"px")
	}

	//验证口袋账号
	
	function appUserConfirm(){
		
		$.ajax({
			type:'post',
			url:CONFIG.getLink()+"pay_test/app_user_confirm.php",
			data:{
				user_id:$(".pocketid").val()
			},
			success:function(rs){
				if(rs.errcode == "0"){//验证通过，跳到充值页
					console.log("success")
					$(".btn-cz-qr").show()
					$(".qr-nickname").show()
					$(".qr-nickname").find("em").html(rs.nick_name)
					//显示头像 隐藏梦想信息
					$(".num, .tit").hide();
					$(".headimg img").attr("src", "http://source.snh48.com"+rs.avatar);
					$(".meng .titname").html($(".pocketnick").val());
					
					//产生优惠券列表
					$(".ticket-wrapper").attr("type","")
					if(rs.rebates.total_num <1){
						$(".ticket-wrapper").hide()
					}else{
						$(".ticket-choose p").html("当前拥有"+rs.rebates.total_num+"张优惠券请选择")
						var html = "";
						html += "<p type=''></p>"
						html += "<p type=''>不使用</p>"
						if(rs.rebates.five_num >0){
							html += "<p type='FIVE'>"+rs.rebates.five_num+"张五折券</p>"
						}
						if(rs.rebates.eight_num >0){
							html += "<p type='EIGHT'>"+rs.rebates.eight_num+"张八折券</p>"
						}
						if(rs.rebates.nine_num >0){
							html += "<p type='NINE'>"+rs.rebates.nine_num+"张九折券</p>"
						}
						if(rs.rebates.nine_five_num >0){
							html += "<p type='NINE_FIVE'>"+rs.rebates.nine_five_num+"张九五折券</p>"
						}
						$(".ticket-list").html(html)
					}
				}else{
					$(".btn-cz-qr").hide()
					showMsg(rs.errmsg)
				}
			},
			error:function(){
				//alert("请求超时");
			}
		});
	}
	//获取商品列表
	function getItemSaleList(){
		$.ajax({
			type:'get',
			url:CONFIG.getLink()+"pay/item_sale_list.php?item_code=JTUI",
			data:{
				limit:10,
				offset:0
			},
			success:function(data){
				var html="";
				for(var i=0; i<data.total; i++){
					if(data.rows[i].item_parameter.bonus == "0"){
						html += "<li sale_id='"+data.rows[i].sale_id+"' amout="+data.rows[i].sale_price+"><b>"+data.rows[i].sale_price/100+"元</b> 购买"+data.rows[i].sale_name+"<span>购买</span></li>"
					}else{
						html += "<li sale_id='"+data.rows[i].sale_id+"' amout="+data.rows[i].sale_price+"><b>"+data.rows[i].sale_price/100+"元</b> 购买"+data.rows[i].sale_name+"<i>送"+data.rows[i].item_parameter.bonus+"</i><span>购买</span></li>"
					}
				}

				$(".buy-box ul").html(html);

				$(".buy-box li span").click(function(){
					var sale_id = $(this).parent().attr("sale_id");//获取当前订单id
					var amout = $(this).parent().attr("amout");//获取当前金额
					var type = $(".ticket-wrapper").attr("type");//优惠券类型
					getOrderList(type,sale_id,amout)
				})
			},
			error:function(){
				//alert("请求超时");
			}
		});
	}
	//购买
	//获取订单
	function getOrderList(_type,_sale_id,_pay_amount){
		
		$.ajax({
			type:'get',
			url:CONFIG.getLink()+"pay/h5_weixin/pay.php?sale_id="+_sale_id+"&user_id="+$(".pocketid").val()+"&pay_amount=1&openid="+openid+"&ticket_type="+_type,
			success:function(rs){
				//if(rs.prepay_id !=""){
					wxpay(rs,function(){//支付成功
						showMsg("支付成功！")
						appUserConfirm()//刷新鸡腿券

						//$(".buy-box").hide()
						//$(".btns").show()
						//恢复头像为微信头像
						//$(".headimg img").attr("src", prev_avatar);
						//$(".titname").html(prev_user)

					},function(){//支付失败
						showMsg("支付失败！")
					})
				//}
			},
			error:function(){
				//alert("请求超时");
			}
		});
	}
	//提交支付
	function getJssdk(succ){       
        $.ajax({
            url: "/mppay/pay.php",
            type: "GET", 
            async:true,
            data: {
              openid:UINFO.open_id,       //微信OPEN_ID
              order_id:_id,      //订单ID
              total_amount:_amount,   //购买金额(RMB 单位分)
              rtn_url:_url      // 回调URL  
            },
            timeout: 5000, 
            dataType:"json",
            success: function (data) {
                
                succ(data)
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
              
               showMsg("服务器错误，请稍后再试！")
            } 
        });
       
    };


     function wxpay(getBrandWCPayRequest,succ,fail){
     	
	    // wx.ready(function(){
	    // 	alert("wx.ready")
	    //     wx.chooseWXPay({
	        	
	    //         timestamp: getBrandWCPayRequest.timeStamp, // 支付签名时间戳
	    //         nonceStr: getBrandWCPayRequest.nonceStr, // 支付签名随机串
	    //         package: getBrandWCPayRequest.package, // 统一支付接口返回的prepay_id参数值
	    //         signType: getBrandWCPayRequest.signType, // 签名方式
	    //         paySign: getBrandWCPayRequest.paySign, // 支付签名
	    //         complete: function (res) {
	    //             // 支付成功后的回调函数
	    //             alert("wxpay>complete")
	    //             if(res.errMsg == "chooseWXPay:ok"){
	    //                 $.post("http://h5.snh48.com/pay/h5_weixin/notify.php",function(){})
	                   
	    //                 succ()
	    //             }else{
	    //             	//showMsg("支付失败！")
	    //             	fail()
	    //             }
	    //         }
	    //     });
	    // });

		function onBridgeReady(){
		    WeixinJSBridge.invoke(
		       'getBrandWCPayRequest', {
		           "appId":getBrandWCPayRequest.appId,     //公众号名称，由商户传入     
		           "timeStamp":getBrandWCPayRequest.timeStamp,         //时间戳，自1970年以来的秒数     
		           "nonceStr":getBrandWCPayRequest.nonceStr, //随机串     
		           "package":getBrandWCPayRequest.package,     
		           "signType":getBrandWCPayRequest.signType,         //微信签名方式：     
		           "paySign":getBrandWCPayRequest.paySign //微信签名 
		       },
		       function(res){     
		           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
		           		$.post("http://h5.snh48.com/pay/h5_weixin/notify.php",function(){})
		           		succ()
		           }else{     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
		       			fail()
		       		}
		       }
		   ); 
		}
		if (typeof WeixinJSBridge == "undefined"){
		   if( document.addEventListener ){
		       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		   }else if (document.attachEvent){
		       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
		       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		   }
		}else{
		   onBridgeReady();
		}
	 }