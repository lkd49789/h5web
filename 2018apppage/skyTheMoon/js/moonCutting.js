(function(data) {
	var sec = 10;//10秒倒计时
	var inter;
	var total = 0; //切月饼次数
	var canclick = true;//是否可点击月饼
	var prevTime = 0;
	var infoId = 0;//素材id
	var leftTimes = 0;//切饼次数

	//
	data.init = function(){
		main.getCutNum(function(dt){
			if(dt.status == 200){
				leftTimes = dt.content.num
				infoId = dt.content.infoId
				$(".left-times").html(leftTimes);

				INDEX.addListeners()
			}else{
				main.alert(dt.message)
			}
		})
	}
	var tep=0;
	//事件
	data.addListeners = function(){
		//点击屏幕开始游戏
		$(".game-init").click(function(){
			INDEX.startGame();
		})
		//点击月饼 切
		mui(".moon-1").on('tap','.moon-3',function(){
			// tep += 1
			// $(".left-times").html(tep)
			INDEX.setCake();
		})
		// $(".moon-3").mousedown(function(){ 
		// 	tep += 1
		// 	$(".left-times").html(tep)
		// 	INDEX.setCake();
		// })
		//点击月饼 切
		$(".btn-play").click(function(){
			
			INDEX.startGame();
		})
		//获得更多机会
		$(".btn-share").click(function(){
			$(".msk").fadeIn();
		})
		//MATE48 分享
		$(".btn-2").click(function(){
			main.openWX(infoId)
		})
		//关闭浮层
		$(".btn-3").click(function(){
			$(".msk").hide();
		})
	}
	//开始游戏
	data.startGame = function(){
		INDEX.reset();
		if(leftTimes==0){
			$(".moon-3,.btn-play").unbind();
			
			$(".moon-3").attr("src","img/moon-5.png");
			$(".moon-4").remove();
			canclick = false;
		}else{
			INDEX.count()
		}
		$(".game-init").hide();
		$(".game-play").show();
	}
	//倒计时
	data.count = function(){
		inter = setInterval(function(){
			sec -= 1;
			console.log(sec)
			INDEX.setSec(sec)
			if(sec <=0){
				leftTimes -= 1;
				canclick = false;
				clearInterval(inter);
				$(".left-times").html(leftTimes);
				main.submitCutNum(total,function(dt){
					if(dt.status == 200){
						if(leftTimes >0){
							$(".btn-play").show()
						}
						
					}else{
						main.submitCutNum(total,function(dt1){
							if(dt.status == 200){
								if(leftTimes >0){
									$(".btn-play").show()
								}
							}else{
								main.alert(dt1.message)
							}

						})
					}
				})
			}
		},1000)
	}
	//结束后调用接口
	// data.endGame = function(){
	// 	main.submitCutNum(total,function(dt){
	// 		if(dt.status == 200){
	// 			if(leftTimes >0){
	// 				$(".btn-play").show()
	// 			}
	// 		}else{

	// 		}
	// 	})
	// }
	//倒计时  秒
	data.setSec = function(_sec){
		var _num = _sec.toString();
		var arr = _num.split("");
		var html = ''
		$.each(arr, function(index, num) {
			html += '<img  src="img/num-top/' + num + '.png">'
		})
		$(".sec").html(html)
	}
	//切月饼数
	data.setCake = function(){
		console.log("canclick---"+canclick)
		if(canclick){
			total += 1;
			console.log("total--"+total)
			var _num = total.toString();
			var arr = _num.split("");
			var html = ''
			$.each(arr, function(index, num) {
				html += '<img  src="img/num-down/' + num + '.png">'
			})
			$(".total").html(html)

			$(".moon-4").remove();
			$(".moon-1").append('<img class="moon-4 animated fadeOutDown" src="img/moon-4.png" />')

			$(".btn-play").hide();

			if($(".moon-3").attr("src") == "img/moon-5.png")//如果园月饼
			{
				$(".moon-3").attr("src","img/moon-3.png");
			}
		}
	}
	//初始
	data.reset = function(){
		canclick = true
		sec = 10;
		total = 0;
		$(".btn-play").hide();
		$(".total").html('<img  src="img/num-down/0.png">')
		$(".moon-4").remove();
		$(".moon-3").attr("src","img/moon-5.png");
	}
}(window.INDEX = {}));

INDEX.init();