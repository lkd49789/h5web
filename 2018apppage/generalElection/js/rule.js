	
	init();

	
	function exChangeEnd(){
		if(localStorage.getItem("submitGuess")){
			if(localStorage.getItem("submitGuess") == "yes"){
				$('.lookbtn').show();
				$('.choosebtn').hide();
			}else{
				$('.choosebtn').show();
				$('.lookbtn').hide();
			}
		}
	}

	function init(){
		main.getGuessmsg(function(dt){
			//console.log(dt);
			if(dt.content.memberIds.length>0){
				$('.lookbtn').show();
				$('.choosebtn').hide();
			}else{
				$('.choosebtn').show();
				$('.lookbtn').hide();
				var timerend = setInterval("exChangeEnd()",1000);
			}

			//是否预测成功
			if(dt.content.result==true || dt.content.result=="true"){
				$('.rightbtn').show();
			}else{
				$('.rightbtn').hide();
			}
		})

		//查看我的预测
		$('.lookbtn').click(function(){
			main.hrefTo('prediction.html');
		})

		//去预测
		$('.choosebtn').click(function(){
			main.hrefTo('choice.html');
		})

		//填写联系方式
		$('.rightbtn').click(function(){
			main.hrefTolink('https://h5.48.cn/2018apppage/postaddresscommon/');
		})

	}