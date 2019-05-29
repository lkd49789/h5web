var pictures = [
	"images/bg.jpg",
	"images/btns_01.png",
	"images/btns_02.png",
	"images/btns_03.png",
	"images/food.png",
	"images/onearmbandit.png",
	"images/title.png",
	"images/txt.png"
];
		
loadAllImg(pictures,perCount,loadComplete)



var logID = "";//抽奖记录ID
var isPlaying = false;  //是否在抽奖中
var jpName = "";//奖品名字
var jpData;//奖品数据包
var _li = '<li>'+
'				<p class="jp-info">{{index}}.{{jpname}}</p>'+
'				<p><span class="time"></span><span class="list-info">{{status}}</span><span awardId="{{awardId}}" logId="{{logId}}" class="btn-addr {{hasAddr}}">补充地址信息</span></p>'+
'			</li>'
//
//进度
function perCount(per){
	
	$(".loading-txt").html(parseInt(per*100)+"%");
}
//加载完成.
function loadComplete() {
	init()
	
	$(".loading-wrapper").remove();
	$('#wrap').show();
	
}
//初始化
function init() {
	main.getDrawInfo(function(dt){
		if(dt.status == 200){
			$(".draw-num").html(dt.content.totalNum-dt.content.usedNum);
			if(dt.content.totalNum == 0){//无抽奖次数

			}else{//抽奖次数

			}
			getList()//加载中奖列表
		}
	})
	
	addListeners()
}

function addListeners(){
	//抽奖
	$('.btn-start').click(function(){
		if(parseInt($(".draw-num").html()) <= 0)
		{
			showPop("timeout");
		}else{
			playGame()
		}
		
		//scrollFood(0)
	});
	//我的中奖记录
	$(".top-list").click(function(){
		
		getMyList()
	})
	//奖项说明
	$('.btn-prize').click(function(){
		showPop("gift-info")
	});
	//活动说明
	$('.btn-game').click(function(){
		showPop("game-intro")
	});

	//弹框事件
	$(".btn-know").click(function(){
		$(".popups").hide()
	})
	//实物奖弹框 隐藏
	$(".btn-gift").click(function(){
		$(".popups").hide()
	})
	//关闭提交地址
	$(".btn-hide-addr").click(function(){
		$(".mask7").hide();
	})
	
	//填写信息
	$(".btn-input").click(function(){
		$(".mask7").fadeIn();
		$(".btn-submit").attr("logId",$(this).attr("logId"));//获取当前订单id
		$(".btn-submit").attr("awardId",$(this).attr("awardId"))//奖品id
	})
	//补填信息
	
	$(".gift-list").on("click",".btn-addr",function(){
		console.log("butian")
		$(".mask7").fadeIn();
		$(".btn-submit").attr("logId",$(this).attr("logId"));//获取当前订单id
		$(".btn-submit").attr("awardId",$(this).attr("awardId"))//奖品id
		//showPop("addr");
	})

	//选择城市
	var city_picker = new mui.PopPicker({layer:3});
	city_picker.setData(init_city_picker);
	$(".u-city").on("tap", function(){
		setTimeout(function(){
			city_picker.show(function(items){
				$(".u-city").val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
			});
		},200);
	});
	//提交订单信息
	$(".btn-submit").click(function(){
		var award_id = $(".btn-submit").attr("awardId");//奖品id
		var log_id = $(".btn-submit").attr("logId");//订单id
		var dlv_name = $(".u-name").val();
		var dlv_phone = $(".u-phone").val();
		var city = $(".u-city").val().split(" ");
		var dlv_province = city[0];
		var dlv_city = city[1];
		var dlv_area = city[2];
		var dlv_addr = $(".u-address").val()


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

		main.submitUserInfo(log_id,award_id,dlv_name,dlv_phone,dlv_province,dlv_city,dlv_area,dlv_addr,function(data){
			if(data.status== 200){
				//main.alert("提交成功！")
				$(".u-name").val("")
				$(".u-phone").val("")
				$(".u-city").val("")
				$(".u-address").val("")
				if($(".mask8").css("display") == "none"){//回到主屏
					$(".popups").hide()
				}else{//回到中奖记录
					getMyList()
				}
				
				
	        }else{
	        	main.alert(data.message)
	        }
		})
	})
}

//开始抽奖
function playGame(){
	if(isPlaying == false){
		isPlaying = true
		main.startDraw(function(data){
			
			if(data.status == 200){
				logID = data.content.awardId;
				jpData = data.content;
				resetDrawNum();//重置抽奖次数
				scrollFood(logID)
			}else{
				isPlaying = false;
				alert(data.errmsg)
			}
		},function(data){

			isPlaying = false;
			console.log("error")
		})
	}
}
//获取我的中奖列表
function getMyList(){
	main.getMyAwardInfo(function(dt){
		showPop("gift-list");
		var html = "";
		$.each(dt.content.data,function(index,dt){
			var my_li = _li;
			my_li = my_li.replace("{{index}}",index+1);
			my_li = my_li.replace("{{jpname}}",dt.awardTitle);
			my_li = my_li.replace("{{awardId}}",dt.awardId);
			my_li = my_li.replace("{{logId}}",dt.logId);
			
			if(dt.physical){//实物
				if(dt.addrInfo.pro){//有物流信息
					if(dt.expressInfo.send){//已发送
						my_li = my_li.replace("{{status}}",checkSend(dt.send)+"("+dt.expressInfo.expressName+";"+dt.expressInfo.expressNumber+")");
					}else{//未发送
						my_li = my_li.replace("{{status}}","未发货");
					}
				}else{
					my_li = my_li.replace("{{hasAddr}}",checkHasAddr(dt.send));
					my_li = my_li.replace("{{status}}","");
				}
				
			}else{//虚拟
				my_li = my_li.replace("{{status}}","已到账");
			}
			html += my_li;
			
		})
		if(dt.content.data.length == 0){
			$(".mask8 ul").html("无中奖数据！")
		}else{
			$(".mask8 ul").html(html)
		}
		
	})
}
//减次数
function resetDrawNum(){
	var num = parseInt($(".draw-num").html())
	num -= 1;
	$(".draw-num").html(num)
}
//判断是否填写地址
function checkHasAddr(str){
	if(str == "0"){//已填写地址 无需显示补填按钮
		return ""
	}else{
		return "addr-show"
	}
}
//判断是否发送
function checkSend(bol){
	if(true){
		return "已发货"
	}else{
		return "未发货"
	}
}
//获取中奖列表
function getList(){
	main.getAwardInfo(0,function(dt){
		createList(dt)
	},function(){
		resize()
	})
}
function createList(dt){
	var html = [];
	$.each(dt.content.data,function(index,dt){
		html.push("<li>恭喜<span>"+dt.nickName+"</span>抽中了"+dt.awardTitle+"</li>");
	})
	$(".list-box ul").append(html.join(''));

	resize()
	if($(".list-box div").height()>$(".list-box").height()){
		scrollList()
	}
	
}
resize()
function resize(){
	console.log("resize")
	//道具高度
	var food_width = $(".onearmbandit-box").width()*713/1080;
	var food_height = Math.floor($(".onearmbandit-box").height()*183/451);
	var food_top = Math.floor($(".onearmbandit-box").height()*77/451);//
	//$(".food-box").css({"margin-top": food_top+"px"});
	//var margin_right = $(".onearmbandit-box").width()*3/480;
	//$(".food").css({"width":food_width+"px","height": food_height+"px", "margin-right":margin_right+"px"});
	$(".food").css({"width":food_width+"px","height": food_height+"px"});

	//中奖信息列表高度
	var list_height = $("body").height() - $(".title").height()- $(".container-onearm").height() - $(".menu-title").height()-15 -34/773*$("body").height();
	$(".list-box").css("height",list_height+"px");
}



var isBegin = false;//是否在滚动中


function scrollFood(_jpid){

	//var u = 136*$(".food").width()/100;
		//var u = $(".food").height()
		var u = 136;
		//console.log($(".food").width())
		if(isBegin) return false;
		isBegin = true;

		$(".food").css('backgroundPositionY',0);
		var jpid = _jpid
		if(_jpid == 0){
			jpid = 12;
		}
		console.log("--------------"+jpid+"-------"+((1495*6) - u*jpid))
		$(".food").each(function(index){
			var _num = $(this);
			setTimeout(function(){
				_num.animate({
					backgroundPositionY: (1631*6) - (u*(jpid))
				},{
					duration: 6000+index*3000,
					easing: "easeInOutCirc",
					complete: function(){
						//if(index==0) {
							isBegin = false;
							console.log("over")
							gameOver()
						//}
						
					}
				});
			}, index * 300);
		});
}

function scrollList(){
	var offset=0;
   	var dis = $('.list-box ul').height();
    var speed=50;
    $('.list-box ul').clone().appendTo($('.list-box div') )
    setInterval(function(){
    	if(offset >= dis) {
			offset = 0;
    	}
    	offset ++;
		$('.list-box div').css("margin-top", offset*-1+ "px")
    },speed);
}

//中奖确认0
function gameOver(){
	isPlaying = false;

	if(jpData.win){//中奖
		if(jpData.physical){//实物奖
			$(".btn-input").attr("logId",jpData.logId)
			$(".btn-input").attr("awardId",jpData.awardId)
			showPop("gift-shiwu")
			$(".mask5").find(".user-jp-name").html(jpData.awardTitle)
		}else{//虚拟
			showPop("gift-xuni")
			$(".mask6").find(".user-jp-name").html(jpData.awardTitle)
			switch(jpData.awardId){
				case 8:
					$(".tip-6").html("快去“鸡腿记录”查看吧！")
					break;
				case 9:
					$(".tip-6").html("快去“扭蛋机”扭一扭吧！")
					break;
				case 10:
					$(".tip-6").html("快去“口袋48”微博报告给袋王吧！")
					break;
			}
			
		}
	}else{
		showPop("fail")
	}
	
}


//弹框
function showPop(type){
	console.log("type>>"+type)
	$(".mask1, .mask2, .mask3, .mask4, .mask5, .mask6,.mask7,.mask8").hide();
	$(".popups, .layer").fadeIn();
	switch(type){
		case "gift-info"://奖项说明
			$(".mask1").fadeIn();
			break;
		case "gift-list"://中奖记录
			$(".mask8").fadeIn();
			break;
		case "fail"://未中奖
			$(".mask2").fadeIn();
			break;
		case "game-intro"://活动介绍
			$(".mask3").fadeIn();
			break;
		case "timeout"://次数用完
			$(".mask4").fadeIn();
			break;
		case "gift-shiwu"://实物奖
			$(".mask5").fadeIn();
			break;
		case "gift-xuni"://虚拟奖
			$(".mask6").fadeIn();
			break;
		case "addr"://填写地址
			$(".mask7").fadeIn();
			break;
	}
}