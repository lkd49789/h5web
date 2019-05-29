var isloading = false;//是否在加载
var flag = false;
var _limit = 10;
var _lastTime = 0;
var type ='';//支付的产品类型
var orderid = "";
var isPay = false;
var niudanArr = [0,0,1,10,30]
var pay_type = ""; //支付方式
var pd_type = "";//产品类型 （1 5元0.1票 2 50元1票 3 588元16票 4 1680元48票）
var cd_type = ""; //是否需要实物CD （0 不需要 1 需要）
var amount = 1;   //购买数量
var flg = true;
var needcard = false;//是否需要丝芭乐享卡 默认是  已选择卡的人不会再出现选择项

var dlv_name,dlv_phone,dlv_province,dlv_city,dlv_county,dlv_addr;
mui.init();
var buyListVM = new Vue({
  	el: '#buyList',
  	data: {
     	buy_num:''
  	},
  	methods: {
   		pay:function(){
   			//-------------------------------------------------------------------------------------------------------订单信息------
   				pay_type = $('#pay_type li.mui-selected').attr('order_id');//支付方式
   				pd_type = $('#order_type').attr("type");	   //产品类型 （1 5元0.1票 2 50元1票 3 588元16票 4 1680元48票）
   				cd_type = $(".vote-type").attr("cd-type");      //是否需要实物CD （0 不需要 1 需要）
   				if(cd_type == "1"){                             //用户信息
   					console.log($(".u-address").val().length)
   					if($(".u-name").val().length < 2){
   						main.alert("请正确输入您的姓名！")
   						return false;
   					}else if($(".u-phone").val().length != 11){
   						main.alert("请正确输入您的手机号码！")
   						return false;
   					}else if($(".u-city").val() == ""){
   						main.alert("请选择地区！")
   						return false;
   					}else if($(".u-address").val().length <2){
   						main.alert("请正确输入您的收件地址！")
   						return false;
   					}
   					dlv_name = $(".u-name").val();
   					dlv_phone = $(".u-phone").val();
   					var address = $(".u-city").val();
   					var adds = address.split(" ");
   					dlv_province = adds[0];
   					dlv_city = adds[1];
   					dlv_county = adds[2];
   					//console.log(adds);
   					//console.log('-----'+adds[0]+'&&&&'+adds[1]+'*****'+adds[2]);
   					dlv_addr = $(".u-address").val();
   				}else{
   					dlv_name = ""
   					dlv_phone = ""
   					dlv_province = ""
   					dlv_city = ""
   					dlv_county = ""
   					dlv_addr = ""
   				}

				amount = buyListVM.buy_num;                     //购买数量
			//---------------------------------------------------------------------------------------------------------------------

			$(".notice").fadeIn();

   		},
   		closePop:function(){
            $(".pop-code").hide();
        }
  	}
});

userInfo.getUserInfo(function(data){
	getPDlist()
})

init()

function getPDlist(){

	main.getPDlist(token,function(dt){
		if(dt.status == 200){
			var html = "";
			$.each(dt.content.data,function(index,pd){
				html += "<li value='"+pd.pdId+"'>"+pd.pdName+"</li>";
			})
			$(".ep-list").html(html)
			if(dt.content.hasCard != true){
				$(".sibacard-choose").hide();
			}

			loadList()
		}else{
			main.alert(dt.message);
		}
	})
}

function loadList(){
	if(!isloading){
		isloading = true;
		main.buyList(token,_limit,_lastTime,function(data){
			console.log(data);
			if(data.status==401){//登录已失效，请重新登录
                main.logInApp(function(){
                    userInfo.setUserInfo(data)
                    //succ(data)
                })   
            }else if(data.status==200){
				if(data.content.data.length == 0){
					flag = true;
				}else{
					$.each(data.content.data, function(index,dt) {
						var html = [];
						html.push("<li><span>"+ gettime(dt.ctime) +"</span>")
						html.push("<span class='pay-way'>"+dt.payType+"</span>");
						// if(dt.payType=="ALIPAY"){
						// 	html.push("<span class='pay-way'>支付宝</span>");
						// }else if(dt.payType=="WEIXIN"){
						// 	html.push("<span class='pay-way'>微信</span>");
						// }else{
						// 	html.push("<span class='pay-way'>一网通</span>");
						// }
						
						//html.push("<span><i>"+ dt.totalFee +"</i>元</span><span id='money'><i>"+ dt.tpNum +"</i>票</span></li>");	
						if(dt.integralStatus==0 || dt.integralStatus=="0"){
							html.push("<span class='icon_many'>"+ dt.totalFee +"元</span><span id='money'>"+ dt.tpNum +"票</span><span odd="+dt.tradeNo+" class='icon_receive'>领取积分</span></li>");			
						}else{
							html.push("<span class='icon_many'>"+ dt.totalFee +"元</span><span id='money'>"+ dt.tpNum +"票</span><span odd="+dt.tradeNo+" class='icon_receive reActive'>已领取</span></li>");
						}
						$('.buyList .mui-table-view').append(html.join(""));
						_lastTime = data.content.lastTime;
					});
					
					if(isPay){
						//alert(data.rows[0].order_id+"----"+orderid)
						if(data.rows[0].order_id==orderid){
							showPop(type);
						}
						isPay = false;
					}			
				}
           	}else{
           		main.alert(data.message);
           	}

           	isloading = false;
           	
        });
    
	}

}
//确认支付
function gotoPay(){
	$('.pay-btn,.btn-pay').attr({'value':'支付中...','disabled':true})
	if(pay_type == "1"){
		pay_type = "ALI"
	}else if(pay_type == "2"){
		pay_type = "WX_APP"
	}else if(pay_type == "3"){
		pay_type = "CMB"
	}
	//alert("pd_type>"+pd_type)
	main.buyOrder(token,pay_type,pd_type,amount,cd_type,dlv_name,dlv_phone,dlv_province,dlv_city,dlv_county,dlv_addr,needcard,function(data){
		if(data.status==401){//登录已失效，请重新登录
            main.logInApp(function(){
                userInfo.setUserInfo(data)
                //succ(data)
            })
        }else if(data.status==200){
			orderid = data.content.tradeNo;//订单号
			//alert("data.order_id>"+data.order_id)
        	if(pay_type=="ALI"){
        		window.web.aliWebpayPay(JSON.stringify(data.content));
        		
        	}else if(pay_type=="WX_APP"){
        		window.web.weWebChatPay(JSON.stringify(data.content));
        	}else if(pay_type=="CMB"){
        		var url = CONFIG.getYWT()+"?order_id="+data.content.tradeNo+"&appid="+main.getAppUserInfo().appid+"&total_amount="+data.content.totalFee+"&rtn_url="+data.content.notifyUrl;
        		if(checkFromApp()){
		            window.web.gotoDetail(url);
		        }else{
		            window.location.href=url;
		        }
        	}
        }else{
        	main.alert(data.message)
        }
        $('.pay-btn').attr({'value':'支付','disabled':false})
        $('.btn-pay').attr({'value':'继续支付','disabled':false})
        $('.notice').hide()
	})
}
function refleshList(){
	tip = 0;
	$('.buyList .mui-table-view').html("");
	flag = false;
	loadList();
	mui('#pullrefresh').pullRefresh().refresh(true);
}
	
	
function payComplete(str){
	//alert("payComplete>"+str)
	isPay =true;
	_lastTime = 0;
	userInfo.refreshUserInfo(function(){
		refleshList()

	});//支付成功后更新票数
	main.refleshAPP();
	
}
function payCallback(dt){
    isPay =true;

	userInfo.refreshUserInfo(function(){
		refleshList()
	});//支付成功后更新票数
	
}

//赠送抽奖次数
function niudanCount(){
	if(pd_type >1){
		$(".niudan-count").html("（"+niudanArr[pd_type]+" x "+buyListVM.buy_num+"）")
	}else{
		$(".niudan-count").html("")
	}
	
}



function init(){
	//选择订单类型
	$(".showtxt").click(function(){
		console.log($(".ep-list").css("display"))
		if($(".ep-list").css("display") == "none")
		{
			$(".ep-list").show()
		}else{
			$(".ep-list").hide()
		}
	})
	
	//继续支付
	$(".btn-pay").click(function(){
		gotoPay()
	})
	$(".btn-cancel").click(function(){
		$(".notice").hide();
		$('.pay-btn').attr({'value':'支付','disabled':false})
		$('.btn-pay').attr({'value':'继续支付','disabled':false})
	})
	//赠送扭蛋
	$(".mui-input-numbox").change(function(){
		niudanCount()
	})
	// $(".ep-list li").click(function(){
		
	// })
	//需要EP/抽奖次数
	$(".ep-list").on("click","li",function(){
	//$('.mui-btn').change(function(){

		//$("#order_type").attr("type",$(this).attr("value"))
		$(".ep-list").hide();
		$(".showtxt").find("em").html($(this).html())


		$(".btn-vote-ep").removeClass("choose");
		$(".u-info").show();
		$(".vote-type").attr("cd-type","1");//需要EP

		$("#order_type").attr("type", $(this).val()).removeClass("choose");
		pd_type = parseInt($("#order_type").attr("type"));//订单类型  1 2 3 4

		//if(pd_type >1){//
			$(".vote-type >div").eq(1).show();
			$(".btn-choose-ep").removeClass("choose1-1").addClass("choose1-2");
			$(".btn-choose-nd").addClass("choose1-1").removeClass("choose1-2");;
			//$(".tip3").hide()
		//}else{
			//$(".tip3").show()
			// $(".vote-type >div").eq(1).hide();
			// $(".btn-choose-ep").removeClass("choose1-2").removeClass("choose1-1").addClass("choose");
			// $(".btn-choose-nd").removeClass("choose1-1");
		//}
		//$(".btn-choose-ep").addClass("choose")//默认选择邮寄EP
		if(pd_type >1){
			$(".jp-tip").show()
		}else{
			$(".jp-tip").hide()
		}



		$(".tip3").hide()
		//$(".btn-downloadep").hide()
		console.log("pd_type>"+pd_type)
		//邮费
		if(pd_type >2){
			
			$(".vote-type").find("em").html("（加付12元包邮）")
		}else{
			$(".vote-type").find("em").html("（加付48元包邮）")
		}
		//投票权数量
		if(pd_type == 1){
			$(".vote-count").html("0.1")
		}else if(pd_type == 2){
			$(".vote-count").html("1")
		}else if(pd_type == 3){
			$(".vote-count").html("16")
		}else if(pd_type == 4){
			$(".vote-count").html("48")
		}
		niudanCount()
	})
	//选择是否需要唱片
	$(".btn-choose-ep").click(function(){
		
		//if(pd_type >1){
			$(".tip3").hide()
			//$(".btn-downloadep").hide()
			if($(this).hasClass("choose1-2")){
				$(this).addClass("choose1-2").removeClass("choose1-1")
				$(".btn-choose-nd").removeClass("choose1-2").addClass("choose1-1")
				$(".u-info").show()
				
			}else{
				if($(this).hasClass("choose1-1")){
					$(this).addClass("choose1-2").removeClass("choose1-1")
					$(".btn-choose-nd").removeClass("choose1-2").addClass("choose1-1")
				}
				
			}
			$(".u-info").show()
			$(".vote-type").attr("cd-type","1")//需要唱片
		// }else{
		// 	if($(this).hasClass("choose")){
		// 		$(this).removeClass("choose")
		// 		$(".u-info").hide()
		// 		$(".vote-type").attr("cd-type","0")//不需要唱片
		// 		$(".tip3").show()
		// 		$(".btn-downloadep").show()
		// 	}else{
		// 		$(".tip3").hide()
		// 		$(".btn-downloadep").hide()
		// 		$(this).addClass("choose")
		// 		$(".u-info").show()
		// 		$(".vote-type").attr("cd-type","1")//需要唱片
		// 	}
		// }
	})
	//选择是否选择丝芭卡
	$(".btn-choose-card").click(function(){
		if($(this).hasClass("choose")){
			$(this).removeClass("choose")
			needcard = false;
		}else{
			$(this).addClass("choose")
			needcard = true;
		}
	})

	//了解丝芭卡
	$(".tip-card").click(function(){
		window.web.gotoDetail("https://m.10010.com/scaffold-show/sibacard#image9")
	})
	//选择口袋48免费抽奖次数
	$(".btn-choose-nd").click(function(){
		$(".tip3,.btn-downloadep").show()

		if($(this).hasClass("choose1-1")){
			$(this).addClass("choose1-2")

			$(".btn-choose-ep").removeClass("choose1-2").addClass("choose1-1")
			$(".u-info").hide()

			$(".vote-type").attr("cd-type","0")//不需要唱片
		}
	})

	//下载电子EP
	$(".btn-downloadep").click(function(){
		window.web.gotoDetail("https://h5.48.cn/2018apppage/luckdraw/awardRotate.html")
	})

	//领取积分
	mui(".buyList").on('tap','.icon_receive',function(){   
		if(!flg){
			return false;
		}
		var _this = $(this);
		var tradeNo = $(this).attr('odd');
		if(_this.hasClass('reActive')==false){
			flg = false;
			main.getIntegral(token,tradeNo,function(dt){
				flg = true;
				if(dt.status==200){
					_this.html('已领取');
					_this.addClass('reActive')
					main.alert('领取成功');
				}else{
					main.alert(dt.message);
				}
			})
		}
	})


	mui.init({
		pullRefresh: {
			container: '#pullrefresh',	
			up: {//上拉加载
				contentrefresh : "正在加载",//可选，正在加载状态时，上拉加载控件上显示的标题内容
				contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
				callback: callback
			}
		}
	});
	
	function callback(){				
		var self = this;
		setTimeout(function(){
            loadList();
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(flag);
//						this.endPullupToRefresh(flag);
        }, 300);
	}


	var city_picker = new mui.PopPicker({layer:3});
	city_picker.setData(init_city_picker);
	$(".u-city").on("tap", function(){
		setTimeout(function(){
			city_picker.show(function(items){
				$(".u-city").val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
			});
		},200);
	});

}    


//支付成功弹框
function showPop(type){
    // var arr = randomArr(type);
    // var _html = []
    // var total = 0;
    // if(type == 2 || buyListVM.buy_num>6){
    // 	total = 6;
    // }else{
    // 	total = buyListVM.buy_num;
    // }
    // for(var i=1; i<=total; i++){
    //     _html.push("<li>"+arr[i-1]+"</li>");
    // }
    // $(".pop-code ul").html(_html.join(''));
    $(".pop-code").fadeIn();
}

function randomArr(type){
//      	alert("randomArr>"+type)
	if(type==1){
		var arr = ["ca61df4b", "2b41ed3e", "f5887bd5", "1057bcaa", "ad6a4399","b2d5c169"];
	}else{
		var arr = ["ff95511a", "919b68e7", "a04a0b34", "8f1e30ef", "6070cd4e","0e506f32"];
	}
    
    var arr2 = arr.sort(randomsort);
    return arr2;
}

function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1; 
}





function add0(m){return m<10?'0'+m:m };  
function gettime(shijianchuo) {  
  //shijianchuo是整数，否则要parseInt转换  
  var time = new Date(shijianchuo);  
  var y = time.getFullYear();  
  var m = time.getMonth()+1;  
  var d = time.getDate();  
  var h = time.getHours();  
  var mm = time.getMinutes();  
  var s = time.getSeconds();  
  return add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);  
};   